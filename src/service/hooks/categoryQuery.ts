import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { CreateProductRequest, ProductFindAllRequest } from "../types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryRequest, ProductRequest } from "../requests";
import { CategoryFindAllRequest } from "../types/category";

export function useCategoryQuery(
  categoryFindAllRequest: CategoryFindAllRequest,
) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.CATEGORIES_FIND_ALL,
      categoryFindAllRequest.name,
      categoryFindAllRequest.page,
      categoryFindAllRequest.perPage,
    ],
    queryFn: async () => {
      const { data } = await CategoryRequest.findAllCategory(
        categoryFindAllRequest.page,
        categoryFindAllRequest.perPage,
        categoryFindAllRequest.name,
      );
      return data;
    },
  });
}
