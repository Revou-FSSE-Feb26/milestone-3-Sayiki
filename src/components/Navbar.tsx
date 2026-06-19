"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../app/context/CartContext";
import { useAuth } from "../app/context/AuthContext";

export default function navbar() {
  const { totalCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Wait until component is mounted on client to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

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
                  className="h-5 w-5 object-contain"
                />
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-stone-200 bg-white px-2 text-xs font-semibold text-stone-900">
                  {isAuthenticated ? totalCount : 0}
                </span>
              </Link>
            </li>
            
            {/* Profile Dropdown - Only render after mount to prevent hydration mismatch */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:text-stone-700 focus:outline-none"
              >
                {/* Profile Icon */}
                <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {!isMounted ? "?" : (isAuthenticated ? user?.username.charAt(0).toUpperCase() : "?")}
                  </span>
                </div>
                
                {/* Dropdown Arrow */}
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMounted && isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={closeDropdown}
                  ></div>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 z-20">
                    {isAuthenticated ? (
                      <>
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-stone-200">
                          <p className="text-sm font-semibold text-stone-900">
                            {user?.username}
                          </p>
                          <p className="text-xs text-stone-500">
                            {user?.email}
                          </p>
                        </div>
                        
                        {/* Admin Dashboard Link - Only for mor_2314 */}
                        {user?.username === 'mor_2314' && (
                          <Link
                            href="/admin"
                            onClick={closeDropdown}
                            className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors border-b border-stone-200"
                          >
                            <div className="flex items-center gap-2">
                              {/* Admin Icon */}
                              <svg 
                                className="w-4 h-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Admin Dashboard
                            </div>
                          </Link>
                        )}
                        
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Login Link */}
                        <Link
                          href="/login"
                          onClick={closeDropdown}
                          className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                        >
                          Login
                        </Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
