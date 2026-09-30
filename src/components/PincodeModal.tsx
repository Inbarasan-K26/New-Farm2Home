import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, Clock } from 'lucide-react';

interface PincodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPincode: string;
  onSavePincode: (pin: string) => void;
  language: 'en' | 'ta';
}

export const PincodeModal: React.FC<PincodeModalProps> = ({
  isOpen,
  onClose,
  currentPincode,
  onSavePincode,
  language,
}) => {
  if (!isOpen) return null;

  const [pin, setPin] = useState(currentPincode || '');
  const [status, setStatus] = useState<'idle' | 'success' | 'invalid'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim().length === 6 && /^\d+$/.test(pin)) {
      setStatus('success');
      onSavePincode(pin);
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setStatus('invalid');
    }
  };

  const sampleHubs = [
    { city: 'Chennai (Central & South)', pin: '600028', slot: '6:00 AM Dawn Delivery' },
    { city: 'Coimbatore & Pollachi', pin: '641001', slot: '5:30 AM Farm Gate Route' },
    { city: 'Madurai & Dindigul', pin: '625001', slot: '6:30 AM Sunrise Express' },
    { city: 'Trichy & Thanjavur', pin: '620001', slot: '6:00 AM Delta Fresh Run' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 relative"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-800" />
            <h2 className="text-base font-display font-bold text-stone-900">
              {language === 'en' ? 'Check Doorstep Delivery' : 'டெலிவரி பகுதியை தேர்வு செய்க'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <p className="text-xs text-stone-600">
            {language === 'en'
              ? 'Enter your 6-digit PIN code to check morning dawn delivery routes and fresh harvest availability.'
              : 'உங்கள் பகுதிக்கான காலை டெலிவரி நேரத்தை அறிய 6 இலக்க பின்கோடை உள்ளிடவும்.'}
          </p>

          <form onSubmit={handleVerify} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, ''));
                  setStatus('idle');
                }}
                className="flex-1 px-3.5 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors"
              >
                {language === 'en' ? 'Check Area' : 'சரிபார்க்க'}
              </button>
            </div>

            {status === 'success' && (
              <div className="p-3 bg-emerald-50 text-emerald-900 text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  {language === 'en'
                    ? `Great! PIN ${pin} is covered under Dawn Express routes.`
                    : `வாழ்த்துகள்! ${pin} பகுதிக்கு அதிகாலை டெலிவரி வசதி உள்ளது.`}
                </span>
              </div>
            )}

            {status === 'invalid' && (
              <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-xl border border-rose-200">
                Please enter a valid 6-digit postal code.
              </div>
            )}
          </form>

          {/* Quick Select Popular Hubs */}
          <div className="pt-3 border-t border-stone-100">
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Popular Direct Farm Delivery Hubs
            </div>
            <div className="space-y-2">
              {sampleHubs.map(hub => (
                <button
                  key={hub.pin}
                  onClick={() => {
                    setPin(hub.pin);
                    onSavePincode(hub.pin);
                    setStatus('success');
                    setTimeout(onClose, 800);
                  }}
                  className="w-full p-2.5 text-xs rounded-lg border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/40 text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-stone-900">{hub.city}</span>
                    <span className="text-stone-400 font-mono ml-2">({hub.pin})</span>
                  </div>
                  <span className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{hub.slot}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
