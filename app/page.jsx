import KartuProduk from "@/components/KartuProduk";
import Tombol from "@/components/Tombol";
import { supabaseServer } from "@/lib/supabase";
import { toko } from "@/lib/toko";

export default async function HalamanKatalog({ searchParams }) {
  const params = await searchParams;
  const query = params?.q?.trim() || "";

  let queryBuilder = supabaseServer
    .from("produk")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    queryBuilder = queryBuilder.ilike("nama", `%${query}%`);
  }

  const { data: daftarProduk, error } = await queryBuilder;

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="judul-produk" className="text-xl font-bold">
            Produk kami
          </h2>
          <form method="GET" action="/" className="flex w-full max-w-sm gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari produk..."
              className="w-full rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
            />
            <Tombol type="submit">Cari</Tombol>
            {query && (
              <Tombol href="/" varian="garis">
                Reset
              </Tombol>
            )}
          </form>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            Gagal memuat produk: {error.message}
          </p>
        ) : !daftarProduk || daftarProduk.length === 0 ? (
          <p className="text-teks-lembut">
            {query ? "Produk tidak ditemukan" : "Belum ada produk."}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
