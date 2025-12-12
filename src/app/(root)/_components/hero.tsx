import Link from "next/link";

function Hero() {
  return (
    <div
      className="relative w-full min-h-[500px] sm:min-h-[540px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/nike-hero-banner.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Tailored for Ultimate Comfort
        </h1>
        <p className="text-neutral-100 font-semibold text-base sm:text-xl">
          The 24.7 collection is made to move all day
        </p>
        <Link
          href="/products"
          className="py-3 px-6 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}

export default Hero;
