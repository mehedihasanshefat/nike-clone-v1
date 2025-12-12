"use client";

import Image from "next/image";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  };
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <article
      aria-labelledby={`cart-item-${item.id}`}
      className="w-full flex flex-col md:flex-row items-stretch gap-4 py-5 px-4 md:px-6 bg-white rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
    >
      {/* IMAGE */}
      <div className="flex-shrink-0">
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 6rem, 8rem"
            className="object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3
            id={`cart-item-${item.id}`}
            className="text-sm md:text-base font-semibold text-black truncate"
          >
            {item.name}
          </h3>

          <p className="mt-2 text-sm text-slate-600 ">
            Unit price{" "}
            <span className="font-medium text-slate-900 ">
              ${item.price.toFixed(2)}
            </span>
          </p>
        </div>

        {/* MOBILE: show line total under info */}
        <div className="mt-4 md:hidden flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-semibold text-slate-900 dark:text-white">
              ${lineTotal}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <QuantityControls
              quantity={item.quantity}
              onDecrease={() =>
                item.quantity > 1 && onQuantityChange(item.quantity - 1)
              }
              onIncrease={() => onQuantityChange(item.quantity + 1)}
            />
          </div>
        </div>

        {/* DESKTOP ROW: quantity + remove + line total */}
        <div className="hidden md:flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <QuantityControls
              quantity={item.quantity}
              onDecrease={() =>
                item.quantity > 1 && onQuantityChange(item.quantity - 1)
              }
              onIncrease={() => onQuantityChange(item.quantity + 1)}
            />

            <button
              onClick={onRemove}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-semibold text-slate-900 dark:text-white text-lg">
              ${lineTotal}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Quantity controls as small subcomponent ---------- */

function QuantityControls({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-md p-1.5 border border-slate-100 dark:border-slate-800">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="h-8 w-8 rounded-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="2" strokeLinecap="round" d="M20 12H4" />
        </svg>
      </button>

      <div className="min-w-[36px] text-center text-sm font-medium text-slate-900 dark:text-white">
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="h-8 w-8 rounded-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="2" strokeLinecap="round" d="M12 4v16M20 12H4" />
        </svg>
      </button>
    </div>
  );
}
