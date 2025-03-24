"use client";

import Image from "next/image";
import Categories from "./components/categories";

export default function Home() {
  return (
    <div className="p-4">
      <Image
        src="/assets/banner-ofertas-01.png"
        className="h-auto w-full"
        sizes="100vw"
        height={0}
        width={0}
        alt="banner de ofertas"
      />
      <div className="mt-8">
        <Categories />
      </div>
    </div>
  );
}
