"use client";

import { CreditCard, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/CartContext";

export type CartProduct = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string | null;
};

type CartViewProps = {
  products: CartProduct[];
};

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function CartView({ products }: CartViewProps) {
  const { items, addProduct, updateQuantity, removeItem } = useCart();

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const shippingCost = subtotal >= 250000 || subtotal === 0 ? 0 : 15000;
  const total = subtotal + shippingCost;

  return (
    <section className="bg-[#fbfaf7] pb-32 pt-12 sm:py-16 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
              Keranjang
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Keranjang belanja
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-600">
            Periksa produk dan jumlah pesanan sebelum lanjut ke checkout.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[8px] bg-white shadow-sm ring-1 ring-zinc-200">
            {items.length > 0 ? (
              <div className="divide-y divide-zinc-200">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-4 p-5 sm:grid-cols-[96px_1fr_auto] sm:items-center"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#007a20]">
                          <ShoppingCart className="h-8 w-8" aria-hidden="true" />
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-zinc-500">
                        {item.category}
                      </p>
                      <h2 className="mt-1 text-lg font-bold text-zinc-950">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-600">
                        {formatter.format(item.price)}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#007a20]">
                        Stok: {item.stock}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex h-10 items-center overflow-hidden rounded-md ring-1 ring-zinc-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-12 w-12 items-center justify-center p-3 text-[#007a20] transition active:scale-95 hover:bg-emerald-50"
                          aria-label={`Kurangi ${item.name}`}
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="flex h-10 min-w-12 items-center justify-center px-3 text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-12 w-12 items-center justify-center p-3 text-[#007a20] transition active:scale-95 hover:bg-emerald-50"
                          aria-label={`Tambah ${item.name}`}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-zinc-950">
                          {formatter.format(item.price * item.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-1 inline-flex min-h-11 items-center gap-1 rounded-md px-3 py-2 text-xs font-bold text-red-600 transition active:scale-95 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
                <ShoppingCart className="h-12 w-12 text-[#007a20]" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-bold">Keranjang masih kosong</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                  Tambahkan produk dari daftar rekomendasi di bawah untuk mulai
                  membuat pesanan.
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-[#007a20]">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-zinc-950">Ringkasan keranjang</h2>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-zinc-600">Subtotal</dt>
                <dd className="font-bold text-zinc-950">{formatter.format(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-zinc-600">Estimasi ongkir</dt>
                <dd className="font-bold text-zinc-950">
                  {shippingCost === 0 ? "Gratis" : formatter.format(shippingCost)}
                </dd>
              </div>
              <div className="border-t border-zinc-200 pt-3">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-bold text-zinc-950">Estimasi total</dt>
                  <dd className="text-xl font-bold text-[#007a20]">
                    {formatter.format(total)}
                  </dd>
                </div>
              </div>
            </dl>
            {items.length > 0 ? (
              <Link
                href="/checkout"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#00b80f] px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] hover:bg-[#009d0d]"
              >
                <CreditCard className="h-5 w-5" aria-hidden="true" />
                Lanjut Checkout
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="mt-6 inline-flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-md bg-zinc-400 text-sm font-bold text-white"
              >
                <CreditCard className="h-5 w-5" aria-hidden="true" />
                Lanjut Checkout
              </button>
            )}
          </aside>
        </div>

        {products.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-zinc-950">Tambah produk</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addProduct(product)}
                  className="rounded-[8px] bg-white p-4 text-left shadow-sm ring-1 ring-zinc-200 transition active:scale-[0.99] hover:-translate-y-0.5 hover:ring-emerald-300"
                >
                  <p className="text-sm font-bold text-zinc-950">{product.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{product.category}</p>
                  <p className="mt-3 text-sm font-bold text-[#007a20]">
                    {formatter.format(product.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {items.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-zinc-500">Estimasi total</p>
              <p className="truncate text-lg font-bold text-[#0d7a32]">
                {formatter.format(total)}
              </p>
            </div>
            <Link
              href="/checkout"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#00b80f] px-5 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
            >
              <CreditCard className="h-5 w-5" aria-hidden="true" />
              Checkout
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
