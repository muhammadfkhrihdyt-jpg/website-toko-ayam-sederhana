"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/backend/auth/session";
import { prisma } from "@/backend/db";

type CheckoutItem = {
  id: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
};

type CheckoutDetails = {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  notes: string;
  paymentMethod: string;
};

export async function checkoutCart(
  items: CheckoutItem[],
  subtotal: number,
  shippingCost: number,
  totalAmount: number,
  details: CheckoutDetails,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Silakan masuk akun terlebih dahulu untuk membuat pesanan.",
      };
    }

    if (items.length === 0) {
      return {
        success: false,
        message: "Keranjang masih kosong.",
      };
    }

    const customerName = details.customerName.trim();
    const customerPhone = details.customerPhone.trim();
    const shippingAddress = details.shippingAddress.trim();
    const notes = details.notes.trim();
    const paymentMethod = details.paymentMethod.trim() || "Transfer Bank";

    if (!customerName || !customerPhone || !shippingAddress) {
      return {
        success: false,
        message: "Nama penerima, nomor WhatsApp, dan alamat pengiriman wajib diisi.",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Data akun tidak ditemukan. Silakan masuk ulang.",
      };
    }

    const orderNumber = `ORD-${Date.now()}`;

    await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        subtotal,
        shippingCost,
        total: totalAmount,
        status: "PENDING",
        paymentStatus: "UNPAID",
        customerName,
        customerPhone,
        shippingAddress,
        notes: notes
          ? `${notes}\nMetode pembayaran: ${paymentMethod}`
          : `Metode pembayaran: ${paymentMethod}`,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            productSlug: item.slug,
            unitPrice: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: { userId: user.id },
    });

    revalidatePath("/profile");
    revalidatePath("/cart");
    return { success: true, message: "Pesanan berhasil dibuat!" };
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, message: "Terjadi kesalahan saat memproses pesanan." };
  }
}

// --- SERVER ACTIONS UNTUK CART ITEM (DATABASE) ---

export async function updateCartItemDB(productId: number, quantity: number) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return;
    }

    const userId = currentUser.id;

    await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity },
      create: { userId, productId, quantity },
    });
  } catch (error) {
    console.error("Gagal update cart DB:", error);
  }
}

export async function removeCartItemDB(productId: number) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return;
    }

    const userId = currentUser.id;

    await prisma.cartItem.deleteMany({
      where: { userId, productId },
    });
  } catch (error) {
    console.error("Gagal hapus item cart DB:", error);
  }
}

export async function clearCartDB() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return;
    }

    const userId = currentUser.id;

    await prisma.cartItem.deleteMany({
      where: { userId },
    });
  } catch (error) {
    console.error("Gagal kosongkan cart DB:", error);
  }
}

export async function getCartItemsDB() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const userId = currentUser.id;

    const dbItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    return dbItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      category: item.product.category,
      price: Number(item.product.price),
      stock: item.product.stock,
      imageUrl: item.product.imageUrl,
      quantity: item.quantity,
    }));
  } catch (error) {
    console.error("Gagal ambil cart DB:", error);
    return [];
  }
}
