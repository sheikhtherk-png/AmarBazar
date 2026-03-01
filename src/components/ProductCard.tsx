import * as React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/src/types/ecommerce";
import { Button } from "./ui/Button";
import { cn } from "@/src/lib/utils";

import { useCartStore } from "@/src/state/cart-store";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-3 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          {product.discountPercentage && (
            <div className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-lg">
              -{product.discountPercentage}%
            </div>
          )}
          <button className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-slate-400 hover:text-secondary opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>
      
      <div className="space-y-1">
        <Link to={`/category/${product.categories[0].toLowerCase().replace(' ', '-')}`}>
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">
            {product.categories[0]}
          </p>
        </Link>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-slate-200"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-slate-900">৳{product.price}</span>
            {product.regularPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">৳{product.regularPrice}</span>
            )}
          </div>
          <Button 
            variant="primary" 
            size="icon" 
            className="h-9 w-9 rounded-xl shadow-lg shadow-primary/20"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 p-3 animate-pulse">
    <div className="aspect-square rounded-xl bg-slate-100 mb-3" />
    <div className="h-3 w-1/3 bg-slate-100 rounded mb-2" />
    <div className="h-4 w-full bg-slate-100 rounded mb-1" />
    <div className="h-4 w-2/3 bg-slate-100 rounded mb-3" />
    <div className="flex items-center justify-between">
      <div className="h-6 w-1/2 bg-slate-100 rounded" />
      <div className="h-9 w-9 bg-slate-100 rounded-xl" />
    </div>
  </div>
);
