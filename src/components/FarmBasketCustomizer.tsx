import React, { useState } from 'react';
import { Package, Calendar, RefreshCw, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface FarmBasketCustomizerProps {
  onAddCustomBasket: (basketItem: Product, cadence: string, packaging: string) => void;
  language: 'en' | 'ta';
}

export const FarmBasketCustomizer: React.FC<FarmBasketCustomizerProps> = ({
  onAddCustomBasket,
  language,
}) => {
  const [basketTier, setBasketTier] = useState<'family' | 'solo' | 'large'>('family');
  const [cadence, setCadence] = useState<'weekly' | 'biweekly' | 'trial'>('weekly');
  const [packaging, setPackaging] = useState<'palm_leaf' | 'cotton_bag'>('palm_leaf');
  const [added, setAdded] = useState(false);

  // Swappable produce items configuration
  const [selectedItems, setSelectedItems] = useState([
    { id: 'item-1', name: 'Country Vine Tomatoes (1kg)', isSelected: true },
    { id: 'item-2', name: 'Fresh Moringa Greens (1 bunch)', isSelected: true },
    { id: 'item-3', name: 'Tender Pollachi Drumsticks (500g)', isSelected: true },
    { id: 'item-4', name: 'Native Small Shallots (500g)', isSelected: true },
    { id: 'item-5', name: 'Desi Tender Okra (500g)', isSelected: true },
    { id: 'item-6', name: 'Kadaladi Elakki Bananas (1kg)', isSelected: true },
    { id: 'item-7', name: 'Country Purple Brinjal (500g)', isSelected: true },
    { id: 'item-8', name: 'Curry Leaves & Green Chillies', isSelected: true },
  ]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev =>
      prev.map(item => (item.id === id ? { ...item, isSelected: !item.isSelected } : item))
    );
  };

  const getTierDetails = () => {
    switch (basketTier) {
      case 'solo':
        return {
          title: language === 'en' ? 'Solo / Couple Harvest Box' : 'தனிநபர் / தம்பதியர் கூடை',
          weight: '3.5 kg',
          price: 320,
          originalPrice: 410,
          itemsCount: '5-6 Items',
        };
      case 'large':
        return {
          title: language === 'en' ? 'Joint Family Heritage Harvest' : 'கூட்டுக் குடும்ப பண்ணைக் கூடை',
          weight: '8.0 kg',
          price: 649,
          originalPrice: 820,
          itemsCount: '11-12 Items',
        };
      case 'family':
      default:
        return {
          title: language === 'en' ? 'Daily Family Morning Harvest Basket' : 'குடும்ப வாராந்திர பண்ணைக் கூடை',
          weight: '5.5 kg',
          price: 449,
          originalPrice: 580,
          itemsCount: '8-9 Items',
        };
    }
  };

  const tier = getTierDetails();

  const handleAddToBasket = () => {
    const customProduct: Product = {
      id: `custom-basket-${basketTier}-${Date.now()}`,
      name: `${tier.title} (${tier.weight}) - ${cadence.toUpperCase()}`,
      tamilName: `${tier.title} (${tier.weight})`,
      category: 'baskets',
      price: tier.price,
      originalPrice: tier.originalPrice,
      unit: `${tier.weight} Curated Farm Box`,
      tamilUnit: `${tier.weight} வாராந்திர கூடை`,
      stockStatus: 'Dawn Harvest',
      harvestTime: 'Dawn Packed',
      farm: {
        farmerName: 'Kongu Organic Farmers Collective',
        tamilFarmerName: 'கொங்கு இயற்கை விவசாயிகள் கூட்டமைப்பு',
        village: 'Pollachi Valley',
        district: 'Coimbatore, TN',
        organicCertCode: 'TN-COLLECTIVE-2024',
        soilPractice: '100% Zero-chemical natural farming with Panchagavya',
        acres: 45,
        farmerStory: 'Directly sourced from 8 smallholder farmers in the collective, delivered in a reusable handwoven palm basket.'
      },
      description: `Customized Harvest Box (${tier.weight}) containing fresh morning vegetables, native greens, and fruits. Packaging: ${packaging === 'palm_leaf' ? 'Handwoven Palm Leaf' : 'Organic Cotton Bag'}. Frequency: ${cadence}.`,
      tamilDescription: `அதிகாலை அறுவடை செய்யப்பட்ட காய்கறிகள் மற்றும் கீரைகள் அடங்கிய வாராந்திர பண்ணை கூடை.`,
      nutrition: {
        calories: 'Balanced Daily Produce',
        fiber: 'High Phytonutrients',
        keyNutrient: '100% Pesticide-Free Greens & Veggies',
        healthBenefit: 'Guaranteed 0 chemical ripening and non-GMO varieties'
      },
      rating: 5.0,
      reviewsCount: 420,
      seasonal: false,
      colorTheme: 'from-emerald-800 to-green-950',
      iconType: 'basket'
    };

    onAddCustomBasket(customProduct, cadence, packaging);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="baskets" className="py-14 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Fresh Subscription & Weekly Boxes' : 'வாராந்திர பண்ணைக் கூடை'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            {language === 'en' ? 'Curate Your Weekly Farm Box' : 'உங்கள் விருப்பப்படி கூடையை அமைத்துக் கொள்ளுங்கள்'}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {language === 'en'
              ? 'Harvested at 4:30 AM on delivery mornings. Swap vegetables, choose your cadence, and pause anytime with 1-click.'
              : 'அதிகாலையில் பறிக்கப்பட்டு அதே நாளில் டெலிவரி செய்யப்படும். உங்கள் தேவைக்கேற்ப பொருட்களை மாற்றி அமைக்கலாம்.'}
          </p>
        </div>

        {/* Builder Container */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8 max-w-4xl mx-auto">
          
          {/* Step 1: Select Household Size */}
          <div className="mb-8">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
              {language === 'en' ? '1. Select Basket Size' : '1. கூடையின் அளவை தேர்வு செய்க'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'solo', label: 'Solo / Couple', sub: '3.5 kg · 5-6 Items', price: '₹320' },
                { id: 'family', label: 'Family of 3-4', sub: '5.5 kg · 8-9 Items', price: '₹449', popular: true },
                { id: 'large', label: 'Joint Family', sub: '8.0 kg · 11-12 Items', price: '₹649' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setBasketTier(opt.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    basketTier === opt.id
                      ? 'border-emerald-800 bg-emerald-50/50 ring-1 ring-emerald-800'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Most Popular
                    </span>
                  )}
                  <div className="font-semibold text-sm text-stone-900">{opt.label}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{opt.sub}</div>
                  <div className="text-base font-bold font-mono text-emerald-900 mt-2">{opt.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Custom Produce Swapper / Checklist */}
          <div className="mb-8 pt-6 border-t border-stone-100">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                {language === 'en' ? '2. Included Farm Produce (Click to include/exclude)' : '2. அடங்கிய காய்கறிகள் (தேர்வு செய்க)'}
              </label>
              <span className="text-xs text-stone-500 font-mono">
                {selectedItems.filter(i => i.isSelected).length} items selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`px-3 py-2 text-xs rounded-lg border flex items-center justify-between transition-colors ${
                    item.isSelected
                      ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 font-medium'
                      : 'border-stone-200 text-stone-400 bg-stone-50 line-through'
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2">
                    {item.isSelected ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <RefreshCw className="w-3 h-3 text-stone-400" />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Delivery Cadence & Sustainable Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pt-6 border-t border-stone-100">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                {language === 'en' ? '3. Delivery Frequency' : '3. டெலிவரி கால அளவு'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'weekly', label: 'Weekly (Every Monday & Thursday)' },
                  { id: 'biweekly', label: 'Every 2 Weeks' },
                  { id: 'trial', label: 'One-Time Trial Box' },
                ].map(cad => (
                  <button
                    key={cad.id}
                    onClick={() => setCadence(cad.id as any)}
                    className={`w-full px-3 py-2 text-xs text-left rounded-lg border transition-colors flex items-center justify-between ${
                      cadence === cad.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span>{cad.label}</span>
                    <span className="w-2 h-2 rounded-full border border-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                {language === 'en' ? '4. Eco-Packaging Choice' : '4. இயற்கை பேக்கிங் முறை'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'palm_leaf', label: 'Traditional Woven Palm Leaf Basket (Free)' },
                  { id: 'cotton_bag', label: 'Reusable Organic Khadi Cotton Pouch (Free)' },
                ].map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => setPackaging(pkg.id as any)}
                    className={`w-full px-3 py-2 text-xs text-left rounded-lg border transition-colors flex items-center justify-between ${
                      packaging === pkg.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span className="truncate">{pkg.label}</span>
                    <span className="w-2 h-2 rounded-full border border-current shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-500">
                {tier.title} · {tier.weight}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-stone-900">₹{tier.price}</span>
                <span className="text-sm text-stone-400 line-through font-mono">₹{tier.originalPrice}</span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Free Morning Delivery Included
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToBasket}
              className={`w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-900 hover:bg-emerald-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === 'en' ? 'Basket Added to Cart!' : 'கூடை சேர்க்கப்பட்டது!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{language === 'en' ? 'Add Farm Box to Basket' : 'கூடையை சேர்க்கவும்'}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
