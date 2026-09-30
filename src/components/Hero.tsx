import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreHarvest: () => void;
  onExploreBaskets: () => void;
  userPincode: string;
  setUserPincode: (pin: string) => void;
  language: 'en' | 'ta';
}

export const Hero: React.FC<HeroProps> = ({
  onExploreHarvest,
  onExploreBaskets,
  userPincode,
  setUserPincode,
  language,
}) => {
  const [inputPin, setInputPin] = useState(userPincode || '');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPin || inputPin.trim().length !== 6) {
      setPincodeMessage(language === 'en' ? 'Please enter a valid 6-digit Indian PIN code.' : 'சரியான 6 இலக்க பின்கோடை உள்ளிடவும்.');
      return;
    }
    setUserPincode(inputPin);
    setPincodeMessage(
      language === 'en'
        ? `Delivery Available! Morning Dawn Slots open for ${inputPin} (6:00 AM - 8:30 AM).`
        : `டெலிவரி உண்டு! ${inputPin} பகுதிக்கு அதிகாலை 6:00 முதல் டெலிவரி செய்யப்படுகிறது.`
    );
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80 bg-[#FAF8F5]">
      {/* Background ambient warmth */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle Dawn Harvest Live Status Bar */}
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-stone-600 bg-white/90 border border-stone-200 rounded-lg shadow-2xs mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold text-emerald-950">
            {language === 'en' ? 'Today’s Dawn Harvest' : 'இன்றைய அதிகாலை அறுவடை'}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {language === 'en' ? 'Harvested at 4:30 AM in Pollachi & Thanjavur' : 'காலை 4:30 மணிக்கு நேரடியாக பறிக்கப்பட்டது'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Campaign Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-emerald-950 tracking-tight leading-[1.12] text-balance">
              {language === 'en' ? (
                <>
                  Pure Organic Harvest, <br className="hidden sm:inline" />
                  <span className="text-emerald-800 italic font-normal">Direct from Farm</span> to Your Kitchen.
                </>
              ) : (
                <>
                  இயற்கை முறையில் விளைந்த காய்கறிகள், <br className="hidden sm:inline" />
                  <span className="text-emerald-800 italic font-normal">பண்ணையிலிருந்து நேரடியாக</span> உங்கள் சமையலறைக்கு.
                </>
              )}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl text-pretty">
              {language === 'en' ? (
                'Zero cold-storage chemical ripening, zero toxic pesticides. Harvested at first sunlight by local certified farmers and delivered to your doorstep within 6 hours.'
              ) : (
                'ரசாயனம் மற்றும் பூச்சிக்கொல்லி இல்லாத 100% இயற்கை விளைபொருட்கள். அதிகாலை அறுவடை செய்யப்பட்டு 6 மணி நேரத்திற்குள் உங்கள் வாசலில்.'
              )}
            </p>

            {/* Quick Pincode Checker */}
            <form onSubmit={handleCheckPincode} className="mt-7 max-w-md">
              <div className="flex items-center bg-white p-1 rounded-xl border border-stone-300 shadow-2xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                <input
                  type="text"
                  maxLength={6}
                  placeholder={language === 'en' ? 'Enter 6-digit Pincode (e.g. 600028)' : 'பின்கோடு உள்ளிடவும் (e.g. 600028)'}
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value.replace(/\D/g, ''));
                    setPincodeMessage(null);
                  }}
                  className="w-full px-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden bg-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {language === 'en' ? 'Check Slots' : 'சரிபார்க்க'}
                </button>
              </div>

              {pincodeMessage && (
                <p className="mt-2 text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{pincodeMessage}</span>
                </p>
              )}
            </form>

            {/* Direct Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreHarvest}
                className="px-6 py-3 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-2 group"
              >
                <span>{language === 'en' ? 'Shop Fresh Harvest' : 'காய்கறிகளை வாங்குக'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreBaskets}
                className="px-5 py-3 text-sm font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-colors"
              >
                {language === 'en' ? 'Custom Weekly Farm Box' : 'வாராந்திர பண்ணைக் கூடை'}
              </button>
            </div>

            {/* Unboxed Trust Signals */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% NPOP Certified Organic</span>
              </div>
              <span className="hidden sm:inline text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Harvested at Dawn (4:30 AM)</span>
              </div>
              <span className="hidden sm:inline text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>83.5% Directly to Farmers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Anchor (Curated Farm Produce Basket Showcase) */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-emerald-800/40">
              
              {/* Botanical watermark pattern */}
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-emerald-700/20 blur-xl pointer-events-none" />

              <div className="relative z-10">
                
                {/* Visual badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'en' ? 'Morning Harvest Spotlight' : 'இன்றைய சிறப்பு அறுவடை'}</span>
                  </div>
                  <span className="text-xs bg-emerald-800/80 text-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                    Batch #8904
                  </span>
                </div>

                <h2 className="text-2xl font-display font-bold text-white mb-1">
                  {language === 'en' ? 'Daily Family Morning Basket' : 'குடும்ப வாராந்திர பண்ணைக் கூடை'}
                </h2>
                
                <p className="text-xs text-emerald-100/80 mb-6">
                  {language === 'en'
                    ? '9 fresh items harvested today from Pollachi & Thanjavur'
                    : 'பொள்ளாச்சி மற்றும் தஞ்சை பண்ணைகளில் இன்று காலை அறுவடை செய்யப்பட்டது'}
                </p>

                {/* Produce Checklist */}
                <div className="space-y-3 bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span>Country Tomatoes (Nattu Thakkali)</span>
                    </span>
                    <span className="font-mono text-emerald-200">1.0 kg</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Murungai & Siru Keerai Greens</span>
                    </span>
                    <span className="font-mono text-emerald-200">2 bunches</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Shallots & Desi Bhendi</span>
                    </span>
                    <span className="font-mono text-emerald-200">1.0 kg</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-300" />
                      <span>Kadaladi Native Elakki Bananas</span>
                    </span>
                    <span className="font-mono text-emerald-200">1.0 kg</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-6 flex items-center justify-between pt-2">
                  <div>
                    <div className="text-[11px] text-emerald-300/80 uppercase tracking-wider font-semibold">
                      {language === 'en' ? 'Direct Farm Price' : 'பண்ணை நேரடி விலை'}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-mono text-white">₹449</span>
                      <span className="text-xs text-emerald-300/60 line-through font-mono">₹580</span>
                      <span className="text-xs text-amber-300 font-semibold">(Save 23%)</span>
                    </div>
                  </div>

                  <button
                    onClick={onExploreBaskets}
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                  >
                    {language === 'en' ? 'Customize Box' : 'கூடையை தேர்வு செய்க'}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
