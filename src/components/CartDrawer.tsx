import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  language: 'en' | 'ta';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout,
  language,
}) => {
  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 399;
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h2 className="text-base font-semibold text-stone-900">
              {language === 'en' ? 'Your Harvest Basket' : 'உங்கள் பண்ணைக் கூடை'}
            </h2>
            <span className="text-xs text-stone-500 font-mono">
              ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-stone-400 hover:text-stone-700 transition-colors p-1"
                title="Empty basket"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-b border-stone-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-stone-600 font-medium">
              {remainingForFreeDelivery === 0 ? (
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {language === 'en' ? 'You unlocked Free Dawn Express Delivery!' : 'இலவச காலை டெலிவரி தகுதி பெற்றது!'}
                </span>
              ) : (
                <span>
                  {language === 'en'
                    ? `Add ₹${remainingForFreeDelivery} more for Free Delivery`
                    : `இலவச டெலிவரிக்கு இன்னும் ₹${remainingForFreeDelivery} சேர்க்கவும்`}
                </span>
              )}
            </span>
            <span className="font-mono text-stone-400 text-[11px]">₹{FREE_DELIVERY_THRESHOLD}</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <ShoppingBag className="w-12 h-12 text-stone-300 mb-3 stroke-1" />
              <p className="text-sm font-medium text-stone-700">
                {language === 'en' ? 'Your basket is empty' : 'உங்கள் கூடை காலியாக உள்ளது'}
              </p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">
                {language === 'en'
                  ? 'Explore today’s fresh dawn harvest from our organic farmers.'
                  : 'இன்றைய புதிய காய்கறிகளை தேர்வு செய்து கூடையில் சேர்க்கவும்.'}
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                {language === 'en' ? 'Browse Fresh Produce' : 'காய்கறிகளை பார்க்க'}
              </button>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="pt-4 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-emerald-800 font-medium truncate">
                    {product.farm.farmerName} · {product.farm.village}
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 truncate">
                    {language === 'en' ? product.name : product.tamilName}
                  </h4>
                  <div className="text-xs text-stone-500">
                    ₹{product.price} {language === 'en' ? product.unit : product.tamilUnit}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold font-mono text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="w-16 text-right font-mono font-bold text-sm text-stone-900">
                    ₹{product.price * quantity}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal & Proceed Button */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF8F5]">
            <div className="space-y-1.5 text-xs text-stone-600 mb-4">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Farm Gate Subtotal' : 'பொருட்களின் மதிப்பு'}</span>
                <span className="font-mono text-stone-900 font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Delivery Slot (Morning Dawn EV)' : 'காலை டெலிவரி'}</span>
                <span className="font-mono">
                  {remainingForFreeDelivery === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    <span>₹40</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>{language === 'en' ? 'Estimated Total' : 'மொத்த தொகை'}</span>
                <span className="font-mono text-base">
                  ₹{subtotal + (remainingForFreeDelivery === 0 ? 0 : 40)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 group"
            >
              <span>{language === 'en' ? 'Proceed to Doorstep Delivery' : 'டெலிவரிக்கு தொடரவும்'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
