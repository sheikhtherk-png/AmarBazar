import * as React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart, Home, Grid, UserCircle } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";

import { useCartStore } from "@/src/state/cart-store";

export const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container-custom py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Link to="/categories">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-6 w-6" />
                </Button>
              </Link>
            </div>
            <Link to="/" className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tighter text-primary">
                AMAR<span className="text-secondary">BAZAR</span>
              </span>
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className={cn(
              "flex w-full items-center rounded-full border bg-slate-50 px-4 py-1 transition-all duration-200",
              isSearchFocused ? "border-primary ring-2 ring-primary/10 bg-white" : "border-slate-200"
            )}>
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search for groceries, organic food, and more..."
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-400"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Button variant="primary" size="sm" className="rounded-full ml-2">
                Search
              </Button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-4">
            <Button variant="ghost" size="icon" className="relative hidden md:flex">
              <Heart className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                0
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => toggleCart(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <div className="md:hidden">
               <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Navbar = () => {
  const categories = [
    { name: "Organic Food", slug: "organic-food" },
    { name: "Grocery", slug: "grocery" },
    { name: "Health & Beauty", slug: "health-beauty" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Baby Care", slug: "baby-care" },
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" }
  ];

  return (
    <nav className="hidden md:block bg-white border-b border-slate-100 overflow-x-auto">
      <div className="container-custom">
        <ul className="flex items-center gap-8 py-3">
          <li className="group relative">
            <Link to="/categories" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              <Menu className="h-4 w-4" />
              All Categories
            </Link>
            {/* Mega Menu Placeholder */}
            <div className="absolute top-full left-0 w-[800px] bg-white border border-slate-100 shadow-xl rounded-b-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <h4 className="font-bold text-primary mb-4">Groceries</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/rice-flour">Rice & Flour</Link></li>
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/oil-spices">Oil & Spices</Link></li>
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/dal-lentils">Dal & Lentils</Link></li>
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/dry-fruits">Dry Fruits</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-4">Organic</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/honey-ghee">Honey & Ghee</Link></li>
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/organic-seeds">Organic Seeds</Link></li>
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/natural-oils">Natural Oils</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-4">Health</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/herbal-tea">Herbal Tea</Link></li>
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/supplements">Supplements</Link></li>
                    <li className="hover:text-secondary cursor-pointer"><Link to="/category/personal-care">Personal Care</Link></li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Special Offer</p>
                  <h5 className="text-lg font-bold text-slate-800 leading-tight mb-3">Get 20% Off on Organic Honey</h5>
                  <Link to="/category/organic-honey">
                    <Button variant="primary" size="sm">Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link to={`/category/${cat.slug}`} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors whitespace-nowrap">
                {cat.name}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <Link to="/categories?filter=offers" className="text-sm font-bold text-secondary hover:underline">
              Offers & Deals
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export const MobileBottomNav = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-2 z-50 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <Link to="/" className="flex flex-col items-center gap-1 text-primary">
        <Home className="h-5 w-5" />
        <span className="text-[10px] font-bold">Home</span>
      </Link>
      <Link to="/categories" className="flex flex-col items-center gap-1 text-slate-400">
        <Grid className="h-5 w-5" />
        <span className="text-[10px] font-medium">Categories</span>
      </Link>
      <button 
        onClick={() => toggleCart(true)}
        className="flex flex-col items-center gap-1 text-slate-400 relative"
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="text-[10px] font-medium">Cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </button>
      <Link to="/account" className="flex flex-col items-center gap-1 text-slate-400">
        <UserCircle className="h-5 w-5" />
        <span className="text-[10px] font-medium">Account</span>
      </Link>
    </div>
  );
};
