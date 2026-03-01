import * as React from "react";
import { Layout } from "@/src/components/layout/Layout";
import { ProductCard, ProductSkeleton } from "@/src/components/ProductCard";
import { CategoryCard } from "@/src/components/CategoryCard";
import { TrustSection } from "@/src/components/TrustSection";
import { FlashSaleCountdown } from "@/src/components/FlashSaleCountdown";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/src/lib/mockData";
import { ChevronRight, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export const HomePage = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="container-custom py-6 md:py-10">
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative min-h-[400px] md:min-h-[500px]">
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/4" />
          
          <div className="flex-1 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
              <Zap className="h-3 w-3 text-accent fill-accent" />
              Eid Special Offer - Up to 40% Off
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Pure Organic <br />
              <span className="text-primary">Food Market</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto md:mx-0">
              Discover the finest selection of organic honey, pure ghee, and natural groceries delivered with care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button variant="primary" size="lg" className="rounded-2xl px-10 h-14 text-base font-bold shadow-xl shadow-primary/30 w-full sm:w-auto">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 text-base font-bold bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                View Offers
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative z-10 hidden md:block">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/organic-hero/800/800" 
                alt="Organic Food" 
                className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/5"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Featured Categories */}
      <section className="container-custom py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Featured Categories</h2>
            <p className="text-sm text-slate-500 font-medium">Explore our wide range of organic products</p>
          </div>
          <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
          {MOCK_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="container-custom py-12">
        <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                <Zap className="h-6 w-6 fill-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Flash Sale</h2>
                <p className="text-sm text-slate-500 font-medium">Grab your favorites before they're gone!</p>
              </div>
            </div>
            <FlashSaleCountdown />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading 
              ? [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
              : MOCK_PRODUCTS.filter(p => p.isFlashSale).slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="container-custom py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Trending Now</h2>
            <p className="text-sm text-slate-500 font-medium">Most popular items this week</p>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold">
            View All <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading 
            ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
            : MOCK_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-white mb-4">Pure Honey <br /> Collection</h3>
              <p className="text-white/80 mb-8 max-w-[200px]">Get 100% natural honey directly from Sundarbans.</p>
              <Button variant="secondary" className="rounded-xl font-bold">Shop Now</Button>
            </div>
            <img 
              src="https://picsum.photos/seed/honey-banner/400/400" 
              alt="Honey" 
              className="absolute right-0 bottom-0 h-full w-1/2 object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="bg-secondary rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-white mb-4">Organic Ghee <br /> Special</h3>
              <p className="text-white/80 mb-8 max-w-[200px]">Traditional handmade ghee for your kitchen.</p>
              <Button variant="secondary" className="rounded-xl font-bold">Shop Now</Button>
            </div>
            <img 
              src="https://picsum.photos/seed/ghee-banner/400/400" 
              alt="Ghee" 
              className="absolute right-0 bottom-0 h-full w-1/2 object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Best Selling */}
      <section className="container-custom py-12 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Best Selling</h2>
            <p className="text-sm text-slate-500 font-medium">Top rated products by our customers</p>
          </div>
          <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading 
            ? [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
            : MOCK_PRODUCTS.slice(4, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
      </section>
    </Layout>
  );
};
