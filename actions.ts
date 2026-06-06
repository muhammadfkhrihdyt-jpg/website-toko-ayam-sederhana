"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/backend/db";

export async function checkoutCart(items: any[], subtotal: number, shippingCost: number, totalAmount: number) {
  try {
    // 1. Ambil data user yang sedang login (Sesuaikan dengan fungsi auth Anda)
    // const session = await getSession();
    // if (!session?.user) {
    //   return { success: false, message: "Silakan login terlebih dahulu untuk membuat pesanan." };
    // }

    // 2. Menyimpan pesanan ke database menggunakan Enum asli dari Prisma (PENDING, UNPAID)
    // Catatan: Data userId, customerName, dll di bawah adalah CONTOH DUMMY.
    // Nantinya wajib diganti dengan data asli dari variabel 'session.user' milik Anda.
    const orderNumber = `ORD-${Date.now()}`;

    await prisma.order.create({
      data: {
        orderNumber: orderNumber,
        userId: 1, // <--- SEMENTARA DI-HARDCODE UNTUK TESTING
        subtotal: subtotal,
        shippingCost: shippingCost,
        total: totalAmount,
        status: "PENDING", 
        paymentStatus: "UNPAID", 
        customerName: "Pelanggan Guest", // <--- Ganti dengan data user
        customerPhone: "080000000000",   // <--- Ganti dengan data user
        shippingAddress: "Alamat belum diisi", // <--- Ganti dengan data user
        items: {
          create: items.map(item => ({
            productId: item.id,
            productName: item.name,
            productSlug: item.slug,
            unitPrice: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
          }))
        }
      }
    });

    // 3. Revalidasi halaman profil agar daftar pesanan terbaru muncul
    revalidatePath("/profile");
    return { success: true, message: "Pesanan berhasil dibuat!" };
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, message: "Terjadi kesalahan saat memproses pesanan." };
  }
}

// --- SERVER ACTIONS UNTUK CART ITEM (DATABASE) ---

export async function updateCartItemDB(productId: number, quantity: number) {
  try {
    const userId = 1; // <--- SEMENTARA DI-HARDCODE UNTUK TESTING
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
    const userId = 1; // <--- SEMENTARA DI-HARDCODE
    await prisma.cartItem.deleteMany({
      where: { userId, productId },
    });
  } catch (error) {
    console.error("Gagal hapus item cart DB:", error);
  }
}

export async function clearCartDB() {
  try {
    const userId = 1; // <--- SEMENTARA DI-HARDCODE
    await prisma.cartItem.deleteMany({
      where: { userId },
    });
  } catch (error) {
    console.error("Gagal kosongkan cart DB:", error);
  }
}

export async function getCartItemsDB() {
  try {
    const userId = 1; // <--- SEMENTARA DI-HARDCODE
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