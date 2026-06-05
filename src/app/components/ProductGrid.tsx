import Image from "next/image";
import Link from "next/link";

import { products } from "../data/products";

export default function ProductGrid() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 mt-16 mb-10">
      <div className="flex items-end justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900">
          Featured Products
        </h2>
        <span className="text-sm text-neutral-500">Curated picks</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {products.slice(0, 6).map((product) => (
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
                  alt={product.name}
                  width={200}
                  height={200}
                  className="h-32 w-auto object-contain"
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col gap-1 px-4 pb-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-semibold tracking-tight truncate">
                  {product.name}
                </h3>
              </Link>
              <span className="text-sm font-medium text-neutral-700">
                {product.priceLabel}
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
