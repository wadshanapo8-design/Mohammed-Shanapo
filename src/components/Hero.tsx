import React from 'react';
import { UtensilsCrossed, Flame, Sparkles, ChevronDown, Award, Clock, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/menuData';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreSections: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExploreSections }) => {
  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-radial from-[#1c130d] via-[#100d0b] to-[#080706]">
      {/* Decorative ambient glow orbs matching brand colors */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle food geometric texture pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#272320_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Brand Kicker / Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>مرحباً بكم في سلسلة مطاعم كت كاك - KET KAK</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-tight lg:leading-[1.18] tracking-tight mb-5">
              طعم القرمشة الأصلي،{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-orange-400 to-red-500">
                وأشهى المشاوي والبيتزا
              </span>{' '}
              على أصولها
            </h1>

            {/* Marketing Slogan */}
            <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
              نقدم لكم ألذ خلطات البروست المقرمش بتتبيلتنا السرية الفريدة، والمشاوي الطازجة المطهوة على الفحم، والبيتزا الساخنة الغنية بالنكهات، مع تشكيلة واسعة من العصائر والموهيتو الطبيعي.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-base shadow-xl shadow-red-950/50 hover:shadow-red-900/40 transition-all transform active:scale-98 flex items-center justify-center gap-3 cursor-pointer border border-amber-300/30"
              >
                <UtensilsCrossed className="w-5 h-5 text-amber-200" />
                <span>استعراض قائمة الطعام</span>
              </button>

              <button
                onClick={onExploreSections}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white font-semibold text-base border border-stone-700/80 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>استكشف أقسامنا</span>
                <ChevronDown className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Trust highlights row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 w-full text-stone-300 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>بروست ذهبي مقرمش</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-red-400 shrink-0" />
                <span>مشاوي وبيتزا طازجة</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-orange-400 shrink-0" />
                <span>تحضير ساخن عند الطلب</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative ring glowing */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-red-600 via-amber-500 to-orange-500 opacity-60 blur-lg" />
              
              <div className="relative rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8 border border-stone-800 shadow-2xl flex flex-col items-center text-center">
                
                {/* Official Logo Display */}
                <div className="relative mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-amber-500/90 shadow-2xl shadow-red-950/60 bg-stone-900">
                    <img
                      src={RESTAURANT_INFO.logo}
                      alt="شعار كت كاك الرسمي KET KAK"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Badge over logo */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black px-3.5 py-1 rounded-full border border-amber-300/40 shadow-md whitespace-nowrap">
                    KET KAK
                  </div>
                </div>

                {/* Subtitle & identity */}
                <h2 className="text-2xl font-black text-white mb-2">
                  سلسلة مطاعم كت كاك
                </h2>
                <p className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-4">
                  Original Recipe & Taste
                </p>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
                  خبرة في تقديم أشهى وجبات البروست المقرمش، المشاوي الشهية، وألذ أنواع البيتزا والعصائر الطازجة.
                </p>

                {/* Quick 3 Category Pill Strip */}
                <div className="grid grid-cols-3 gap-2 w-full pt-4 border-t border-stone-800/80 text-xs font-bold text-stone-300">
                  <div className="py-2 px-1 bg-stone-900/90 rounded-lg border border-stone-800 hover:border-red-500/40 transition-colors">
                    بروست ومشاوي
                  </div>
                  <div className="py-2 px-1 bg-stone-900/90 rounded-lg border border-stone-800 hover:border-amber-500/40 transition-colors">
                    بيتزا وكلزوني
                  </div>
                  <div className="py-2 px-1 bg-stone-900/90 rounded-lg border border-stone-800 hover:border-orange-500/40 transition-colors">
                    عصائر طبيعية
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
