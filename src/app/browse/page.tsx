"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useCart } from "../context/CartContext";

export default function BrowsePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError("");
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to load products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => [
    "all",
    ...Array.from(new Set(products.map((item) => item.category))),
  ], [products]);

  const normalizedSearch = useMemo(() => search.trim().toLowerCase(), [search]);
  
  const filteredProducts = useMemo(() => products.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      item.title.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  }), [products, selectedCategory, normalizedSearch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <p>Loading products...</p>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <section className="px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-72 shrink-0">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-neutral-900">
                Browse Filters
              </h2>
              <div className="mt-5">
                <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Search
                </label>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
                />
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Categories
                </label>
                <div className="mt-3 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`flex w-full items-center cursor-pointer justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                        selectedCategory === category
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <span className="capitalize">{category}</span>
                      <span className="text-xs opacity-70">
                        {category === "all"
                          ? products.length
                          : products.filter(
                              (item) => item.category === category,
                            ).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">
                  Browse Products
                </h1>
                <p className="text-sm text-neutral-500">
                  {filteredProducts.length} items found
                </p>
              </div>
              <div className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
                Category: {selectedCategory}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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
                        priority={index < 4}
                      />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col gap-1 px-4 pb-4">
                    <span className="text-xs uppercase tracking-wide text-neutral-500">
                      {product.category}
                    </span>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm font-semibold tracking-tight text-neutral-900 truncate">
                        {product.title}
                      </h3>
                    </Link>
                    <span className="text-sm font-medium text-neutral-700">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="mt-4 w-full cursor-pointer rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold transition hover:bg-neutral-900 hover:text-white text-black"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}