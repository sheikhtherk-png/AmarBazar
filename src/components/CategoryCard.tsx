import * as React from "react";
import { Link } from "react-router-dom";
import { Category } from "@/src/types/ecommerce";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.slug}`} className="group block text-center">
      <div className="relative aspect-square overflow-hidden rounded-full border-2 border-slate-100 p-2 transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 mb-3">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      <h3 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-[10px] text-slate-400 font-medium">{category.productCount} Products</p>
    </Link>
  );
};
