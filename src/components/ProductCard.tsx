import React, { useState } from 'react';
import { Plus, Minus, Check, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  language: 'en' | 'ta';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onQuickView,
  isFavorite = false,
  onToggleFavorite,
  language,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Top Visual Container with Zero-Broken-Image botanical artwork */}
      <div className="relative">
        <ProductCardVisual
          name={product.name}
          iconType={product.iconType}
          colorTheme={product.colorTheme}
          badge={product.stockStatus}
          harvestTime={product.harvestTime}
        />

        {/* Favorite Heart Button on Card */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            className={`absolute bottom-3 left-3 z-20 p-1.5 rounded-md shadow-xs transition-all ${
              isFavorite
                ? 'bg-white text-rose-600 opacity-100 ring-1 ring-rose-200'
                : 'bg-white/90 text-stone-400 hover:text-rose-600 hover:bg-white opacity-0 group-hover:opacity-100'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Toggle favorite"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-medium text-stone-800 bg-white/95 hover:bg-white rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 border border-stone-200"
          title="View Farm Origin & Nutrition"
        >
          <Eye className="w-3 h-3 text-emerald-700" />
          <span>{language === 'en' ? 'Farm Origin' : 'விவசாயி விபரம்'}</span>
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet Metadata with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <span className="font-medium text-emerald-800">{product.farm.farmerName}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.farm.village}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold text-stone-900 group-hover:text-emerald-950 transition-colors line-clamp-1">
            {language === 'en' ? product.name : product.tamilName}
          </h3>

          {/* Unit Description */}
          <p className="text-xs text-stone-500 mt-0.5">
            {language === 'en' ? product.unit : product.tamilUnit}
          </p>

          {/* Quiet Nutrient / Benefit Text */}
          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {language === 'en' ? product.description : product.tamilDescription}
          </p>
        </div>

        {/* Price & Action Module */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          
          {/* Price with Tabular Figures */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono tabular-nums text-stone-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <div className="text-[10px] text-emerald-700 font-medium">
              {language === 'en' ? 'Direct Farm Gate' : 'நேரடி பண்ணை விலை'}
            </div>
          </div>

          {/* Quantity Controls / Add Button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200">
              <button
                onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold font-mono tabular-nums text-stone-900">
                {quantityInCart}
              </span>
              <button
                onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={justAdded}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-2xs hover:shadow-xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Added' : 'சேர்க்கப்பட்டது'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Add' : 'சேர்க்க'}</span>
                </>
              )}
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
