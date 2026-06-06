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
import {
  benefits,
  categories,
  companyDescription,
  featuredProducts,
  priceList,
} from "@/frontend/data/home-data";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <PromoSlider />
      <HeroSection companyDescription={companyDescription} />
      <AboutSection />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection products={featuredProducts} />
      <PriceListSection priceList={priceList} />
      <BenefitsSection benefits={benefits} />
      <WhatsAppButton />
    </main>
  );
}
