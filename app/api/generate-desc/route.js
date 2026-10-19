import { supabaseSession } from "@/lib/supabase-session";

export async function POST(request) {
  // 1. Verifikasi keamanan: Pastikan hanya admin yang sedang login yang dapat mengakses
  const supabase = await supabaseSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json(
      { error: "Akses ditolak. Silakan login sebagai admin." },
      { status: 401 }
    );
  }

  // 2. Periksa ketersediaan GEMINI_API_KEY
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "GEMINI_API_KEY belum disetel. Tambahkan GEMINI_API_KEY di file .env.local.",
      },
      { status: 500 }
    );
  }

  // 3. Ambil data nama dan kategori dari request body
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body tidak valid." }, { status: 400 });
  }

  const { nama, kategori } = body || {};
  if (!nama || !nama.trim()) {
    return Response.json(
      { error: "Nama produk tidak boleh kosong." },
      { status: 400 }
    );
  }

  const prompt = `Buatkan 1 paragraf deskripsi produk UMKM yang menarik dan menggugah selera/minat pembeli untuk produk berikut: "${nama.trim()}"${
    kategori ? ` (kategori: "${kategori.trim()}")` : ""
  }. Syarat: maksimal 30 kata, bahasa Indonesia yang ramah dan profesional, langsung berikan teks deskripsinya tanpa judul, awalan, atau tanda kutip.`;

  // 4. Panggil Gemini API (dengan fallback model jika diperlukan)
  const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-flash"];
  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        lastError = result.error?.message || `Gagal memanggil model ${model}`;
        continue;
      }

      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (generatedText) {
        return Response.json({ deskripsi: generatedText });
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  return Response.json(
    {
      error: lastError || "Gagal membuat deskripsi produk menggunakan AI.",
    },
    { status: 500 }
  );
}

