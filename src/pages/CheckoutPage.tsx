import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/src/components/layout/Layout";
import { useCartStore } from "@/src/state/cart-store";
import { Button } from "@/src/components/ui/Button";
import { 
  ChevronLeft, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  Info
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().min(11, "Enter a valid 11-digit phone number").max(11, "Enter a valid 11-digit phone number"),
  address: z.string().min(5, "Full address is required"),
  area: z.string().min(1, "Please select your area"),
  note: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const AREAS = [
  "Dhaka City",
  "Dhaka Suburbs (Savar, Gazipur, etc.)",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "Outside Dhaka (All over BD)"
];

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const subtotal = getSubtotal();
  const deliveryCharge = subtotal > 0 ? (subtotal > 1000 ? 0 : 60) : 0;
  const total = subtotal + deliveryCharge;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      area: "Dhaka City",
    }
  });

  React.useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items, navigate]);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Order placed:", { ...data, items, total });
    const orderDetails = {
      orderId: "AB-" + Math.floor(100000 + Math.random() * 900000),
      items: [...items],
      total: total,
      customer: data
    };
    clearCart();
    setIsSubmitting(false);
    navigate("/order-success", { state: orderDetails });
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="container-custom py-6 md:py-10">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Shopping
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Checkout Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Truck className="h-5 w-5" />
                  </div>
                  Delivery Information
                </h2>

                <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name *</label>
                      <input
                        {...register("fullName")}
                        className={cn(
                          "w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all",
                          errors.fullName ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5"
                        )}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                      <input
                        {...register("phone")}
                        className={cn(
                          "w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all",
                          errors.phone ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5"
                        )}
                        placeholder="01XXXXXXXXX"
                      />
                      {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Area *</label>
                    <select
                      {...register("area")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all cursor-pointer"
                    >
                      {AREAS.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Address *</label>
                    <textarea
                      {...register("address")}
                      rows={3}
                      className={cn(
                        "w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none",
                        errors.address ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5"
                      )}
                      placeholder="House #, Road #, Area name..."
                    />
                    {errors.address && <p className="text-xs text-red-500 font-medium">{errors.address.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Order Note (Optional)</label>
                    <textarea
                      {...register("note")}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all resize-none"
                      placeholder="Any special instructions for delivery?"
                    />
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  Payment Method
                </h2>
                
                <div className="p-4 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Cash on Delivery</p>
                      <p className="text-xs text-slate-500">Pay when you receive the product</p>
                    </div>
                  </div>
                  <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                </div>
                
                <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-2xl text-blue-700">
                  <Info className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    Currently, we only support Cash on Delivery for all orders. Online payment methods will be added soon.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
                <h2 className="text-xl font-extrabold text-slate-900">Order Summary</h2>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">Qty: {item.quantity}</p>
                        <p className="text-sm font-extrabold text-slate-900 mt-1">৳{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-3">
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
                  <div className="flex justify-between text-xl pt-4 border-t border-slate-200">
                    <span className="text-slate-900 font-extrabold">Total</span>
                    <span className="text-primary font-extrabold">৳{total}</span>
                  </div>
                </div>

                <Button 
                  form="checkout-form"
                  type="submit"
                  variant="primary" 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    "Confirm Order"
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" />
                  Secure Checkout Guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
