
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: { slug: "keyboards" },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: { slug: "mouses" },
    },
  });
  return (
    <div>
      <PromoBanner
        src="/assets/banner-ofertas-01.png"
        alt="banner de ofertas"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
        <SectionTitle> Ofertas </SectionTitle>
        <ProductList products={deals} />
      </div>
      <PromoBanner
        src="/assets/banner-mouses.png"
        alt="até 50% de desconto em mouses"
      />
      <div className="mt-8">
        <SectionTitle>teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
      <div className="mt-8">
        <PromoBanner
          src="/assets/banner-fones.png"
          alt="até 50% de desconto em mouses"
        />
      </div>
      <div className="mt-8">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
