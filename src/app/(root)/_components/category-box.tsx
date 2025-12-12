import Image from "next/image";
import Link from "next/link";

function CategoryBox({
  name,
  url,
  image,
}: {
  name: string;
  url: string;
  image: string;
}) {
  return (
    <div className="relative w-full max-w-sm md:max-w-md h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Name Link */}
      <Link
        href={url}
        className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl hover:text-yellow-300 transition z-10"
      >
        {name}
      </Link>
    </div>
  );
}

export default CategoryBox;
