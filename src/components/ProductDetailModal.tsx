import React from 'react';
import { X, ShieldCheck, MapPin, CheckCircle, Plus, Minus, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  quantityInCart: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  language: 'en' | 'ta';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  isFavorite,
  onToggleFavorite,
  language,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Buttons (Close and Favorite) */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {/* Favorite Heart Button */}
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`p-2 rounded-full shadow-xs transition-all duration-150 flex items-center justify-center ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 ring-1 ring-rose-200'
                : 'bg-white/90 text-stone-400 hover:text-rose-600 hover:bg-white'
            }`}
            title={isFavorite ? (language === 'en' ? 'Remove from Favorites' : 'விருப்பத்திலிருந்து நீக்கு') : (language === 'en' ? 'Add to Favorites' : 'விருப்பத்தில் சேர்')}
            aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Heart className={`w-5 h-5 transition-transform active:scale-125 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 bg-white/90 rounded-full shadow-xs hover:bg-stone-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Visual Artwork */}
          <div className="bg-[#FAF8F5] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <ProductCardVisual
              name={product.name}
              iconType={product.iconType}
              colorTheme={product.colorTheme}
              badge={product.stockStatus}
              harvestTime={product.harvestTime}
            />

            {/* Farm Certification Block */}
            <div className="mt-6 bg-white p-3.5 rounded-xl border border-stone-200/80 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>NPOP Organic Certified</span>
              </div>
              <p className="text-stone-500 font-mono text-[11px]">
                Cert Code: {product.farm.organicCertCode}
              </p>
              <p className="text-stone-600 mt-1 text-[11px]">
                {product.farm.acres} Acres registered pesticide-free natural zone.
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase & Origin Module */}
          <div className="p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Farmer Origin */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-semibold text-stone-800">{product.farm.farmerName}</span>
                <span aria-hidden="true">·</span>
                <span>{product.farm.village}, {product.farm.district}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-display font-bold text-stone-900">
                {language === 'en' ? product.name : product.tamilName}
              </h2>

              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'en' ? product.unit : product.tamilUnit}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-stone-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-stone-400 line-through font-mono">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    83% to Farmer
                  </span>
                </div>

                {/* Secondary Quick Favorite Action */}
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
                    isFavorite
                      ? 'border-rose-200 bg-rose-50 text-rose-700 font-medium'
                      : 'border-stone-200 text-stone-500 hover:text-rose-600 hover:bg-stone-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorite ? (language === 'en' ? 'Saved' : 'சேமிக்கப்பட்டது') : (language === 'en' ? 'Favorite' : 'விருப்பம்')}</span>
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-stone-600 leading-relaxed">
                {language === 'en' ? product.description : product.tamilDescription}
              </p>

              {/* Soil & Farming Practice */}
              <div className="mt-5 p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <div className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider mb-1">
                  {language === 'en' ? 'Farming Practice' : 'விவசாய முறை'}
                </div>
                <p className="text-xs text-stone-700 leading-normal">
                  {product.farm.soilPractice}
                </p>
                <p className="mt-1 text-[11px] text-stone-500 italic">
                  "{product.farm.farmerStory}"
                </p>
              </div>

              {/* Nutrition Facts */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider mb-2">
                  {language === 'en' ? 'Harvest Nutrition' : 'சத்துக்கள்'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-stone-50 rounded-lg">
                    <span className="text-stone-400 block text-[10px]">Calories</span>
                    <span className="font-semibold text-stone-800">{product.nutrition.calories}</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg">
                    <span className="text-stone-400 block text-[10px]">Natural Fiber</span>
                    <span className="font-semibold text-stone-800">{product.nutrition.fiber}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-emerald-800 flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{product.nutrition.healthBenefit}</span>
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart action */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
              {quantityInCart > 0 ? (
                <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold font-mono text-stone-900">
                    {quantityInCart}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="flex-1 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{language === 'en' ? 'Add to Basket' : 'கூடையில் சேர்க்க'}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
              >
                {language === 'en' ? 'Close' : 'மூடு'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
