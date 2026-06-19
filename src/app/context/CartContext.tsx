"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  quantity: number;
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("revoshop-cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("revoshop-cart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as CartItem[];
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        } catch {
          setItems([]);
        }
      }
    };

    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  const addToCart = (id: string) => {
    const storedUser = localStorage.getItem("revoshop-user");
    if (!storedUser) {
      window.location.href =
        "/login?redirect=" + encodeURIComponent(window.location.pathname);
      return;
    }

    const stored = localStorage.getItem("revoshop-cart");
    let currentItems: CartItem[] = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          currentItems = parsed;
        }
      } catch {
        currentItems = [];
      }
    }

    const existing = currentItems.find((item) => item.id === id);
    let newItems: CartItem[];

    if (existing) {
      newItems = currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      newItems = [...currentItems, { id, quantity: 1 }];
    }

    localStorage.setItem("revoshop-cart", JSON.stringify(newItems));
    setItems(newItems);

    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const removeFromCart = (id: string) => {
    const stored = localStorage.getItem("revoshop-cart");
    let currentItems: CartItem[] = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          currentItems = parsed;
        }
      } catch {
        currentItems = [];
      }
    }

    const newItems = currentItems.filter((item) => item.id !== id);
    localStorage.setItem("revoshop-cart", JSON.stringify(newItems));
    setItems(newItems);

    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const clearCart = () => {
    const newItems: CartItem[] = [];
    localStorage.setItem("revoshop-cart", JSON.stringify(newItems));
    setItems(newItems);

    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, totalCount, addToCart, removeFromCart, clearCart };
}

export function CartProvider({ children }: { children: any }) {
  return <>{children}</>;
}
