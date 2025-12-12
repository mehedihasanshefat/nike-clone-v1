"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

interface TProduct {
  id: string;
  name: string;
  price: number;
  //   image: string;
}

function AddToCartButton({ product }: { product: TProduct }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => {
        console.log(product.price);
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          //   image: product.image,
        });
      }}
      className="flex items-center justify-center gap-2 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
    >
      <ShoppingBag className="h-5 w-5" />
      Add to Bag
    </button>
  );
}

export default AddToCartButton;
