import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { ProductFindAllRequest } from "../types/product";
import { useQuery } from "@tanstack/react-query";
import { ProductRequest } from "../requests";

export function useProductQueryKey(
  productFindAllRequest: ProductFindAllRequest,
) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.PRODUCTS_FIND_ALL,
      productFindAllRequest.name,
      productFindAllRequest.page,
      productFindAllRequest.perPage,
    ],
    queryFn: async () => {
      const { data } = await ProductRequest.findAllProducts(
        productFindAllRequest.page,
        productFindAllRequest.perPage,
        productFindAllRequest.name,
      );
      return data;
    },
  });
}

export function useProductOneBySlugQueryKey(slug: string) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.PRODUCTS_FIND_ONE, slug],
    queryFn: async () => {
      const { data } = await ProductRequest.findOneProductsBySlug(slug);
      return data;
    },
  });
}
