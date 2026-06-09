# Toko Ayam Natura Fresh

Website toko ayam dan telur berbasis Next.js App Router.

## Struktur Folder

- `app/(frontend)` berisi route halaman yang dilihat user, seperti `/`, `/login`, `/signup`, `/profile`, dan `/cart`.
- `frontend/components` berisi komponen tampilan. Contoh: header, promo, form login, form signup, dan cart view.
- `frontend/data` berisi data statis untuk halaman depan.
- `backend` berisi logic server, database query, auth service, dan session helper.
- `app/api` berisi Route Handlers untuk endpoint backend-for-frontend.
- `prisma` berisi schema database.
- `public` berisi asset gambar brand, produk, dan promo.

## Struktur API

Route Handler Next.js wajib berada di dalam `app` dan memakai file `route.ts`.

- `POST /api/auth/register` untuk registrasi akun.
- `POST /api/auth/login` untuk login dan membuat cookie session.
- `POST /api/auth/logout` untuk menghapus cookie session.
- `GET /api/products` untuk mengambil produk aktif dari database.

Form website tetap memakai Server Actions di `backend/auth/actions.ts`, sedangkan endpoint API memakai service yang sama di `backend/auth/service.ts`. Jadi validasi registrasi/login tidak dobel di banyak tempat.

## Menjalankan Project

```bash
npm run dev
```

Buka `http://localhost:3000`.

Pastikan `.env` sudah berisi `DATABASE_URL`. Untuk production, tambahkan juga `AUTH_SECRET` agar tanda tangan session cookie stabil dan aman.
