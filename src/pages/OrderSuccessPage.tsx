import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/src/components/layout/Layout";
import { CheckCircle2, ShoppingBag, ArrowRight, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { motion } from "motion/react";

export const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state || { 
    orderId: "AB-123456", 
    items: [], 
    total: 0,
    customer: { fullName: "Valued Customer" }
  };

  const { orderId, items, total, customer } = orderData;

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 md:py-20">
        <div className="container-custom max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50 text-center space-y-8"
          >
            <div className="flex justify-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary"
              >
                <CheckCircle2 className="h-12 w-12" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Order Confirmed!
              </h1>
              <p className="text-slate-500 font-medium">
                Thank you, <span className="text-slate-900 font-bold">{customer?.fullName}</span>! Your order has been placed successfully.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Order ID</span>
                <span className="text-lg font-extrabold text-slate-900">{orderId}</span>
              </div>
              
              {items && items.length > 0 && (
                <div className="py-4 space-y-3 border-b border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order Items</p>
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 font-medium">
                        {item.name} <span className="text-slate-400 text-xs">x{item.quantity}</span>
                      </span>
                      <span className="text-sm font-bold text-slate-900">৳{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-extrabold text-slate-900">Total Amount</span>
                    <span className="text-lg font-extrabold text-primary">৳{total}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Delivery</p>
                    <p className="text-sm font-bold text-slate-900">Today, within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support</p>
                    <p className="text-sm font-bold text-slate-900">+880 1234 567890</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/" className="flex-1">
                <Button variant="primary" className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20">
                  Continue Shopping <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button variant="ghost" className="h-14 rounded-2xl text-base font-bold text-slate-500 hover:text-primary">
                View Order Details
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 border-t border-slate-100">
              <div className="flex flex-col items-center gap-1">
                <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Track Order</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Store Locator</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
