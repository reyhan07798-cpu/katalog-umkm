import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk, jumlah = 1 }) {
  const qty = Number(jumlah) > 0 ? Number(jumlah) : 1;
  const totalHarga = produk.harga * qty;
  const pesan = encodeURIComponent(
    `Halo, saya mau pesan ${qty}x ${produk.nama} (Total: ${formatRupiah(totalHarga)})`
  );
  const href = `https://wa.me/${toko.nomorWhatsApp}?text=${pesan}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
    >
      Pesan via WhatsApp
    </a>
  );
}
