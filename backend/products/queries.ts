import { prisma } from "@/backend/db/prisma";

export async function getActiveProducts() {
  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      price: true,
      stock: true,
      imageUrl: true,
    },
  });
}
