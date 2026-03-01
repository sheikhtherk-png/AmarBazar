import * as React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/src/components/layout/Layout";
import { ProductCard, ProductSkeleton } from "@/src/components/ProductCard";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/src/lib/mockData";
import { Filter, ChevronDown, LayoutGrid, List, SlidersHorizontal, X, Star } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const category = MOCK_CATEGORIES.find(c => c.slug === slug) || { name: "All Products", slug: "all" };

  // Filter states
  const sortBy = searchParams.get("sort") || "newest";
  const minPrice = Number(searchParams.get("min")) || 0;
  const maxPrice = Number(searchParams.get("max")) || 5000;

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug, searchParams]);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = slug ? p.categories.some(cat => cat.toLowerCase().includes(slug.replace('-', ' '))) : true;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // newest/default
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  const handlePriceChange = (min: number, max: number) => {
    searchParams.set("min", min.toString());
    searchParams.set("max", max.toString());
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container-custom py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{category.name}</h1>
              <p className="text-slate-500 mt-1">Showing {sortedProducts.length} products</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-xl p-1 mr-2">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    viewMode === "grid" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    viewMode === "list" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <Button 
                variant="outline" 
                className="md:hidden rounded-xl border-slate-200"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
              <div className="relative flex-1 md:flex-none">
                <select 
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full md:w-48 appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        <div className="flex gap-10">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 shrink-0 space-y-8">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                    value={minPrice || ""}
                    onChange={(e) => handlePriceChange(Number(e.target.value), maxPrice)}
                  />
                  <span className="text-slate-300">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                    value={maxPrice || ""}
                    onChange={(e) => handlePriceChange(minPrice, Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[500, 1000, 2000].map(price => (
                    <button 
                      key={price}
                      onClick={() => handlePriceChange(0, price)}
                      className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md hover:bg-primary hover:text-white transition-colors"
                    >
                      Under ৳{price}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="h-5 w-5 rounded border border-slate-300 flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="h-2.5 w-2.5 rounded-sm bg-primary opacity-0 group-hover:opacity-20" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">In Stock</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="h-5 w-5 rounded border border-slate-300 flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="h-2.5 w-2.5 rounded-sm bg-primary opacity-0 group-hover:opacity-20" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">On Sale</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2].map(star => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer group">
                    <div className="h-5 w-5 rounded border border-slate-300 flex items-center justify-center group-hover:border-primary transition-colors">
                      <div className="h-2.5 w-2.5 rounded-sm bg-primary opacity-0 group-hover:opacity-20" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium flex items-center gap-1">
                      {star}+ Stars
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button 
                variant="outline" 
                className="w-full rounded-xl border-slate-200 text-slate-500 h-11"
                onClick={() => setSearchParams({})}
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className={cn(
              "grid gap-4 md:gap-6",
              viewMode === "grid" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
            )}>
              {isLoading 
                ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
                : sortedProducts.length > 0 
                  ? sortedProducts.map((product) => (
                      <div key={product.id} className={cn(viewMode === "list" && "flex flex-col md:flex-row gap-6 bg-white p-4 rounded-2xl border border-slate-100")}>
                        {viewMode === "list" ? (
                          <>
                            <div className="w-full md:w-48 aspect-square shrink-0 overflow-hidden rounded-xl bg-slate-50">
                              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-2">
                              <div>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{product.categories[0]}</p>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-slate-200")} />
                                    ))}
                                  </div>
                                  <span className="text-xs text-slate-400">({product.reviewCount} Reviews)</span>
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-2">Premium quality {product.name} sourced directly from trusted producers. 100% pure and natural.</p>
                              </div>
                              <div className="flex items-center justify-between mt-6">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-2xl font-extrabold text-slate-900">৳{product.price}</span>
                                  {product.regularPrice && <span className="text-sm text-slate-400 line-through">৳{product.regularPrice}</span>}
                                </div>
                                <Button variant="primary" className="rounded-xl px-6">Add to Cart</Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <ProductCard product={product} />
                        )}
                      </div>
                    ))
                  : (
                    <div className="col-span-full py-20 text-center">
                      <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <SlidersHorizontal className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                      <p className="text-slate-500 mt-2">Try adjusting your filters or search criteria</p>
                      <Button 
                        variant="primary" 
                        className="mt-6 rounded-xl"
                        onClick={() => setSearchParams({})}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )
              }
            </div>

            {/* Pagination Placeholder */}
            {!isLoading && sortedProducts.length > 0 && (
              <div className="mt-16 flex justify-center">
                <Button variant="outline" className="rounded-xl border-slate-200 px-10 h-12 font-bold text-slate-600 hover:bg-slate-50">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileFilterOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Same filter content as desktop sidebar */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary" 
                    value={minPrice || ""}
                    onChange={(e) => handlePriceChange(Number(e.target.value), maxPrice)}
                  />
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary" 
                    value={maxPrice || ""}
                    onChange={(e) => handlePriceChange(minPrice, Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Availability</h3>
                <div className="space-y-3">
                  {["In Stock", "On Sale"].map(label => (
                    <label key={label} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-6 w-6 rounded border border-slate-300 flex items-center justify-center group-hover:border-primary transition-colors">
                        <div className="h-3 w-3 rounded-sm bg-primary opacity-0 group-hover:opacity-20" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <Button variant="outline" className="rounded-xl" onClick={() => setSearchParams({})}>Reset</Button>
              <Button variant="primary" className="rounded-xl" onClick={() => setIsMobileFilterOpen(false)}>Apply</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
