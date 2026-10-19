import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { supabaseServer } from "@/lib/supabase";

export default async function HalamanAdmin() {
  const { data: daftarProduk, error } = await supabaseServer
    .from("produk")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        {/* US-08 (bonus): tambah produk */}
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>
      {error ? (
        <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          Gagal memuat produk: {error.message}
        </p>
      ) : daftarProduk.length === 0 ? (
        <p className="text-teks-lembut">Belum ada produk.</p>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
