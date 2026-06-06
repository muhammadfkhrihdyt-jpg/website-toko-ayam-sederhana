import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  companyDescription: string;
};

export function HeroSection({ companyDescription }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#f8fff9]">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#04bf60] lg:block" />
      <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0d7a32] shadow-sm ring-1 ring-emerald-100">
            Natura Fresh International
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            Penyedia ayam dan telur untuk rumah tangga hingga usaha kuliner.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700">
            {companyDescription}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#produk-unggulan"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#0d7a32] px-6 text-base font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#096127] hover:shadow-xl"
            >
              Belanja Sekarang
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/#tentang"
              className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-300 bg-white px-6 text-base font-semibold text-zinc-900 transition hover:border-emerald-200 hover:text-[#0d7a32]"
            >
              Tentang NFI
            </Link>
          </div>
        </div>

        <div className="relative z-10">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden rounded-[8px] bg-white shadow-2xl shadow-emerald-950/15 ring-1 ring-black/5">
            <Image
              src="/brand/hero-chicken.jpg"
              alt="Ayam segar Natura Fresh International"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-5 left-5 rounded-md bg-white/95 px-5 py-4 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0d7a32]">
                Pasokan segar
              </p>
              <p className="mt-1 text-2xl font-bold">Ayam dan telur pilihan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
