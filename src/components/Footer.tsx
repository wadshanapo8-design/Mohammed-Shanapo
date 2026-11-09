import React from 'react';
import { ArrowUp, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/menuData';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="bg-[#070605] border-t border-stone-800/90 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          
          {/* Brand info */}
          <div className="md:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-lg bg-stone-900 shrink-0">
              <img
                src={RESTAURANT_INFO.logo}
                alt="شعار كت كاك"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-xl font-black text-white flex items-center gap-2">
                <span>سلسلة مطاعم كت كاك</span>
                <span className="text-xs text-amber-400 font-mono">KET KAK</span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                البروست المقرمش • المشاوي على الفحم • البيتزا الإيطالية • العصائر الطبيعية
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-5 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-stone-300">
            <a href="#home" className="hover:text-amber-400 transition-colors">الرئيسية</a>
            <a href="#sections" className="hover:text-amber-400 transition-colors">أقسامنا</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">قائمة الطعام</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">من نحن</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">تواصل معنا</a>
          </div>

          {/* Back to top button */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={onScrollToTop}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
              aria-label="العودة إلى أعلى الصفحة"
            >
              <span>للأعلى</span>
              <ArrowUp className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} سلسلة مطاعم كت كاك (KET KAK).
          </p>
          <p className="font-mono text-[11px] text-stone-400">
            طعم لا يُقاوم وجودة تستحق الثقة
          </p>
        </div>
      </div>
    </footer>
  );
};
