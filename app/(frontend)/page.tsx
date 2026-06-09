import {
  AboutSection,
  BenefitsSection,
  CategoriesSection,
  FeaturedProductsSection,
  HeroSection,
  PriceListSection,
  PromoSlider,
  SiteHeader,
  WhatsAppButton,
} from "@/frontend/components/home";
import { getCurrentUser } from "@/backend/auth/session";
import { getActiveProducts } from "@/backend/products/queries";
import {
  benefits,
  categories,
  companyDescription,
  priceList,
} from "@/frontend/data/home-data";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const products = await getActiveProducts();
  const cartProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <PromoSlider />
      <HeroSection companyDescription={companyDescription} />
      <AboutSection />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection products={cartProducts} />
      <PriceListSection priceList={priceList} />
      <BenefitsSection benefits={benefits} />
      <WhatsAppButton />
    </main>
  );
}
