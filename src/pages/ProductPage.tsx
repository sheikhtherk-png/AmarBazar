import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/src/components/layout/Layout";
import { ProductCard, ProductSkeleton } from "@/src/components/ProductCard";
import { MOCK_PRODUCTS } from "@/src/lib/mockData";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Info, 
  Plus, 
  Minus,
  ChevronRight,
  Share2
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/src/state/cart-store";

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCartStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState("description");
  const [selectedImage, setSelectedImage] = React.useState(0);

  const product = MOCK_PRODUCTS.find(p => p.slug === slug);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!product && !isLoading) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 block">Return to Home</Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== product?.id).slice(0, 4);

  const images = [
    product?.image,
    "https://picsum.photos/seed/product2/800/800",
    "https://picsum.photos/seed/product3/800/800",
    "https://picsum.photos/seed/product4/800/800",
  ].filter(Boolean) as string[];

  return (
    <Layout>
      {/* SEO Schema */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.image,
            "description": `Premium quality ${product.name} available at AmarBazar.`,
            "brand": {
              "@type": "Brand",
              "name": "AmarBazar"
            },
            "offers": {
              "@type": "Offer",
              "url": window.location.href,
              "priceCurrency": "BDT",
              "price": product.price,
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      )}

      <div className="container-custom py-6 md:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/categories" className="hover:text-primary">Groceries</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 truncate">{product?.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 group">
              {isLoading ? (
                <div className="w-full h-full animate-pulse bg-slate-100" />
              ) : (
                <img 
                  src={images[selectedImage]} 
                  alt={product?.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
                  referrerPolicy="no-referrer"
                />
              )}
              {product?.discountPercentage && (
                <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-secondary/20">
                  Save {product.discountPercentage}%
                </div>
              )}
              <button className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-slate-400 hover:text-secondary shadow-sm transition-all">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === i ? "border-primary shadow-md shadow-primary/10" : "border-transparent hover:border-slate-200"
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info & Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                  In Stock
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-xs font-bold text-slate-900">{product?.rating}</span>
                  <span className="text-xs text-slate-400">({product?.reviewCount} Reviews)</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                {product?.name}
              </h1>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-slate-900">৳{product?.price}</span>
                {product?.regularPrice && (
                  <span className="text-lg text-slate-400 line-through font-medium">৳{product.regularPrice}</span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Quantity</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-8 w-8 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    variant="primary" 
                    className="h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                  </Button>
                  <Button 
                    variant="accent" 
                    className="h-14 rounded-2xl text-base font-bold shadow-xl shadow-secondary/20"
                    onClick={handleAddToCart}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Delivery within <strong>2-24 hours</strong> in Dhaka</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Cash on Delivery Available</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>7 Days Easy Return Policy</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <Share2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-slate-700">Share this product</span>
              </div>
              <div className="flex gap-2">
                {/* Social icons placeholder */}
                <div className="h-8 w-8 rounded-lg bg-blue-500" />
                <div className="h-8 w-8 rounded-lg bg-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-slate-100 gap-8 overflow-x-auto whitespace-nowrap">
            {[
              { id: "description", label: "Description" },
              { id: "specifications", label: "Specifications" },
              { id: "reviews", label: "Reviews" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-4 text-sm font-bold transition-all relative",
                  activeTab === tab.id ? "text-primary" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  Our {product?.name} is sourced directly from the most trusted farmers and producers. We ensure that every batch undergoes rigorous quality checks to maintain 100% purity and freshness. This premium product is packed with natural nutrients and is free from any artificial preservatives or additives.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>100% Pure and Natural</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Sourced directly from producers</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>No artificial colors or preservatives</span>
                  </li>
                </ul>
              </div>
            )}
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Weight", value: "500g / 1kg" },
                  { label: "Origin", value: "Bangladesh" },
                  { label: "Shelf Life", value: "12 Months" },
                  { label: "Storage", value: "Cool & Dry Place" },
                  { label: "Purity", value: "100% Guaranteed" }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-500 font-medium">{spec.label}</span>
                    <span className="text-sm text-slate-900 font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-extrabold text-slate-900 mb-2">{product?.rating}</div>
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <div className="text-sm text-slate-500 font-medium">{product?.reviewCount} Global Ratings</div>
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-600 w-4">{star}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent" 
                            style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%` }} 
                          />
                        </div>
                        <span className="text-xs text-slate-400 w-8">{star === 5 ? '85%' : star === 4 ? '10%' : '5%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Related Products</h2>
            <Link to="/categories" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-slate-100 z-40 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-8 flex items-center justify-center text-slate-500"><Minus className="h-4 w-4" /></button>
          <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-8 flex items-center justify-center text-slate-500"><Plus className="h-4 w-4" /></button>
        </div>
        <Button 
          variant="primary" 
          className="flex-1 h-12 rounded-xl font-bold"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </Layout>
  );
};
