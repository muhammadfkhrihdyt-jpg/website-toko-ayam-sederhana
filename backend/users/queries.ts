import { prisma } from "@/backend/db/prisma";

export type ProfileOverview = {
  user: {
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
  };
  orders: {
    orderNumber: string;
    status: string;
    paymentStatus: string;
    total: number;
    createdAt: string;
  }[];
};

export async function getProfileOverview(
  userId: number,
): Promise<ProfileOverview | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      orders: {
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          orderNumber: true,
          status: true,
          paymentStatus: true,
          total: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    orders: user.orders.map((order) => ({
      orderNumber: order.orderNumber,
      status: order.status.toString(),
      paymentStatus: order.paymentStatus.toString(),
      total: Number(order.total),
      createdAt: order.createdAt.toISOString(),
    })),
  };
}
