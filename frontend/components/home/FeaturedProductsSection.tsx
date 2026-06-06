import Image from "next/image";
import type { Product } from "@/types/home";

type FeaturedProductsSectionProps = {
  products: Product[];
};

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  return (
    <section
      id="produk-unggulan"
      className="border-y border-zinc-200 bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
            Produk Unggulan
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Produk ayam terlaris
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Harga per kilogram mengikuti tier pembelian pada pricelist Natura
            Fresh International.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-[8px] bg-[#fbfaf7] shadow-sm ring-1 ring-zinc-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/10 hover:ring-emerald-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1 text-xs font-bold text-[#0d7a32] shadow-sm">
                  {product.badge}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-zinc-500">
                  {product.category}
                </p>
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">
                  {product.description}
                </p>
                <div className="mt-5 rounded-md bg-white p-4 ring-1 ring-zinc-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Mulai dari
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#0d7a32]">
                    Rp{product.prices.aboveTwentyFiveKg}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    per kg untuk &gt;25kg
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
