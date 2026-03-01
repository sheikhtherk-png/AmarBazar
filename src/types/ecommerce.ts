export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  regularPrice?: number;
  image: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  isFlashSale?: boolean;
  discountPercentage?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}
