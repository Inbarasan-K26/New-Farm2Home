import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, Search } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: Order | null;
  language: 'en' | 'ta';
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  activeOrder,
  language,
}) => {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState('');
  const [displayOrder, setDisplayOrder] = useState<Order | null>(activeOrder);

  const defaultMockOrder: Order = {
    id: 'F2H-8904',
    items: [],
    subtotal: 449,
    deliveryFee: 0,
    total: 449,
    customerName: 'Inbanathan',
    phone: '9840123456',
    address: 'No. 14, 2nd Cross Street, Gandhi Nagar',
    pincode: '600028',
    deliverySlot: 'Early Morning Dew Drop (6:00 AM - 8:30 AM)',
    packagingPreference: 'palm_leaf',
    paymentMethod: 'cod',
    status: 'out_for_delivery',
    placedAt: '4:45 AM Today',
    estimatedArrival: 'Today by 7:15 AM (EV Delivery Vehicle #08)',
  };

  const currentOrder = displayOrder || defaultMockOrder;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setDisplayOrder({
        ...defaultMockOrder,
        id: searchId.toUpperCase().startsWith('F2H-') ? searchId.toUpperCase() : `F2H-${searchId.toUpperCase()}`,
      });
    }
  };

  const steps = [
    {
      title: language === 'en' ? 'Dawn Harvest at Farm' : 'அதிகாலை பண்ணை அறுவடை',
      time: '4:30 AM',
      desc: language === 'en' ? 'Freshly plucked by farmer Sundaramurthy at Anaimalai grove' : 'பொள்ளாச்சியில் விவசாயியால் அறுவடை செய்யப்பட்டது',
      status: 'completed',
    },
    {
      title: language === 'en' ? 'Organic Quality & Brix Scan' : 'தரப் பரிசோதனை',
      time: '5:15 AM',
      desc: language === 'en' ? '0 chemical residue verified; natural brix sweetness tested' : 'பூச்சிக்கொல்லி இல்லாதது உறுதி செய்யப்பட்டது',
      status: 'completed',
    },
    {
      title: language === 'en' ? 'Zero-Plastic Leaf Packing' : 'இயற்கை முறையில் பேக்கிங்',
      time: '5:45 AM',
      desc: language === 'en' ? 'Assembled in traditional woven palm leaf container' : 'பனை ஓலைக் கூடையில் அழகாக அடுக்கி வைக்கப்பட்டது',
      status: 'completed',
    },
    {
      title: language === 'en' ? 'Out for Doorstep Delivery' : 'டெலிவரிக்கு புறப்பட்டது',
      time: '6:30 AM',
      desc: language === 'en' ? 'Refrigerated electric van en route to your delivery address' : 'குளிரூட்டப்பட்ட மின்சார வாகனத்தில் உங்கள் இல்லத்திற்கு வருகிறது',
      status: 'current',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-800" />
              <h2 className="text-base font-display font-bold text-stone-900">
                {language === 'en' ? 'Live Harvest Delivery Tracker' : 'நேரடி டெலிவரி நிலை'}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'en' ? 'Track your produce from the tree branch to your kitchen' : 'பண்ணையிலிருந்து வீடு வரும் வரை நேரடி கண்காணிப்பு'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Order Search / Quick Switch */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. F2H-8904)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-700"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>
            <button
              type="submit"
              className="px-3 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Track
            </button>
          </form>

          {/* Current Order Summary Card */}
          <div className="bg-emerald-950 text-white rounded-xl p-4 border border-emerald-900">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-emerald-800/80 mb-3">
              <div>
                <span className="text-emerald-300 text-[11px] block">Order ID</span>
                <span className="font-mono font-bold text-base text-white">{currentOrder.id}</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-300 text-[11px] block">Status</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-300 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Out for Delivery
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{currentOrder.address}, {currentOrder.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{currentOrder.estimatedArrival}</span>
              </div>
            </div>
          </div>

          {/* Step Timeline */}
          <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    step.status === 'completed'
                      ? 'bg-emerald-800 text-white'
                      : step.status === 'current'
                      ? 'bg-amber-400 text-stone-900 ring-4 ring-amber-100'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-baseline justify-between text-xs">
                  <h4 className="font-bold text-stone-900">{step.title}</h4>
                  <span className="font-mono text-stone-400 text-[11px]">{step.time}</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Farmer Contact Verification Box */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <div>
                <div className="font-semibold text-stone-900">Direct Farm Gate Assurance</div>
                <div className="text-[11px] text-stone-500">Harvest batch certified by Pollachi Organic Cluster</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
