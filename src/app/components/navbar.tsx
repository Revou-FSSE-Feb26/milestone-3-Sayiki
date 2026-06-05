"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function navbar() {
  const { totalCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="flex flex-row p-4 text-stone-900 justify-between">
        <Link href="/" className="font-bold text-yellow-500 text-xl">
          RevoShop
        </Link>
        <div>
          <ul className="flex flex-row items-center gap-4">
            <li>
              <Link href="/browse" className="hover:text-stone-700">
                Browse
              </Link>
            </li>
            <li>
              <Link href="/cart" className="flex items-center gap-2">
                <Image
                  src="/assets/cart.webp"
                  alt="Cart"
                  width={20}
                  height={20}
                  className="h-5 w-auto bg-white"
                />
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-stone-200 bg-white px-2 text-xs font-semibold text-stone-900">
                  {totalCount}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
