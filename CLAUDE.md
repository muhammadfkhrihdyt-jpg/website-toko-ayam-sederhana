@AGENTS.md

# Toko Ayam Online (NATURAa Fresh Onliine) - Next.js Project Guide

Panduan instruksi build, perintah development, dan standar penulisan kode untuk project e-commerce Toko Ayam Online berbasis Next.js (App Router), TypeScript, dan Tailwind CSS.

---

## 🛠 Perintah Utama (Build & Development)

### 1. Lingkungan Pengembangan (Development)
Untuk menjalankan server lokal dengan fitur *hot-reload* (perubahan kode langsung terlihat di browser):

src/
├── app/                  # Routing Utama (App Router)
│   ├── page.tsx          # Halaman Utama (Homepage Toko Ayam)
│   ├── produk/           # Halaman Katalog Produk Ayam
│   │   └── [slug]/       # Detail Produk (cth: Ayam Karkas, Fillet)
│   ├── keranjang/        # Halaman Cart Belanja
│   └── layout.tsx        # Layout Global (Navbar & Footer)
├── components/           # Komponen UI Reusable
│   ├── ui/               # Komponen Dasar (Tombol, Input dari shadcn/ui)
│   ├── CardProduk.tsx    # Kartu Display Produk Ayam
│   └── Navbar.tsx        # Navigasi Atas
├── hooks/                # Custom React Hooks (cth: useCart)
└── types/                # Definisi Tipe Data TypeScript (cth: produk.ts)

Standar Coding & Tech Stack
1. Komponen Antarmuka (UI)
Styling: Wajib menggunakan Tailwind CSS untuk utilitas styling.

Komponen: Gunakan pendekatan shadcn/ui dan Radix UI untuk komponen interaktif seperti Modal, Dropdown, atau Dialog untuk menjaga performa dan aksesibilitas.

Animasi: Gunakan library AOS (Animate On Scroll) untuk efek transisi halus saat pengguna men-scroll halaman katalog produk.

2. Aturan TypeScript & React
Semua komponen halaman web secara default adalah Server Components untuk optimasi SEO dan kecepatan load produk (mirip Japfa Food Online).

Gunakan direktif 'use client' di baris paling atas file hanya jika komponen membutuhkan interaksi pengguna, seperti tombol "Tambah ke Keranjang", state lokal, atau hooks (useState, useEffect).

Hindari penggunaan tipe data any. Selalu definisikan interface atau type yang jelas untuk data produk ayam, harga, dan stok.

3. Pengelolaan Data & Gambar
Semua gambar produk makanan wajib dibungkus menggunakan komponen <Image /> bawaan dari next/image agar otomatis teroptimasi (kompresi otomatis dan lazy loading).