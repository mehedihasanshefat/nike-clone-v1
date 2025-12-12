"use client";

import { useCart } from "@/context/cart-context";
import { CartItem } from "./cart-item";
import Link from "next/link";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice } =
    useCart();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Your cart is empty.
          </p>
          <Link
            href="/products"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-black/80 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ITEMS SECTION */}
          <div className="lg:col-span-2">
            <div className="divide-y flex flex-col gap-4 divide-slate-200 dark:divide-slate-700">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={(qty) => {
                    if (qty <= 0) return;
                    qty > item.quantity
                      ? increaseQty(item.id)
                      : decreaseQty(item.id);
                  }}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>
          </div>

          {/* SUMMARY SECTION */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Subtotal
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Shipping
                </span>
                <span className="text-slate-900 dark:text-white font-medium">
                  Calculated at checkout
                </span>
              </div>

              <div className="border-t border-slate-300 dark:border-slate-700 pt-4 flex justify-between">
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-black/80 transition">
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block text-center text-sm mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
