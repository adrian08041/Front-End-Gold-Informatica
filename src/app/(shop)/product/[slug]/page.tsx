"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProductImages } from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";
import { ProductQuery } from "@/service/hooks";

interface ProductDetailsPageProps {
  params: { slug: string };
}

const ProductDetailsPage = ({ params: { slug } }: ProductDetailsPageProps) => {
  const { data: product, isLoading } =
    ProductQuery.useProductOneBySlugQueryKey(slug);

  // Skeleton global enquanto carrega
  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
        {/* Imagens */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-9 lg:px-5">
          <div className="flex flex-col lg:min-h-full lg:w-3/5">
            <Skeleton className="h-[380px] w-full rounded-lg bg-gray-200" />
            <div className="mt-8 grid grid-cols-4 gap-4 px-5 lg:px-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[80px] w-full rounded-lg bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col space-y-4 px-5 text-white lg:w-[40%] lg:rounded-lg lg:bg-backgroundItems lg:p-10">
            <Skeleton className="h-8 w-2/3 rounded-full" />
            <Skeleton className="h-10 w-1/3 rounded-full" />
            <Skeleton className="h-6 w-1/4 rounded-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-12 rounded" />
              <Skeleton className="h-8 w-12 rounded" />
            </div>
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>

        {/* Recomendados */}
        <div>
          <SectionTitle>
            <Skeleton className="h-6 w-40 rounded-full" />
          </SectionTitle>
          <ProductList products={[]} isLoading />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  // Conteúdo real
  return (
    <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-9 lg:px-5">
        <ProductImages
          imageUrls={product.data.imageUrls}
          name={product.data.name}
        />
        <ProductInfo
          product={{
            ...product.data,
            totalPrice: computeProductTotalPrice(product.data),
          }}
        />
      </div>
      <div>
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductList
          products={product.data.category.products}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
