import React, { useEffect } from 'react';
import { X, ShoppingBag, CheckCircle2, Tag, Utensils, Info } from 'lucide-react';
import { MenuItem } from '../utils/menuData';

interface ItemDetailsModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOrderNow: (item: MenuItem, selectedSize?: string) => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  onClose,
  onOrderNow,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`تفاصيل صنف ${item.name}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl text-right animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Cover */}
        <div className="relative h-56 sm:h-64 bg-stone-950 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-stone-950/80 hover:bg-red-600 text-white transition-colors cursor-pointer border border-stone-700 flex items-center justify-center shadow-lg"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-stone-950 border border-amber-400">
              {item.categoryTitle}
            </span>
            {item.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white border border-red-500">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Titles */}
          <div className="mb-4">
            <h3 className="text-2xl font-black text-white mb-1">
              {item.name}
            </h3>
            <p className="text-xs font-mono text-stone-400 uppercase tracking-wider">
              {item.englishName}
            </p>
          </div>

          {/* Description */}
          <p className="text-stone-300 text-sm leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Price Breakdown / Sizes */}
          <div className="mb-6 p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>الأسعار والأحجام المعتمدة في المنيو:</span>
            </h4>

            {item.sizes && item.sizes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.sizes.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-center flex flex-col justify-between"
                  >
                    <span className="text-xs text-stone-400 font-semibold">{s.name}</span>
                    <span className="text-base font-bold font-mono text-white mt-1 tabular-nums">
                      {s.price}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-stone-300 font-semibold">السعر الرسمي:</span>
                <span className="text-2xl font-black font-mono text-amber-400 tabular-nums">
                  {item.basePrice}
                </span>
              </div>
            )}
          </div>

          {/* Details / What is included */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-red-500" />
              <span>محتويات وتحضير الصنف:</span>
            </h4>
            <div className="space-y-2">
              {item.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-800">
            <button
              onClick={() => {
                onClose();
                onOrderNow(item);
              }}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-red-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/30"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              <span>اطلب هذا الصنف الآن</span>
            </button>

            <button
              onClick={onClose}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-bold text-sm transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
