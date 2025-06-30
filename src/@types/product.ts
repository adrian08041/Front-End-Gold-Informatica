import { CategoryResponse } from "@/service/types";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrls: string[];
  price: number;
  discountPercentage?: number;
  category: CategoryResponse; 
};
