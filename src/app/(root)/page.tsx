import React from "react";
import { Card } from "@/components";
import { getCurrentUser } from "@/lib/auth/actions";
import { getAllProducts } from "@/lib/actions/product";
import { parseFilterParams } from "@/lib/utils/query";
import Hero from "./_components/hero";
import CategoryBox from "./_components/category-box";

// const products = [
//   {
//     id: 1,
//     title: "Air Max Pulse",
//     subtitle: "Men's Shoes",
//     meta: "6 Colour",
//     price: 149.99,
//     imageSrc: "/shoes/shoe-1.jpg",
//     badge: { label: "New", tone: "orange" as const },
//   },
//   {
//     id: 2,
//     title: "Air Zoom Pegasus",
//     subtitle: "Men's Shoes",
//     meta: "4 Colour",
//     price: 129.99,
//     imageSrc: "/shoes/shoe-2.webp",
//     badge: { label: "Hot", tone: "red" as const },
//   },
//   {
//     id: 3,
//     title: "InfinityRN 4",
//     subtitle: "Men's Shoes",
//     meta: "6 Colour",
//     price: 159.99,
//     imageSrc: "/shoes/shoe-3.webp",
//     badge: { label: "Trending", tone: "green" as const },
//   },
//   {
//     id: 4,
//     title: "Metcon 9",
//     subtitle: "Men's Shoes",
//     meta: "3 Colour",
//     price: 139.99,
//     imageSrc: "/shoes/shoe-4.webp",
//   },
// ];
type SearchParams = Record<string, string | string[] | undefined>;

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const user = await getCurrentUser();
  const sp = await searchParams;

  const parsed = parseFilterParams(sp);
  const { products, totalCount } = await getAllProducts(parsed);
  const homeProducts = products.slice(0, 8);

  console.log("USER:", user);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero */}
      <section>
        <Hero />
      </section>

      {/* Category */}
      <section className="">
        <h3 className="my-6 text-heading-3 font-semibold text-center">
          Our Categories
        </h3>
        <div className="flex justify-center items-center gap-4">
          <CategoryBox
            name="Men"
            image="/category-men.avif"
            url="/products?gender=men"
          />
          <CategoryBox
            name="Women"
            image="/category-women.avif"
            url="/products?gender=women"
          />
          <CategoryBox
            name="Unisex"
            image="/category-kids.avif"
            url="/products?gender=kids"
          />
        </div>
      </section>

      {/* Products */}
      <section className="pb-12">
        <h2 className="mb-6 text-heading-3 text-dark-900">Latest shoes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Card
              key={p.id}
              title={p.name}
              subtitle={p.subtitle ?? undefined}
              imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
              price={
                p.minPrice !== null ? `$${p.minPrice.toFixed(2)}` : undefined
              }
              href={`/products/${p.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
