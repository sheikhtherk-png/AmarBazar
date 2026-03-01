import * as React from "react";
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/src/state/cart-store";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
  
  const subtotal = getSubtotal();
  const deliveryCharge = subtotal > 0 ? (subtotal > 1000 ? 0 : 60) : 0;
  const total = subtotal + deliveryCharge;

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Your Cart</h2>
                  <p className="text-xs text-slate-500 font-medium">{items.length} items in your bag</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleCart(false)} className="rounded-xl">
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-300 hover:text-secondary transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{item.categories[0]}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 flex items-center justify-center text-slate-500 hover:text-primary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 flex items-center justify-center text-slate-500 hover:text-primary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">৳{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                    <ShoppingBag className="h-12 w-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Your cart is empty</h3>
                    <p className="text-sm text-slate-500 max-w-[200px] mx-auto">Looks like you haven't added anything to your cart yet.</p>
                  </div>
                  <Button variant="primary" className="rounded-xl px-8" onClick={() => toggleCart(false)}>
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="text-slate-900 font-bold">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Delivery Charge</span>
                    <span className="text-slate-900 font-bold">
                      {deliveryCharge === 0 ? <span className="text-primary">Free</span> : `৳${deliveryCharge}`}
                    </span>
                  </div>
                  {deliveryCharge > 0 && (
                    <p className="text-[10px] text-primary font-bold bg-primary/5 p-2 rounded-lg">
                      Add ৳{1000 - subtotal} more for FREE delivery!
                    </p>
                  )}
                  <div className="flex justify-between text-lg pt-2 border-t border-slate-200">
                    <span className="text-slate-900 font-extrabold">Total</span>
                    <span className="text-primary font-extrabold">৳{total}</span>
                  </div>
                </div>
                
                <Link to="/checkout" onClick={() => toggleCart(false)}>
                  <Button variant="primary" className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20">
                    Proceed to Checkout <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                
                <p className="text-[10px] text-center text-slate-400 font-medium">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
