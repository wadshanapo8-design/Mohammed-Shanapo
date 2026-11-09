import React from 'react';
import { Sparkles, CheckCircle, Flame, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/menuData';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0c0a09] relative border-t border-stone-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Side with Brand Logo & Feature Badges */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              
              <div className="rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
                
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-4 border-amber-500/80 shadow-2xl mb-5 bg-stone-900">
                  <img
                    src={RESTAURANT_INFO.logo}
                    alt="شعار مطاعم كت كاك KET KAK"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5">
                  سلسلة مطاعم كت كاك
                </h3>
                <p className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-6">
                  KET KAK RESTAURANT CHAIN
                </p>

                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800">
                    <Flame className="w-5 h-5 text-red-500 mb-1.5" />
                    <h4 className="text-xs font-bold text-white mb-1">طعم مقرمش وشهي</h4>
                    <p className="text-[11px] text-stone-400 leading-normal">بروست ذهبي متبل بعناية ومشاوي طازجة</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800">
                    <UtensilsCrossed className="w-5 h-5 text-amber-500 mb-1.5" />
                    <h4 className="text-xs font-bold text-white mb-1">تشكيلة شاملة</h4>
                    <p className="text-[11px] text-stone-400 leading-normal">خيارات متنوعة من البيتزا والعصائر والموهيتو</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-right order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-3.5 py-1 rounded-full border border-amber-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>نبذة عن مطاعم كت كاك</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">
              مرحباً بكم في <span className="text-amber-400">كت كاك – KET KAK</span>
            </h2>

            <p className="text-stone-300 text-base leading-relaxed mb-5">
              تختص <strong>سلسلة مطاعم كت كاك (KET KAK)</strong> بتقديم أشهى وجبات البروست المقرمش، المشاوي، البيتزا المتنوعة، والعصائر الطبيعية المنعشة، حيث نسعى دائماً إلى توفير تجربة طعام مميزة بطعم أصيل يرضي ذوقكم.
            </p>

            <p className="text-stone-300 text-base leading-relaxed mb-8">
              سواء كنتم تبحثون عن وجبة بروست ساخنة ومقرمشة، أو طلب مشوي كامل أو نصف مشوي مع الشيش طاووق، أو بيتزا مخبوزة طازجة مع أشهى الصلصات، ستجدون في قائمة كت كاك خيارات متنوعة ومناسبة لجميع الأوقات والتجمعات العائلية.
            </p>

            {/* Core Values Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 border-t border-stone-800/80">
              {RESTAURANT_INFO.features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                    <p className="text-xs text-stone-400 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
