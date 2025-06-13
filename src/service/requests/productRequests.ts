import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { ProductResponse } from "../types";

export function findAllProducts(page: number, perPage: number, name?: string) {
  return api.get<ApiResult<ProductResponse[]>>("/product", {
    params: { page, perPage, name },
  });
}

export function findOneProductsBySlug(slug: string) {
  return api.get<ApiResult<ProductResponse>>(`/product/slug/${slug}`);
}
