import * as React from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/8801234567890?text=I'm interested in your products", "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={handleWhatsAppClick}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 h-14 w-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 transition-transform duration-300"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="h-7 w-7 fill-white" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white animate-bounce">
            1
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
