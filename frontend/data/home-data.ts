import {
  BadgeCheck,
  ClipboardList,
  Drumstick,
  Egg,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Truck,
} from "lucide-react";
import type { Benefit, Category, PriceListItem, Product } from "@/types/home";

export const companyDescription =
  "Natura Fresh International (NFI) bergerak dalam bidang penyedia makanan yang berfokus pada ayam dan telur. NFI mempunyai prinsip memberikan kualitas terbaik dengan harga kompetitif untuk kebutuhan perorangan maupun usaha.";

export const categories: Category[] = [
  {
    name: "Ayam Segar",
    description: "Ayam utuh yang dapat dipotong sesuai kebutuhan konsumen.",
    icon: Drumstick,
  },
  {
    name: "Ayam Beku",
    description: "Pilihan stok ayam praktis dengan kualitas tetap terjaga.",
    icon: Snowflake,
  },
  {
    name: "Telur Ayam Negeri Segar",
    description: "Telur pilihan dari peternakan lokal untuk rumah dan usaha.",
    icon: Egg,
  },
  {
    name: "Low Cholesterol Omega",
    description: "Pilihan terbaik untuk yang menjaga kolesterol dan nutrisi.",
    icon: Leaf,
  },
  {
    name: "Ultra Omega",
    description: "Kaya Omega-3 dan vitamin D untuk keluarga sehat.",
    icon: BadgeCheck,
  },
];

export const featuredProducts: Product[] = [
  {
    name: "Boneless Dada",
    category: "Boneless",
    description: "Dada ayam tanpa tulang dengan proses debone rapi dan teliti.",
    image: "/products/boneless-dada.jpg",
    badge: "Terlaris",
    prices: {
      oneToFourKg: "48.500",
      aboveFiveKg: "47.000",
      aboveTwentyFiveKg: "46.500",
    },
  },
  {
    name: "Boneless Paha",
    category: "Boneless",
    description: "Potongan paha tanpa tulang untuk kebutuhan rumah dan usaha.",
    image: "/products/boneless-paha.jpg",
    badge: "Favorit",
    prices: {
      oneToFourKg: "47.500",
      aboveFiveKg: "46.000",
      aboveTwentyFiveKg: "44.500",
    },
  },
  {
    name: "Sayap",
    category: "Specific Part",
    description: "Bagian ayam pilihan untuk menu goreng, bakar, dan katering.",
    image: "/products/sayap.jpg",
    badge: "Best Value",
    prices: {
      oneToFourKg: "40.500",
      aboveFiveKg: "39.000",
      aboveTwentyFiveKg: "38.500",
    },
  },
  {
    name: "Karkas 0,9-1kg",
    category: "Whole Chicken",
    description: "Ayam utuh ukuran praktis yang bisa diparting sesuai kebutuhan.",
    image: "/products/karkas.jpg",
    badge: "Fresh",
    prices: {
      oneToFourKg: "43.500",
      aboveFiveKg: "42.000",
      aboveTwentyFiveKg: "41.500",
    },
  },
  {
    name: "Kulit Ayam",
    category: "Specific Part",
    description: "Kulit ayam segar berkualitas, cocok untuk komoditas usaha krispi atau sate.",
    image: "/products/kulit.jpg",
    badge: "Fresh",
    prices: {
      oneToFourKg: "38.500",
      aboveFiveKg: "37.000",
      aboveTwentyFiveKg: "36.500",
    },
  },
  {
    name: "Ceker Ayam",
    category: "Specific Part",
    description: "Ceker ayam bersih, higienis, dan siap diolah untuk kaldu atau hidangan sup.",
    image: "/products/ceker.jpg",
    badge: "Fresh",
    prices: {
      oneToFourKg: "27.000",
      aboveFiveKg: "26.000",
      aboveTwentyFiveKg: "25.500",
    },
  },
];

export const priceList: PriceListItem[] = [
  {
    product: "Boneless Dada",
    tiers: [
      { label: "1 - 4 kg", price: "Rp48.500/kg" },
      { label: ">5 kg", price: "Rp47.000/kg" },
      { label: ">25 kg", price: "Rp46.500/kg" },
    ],
  },
  {
    product: "Boneless Paha",
    tiers: [
      { label: "1 - 4 kg", price: "Rp47.500/kg" },
      { label: ">5 kg", price: "Rp46.000/kg" },
      { label: ">25 kg", price: "Rp44.500/kg" },
    ],
  },
  {
    product: "Boneless Dada Kulit",
    tiers: [
      { label: "1 - 4 kg", price: "Rp48.000/kg" },
      { label: ">5 kg", price: "Rp46.500/kg" },
      { label: ">25 kg", price: "Rp46.000/kg" },
    ],
  },
  {
    product: "Boneless Paha Kulit",
    tiers: [
      { label: "1 - 4 kg", price: "Rp47.000/kg" },
      { label: ">5 kg", price: "Rp45.500/kg" },
      { label: ">25 kg", price: "Rp45.000/kg" },
    ],
  },
  {
    product: "Paha Utuh / Pistol",
    tiers: [
      { label: "1 - 4 kg", price: "Rp47.500/kg" },
      { label: ">5 kg", price: "Rp46.000/kg" },
      { label: ">25 kg", price: "Rp45.500/kg" },
    ],
  },
  {
    product: "Paha Atas",
    tiers: [
      { label: "1 - 4 kg", price: "Rp47.500/kg" },
      { label: ">5 kg", price: "Rp46.000/kg" },
      { label: ">25 kg", price: "Rp45.500/kg" },
    ],
  },
  {
    product: "Paha Pentung",
    tiers: [
      { label: "1 - 4 kg", price: "Rp48.500/kg" },
      { label: ">5 kg", price: "Rp47.000/kg" },
      { label: ">25 kg", price: "Rp46.500/kg" },
    ],
  },
  {
    product: "Sayap",
    tiers: [
      { label: "1 - 4 kg", price: "Rp40.500/kg" },
      { label: ">5 kg", price: "Rp39.000/kg" },
      { label: ">25 kg", price: "Rp38.500/kg" },
    ],
  },
  {
    product: "Kulit",
    tiers: [
      { label: "1 - 4 kg", price: "Rp38.500/kg" },
      { label: ">5 kg", price: "Rp37.000/kg" },
      { label: ">25 kg", price: "Rp36.500/kg" },
    ],
  },
  {
    product: "Ceker",
    tiers: [
      { label: "1 - 4 kg", price: "Rp27.000/kg" },
      { label: ">5 kg", price: "Rp26.000/kg" },
      { label: ">25 kg", price: "Rp25.500/kg" },
    ],
  },
  {
    product: "Karkas 0,9-1kg",
    tiers: [
      { label: "1 - 4 kg", price: "Rp43.500/kg" },
      { label: ">5 kg", price: "Rp42.000/kg" },
      { label: ">25 kg", price: "Rp41.500/kg" },
    ],
  },
  {
    product: "Telur Ayam Negeri Segar (Yellow Yolk)",
    tiers: [
      { label: "500 gram", price: "Rp18.000" },
      { label: "1 - 200 kg", price: "Rp28.000/kg" },
      { label: ">200 kg", price: "Negosiasi" },
    ],
  },
  {
    product: "Telur Ayam Omega Low Cholesterol (Orange Yolk)",
    tiers: [
      { label: "1 pax isi 10 butir", price: "Rp35.000/pax" },
      { label: ">5 pax", price: "Rp34.000/pax" },
      { label: ">10 pax", price: "Rp33.000/pax" },
    ],
  },
  {
    product: "Telur Ayam Omega Ultra (Orange Yolk)",
    tiers: [
      { label: "1 pax isi 10 butir", price: "Rp30.000/pax" },
      { label: ">5 pax", price: "Rp29.000/pax" },
      { label: ">10 pax", price: "Rp28.000/pax" },
      { label: "1 kg", price: "Rp35.000/kg" },
    ],
  },
];

export const benefits: Benefit[] = [
  {
    title: "Kualitas Competitive",
    description:
      "NFI berprinsip memberikan kualitas terbaik dengan harga kompetitif.",
    icon: ShieldCheck,
  },
  {
    title: "Banyak Variasi",
    description: "Tersedia pilihan tipe potongan, ukuran, bagian, dan nutrisi.",
    icon: ClipboardList,
  },
  {
    title: "Gratis Pengiriman",
    description: "Gratis pengiriman Jabodetabek untuk pemesanan jumlah tertentu.",
    icon: Truck,
  },
  {
    title: "Konsultasi Produk",
    description: "Expert NFI membantu konsumen memilih produk yang paling tepat.",
    icon: PackageCheck,
  },
];