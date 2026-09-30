import React from 'react';

interface ProductCardVisualProps {
  name: string;
  iconType: 'leaf' | 'tomato' | 'carrot' | 'banana' | 'oil' | 'egg' | 'basket' | 'coconut' | 'herb';
  colorTheme: string;
  badge?: string;
  harvestTime?: string;
}

export const ProductCardVisual: React.FC<ProductCardVisualProps> = ({
  name,
  iconType,
  badge,
  harvestTime,
}) => {
  // Rich SVG botanical vector icons representing farm-fresh produce
  const renderIllustration = () => {
    switch (iconType) {
      case 'tomato':
        return (
          <svg className="w-24 h-24 text-rose-500 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Tomato body */}
            <circle cx="50" cy="54" r="34" fill="currentColor" />
            <path d="M50 20 C46 32 38 42 26 50 C20 40 26 30 36 24 Z" fill="#b91c1c" opacity="0.3" />
            <circle cx="62" cy="46" r="10" fill="#fca5a5" opacity="0.4" />
            {/* Dew drop */}
            <ellipse cx="68" cy="42" rx="3" ry="5" fill="#ffffff" opacity="0.8" />
            {/* Green calyx/stem */}
            <path d="M50 20 L50 10 M50 20 L40 16 M50 20 L60 16 M50 20 L44 26 M50 20 L56 26" stroke="#15803d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="20" r="3" fill="#166534" />
          </svg>
        );
      case 'leaf':
      case 'herb':
        return (
          <svg className="w-24 h-24 text-emerald-600 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Branch and leaves */}
            <path d="M30 85 Q 50 50 65 18" stroke="#166534" strokeWidth="3.5" strokeLinecap="round" />
            {/* Leaf 1 */}
            <path d="M65 18 C 78 22 84 38 72 45 C 60 52 52 38 65 18 Z" fill="#15803d" />
            <path d="M65 18 Q 70 32 68 40" stroke="#86efac" strokeWidth="1.5" />
            {/* Leaf 2 */}
            <path d="M52 42 C 34 38 28 52 36 62 C 44 72 56 60 52 42 Z" fill="#22c55e" />
            <path d="M52 42 Q 42 52 38 58" stroke="#bbf7d0" strokeWidth="1.5" />
            {/* Leaf 3 */}
            <path d="M42 62 C 58 64 64 78 54 84 C 44 90 36 78 42 62 Z" fill="#16a34a" />
            {/* Dew drop */}
            <circle cx="68" cy="32" r="3" fill="#ffffff" opacity="0.85" />
          </svg>
        );
      case 'banana':
        return (
          <svg className="w-24 h-24 text-amber-400 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Banana bunch */}
            <path d="M26 34 C 36 20 62 24 74 44 C 84 60 76 80 58 84 C 66 74 72 58 64 48 C 54 36 38 34 26 34 Z" fill="#f59e0b" />
            <path d="M22 42 C 32 30 56 34 68 52 C 78 66 70 84 54 86 C 62 76 66 64 58 54 C 50 44 34 42 22 42 Z" fill="#fbbf24" />
            <path d="M18 52 C 28 42 48 46 58 62 C 66 74 58 88 44 88 C 50 80 54 70 48 62 C 42 54 28 52 18 52 Z" fill="#fde047" />
            {/* Crown stem */}
            <path d="M22 36 L16 30 C 14 28 16 24 20 25 L28 28" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            {/* Natural ripening speckles */}
            <circle cx="56" cy="58" r="1.5" fill="#78350f" opacity="0.6" />
            <circle cx="62" cy="66" r="1.5" fill="#78350f" opacity="0.6" />
          </svg>
        );
      case 'coconut':
        return (
          <svg className="w-24 h-24 text-emerald-500 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Tender coconut husk */}
            <path d="M50 15 C68 15 84 32 82 58 C80 78 66 88 50 88 C34 88 20 78 18 58 C16 32 32 15 50 15 Z" fill="#10b981" />
            <path d="M50 15 C60 15 72 30 70 54 C68 72 58 82 50 82" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
            {/* Crown cut / cap */}
            <path d="M42 16 L50 8 L58 16 Z" fill="#047857" />
            <ellipse cx="50" cy="22" rx="10" ry="4" fill="#065f46" opacity="0.4" />
            {/* Water droplet */}
            <ellipse cx="40" cy="45" rx="3" ry="5" fill="#ffffff" opacity="0.8" />
          </svg>
        );
      case 'oil':
        return (
          <svg className="w-24 h-24 text-amber-500 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Glass Bottle Outline */}
            <rect x="36" y="38" width="28" height="48" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
            {/* Golden Oil Level */}
            <path d="M38 52 C44 50 56 54 62 52 L62 82 C62 84 60 86 58 86 L42 86 C40 86 38 84 38 82 Z" fill="#f59e0b" opacity="0.85" />
            {/* Bottle Neck */}
            <path d="M44 38 L44 24 L56 24 L56 38" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
            {/* Cork Stopper */}
            <rect x="42" y="16" width="16" height="8" rx="2" fill="#92400e" />
            {/* Shine reflex */}
            <line x1="42" y1="56" x2="42" y2="78" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        );
      case 'egg':
        return (
          <svg className="w-24 h-24 text-amber-200 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Native Country Egg 1 */}
            <path d="M42 22 C56 22 66 38 66 60 C66 74 54 84 42 84 C30 84 18 74 18 60 C18 38 28 22 42 22 Z" fill="#d97706" opacity="0.9" />
            {/* Native Country Egg 2 behind */}
            <path d="M62 34 C74 34 82 46 82 64 C82 76 72 84 62 84 C52 84 46 76 46 64 C46 46 50 34 62 34 Z" fill="#b45309" opacity="0.8" />
            {/* Straw nest base */}
            <path d="M14 82 C30 90 70 90 86 82 M22 86 C36 92 64 92 78 86" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            {/* Speckles */}
            <circle cx="36" cy="50" r="1.5" fill="#78350f" opacity="0.4" />
            <circle cx="48" cy="62" r="1.5" fill="#78350f" opacity="0.4" />
          </svg>
        );
      case 'basket':
        return (
          <svg className="w-24 h-24 text-emerald-800 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Woven Basket body */}
            <path d="M20 48 L28 84 C29 88 34 90 38 90 L62 90 C66 90 71 88 72 84 L80 48 Z" fill="#b45309" />
            <path d="M24 58 L76 58 M26 70 L74 70 M28 80 L72 80" stroke="#78350f" strokeWidth="2" />
            {/* Handle arch */}
            <path d="M26 48 C26 22 74 22 74 48" stroke="#92400e" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Overflowing fresh harvest inside */}
            <circle cx="40" cy="46" r="14" fill="#ef4444" /> {/* Tomato */}
            <circle cx="60" cy="44" r="12" fill="#22c55e" /> {/* Greens */}
            <ellipse cx="50" cy="38" rx="8" ry="14" fill="#f59e0b" transform="rotate(30 50 38)" /> {/* Carrot/Corn */}
            <path d="M38 34 Q 42 24 50 26" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'carrot':
      default:
        return (
          <svg className="w-24 h-24 text-orange-500 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            {/* Root vegetable / Brinjal / Shallot */}
            <path d="M50 88 C40 76 30 52 34 38 C38 24 62 24 66 38 C70 52 60 76 50 88 Z" fill="#ea580c" />
            <line x1="38" y1="46" x2="48" y2="44" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="58" x2="62" y2="56" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
            {/* Green top sprigs */}
            <path d="M50 28 L50 14 M50 28 L40 18 M50 28 L60 18" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full h-52 bg-gradient-to-b from-[#F3EFEA] to-[#EAE4DB] flex items-center justify-center overflow-hidden rounded-t-xl group">
      {/* Subtle organic soil/farm background rings */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="85%" cy="15%" r="70" fill="none" stroke="#a8a29e" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="15%" cy="85%" r="90" fill="none" stroke="#a8a29e" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
      </div>

      {/* Main Vector Botanical Illustration */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        {renderIllustration()}
      </div>

      {/* Subtle harvest timestamp pill top right */}
      {harvestTime && (
        <div className="absolute top-3 right-3 z-20 bg-stone-900/80 backdrop-blur-xs text-white/95 text-[11px] font-medium tracking-tight px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{harvestTime}</span>
        </div>
      )}

      {/* Origin / Harvest state indicator top left */}
      {badge && (
        <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-xs text-stone-800 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-stone-200/80 shadow-2xs">
          {badge}
        </div>
      )}
    </div>
  );
};
