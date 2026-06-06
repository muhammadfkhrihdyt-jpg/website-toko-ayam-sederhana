import { getActiveProducts } from "@/backend/products/queries";

export async function GET() {
  const products = await getActiveProducts();

  return Response.json({
    products: products.map((product) => ({
      ...product,
      price: Number(product.price),
    })),
  });
}
