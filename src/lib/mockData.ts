import { Product, Category } from "../types/ecommerce";

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Organic Honey", slug: "organic-honey", image: "https://picsum.photos/seed/honey/300/300", productCount: 12 },
  { id: "2", name: "Pure Ghee", slug: "pure-ghee", image: "https://picsum.photos/seed/ghee/300/300", productCount: 8 },
  { id: "3", name: "Dry Fruits", slug: "dry-fruits", image: "https://picsum.photos/seed/dryfruits/300/300", productCount: 24 },
  { id: "4", name: "Organic Oil", slug: "organic-oil", image: "https://picsum.photos/seed/oil/300/300", productCount: 15 },
  { id: "5", name: "Spices", slug: "spices", image: "https://picsum.photos/seed/spices/300/300", productCount: 45 },
  { id: "6", name: "Rice & Pulses", slug: "rice-pulses", image: "https://picsum.photos/seed/rice/300/300", productCount: 18 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Premium Sundarban Multifloral Honey",
    slug: "sundarban-honey",
    price: 450,
    regularPrice: 550,
    image: "https://picsum.photos/seed/honey1/400/400",
    categories: ["Organic Honey"],
    rating: 4.8,
    reviewCount: 124,
    isFlashSale: true,
    discountPercentage: 18
  },
  {
    id: "p2",
    name: "Pure Wood Pressed Mustard Oil",
    slug: "mustard-oil",
    price: 320,
    regularPrice: 350,
    image: "https://picsum.photos/seed/oil1/400/400",
    categories: ["Organic Oil"],
    rating: 4.9,
    reviewCount: 89,
    isFlashSale: true,
    discountPercentage: 9
  },
  {
    id: "p3",
    name: "Premium Quality Cashew Nuts",
    slug: "cashew-nuts",
    price: 850,
    image: "https://picsum.photos/seed/cashew/400/400",
    categories: ["Dry Fruits"],
    rating: 4.7,
    reviewCount: 56
  },
  {
    id: "p4",
    name: "Handmade Cow Ghee (Premium)",
    slug: "cow-ghee",
    price: 1200,
    regularPrice: 1350,
    image: "https://picsum.photos/seed/ghee1/400/400",
    categories: ["Pure Ghee"],
    rating: 5.0,
    reviewCount: 210,
    isFlashSale: true,
    discountPercentage: 11
  },
  {
    id: "p5",
    name: "Organic Chia Seeds",
    slug: "chia-seeds",
    price: 250,
    image: "https://picsum.photos/seed/chia/400/400",
    categories: ["Organic Food"],
    rating: 4.6,
    reviewCount: 42
  },
  {
    id: "p6",
    name: "Premium Black Cumin Oil",
    slug: "black-cumin-oil",
    price: 480,
    regularPrice: 520,
    image: "https://picsum.photos/seed/cumin/400/400",
    categories: ["Organic Oil"],
    rating: 4.8,
    reviewCount: 67
  },
  {
    id: "p7",
    name: "Natural Saffron (Grade A)",
    slug: "saffron",
    price: 1500,
    image: "https://picsum.photos/seed/saffron/400/400",
    categories: ["Spices"],
    rating: 4.9,
    reviewCount: 34
  },
  {
    id: "p8",
    name: "Organic Turmeric Powder",
    slug: "turmeric-powder",
    price: 180,
    image: "https://picsum.photos/seed/turmeric/400/400",
    categories: ["Spices"],
    rating: 4.7,
    reviewCount: 112
  }
];
