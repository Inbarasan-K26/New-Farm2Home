import React, { useState } from 'react';
import { HeartHandshake, MapPin, Award, CheckCircle2, Sprout } from 'lucide-react';
import { FARMER_PROFILES, TRANSPARENCY_METRICS } from '../data/farmers';

interface FarmerSpotlightProps {
  language: 'en' | 'ta';
}

export const FarmerSpotlight: React.FC<FarmerSpotlightProps> = ({ language }) => {
  const [selectedFarmerId, setSelectedFarmerId] = useState(FARMER_PROFILES[0].id);

  const currentFarmer = FARMER_PROFILES.find(f => f.id === selectedFarmerId) || FARMER_PROFILES[0];

  return (
    <section id="farmers" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Direct Farm Gate Ethics' : 'நேரடி விவசாயி தொடர்பு'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            {language === 'en' ? 'Meet the Guardians of Your Soil' : 'நமது இயற்கை விவசாயிகளை அறிவோம்'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === 'en'
              ? 'We don’t buy from aggregators or wholesale commodity mandis. Every vegetable in your bag is tracked to an organic farmer who receives 83%+ of the price you pay.'
              : 'இடைத்தரகர்கள் இன்றி, பாரம்பரிய இயற்கை விவசாயிகளிடம் இருந்து நேரடியாக கொள்முதல் செய்து, நியாயமான விலையை அவர்களுக்கு வழங்குகிறோம்.'}
          </p>
        </div>

        {/* Farmer Tab Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FARMER_PROFILES.map(farmer => (
            <button
              key={farmer.id}
              onClick={() => setSelectedFarmerId(farmer.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                farmer.id === currentFarmer.id
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'en' ? farmer.name : farmer.tamilName}</span>
            </button>
          ))}
        </div>

        {/* Selected Farmer Feature Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-10 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Profile Representation */}
            <div className="lg:col-span-4 bg-gradient-to-br from-emerald-800 to-stone-900 rounded-xl p-6 text-white flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-300 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentFarmer.location}</span>
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {currentFarmer.experienceYears} Yrs Farming
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  {language === 'en' ? currentFarmer.name : currentFarmer.tamilName}
                </h3>
                <p className="text-xs text-emerald-200 mt-1">
                  {currentFarmer.cropSpecialty}
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-700/60 flex items-center justify-between text-xs">
                <span className="text-emerald-300/80">Direct Revenue Share</span>
                <span className="text-base font-bold font-mono text-amber-400">
                  {currentFarmer.fairTradePercent}%
                </span>
              </div>
            </div>

            {/* Farmer Narrative & Soil Methods */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <blockquote className="text-base sm:text-lg italic font-serif text-stone-800 leading-relaxed border-l-2 border-emerald-700 pl-4">
                "{language === 'en' ? currentFarmer.quote : currentFarmer.tamilQuote}"
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
                <div>
                  <div className="font-semibold text-stone-900 uppercase tracking-wider mb-1">
                    {language === 'en' ? 'Natural Soil Technique' : 'இயற்கை வேளாண்மை முறை'}
                  </div>
                  <p className="text-stone-600 leading-relaxed">{currentFarmer.soilMethod}</p>
                </div>
                <div>
                  <div className="font-semibold text-stone-900 uppercase tracking-wider mb-1">
                    {language === 'en' ? 'Harvest Integrity' : 'அறுவடை உறுதிமொழி'}
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Zero chemical sprays, organic natural manure, harvested fresh on order day.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section: Price Transparency Breakdown */}
        <div id="traceability" className="pt-8 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
              {language === 'en' ? 'Where Does Your ₹100 Go?' : 'உங்கள் ₹100 எங்கு செலவாகிறது?'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Compare Farm2Home Direct Gate Pricing vs Traditional Supermarket Chain Mandis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Farm2Home Model */}
            <div className="bg-emerald-950 text-white rounded-xl p-6 border border-emerald-800 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80 mb-4">
                <span className="font-bold text-sm text-emerald-300">Farm2Home Direct Model</span>
                <span className="text-xs bg-emerald-800 text-emerald-200 px-2.5 py-0.5 rounded font-semibold">
                  Transparent
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-emerald-100">Direct Farmer Remittance</span>
                    <span className="font-mono font-bold text-amber-300">₹83.50 (83.5%)</span>
                  </div>
                  <div className="w-full bg-emerald-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '83.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-emerald-100">Eco-Packaging & Temperature Transit</span>
                    <span className="font-mono text-emerald-300">₹9.50 (9.5%)</span>
                  </div>
                  <div className="w-full bg-emerald-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '9.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-emerald-100">Lab Residue Testing & Tech</span>
                    <span className="font-mono text-emerald-300">₹7.00 (7.0%)</span>
                  </div>
                  <div className="w-full bg-emerald-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full rounded-full" style={{ width: '7%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Conventional Supermarket Mandi Model */}
            <div className="bg-white rounded-xl p-6 border border-stone-200 text-stone-700 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                <span className="font-bold text-sm text-stone-800">Conventional Wholesale / Mandi</span>
                <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-semibold">
                  Middlemen Heavy
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-stone-500">
                    <span>Farmer Share</span>
                    <span className="font-mono font-bold text-rose-700">₹24.00 (24%)</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-stone-500">
                    <span>Wholesale Brokers, Commission Agents</span>
                    <span className="font-mono text-stone-700">₹42.00 (42%)</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-stone-400 h-full rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-stone-500">
                    <span>Cold Storage & Chemical Waxing Margins</span>
                    <span className="font-mono text-stone-700">₹34.00 (34%)</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-stone-400 h-full rounded-full" style={{ width: '34%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Adjacency Proof Numbers */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div className="p-4 bg-white rounded-xl border border-stone-200/80">
              <div className="text-2xl font-bold font-mono text-emerald-900">{TRANSPARENCY_METRICS.farmerShareAverage}</div>
              <div className="text-xs text-stone-500 mt-1">Average Farmer Share</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200/80">
              <div className="text-2xl font-bold font-mono text-emerald-900">{TRANSPARENCY_METRICS.harvestToDoorstepHours}</div>
              <div className="text-xs text-stone-500 mt-1">Harvest to Doorstep</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200/80">
              <div className="text-2xl font-bold font-mono text-emerald-900">{TRANSPARENCY_METRICS.plasticPackagingReducedKg}</div>
              <div className="text-xs text-stone-500 mt-1">Plastic Packaging Eliminated</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200/80">
              <div className="text-2xl font-bold font-mono text-emerald-900">{TRANSPARENCY_METRICS.pesticideFreeAreaAcres}</div>
              <div className="text-xs text-stone-500 mt-1">Certified Clean Farmland</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
