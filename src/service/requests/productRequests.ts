import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { CreateProductRequest, ProductResponse } from "../types";

export function findAllProducts(page: number, perPage: number, name?: string) {
  return api.get<ApiResult<ProductResponse[]>>("/product", {
    params: { page, perPage, name },
  });
}

export function findOneProductsBySlug(slug: string) {
  return api.get<ApiResult<ProductResponse>>(`/product/slug/${slug}`);
}

export function createProduct(product: CreateProductRequest) {
  return api.post("/product", product);
}

export function deleteProduct(id: string) {
  return api.delete(`/product/${id}`);
}
