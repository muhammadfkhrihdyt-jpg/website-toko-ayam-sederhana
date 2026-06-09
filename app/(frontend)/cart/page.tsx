import { getActiveProducts } from "@/backend/products/queries";
import { getCurrentUser } from "@/backend/auth/session";
import { getProfileOverview } from "@/backend/users/queries";
import { CartView, type CartProduct } from "@/frontend/components/cart/CartView";
import { SiteHeader, WhatsAppButton } from "@/frontend/components/home";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const currentUser = await getCurrentUser();
  const profileOverview = currentUser
    ? await getProfileOverview(currentUser.id)
    : null;
  const products = await getActiveProducts();

  const cartProducts: CartProduct[] = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <CartView
        products={cartProducts}
        customer={profileOverview?.user ?? null}
      />
      <WhatsAppButton />
    </main>
  );
}
