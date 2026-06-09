"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/CartContext";
import type { CartProduct } from "@/frontend/components/cart/CartView";

type FeaturedProductsSectionProps = {
  products: CartProduct[];
};

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const { addProduct } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      [product.name, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [products, query]);

  return (
    <section id="produk-unggulan" className="border-y border-zinc-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
            Produk
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Masukkan produk ke keranjang
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Pilih produk ayam atau telur, lalu masukkan ke keranjang untuk
            membuat pesanan.
          </p>
          {query ? (
            <p className="mt-3 text-sm font-semibold text-[#0d7a32]">
              Hasil pencarian: {query}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[8px] bg-[#fbfaf7] shadow-sm ring-1 ring-zinc-200 transition duration-300 active:scale-[0.99] hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/10 hover:ring-emerald-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#0d7a32]">
                    <ShoppingCart className="h-12 w-12" aria-hidden="true" />
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1 text-xs font-bold text-[#0d7a32] shadow-sm">
                  {product.stock > 0 ? "Tersedia" : "Habis"}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-zinc-500">
                  {product.category}
                </p>
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">
                  Stok tersedia {product.stock} item.
                </p>
                <div className="mt-5 rounded-md bg-white p-4 ring-1 ring-zinc-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Mulai dari
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#0d7a32]">
                    {formatter.format(product.price)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">per item/kg/pax</p>
                </div>
                <button
                  type="button"
                  onClick={() => addProduct(product)}
                  disabled={product.stock <= 0}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#00b80f] px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] hover:bg-[#009d0d] disabled:cursor-not-allowed disabled:bg-zinc-400"
                >
                  <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                  Masukkan Keranjang
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-8 rounded-[8px] bg-[#fbfaf7] p-8 text-center ring-1 ring-zinc-200">
            <p className="font-bold text-zinc-950">Produk tidak ditemukan</p>
            <p className="mt-2 text-sm text-zinc-600">
              Coba gunakan kata kunci lain.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
