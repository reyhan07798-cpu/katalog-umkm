import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormUbahProduk from "./FormUbahProduk";
import { supabaseServer } from "@/lib/supabase";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;

  const { data: produk } = await supabaseServer
    .from("produk")
    .select("*")
    .eq("id", id)
    .single();

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <FormUbahProduk produk={produk} />
    </div>
  );
}
