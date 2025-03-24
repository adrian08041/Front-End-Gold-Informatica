"use client";


import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <Image src="/assets/banner-ofertas-01.png"
      className="w-full h-auto"
      sizes="100vw"
      height={0}
      width={0}
      alt="banner de ofertas"
      
      />
    </div>
  );
}
