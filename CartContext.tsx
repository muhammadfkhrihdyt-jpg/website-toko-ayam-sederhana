"use client";

import { createContext, useContext, useState, useEffect, useTransition, type ReactNode } from "react";
import { updateCartItemDB, removeCartItemDB, clearCartDB, getCartItemsDB } from "@/actions";
import type { CartProduct } from "@/frontend/components/cart/CartView";

export type CartLine = CartProduct & {
  quantity: number;
};

type CartContextType = {
  items: CartLine[];
  addProduct: (product: CartProduct) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Ambil data keranjang dari database (CartItem) saat pertama kali buka web
    getCartItemsDB().then((data) => {
      if (data && data.length > 0) setItems(data);
    });
  }, []);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  function addProduct(product: CartProduct) {
    let newQuantity = 1;
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        newQuantity = Math.min(existingItem.quantity + 1, product.stock || 99);
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });

    // Sinkronkan ke database di background tanpa loading UI
    startTransition(() => {
      updateCartItemDB(product.id, newQuantity);
    });
  }

  function updateQuantity(productId: number, quantity: number) {
    const validQuantity = Math.max(quantity, 1);
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(validQuantity, item.stock || 99) }
          : item
      )
    );

    startTransition(() => {
      updateCartItemDB(productId, validQuantity);
    });
  }

  function removeItem(productId: number) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    startTransition(() => {
      removeCartItemDB(productId);
    });
  }

  function clearCart() {
    setItems([]);
    startTransition(() => {
      clearCartDB();
    });
  }

  return (
    <CartContext.Provider value={{ items, addProduct, updateQuantity, removeItem, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus dibungkus dalam CartProvider");
  }
  return context;
}