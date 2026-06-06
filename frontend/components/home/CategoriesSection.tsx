import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/types/home";

type CategoriesSectionProps = {
  categories: Category[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
            Kategori Produk
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Pilih sesuai kebutuhan konsumen
          </h2>
        </div>
        <Link
          href="#harga"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d7a32] hover:text-[#096127]"
        >
          Cek daftar harga
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <article
              key={category.name}
              className="group rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-zinc-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10 hover:ring-emerald-200"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-[#0d7a32] transition group-hover:bg-[#0d7a32] group-hover:text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {category.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
