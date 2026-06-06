"use client";

import { Loader2, Save, Trash2 } from "lucide-react";
import { useActionState } from "react";
import {
  clearAddress,
  updateProfile,
  type ProfileFormState,
} from "@/backend/users/actions";
import type { ProfileOverview } from "@/backend/users/queries";

type ProfileEditFormProps = {
  user: ProfileOverview["user"];
};

const initialState: ProfileFormState = {
  status: "idle",
  message: "",
};

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const [updateState, updateAction, updatePending] = useActionState(
    updateProfile,
    initialState,
  );
  const [clearState, clearAction, clearPending] = useActionState(
    clearAddress,
    initialState,
  );
  const visibleState = clearState.message ? clearState : updateState;

  return (
    <div className="rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-zinc-200 lg:col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
            Edit Data Akun
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-950">
            Nama, email, nomor WA, dan alamat
          </h2>
        </div>
      </div>

      <form action={updateAction} className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#007a20]">
              Nama lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              required
              className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none transition focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#007a20]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              required
              className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none transition focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#007a20]">
            Nomor WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={user.phone ?? ""}
            placeholder="08xxxxxxxxxx"
            className="mt-2 h-12 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-[#007a20]">
            Alamat pengiriman
          </label>
          <textarea
            id="address"
            name="address"
            defaultValue={user.address ?? ""}
            rows={4}
            placeholder="Masukkan alamat lengkap"
            className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {visibleState.message ? (
          <p
            aria-live="polite"
            className={`rounded-md px-4 py-3 text-sm font-medium ${
              visibleState.status === "success"
                ? "bg-emerald-50 text-[#007a20] ring-1 ring-emerald-200"
                : "bg-red-50 text-red-700 ring-1 ring-red-200"
            }`}
          >
            {visibleState.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={updatePending}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#00b80f] px-5 text-sm font-bold text-white transition hover:bg-[#009d0d] disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {updatePending ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="h-5 w-5" aria-hidden="true" />
            )}
            Simpan Perubahan
          </button>
        </div>
      </form>

      <form action={clearAction} className="mt-3">
        <button
          type="submit"
          disabled={clearPending || !user.address}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-400"
        >
          {clearPending ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Trash2 className="h-5 w-5" aria-hidden="true" />
          )}
          Kosongkan Alamat
        </button>
      </form>
    </div>
  );
}
