"use client";

import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { createAccount, type AuthFormState } from "@/backend/auth/actions";

const initialState: AuthFormState = {
  status: "idle",
  message: "",
};

export function SignupSection() {
  const [state, formAction, pending] = useActionState(
    createAccount,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
        <form action={formAction} className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
              Registrasi Akun
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#007a20]">
              Daftar akun baru
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Buat akun customer Natura Fresh. Data akan disimpan ke tabel users
              sesuai database MySQL project ini.
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#007a20]">
              Nama lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              required
              className="mt-3 h-12 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#007a20]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              required
              className="mt-3 h-12 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#007a20]">
                Nomor WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                className="mt-3 h-12 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-[#007a20]">
                Alamat
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Alamat pengiriman"
                className="mt-3 h-12 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#007a20]">
              Password
            </label>
            <div className="relative mt-3">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                minLength={8}
                required
                className="h-12 w-full rounded-md border border-slate-200 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-[#007a20]"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#007a20]">
              Konfirmasi password
            </label>
            <div className="relative mt-3">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulangi password"
                minLength={8}
                required
                className="h-12 w-full rounded-md border border-slate-200 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-[#007a20]"
                aria-label={
                  showConfirmPassword
                    ? "Sembunyikan konfirmasi password"
                    : "Tampilkan konfirmasi password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {state.message ? (
            <p
              aria-live="polite"
              className={`rounded-md px-4 py-3 text-sm font-medium ${
                state.status === "success"
                  ? "bg-emerald-50 text-[#007a20] ring-1 ring-emerald-200"
                  : "bg-red-50 text-red-700 ring-1 ring-red-200"
              }`}
            >
              {state.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#00b80f] text-sm font-bold text-white transition hover:bg-[#009d0d] disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {pending ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <UserPlus className="h-5 w-5" aria-hidden="true" />
            )}
            {pending ? "Menyimpan..." : "Daftar Akun"}
          </button>

          <p className="text-center text-sm text-[#007a20]">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold hover:text-[#d97706]">
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
