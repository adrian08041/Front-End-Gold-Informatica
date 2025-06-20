"use client";
import Categories from "./components/categories";
// import { prismaClient } from "@/lib/prisma";

import PromoBanner from "./components/promo-banner";
import SectionTitle from "@/components/ui/section-title";
import ProductList from "@/components/ui/product-list";
import Link from "next/link";
import { ProductQuery } from "@/service/hooks";


export default function Home() {
  const { data: response, isLoading } = ProductQuery.useProductQueryKey({
    page: 0,
    perPage: 0,
    name: "",
  });

  const mouses = response?.data.filter(
    (product) => product.category.name === "Mouses",
  );

  const keyboards = response?.data.filter(
    (product) => product.category.name === "Teclados",
  );

  const deals = response?.data.filter(
    (product) => product.discountPercentage > 0,
  );

  return (
    <>
      <div className="mx-auto max-w-[1920px]">
        <Link href={"/deals"}>
          <PromoBanner
            src="/assets/banner-ofertas-01.png"
            alt="banner de ofertas"
          />
        </Link>

        <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
          <div className="mt-8 px-5 lg:mt-2">
            <Categories />
          </div>

          <div className="flex flex-col gap-3 lg:gap-5">
            <SectionTitle> Ofertas </SectionTitle>
            <ProductList products={deals} isLoading={isLoading} />
          </div>

          <div className="flex flex-col lg:flex-row">
            <Link href="/category/mouses" className="flex flex-1">
              <PromoBanner
                src="/assets/banner-mouses.png"
                alt="Até 55% de desconto em mouses!"
                className="w-0 flex-1 px-5"
              />
            </Link>

            <Link href="/category/headphones" className="flex flex-1">
              <PromoBanner
                src="/assets/banner-fones.png"
                alt="Até 55% de desconto em fones!"
                className="hidden w-0 flex-1 lg:block"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-3 lg:gap-5">
            <SectionTitle>teclados</SectionTitle>
            <ProductList products={keyboards} isLoading={isLoading} />
          </div>

          <div>
            <Link href="/category/headphones">
              <PromoBanner
                src="/assets/banner-fones.png"
                alt="Até 55% de desconto em fones!"
                className="px-5 lg:hidden"
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <PromoBanner
              src="/assets/banner-fretegratis.png"
              alt="frete grátis "
            />
          </div>

          <div className="block lg:hidden">
            <PromoBanner
              src="/assets/banner-fones.png"
              alt="Até 55% de desconto em fones"
            />
          </div>

          <div className="mt-8">
            <SectionTitle>Mouses</SectionTitle>
            <ProductList products={mouses} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}
