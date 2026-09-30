import React from 'react';
import { X, Heart, ShoppingBag, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allProducts: Product[];
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  language: 'en' | 'ta';
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  allProducts,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  language,
}) => {
  if (!isOpen) return null;

  const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-stone-900">
                {language === 'en' ? 'My Favorite Produce' : 'விருப்பமான விளைபொருட்கள்'}
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'en'
                  ? 'Quickly reorder your most loved farm-fresh harvest'
                  : 'விருப்பமான பொருட்களை எளிதாக மறுஆர்டர் செய்யலாம்'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          {favoriteProducts.length === 0 ? (
            <div className="py-12 text-center text-stone-500 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 mb-3">
                <Heart className="w-6 h-6 stroke-1" />
              </div>
              <h3 className="text-sm font-semibold text-stone-700">
                {language === 'en' ? 'No favorites added yet' : 'விருப்பப்பட்டியல் காலியாக உள்ளது'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                {language === 'en'
                  ? 'Click the heart icon on any produce details modal to save items here for quick reordering.'
                  : 'பொருட்களின் விபரத்தில் உள்ள இதயக் குறியீட்டை அழுத்தி உங்கள் விருப்பப்பட்டியலில் சேமிக்கலாம்.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 space-y-3">
              {favoriteProducts.map(product => (
                <div key={product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div
                    className="flex-1 min-w-0 cursor-pointer group"
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium truncate">
                      <span>{product.farm.farmerName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-400 truncate">{product.farm.village}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-950 transition-colors truncate">
                      {language === 'en' ? product.name : product.tamilName}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-0.5 text-xs">
                      <span className="font-mono font-bold text-stone-900">₹{product.price}</span>
                      <span className="text-stone-500">{language === 'en' ? product.unit : product.tamilUnit}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                      title="Add to Basket"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Reorder' : 'சேர்க்க'}</span>
                    </button>

                    <button
                      onClick={() => onToggleFavorite(product.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title={language === 'en' ? 'Remove from Favorites' : 'நீக்குக'}
                      aria-label="Remove from Favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {favoriteProducts.length} {language === 'en' ? 'items saved' : 'பொருட்கள் சேமிக்கப்பட்டுள்ளன'}
            </span>
            <button
              onClick={() => {
                favoriteProducts.forEach(p => onAddToCart(p, 1));
                onClose();
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Reorder All to Basket' : 'அனைத்தையும் கூடையில் சேர்க்க'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
