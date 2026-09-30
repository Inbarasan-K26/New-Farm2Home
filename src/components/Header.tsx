import React from 'react';
import { ShoppingBag, Truck, MapPin, Globe, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenOrderTracker: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  language: 'en' | 'ta';
  onToggleLanguage: () => void;
  userPincode: string;
  onOpenPincodeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenOrderTracker,
  activeSection,
  onNavigate,
  language,
  onToggleLanguage,
  userPincode,
  onOpenPincodeModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Bar Contract: Strict One-Row, Three-Zone Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* ZONE 1: Brand Zone - Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-emerald-950 flex items-center gap-2 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 transition-transform group-hover:scale-125" />
            <span>Farm2Home</span>
          </a>

          {/* Quiet language toggle button */}
          <button
            onClick={onToggleLanguage}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-600 hover:text-emerald-900 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors"
            title="Toggle Language (English / தமிழ்)"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>
        </div>

        {/* ZONE 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => onNavigate('catalog')}
            className={`transition-colors hover:text-emerald-800 ${
              activeSection === 'catalog' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            {language === 'en' ? 'Fresh Harvest' : 'புதிய காய்கறிகள்'}
          </button>

          <button
            onClick={() => onNavigate('baskets')}
            className={`transition-colors hover:text-emerald-800 ${
              activeSection === 'baskets' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            {language === 'en' ? 'Farm Boxes' : 'வாராந்திர கூடைகள்'}
          </button>

          <button
            onClick={() => onNavigate('farmers')}
            className={`transition-colors hover:text-emerald-800 ${
              activeSection === 'farmers' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            {language === 'en' ? 'Our Farmers' : 'விவசாயிகள்'}
          </button>

          <button
            onClick={() => onNavigate('traceability')}
            className={`transition-colors hover:text-emerald-800 ${
              activeSection === 'traceability' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            {language === 'en' ? 'Fair Pricing' : 'நேரடி விலை'}
          </button>

          <button
            onClick={() => onNavigate('recipes')}
            className={`transition-colors hover:text-emerald-800 ${
              activeSection === 'recipes' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            {language === 'en' ? 'Farm Recipes' : 'சமையல் குறிப்புகள்'}
          </button>
        </nav>

        {/* ZONE 3: 1-2 Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Pincode delivery selector */}
          <button
            onClick={onOpenPincodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 bg-stone-100/90 hover:bg-stone-200/80 rounded-lg transition-colors border border-stone-200/60 max-w-[150px] truncate"
            title="Check Delivery Location"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">
              {userPincode ? `Pin: ${userPincode}` : 'Check Pincode'}
            </span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-stone-700 hover:text-rose-600 bg-white hover:bg-rose-50/60 border border-stone-200 rounded-lg transition-colors"
            title={language === 'en' ? 'View Favorite Produce' : 'விருப்பமான பொருட்கள்'}
            aria-label="Favorites"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center tabular-nums shadow-xs">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Order tracking button */}
          <button
            onClick={onOpenOrderTracker}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-emerald-950 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors"
            title="Track Active Harvest Delivery"
          >
            <Truck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'en' ? 'Track Order' : 'நிலை அறிய'}</span>
          </button>

          {/* Cart Bag Action Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Basket"
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'Basket' : 'கூடை'}</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile language switch */}
          <button
            onClick={onToggleLanguage}
            className="sm:hidden p-2 text-stone-700 hover:text-emerald-900 bg-stone-100 rounded-lg"
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
