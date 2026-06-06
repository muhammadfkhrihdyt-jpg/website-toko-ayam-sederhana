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
];

export const priceList: PriceListItem[] = [
  {
    product: "Boneless Dada",
    prices: {
      oneToFourKg: "48.500",
      aboveFiveKg: "47.000",
      aboveTwentyFiveKg: "46.500",
    },
  },
  {
    product: "Boneless Paha",
    prices: {
      oneToFourKg: "47.500",
      aboveFiveKg: "46.000",
      aboveTwentyFiveKg: "44.500",
    },
  },
  {
    product: "Boneless Dada Kulit",
    prices: {
      oneToFourKg: "48.000",
      aboveFiveKg: "46.500",
      aboveTwentyFiveKg: "46.000",
    },
  },
  {
    product: "Boneless Paha Kulit",
    prices: {
      oneToFourKg: "47.000",
      aboveFiveKg: "45.500",
      aboveTwentyFiveKg: "45.000",
    },
  },
  {
    product: "Paha Utuh / Pistol",
    prices: {
      oneToFourKg: "47.500",
      aboveFiveKg: "46.000",
      aboveTwentyFiveKg: "45.500",
    },
  },
  {
    product: "Paha Atas",
    prices: {
      oneToFourKg: "47.500",
      aboveFiveKg: "46.000",
      aboveTwentyFiveKg: "45.500",
    },
  },
  {
    product: "Paha Pentung",
    prices: {
      oneToFourKg: "48.500",
      aboveFiveKg: "47.000",
      aboveTwentyFiveKg: "46.500",
    },
  },
  {
    product: "Sayap",
    prices: {
      oneToFourKg: "40.500",
      aboveFiveKg: "39.000",
      aboveTwentyFiveKg: "38.500",
    },
  },
  {
    product: "Kulit",
    prices: {
      oneToFourKg: "38.500",
      aboveFiveKg: "37.000",
      aboveTwentyFiveKg: "36.500",
    },
  },
  {
    product: "Ceker",
    prices: {
      oneToFourKg: "27.000",
      aboveFiveKg: "26.000",
      aboveTwentyFiveKg: "25.500",
    },
  },
  {
    product: "Karkas 0,9-1kg",
    prices: {
      oneToFourKg: "43.500",
      aboveFiveKg: "42.000",
      aboveTwentyFiveKg: "41.500",
    },
  },
];

export const benefits: Benefit[] = [
  {
    title: "Kualitas Kompetitif",
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
