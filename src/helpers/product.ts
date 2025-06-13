import { ProductResponse } from "@/service/types";
import { Product } from "@prisma/client";

export interface ProductTotalPrice extends ProductResponse {
  totalPrice: number;
}

export const computeProduct = (product: ProductResponse): ProductTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    };
  }

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return {
    ...product,
    totalPrice: Number(product.basePrice) - totalDiscount,
  };
};

export const computeProductTotalPrice = (
  product: Pick<ProductResponse, "discountPercentage" | "basePrice">,
): number => {
  if (product.discountPercentage === 0) return Number(product.basePrice);

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return Number(product.basePrice) - totalDiscount;
};
