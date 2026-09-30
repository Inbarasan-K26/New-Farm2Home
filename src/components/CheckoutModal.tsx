import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Truck, CreditCard, Banknote, QrCode } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  userPincode: string;
  onOrderCompleted: (order: Order) => void;
  language: 'en' | 'ta';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  userPincode,
  onOrderCompleted,
  language,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('Inbanathan');
  const [phone, setPhone] = useState('9840123456');
  const [address, setAddress] = useState('No. 14, 2nd Cross Street, Gandhi Nagar');
  const [pincode, setPincode] = useState(userPincode || '600028');
  const [deliverySlot, setDeliverySlot] = useState('Early Morning Dew Drop (6:00 AM - 8:30 AM)');
  const [packagingPreference, setPackagingPreference] = useState<'palm_leaf' | 'reusable_cloth' | 'biodegradable_box'>('palm_leaf');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 399 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      setErrorMsg(language === 'en' ? 'Please fill all delivery address details.' : 'அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `F2H-${Math.floor(1000 + Math.random() * 9000)}`,
        items: [...cartItems],
        subtotal,
        deliveryFee,
        total,
        customerName,
        phone,
        address,
        pincode,
        deliverySlot,
        packagingPreference,
        paymentMethod,
        status: 'harvesting',
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedArrival: 'Today by 7:45 AM (Dawn Route)',
      };

      setIsSubmitting(false);
      onOrderCompleted(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <h2 className="text-lg font-display font-bold text-stone-900">
              {language === 'en' ? 'Direct Farm-to-Doorstep Checkout' : 'நேரடி பண்ணை டெலிவரி ஆர்டர்'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'en' ? 'Morning harvest directly dispatched to your address' : 'அதிகாலை அறுவடை செய்யப்பட்டு நேரடியாக கொண்டு வரப்படும்'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-lg border border-rose-200">
              {errorMsg}
            </div>
          )}

          {/* Delivery Contact Details */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              {language === 'en' ? '1. Contact & Delivery Address' : '1. தொடர்பு மற்றும் முகவரி'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="10-digit Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="House No, Apartment, Street Name, Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pincode (e.g. 600028)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  required
                />
              </div>
              <div className="flex items-center text-xs text-emerald-800 font-medium px-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
                <span>Verified Fresh Delivery Hub</span>
              </div>
            </div>
          </div>

          {/* Delivery Slot */}
          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              {language === 'en' ? '2. Preferred Fresh Harvest Slot' : '2. டெலிவரி நேரம்'}
            </label>
            <div className="space-y-2">
              {[
                { slot: 'Early Morning Dew Drop (6:00 AM - 8:30 AM)', tag: 'Recommended · Cut from farm at 4:30 AM' },
                { slot: 'Fresh Noon Delivery (11:30 AM - 2:00 PM)', tag: 'Lunch Preparation Route' },
                { slot: 'Evening Run (5:00 PM - 7:30 PM)', tag: 'Evening Fresh Greens' },
              ].map(item => (
                <label
                  key={item.slot}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    deliverySlot === item.slot
                      ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-medium'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliverySlot"
                      checked={deliverySlot === item.slot}
                      onChange={() => setDeliverySlot(item.slot)}
                      className="text-emerald-700 focus:ring-emerald-600"
                    />
                    <span>{item.slot}</span>
                  </div>
                  <span className="text-[11px] text-stone-500 hidden sm:inline">{item.tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Eco-Packaging Selection */}
          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              {language === 'en' ? '3. Zero-Plastic Packaging Preference' : '3. பேக்கிங் முறை'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPackagingPreference('palm_leaf')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  packagingPreference === 'palm_leaf'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                🌴 Handwoven Palm Leaf Box (Free)
              </button>
              <button
                type="button"
                onClick={() => setPackagingPreference('reusable_cloth')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  packagingPreference === 'reusable_cloth'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                🧺 Reusable Organic Khadi Bag (Free)
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              {language === 'en' ? '4. Payment Method' : '4. பணம் செலுத்தும் முறை'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-800'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <Banknote className="w-4 h-4 text-emerald-700" />
                <span>Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-800'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span>UPI (GPay / PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-800'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-700" />
                <span>Card / Netbanking</span>
              </button>
            </div>
          </div>

          {/* Order Summary & Submit Button */}
          <div className="pt-4 border-t border-stone-200 bg-[#FAF8F5] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-5 sm:p-6">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
              <span>{cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items Subtotal</span>
              <span className="font-mono font-semibold text-stone-900">₹{subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-600 mb-3">
              <span>Morning Delivery Fee</span>
              <span className="font-mono">
                {deliveryFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-stone-900 pb-4 border-b border-stone-200 mb-4">
              <span>{language === 'en' ? 'Payable Amount' : 'செலுத்த வேண்டிய தொகை'}</span>
              <span className="font-mono text-xl text-emerald-950">₹{total}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 disabled:bg-stone-400 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Confirming Dawn Harvest Route...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {language === 'en'
                      ? `Confirm & Place Order (₹${total})`
                      : `ஆர்டரை உறுதி செய்க (₹${total})`}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
