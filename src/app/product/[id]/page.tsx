"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Navbar from "../../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductPage() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          console.log('Error:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
              Loading product...
            </h1>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-neutral-600">
              Sorry, the product you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </>
    );
  }

  const displayImage = product.image;

  return (
    <>
      <Navbar />
      <section className="px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-center rounded-2xl bg-[#f2f1ee] p-6">
                <Image
                  src={displayImage || ""}
                  alt={product.title || "Product"}
                  width={520}
                  height={520}
                  className="h-80 w-auto object-contain"
                  loading="eager"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-wide text-neutral-500">
              {product.category}
            </span>
            <h1 className="text-2xl font-semibold text-neutral-900">
              {product.title}
            </h1>
            <p className="text-sm text-neutral-600">{product.description}</p>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Price
                  </p>
                  <p className="text-2xl font-semibold text-neutral-900">
                    ${product.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {isAuthenticated ? "Add to Cart" : "Login to Add to Cart"}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-neutral-900">
                Highlights
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>Premium build and modern styling.</li>
                <li>Designed for daily performance and comfort.</li>
                <li>Curated to match the RevoShop lineup.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
