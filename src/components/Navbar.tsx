"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/cart-context";

const NAV_LINKS = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=unisex" },
  { label: "Collections", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [openMobile, setOpenMobile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: session } = authClient.useSession();
  const handleSignOut = async () => {
    await authClient.signOut();
  };
  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b border-b-amber-50 shadow-md bg-white sticky top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="invert"
          />
        </Link>

        {/* MIDDLE - NAV LINKS (DESKTOP ONLY) */}
        <ul className="hidden md:flex items-center gap-8 mx-auto">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-base font-medium text-gray-800 hover:text-black"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="hidden md:block"
            >
              <Search className="size-5 text-gray-800 hover:text-black" />
            </button>

            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                className="absolute -left-40 top-1/2 -translate-y-1/2 w-40 rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:outline-none bg-white"
                autoFocus
              />
            )}
          </div>

          {/* CART */}
          <Link href="/cart" className="relative hidden md:block">
            <ShoppingBag className="size-5 text-gray-800 hover:text-black" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {totalItems}
            </span>
          </Link>

          {/* USER / AUTH */}
          {session ? (
            <div className="relative group hidden md:block">
              <Image
                src={session.user.image || "/user.png"}
                alt="user"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
              {/* Dropdown */}
              <div className="absolute right-0 mt-3 hidden group-hover:block bg-white shadow-md rounded-md w-40 py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Orders
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-base font-medium text-gray-800 hover:text-black py-2 px-3"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-base font-medium bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setOpenMobile((prev) => !prev)}
            className="md:hidden"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {openMobile && (
        <div className="md:hidden border-t bg-white shadow-inner">
          <ul className="px-4 py-4 space-y-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block text-sm font-medium text-gray-700"
                  onClick={() => setOpenMobile(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}

            {/* Mobile Search */}
            <div className="flex items-center gap-2 border rounded-md px-3 py-2">
              <Search className="size-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full text-sm outline-none"
              />
            </div>

            {/* Mobile Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
              onClick={() => setOpenMobile(false)}
            >
              <ShoppingBag className="size-5" />
              Cart ({totalItems})
            </Link>

            {/* Auth Mobile */}
            {session ? (
              <>
                <Link href="/profile" onClick={() => setOpenMobile(false)}>
                  Profile
                </Link>
                <Link href="/orders" onClick={() => setOpenMobile(false)}>
                  Orders
                </Link>
                <button className="text-left w-full">Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/sign-in" className="text-sm">
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-black text-white text-sm py-1 px-3 rounded-md text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
