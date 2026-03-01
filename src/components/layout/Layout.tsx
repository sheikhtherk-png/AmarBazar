import * as React from "react";
import { useLocation } from "react-router-dom";
import { Header, Navbar, MobileBottomNav } from "./Header";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollToTop } from "../ScrollToTop";
import { motion, AnimatePresence } from "motion/react";

const CartDrawer = React.lazy(() => import("../cart/CartDrawer").then(m => ({ default: m.CartDrawer })));
const Footer = React.lazy(() => import("./Footer").then(m => ({ default: m.Footer })));

const PageLoader = () => {
  const [progress, setProgress] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => setProgress(100), 200);
    const resetTimer = setTimeout(() => setProgress(0), 500);
    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, [location.pathname]);

  if (progress === 0) return null;

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-primary z-[100] transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <PageLoader />
      <Header />
      <Navbar />
      <React.Suspense fallback={null}>
        <CartDrawer />
      </React.Suspense>
      <main className="flex-1 pb-20 md:pb-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth Apple-like feel
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <React.Suspense fallback={<div className="h-20 bg-slate-900" />}>
        <Footer />
      </React.Suspense>
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  );
};
