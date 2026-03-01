import * as React from "react";
import { Truck, ShieldCheck, Clock, RefreshCw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Within 24 hours in Dhaka city",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    description: "Directly sourced from brands",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7 days hassle-free return policy",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "We are here to help you anytime",
    color: "bg-purple-50 text-purple-600"
  }
];

export const TrustSection = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className={`h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                <item.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
