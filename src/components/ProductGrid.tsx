"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError("");
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to load products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Unable to load products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = useMemo(() => 
    products.slice(0, 6), 
    [products]
  );

  if (loading) {
    return(
      <div className="px-6 sm:px-10 lg:px-16 mt-16 mb-10">
        <p>Loading Products...</p>
      </div>
    )
  }

  if (error) {
    return(
      <div className="px-6 sm:px-10 lg:px-16 mt-16 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <section className="px-6 sm:px-10 lg:px-16 mt-16 mb-10">
      <div className="flex items-end justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900">
          Featured Products
        </h2>
        <span className="text-sm text-neutral-500">Curated picks</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="group text-neutral-900 flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Link
              href={`/product/${product.id}`}
              className="flex items-center justify-center p-4"
            >
              <div className="flex h-40 w-full items-center justify-center rounded-xl bg-[#f2f1ee]">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="h-32 w-auto object-contain"
                  loading="eager"
                  priority={index < 3}
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col gap-1 px-4 pb-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-semibold tracking-tight truncate">
                  {product.title}
                </h3>
              </Link>
              <span className="text-sm font-medium text-neutral-700">
                ${product.price}
              </span>
              <a href={`/product/${product.id}`} className="mt-auto">
                <button className="mt-4 w-full cursor-pointer rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold transition hover:bg-neutral-900 hover:text-white">
                  View Details
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
