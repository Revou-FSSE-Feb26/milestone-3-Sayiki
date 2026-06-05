"use client";

import Image from "next/image";
import { useState } from "react";

import Navbar from "../components/navbar";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export default function CartPage() {
  const { items, totalCount, removeFromCart, clearCart } = useCart();
  const [message, setMessage] = useState("");

  const cartItems = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) {
        return null;
      }
      return { ...product, quantity: item.quantity };
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
            Your cart is empty. Add items from Browse.
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
                      Rp{" "}
                      {(item.priceValue * item.quantity).toLocaleString(
                        "id-ID",
                      )}
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
                <span>Rp {cartTotal.toLocaleString("id-ID")}</span>
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
