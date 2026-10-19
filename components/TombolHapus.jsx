"use client";

import { hapusProduk } from "@/app/admin/actions";

export default function TombolHapus({ id }) {
  async function handleSubmit(e) {
    e.preventDefault();
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    await hapusProduk(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors border border-garis bg-latar text-bahaya hover:border-bahaya"
      >
        Hapus
      </button>
    </form>
  );
}
