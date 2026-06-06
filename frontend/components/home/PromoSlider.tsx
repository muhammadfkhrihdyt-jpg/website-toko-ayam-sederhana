"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const posters = [
  {
    title: "Gratis Ongkir",
    subtitle: "Minimal belanja Rp250.000",
    note: "se-Jabodetabek",
    image: "/promos/gratis-ongkir-jadetabek.png",
  },
  {
    title: "Ayam Fresh Siap Kirim",
    subtitle: "Untuk rumah dan usaha kuliner",
    note: "pesan praktis setiap hari",
    image: "/products/karkas.jpg",
  },
  {
    title: "Harga Grosir Lebih Hemat",
    subtitle: "Tier harga mulai dari 1 kg",
    note: "cocok untuk stok usaha",
    image: "/products/boneless-dada.jpg",
  },
];

export function PromoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const poster = posters[activeIndex];

  function showPreviousPoster() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? posters.length - 1 : currentIndex - 1,
    );
  }

  function showNextPoster() {
    setActiveIndex((currentIndex) =>
      currentIndex === posters.length - 1 ? 0 : currentIndex + 1,
    );
  }

  return (
    <section className="bg-white">
      <div className="relative overflow-hidden">
        <article
          key={poster.title}
          className="relative min-h-[380px] overflow-hidden bg-[#f8ebcf] sm:min-h-[430px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.75)_0,rgba(255,255,255,0)_28%),linear-gradient(90deg,#f8ebcf_0%,#f8ebcf_44%,#fff7df_100%)]" />
          <div className="relative mx-auto grid min-h-[380px] max-w-7xl items-center gap-8 px-6 py-10 sm:min-h-[430px] sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div className="flex items-center justify-center">
              <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[8px] bg-white shadow-2xl shadow-emerald-950/15 ring-1 ring-white/70 sm:max-w-[360px]">
                <Image
                  src={poster.image}
                  alt={poster.title}
                  fill
                  sizes="(min-width: 1024px) 360px, 80vw"
                  priority={activeIndex === 0}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="max-w-2xl lg:ml-auto">
              <div className="mb-6 inline-flex items-center gap-3 rounded-md bg-white px-4 py-3 shadow-sm">
                <Image
                  src="/brand/natura-fresh-logo.png"
                  alt="Natura Fresh International"
                  width={120}
                  height={80}
                  className="h-10 w-auto"
                />
                <span className="h-9 w-px bg-[#0d7a32]" />
                <span className="rounded-md bg-[#0d7a32] px-3 py-1 text-sm font-bold text-white">
                  #SelaluFresh
                </span>
              </div>
              <h2 className="inline-block -rotate-1 bg-[#0d7a32] px-5 py-2 text-4xl font-black text-white shadow-lg sm:text-6xl">
                {poster.title}
              </h2>
              <div className="mt-4 inline-block rotate-1 bg-[#f97316] px-5 py-2 text-3xl font-black text-white shadow-lg sm:text-5xl">
                {poster.subtitle}
              </div>
              <div className="mt-7 inline-flex items-center overflow-hidden rounded-full bg-white shadow-lg ring-2 ring-[#1faa45]">
                <span className="bg-[#1faa45] px-5 py-4 text-lg font-bold leading-tight text-white">
                  Area
                  <br />
                  Kirim
                </span>
                <span className="px-6 py-4 text-3xl font-black text-[#1faa45]">
                  {poster.note}
                </span>
              </div>
            </div>
          </div>
        </article>

        <div className="absolute inset-y-0 left-0 right-0 mx-auto flex max-w-7xl items-center justify-between px-4 text-white sm:px-6">
          <button
            type="button"
            onClick={showPreviousPoster}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/25 transition hover:bg-black/40 focus:outline-none focus:ring-4 focus:ring-white/50 sm:h-12 sm:w-12"
            aria-label="Promo sebelumnya"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNextPoster}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/25 transition hover:bg-black/40 focus:outline-none focus:ring-4 focus:ring-white/50 sm:h-12 sm:w-12"
            aria-label="Promo berikutnya"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {posters.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex ? "w-8 bg-[#0d7a32]" : "w-2.5 bg-white/80"
              }`}
              aria-label={`Tampilkan promo ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
