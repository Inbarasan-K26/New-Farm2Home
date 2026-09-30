import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'ta';
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 text-xs">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xl font-display font-bold text-white tracking-tight">
                Farm2Home
              </span>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm">
              {language === 'en'
                ? 'Direct farm gate cooperative delivering 100% certified organic greens, native heirloom vegetables, wood-pressed oils, and farm baskets within hours of dawn harvest.'
                : '100% இயற்கை முறையில் விளைந்த காய்கறிகள், கீரைகள், செக்கு எண்ணெய் ஆகியவற்றை இடைத்தரகர்கள் இன்றி விவசாயிகளிடம் இருந்து உங்கள் வீட்டிற்கு நேரடியாக கொண்டு சேர்க்கும் தளம்.'}
            </p>

            <div className="pt-2 flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NPOP & Tamil Nadu Organic Certification (TNOCD) Compliant</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              {language === 'en' ? 'Fresh Harvest' : 'விளைபொருட்கள்'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Traditional Greens (கீரை)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Native Country Vegetables
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Heirloom Non-Carbide Fruits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Vagai Wood-Pressed Oils
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Desi A2 Cow Ghee & Bilona Curd
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Farmers & Ethics */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              {language === 'en' ? 'Farm Gate Integrity' : 'விவசாயம் & நெறிமுறை'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onNavigate('farmers')} className="hover:text-white transition-colors">
                  Meet Our 45+ Organic Farmers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('traceability')} className="hover:text-white transition-colors">
                  83.5% Fair-Trade Transparency
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('baskets')} className="hover:text-white transition-colors">
                  Weekly Subscription Baskets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-white transition-colors">
                  Grandma’s Traditional Recipes
                </button>
              </li>
              <li>
                <span className="text-stone-400">Zero-Plastic Palm Leaf Boxes</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Help & Hub Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              {language === 'en' ? 'Farmer Contact & Support' : 'தொடர்புக்கு'}
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 98401 24567 (Morning Care)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>vanakkam@farm2home.org</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Harvest Hub: Anaimalai Valley, Pollachi, Tamil Nadu 642001</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Farm2Home Natural Farmers Cooperative. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Grown with soil love in Tamil Nadu</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
};
