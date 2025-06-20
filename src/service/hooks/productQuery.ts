import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { CreateProductRequest, ProductFindAllRequest } from "../types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export function useCreateProduct() {
  const mutation = useMutation({
    mutationFn: (product: CreateProductRequest) =>
      ProductRequest.createProduct(product),
  });
  return mutation;
}

export function useDeleteProduct() {
  const mutation = useMutation({
    mutationFn: (id: string) => ProductRequest.deleteProduct(id),
  });
  return mutation;
}
