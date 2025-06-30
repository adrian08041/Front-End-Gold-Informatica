export type CategoryResponse = {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  imageUrl: string;
  products?: ProductResponse[];
};

export type ProductResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  categoryId: string;
  category: CategoryResponse;
  discountPercentage: number;
  imageUrls: string[];
};

export type ProductFindAllRequest = {
  page: number;
  perPage: number;
  name?: string;
};

export type CreateProductRequest = {
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  categoryId: string;
  discountPercentage?: number;
  imageUrls?: string[];
};
