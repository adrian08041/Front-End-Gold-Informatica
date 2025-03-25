

import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
    },
  },
  });




  return (
    <div >
      <Image
        src="/assets/banner-ofertas-01.png"
        className="h-auto w-full px-5"
        sizes="100vw"
        height={0}
        width={0}
        alt="banner de ofertas"
      />
      <div className="mt-8 px-5">
        <Categories />

        
      </div>
      <div className="mt-8">
          <ProductList products={deals}/>
        </div>
    </div>
  );
}
