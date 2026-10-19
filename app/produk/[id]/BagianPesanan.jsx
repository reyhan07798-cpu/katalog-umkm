"use client";

import { useState } from "react";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import { formatRupiah } from "@/lib/format";

export default function BagianPesanan({ produk }) {
  const [jumlah, setJumlah] = useState(1);

  const handleJumlahChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      setJumlah(1);
    } else {
      setJumlah(val);
    }
  };

  const totalHarga = produk.harga * (jumlah || 1);

  return (
    <div className="mt-2 flex flex-col gap-4 border-t border-garis pt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="jumlah" className="text-sm font-semibold">
          Jumlah Pesanan
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setJumlah((prev) => Math.max(1, prev - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-latar text-base font-bold text-teks hover:border-utama hover:text-utama"
            aria-label="Kurangi jumlah"
          >
            -
          </button>
          <input
            id="jumlah"
            name="jumlah"
            type="number"
            min="1"
            value={jumlah}
            onChange={handleJumlahChange}
            className="h-9 w-16 rounded-lg border border-garis bg-latar px-2 text-center text-sm font-semibold text-teks focus:border-utama focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setJumlah((prev) => prev + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-latar text-base font-bold text-teks hover:border-utama hover:text-utama"
            aria-label="Tambah jumlah"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-teks-lembut">Total:</span>
        <span className="text-lg font-bold text-harga">{formatRupiah(totalHarga)}</span>
      </div>

      <TombolWhatsApp produk={produk} jumlah={jumlah} />
    </div>
  );
}

