import * as React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { Button } from "../ui/Button";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 md:pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tighter text-white">
                AMAR<span className="text-secondary">BAZAR</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your neighborhood's most trusted online grocery and organic food store. We deliver fresh products directly to your doorstep within 24 hours.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/categories" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Shop All Categories</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Fresh Vegetables</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Organic Fruits</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Dairy & Eggs</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Meat & Fish</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Customer Service</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Track Your Order</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Shipping Policy</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Return & Refund</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Terms & Conditions</Link></li>
              <li><Link to="/" className="text-sm hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">House 12, Road 5, Sector 7, Uttara, Dhaka-1230</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">support@amarbazar.com</span>
              </li>
            </ul>
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary transition-all"
                />
                <Button variant="primary" size="sm" className="rounded-xl">Join</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500 font-medium">
            © 2026 AmarBazar. All rights reserved. Developed with ❤️ in Bangladesh.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <CreditCard className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
