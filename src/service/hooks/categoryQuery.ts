import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryRequest } from "../requests";
import {
  CategoryFindAllRequest,
  CreateCategoryRequest,
} from "../types/category";

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
      const { data } = await CategoryRequest.findAllCategory({
        page: categoryFindAllRequest.page,
        perPage: categoryFindAllRequest.perPage,
        name: categoryFindAllRequest.name,
      });
      return data;
    },
  });
}
export function useCategoryOneBySlugQueryKey(slug: string) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.CATEGORIES_FIND_ALL, slug],
    queryFn: async () => {
      const { data } = await CategoryRequest.findOneCategoryBySlug(slug);
      return data;
    },
  });
}

export function useCreateCategory() {
  const mutation = useMutation({
    mutationFn: (category: CreateCategoryRequest) =>
      CategoryRequest.createCategory(category),
  });
  return mutation;
}
