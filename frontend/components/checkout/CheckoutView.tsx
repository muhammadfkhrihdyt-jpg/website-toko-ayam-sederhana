"use client";

import {
  CreditCard,
  Loader2,
  MapPin,
  MessageSquareText,
  PackageCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { checkoutCart } from "@/actions";
import { useCart } from "@/CartContext";

type CheckoutViewProps = {
  customer?: {
    name: string;
    phone: string | null;
    address: string | null;
  } | null;
};

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function CheckoutView({ customer }: CheckoutViewProps) {
  const { items, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const shippingCost = subtotal >= 250000 || subtotal === 0 ? 0 : 15000;
  const serviceFee = items.length > 0 ? 1000 : 0;
  const total = subtotal + shippingCost + serviceFee;

  return (
    <section className="bg-[#fbfaf7] pb-32 pt-12 sm:py-16 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
            Checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            Buat pesanan
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Lengkapi alamat pengiriman dan metode pembayaran untuk memproses pesanan.
          </p>
        </div>

        <form
          className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]"
          action={(formData) => {
            startTransition(async () => {
              const result = await checkoutCart(
                items,
                subtotal,
                shippingCost,
                total,
                {
                  customerName: String(formData.get("customerName") ?? ""),
                  customerPhone: String(formData.get("customerPhone") ?? ""),
                  shippingAddress: String(formData.get("shippingAddress") ?? ""),
                  notes: String(formData.get("notes") ?? ""),
                  paymentMethod: String(formData.get("paymentMethod") ?? ""),
                },
              );

              if (result?.success) {
                clearCart();
                router.push("/profile");
              } else {
                alert(result?.message || "Gagal membuat pesanan");
              }
            });
          }}
        >
          <div className="space-y-5">
            <section className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <div className="flex items-center gap-3 text-[#0d7a32]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-lg font-bold text-zinc-950">
                  Alamat Pengiriman
                </h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-semibold text-[#007a20]"
                  >
                    Nama penerima
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    defaultValue={customer?.name ?? ""}
                    required
                    className="mt-2 min-h-12 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customerPhone"
                    className="block text-sm font-semibold text-[#007a20]"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    defaultValue={customer?.phone ?? ""}
                    required
                    inputMode="tel"
                    className="mt-2 min-h-12 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="shippingAddress"
                  className="block text-sm font-semibold text-[#007a20]"
                >
                  Alamat lengkap
                </label>
                <textarea
                  id="shippingAddress"
                  name="shippingAddress"
                  rows={3}
                  defaultValue={customer?.address ?? ""}
                  required
                  placeholder="Nama jalan, nomor rumah, kecamatan, kota, dan catatan alamat"
                  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </section>

            <section className="rounded-[8px] bg-white shadow-sm ring-1 ring-zinc-200">
              <div className="flex items-center gap-3 border-b border-zinc-200 p-5 text-[#0d7a32]">
                <PackageCheck className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-lg font-bold text-zinc-950">
                  Produk Dipesan
                </h2>
              </div>

              {items.length > 0 ? (
                <div className="divide-y divide-zinc-200">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid gap-4 p-5 sm:grid-cols-[80px_1fr_auto] sm:items-center"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#007a20]">
                            <ShoppingCart className="h-7 w-7" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-500">
                          {item.category}
                        </p>
                        <h2 className="mt-1 text-base font-bold text-zinc-950">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-600">
                          {formatter.format(item.price)} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-zinc-950">
                        {formatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-60 flex-col items-center justify-center px-6 py-12 text-center">
                  <ShoppingCart className="h-12 w-12 text-[#007a20]" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-bold">Keranjang masih kosong</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                    Kembali ke keranjang untuk menambahkan produk.
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                <div>
                  <label
                    htmlFor="notes"
                    className="flex items-center gap-2 text-sm font-semibold text-[#007a20]"
                  >
                    <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                    Pesan
                  </label>
                  <input
                    id="notes"
                    name="notes"
                    type="text"
                    placeholder="Opsional: tinggalkan pesan"
                  className="mt-2 min-h-12 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#007a20]">
                    <Truck className="h-4 w-4" aria-hidden="true" />
                    Opsi Pengiriman
                  </p>
                  <div className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-zinc-700">
                    <p className="font-bold text-[#0d7a32]">Kurir Natura Fresh</p>
                    <p className="mt-1">
                      Gratis ongkir untuk pesanan minimal Rp250.000.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <h2 className="text-lg font-bold text-zinc-950">
                Metode Pembayaran
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["Transfer Bank", "COD", "QRIS"].map((method) => (
                  <label
                    key={method}
                    className="flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-zinc-200 px-4 py-3 text-sm font-bold text-zinc-700 transition active:scale-[0.98] has-[:checked]:border-[#0d7a32] has-[:checked]:bg-emerald-50 has-[:checked]:text-[#0d7a32]"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      defaultChecked={method === "Transfer Bank"}
                      className="sr-only"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-[#007a20]">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-zinc-950">Ringkasan pesanan</h2>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-zinc-600">Subtotal</dt>
                <dd className="font-bold text-zinc-950">{formatter.format(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-zinc-600">Ongkir</dt>
                <dd className="font-bold text-zinc-950">
                  {shippingCost === 0 ? "Gratis" : formatter.format(shippingCost)}
                </dd>
              </div>
              <div className="border-t border-zinc-200 pt-3">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <dt className="text-zinc-600">Biaya layanan</dt>
                  <dd className="font-bold text-zinc-950">
                    {formatter.format(serviceFee)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-bold text-zinc-950">Total</dt>
                  <dd className="text-xl font-bold text-[#007a20]">
                    {formatter.format(total)}
                  </dd>
                </div>
              </div>
            </dl>
            <button
              type="submit"
              disabled={items.length === 0 || isPending}
              className="mt-6 hidden h-12 w-full items-center justify-center gap-2 rounded-md bg-[#00b80f] px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] hover:bg-[#009d0d] disabled:cursor-not-allowed disabled:bg-zinc-400 lg:inline-flex"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : (
                <CreditCard className="h-5 w-5" aria-hidden="true" />
              )}
              {isPending ? "Memproses..." : "Buat Pesanan"}
            </button>
          </aside>
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">Total pembayaran</p>
                <p className="truncate text-lg font-bold text-[#0d7a32]">
                  {formatter.format(total)}
                </p>
              </div>
              <button
                type="submit"
                disabled={items.length === 0 || isPending}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#00b80f] px-5 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-400"
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                ) : (
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                )}
                {isPending ? "Proses..." : "Buat Pesanan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
