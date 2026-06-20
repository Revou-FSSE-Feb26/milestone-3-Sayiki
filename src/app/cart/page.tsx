"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, totalCount, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/login?redirect=/cart');
    }
  }, [isMounted, isAuthenticated, router]);

  useEffect(() => {
    if (!isMounted) return; // Don't fetch until mounted
    
    const fetchProducts = async () => {
      try {
        setError("");
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to load products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load cart items");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [isMounted]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart');
      return;
    }
  }, [isAuthenticated, router]);

  const cartItems = items
    .map((item) => {
      // Debug: Check what IDs we have
      console.log('Cart item ID:', item.id, 'Type:', typeof item.id);
      console.log('First few product IDs:', products.slice(0,3).map(p => ({id: p.id, type: typeof p.id})));
      
      const product = products.find((entry) => {
        // Convert both to strings for comparison
        return entry.id.toString() === item.id.toString();
      });
      
      if (!product) {
        console.log('No product found for cart item:', item.id);
        return null;
      }
      
      console.log('Found product:', product.title);
      
      return { 
        ...product, 
        quantity: item.quantity,
        name: product.title,          
        priceLabel: `$${product.price}`, 
        priceValue: product.price      
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0,
  );

  const handleCheckout = () => {
    clearCart();
    setMessage("Thank you for your purchase!");
  };

  if (!isMounted) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="text-center">
            <p>Redirecting to login...</p>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <p>Loading cart...</p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">
              Your Cart
            </h1>
            <p className="text-sm text-neutral-500">
              {totalCount} items in cart
            </p>
          </div>
          {message && (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              {message}
            </span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center text-sm text-neutral-500">
            <p>Your cart is empty. Add items from Browse.</p>
            
        
            
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="flex h-24 w-full items-center justify-center rounded-xl bg-[#f2f1ee] sm:w-32">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-xs uppercase tracking-wide text-neutral-500">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {item.name}
                    </h3>
                    <span className="text-sm font-medium text-neutral-700">
                      {item.priceLabel}
                    </span>
                    <span className="text-xs text-neutral-500">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-neutral-900">
                      ${(item.priceValue * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-neutral-900">
                Order Summary
              </h2>
              <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
                <span>Total items</span>
                <span>{totalCount}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-neutral-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 w-full rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setMessage("");
                }}
                className="mt-3 w-full rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
