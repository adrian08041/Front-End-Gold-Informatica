import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { CreateProductRequest, ProductResponse } from "../types";
import { CategoriesResponse } from "../types/category";

export function findAllCategory(
  page?: number,
  perPage?: number,
  name?: string,
) {
  return api.get<ApiResult<CategoriesResponse[]>>("/category", {
    params: { page, perPage, name },
  });
}
