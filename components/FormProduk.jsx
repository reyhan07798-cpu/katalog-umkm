"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09).
// Mendukung pembuatan deskripsi produk otomatis dengan AI (US-14).
export default function FormProduk({
  produk = {},
  labelTombol,
  action,
  state,
  isPending,
  hiddenFields = {},
}) {
  const [nama, setNama] = useState(produk.nama || "");
  const [kategori, setKategori] = useState(produk.kategori || "");
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi || "");
  const [loadingAI, setLoadingAI] = useState(false);
  const [pesanAI, setPesanAI] = useState({ error: "", sukses: "" });

  async function handleGenerateDesc() {
    setPesanAI({ error: "", sukses: "" });

    if (!nama.trim()) {
      setPesanAI({
        error: "Isi nama produk terlebih dahulu sebelum membuat deskripsi.",
        sukses: "",
      });
      return;
    }

    setLoadingAI(true);
    try {
      const res = await fetch("/api/generate-desc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: nama.trim(), kategori: kategori.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat deskripsi dengan AI.");
      }

      setDeskripsi(data.deskripsi || "");
      setPesanAI({ error: "", sukses: "Deskripsi berhasil dibuat dengan AI!" });
    } catch (err) {
      setPesanAI({
        error: err.message || "Terjadi kesalahan saat memanggil AI.",
        sukses: "",
      });
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <Input
        label="Nama produk"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />

      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />

      <Input
        label="Kategori"
        name="kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />

      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="deskripsi" className="text-sm font-semibold">
            Deskripsi
          </label>
          <button
            type="button"
            onClick={handleGenerateDesc}
            disabled={loadingAI}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-utama hover:text-utama-gelap disabled:opacity-50"
          >
            {loadingAI ? "Sedang membuat deskripsi..." : "✨ Buat Deskripsi Otomatis dengan AI"}
          </button>
        </div>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Tulis deskripsi atau gunakan tombol AI di atas..."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
        {pesanAI.error && (
          <p className="text-xs text-bahaya">{pesanAI.error}</p>
        )}
        {pesanAI.sukses && (
          <p className="text-xs text-utama">{pesanAI.sukses}</p>
        )}
      </div>

      {state?.error && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan…" : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
