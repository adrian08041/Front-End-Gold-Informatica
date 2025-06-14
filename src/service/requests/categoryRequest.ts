import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { CategoriesResponse, CreateCategoryRequest } from "../types/category";

interface FindCategoryParams {
  page?: number;
  perPage?: number;
  name?: string;
}

export function findAllCategory(params: FindCategoryParams) {
  return api.get<ApiResult<CategoriesResponse[]>>("/category", {
    params,
  });
}

export function createCategory(category: CreateCategoryRequest) {
  return api.post<ApiResult<CategoriesResponse>>("/category", category);
}

export function findOneCategoryBySlug(slug: string) {
  return api.get<ApiResult<CategoriesResponse>>(`/category/slug/${slug}`);
}
