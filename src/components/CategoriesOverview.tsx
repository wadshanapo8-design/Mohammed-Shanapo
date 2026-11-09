import React from 'react';
import { Drumstick, Pizza, GlassWater, ArrowLeft, ZoomIn } from 'lucide-react';
import { MENU_SECTIONS, MenuSectionItem } from '../utils/menuData';

interface CategoriesOverviewProps {
  onSelectSection: (sectionId: string) => void;
  onOpenLightbox: (section: MenuSectionItem) => void;
}

export const CategoriesOverview: React.FC<CategoriesOverviewProps> = ({
  onSelectSection,
  onOpenLightbox,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'broast-grill':
        return <Drumstick className="w-6 h-6 text-red-500" />;
      case 'pizza':
        return <Pizza className="w-6 h-6 text-amber-500" />;
      case 'juices':
        return <GlassWater className="w-6 h-6 text-orange-400" />;
      default:
        return null;
    }
  };

  return (
    <section id="sections" className="py-20 bg-[#0e0c0a] relative border-t border-stone-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20 mb-3">
            <span>تنوع يرضي كل الأذواق</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            أقسامنا الرئيسية في <span className="text-amber-400">كت كاك</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            استكشف تشكيلاتنا المتنوعة والمعدة بأعلى معايير الجودة والنكهة الفريدة، اختر القسم واستعرض قائمة طعامه الأصلية مباشرة.
          </p>
        </div>

        {/* 3 Main Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MENU_SECTIONS.map((section) => (
            <div
              key={section.id}
              className="group relative rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/20 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative h-64 overflow-hidden bg-stone-950 cursor-pointer" onClick={() => onOpenLightbox(section)}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-red-600/95 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-red-400/30">
                  {section.badge}
                </div>

                {/* English Tag */}
                <div className="absolute top-3 left-3 bg-stone-950/80 text-stone-300 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border border-stone-700">
                  {section.englishTitle}
                </div>

                {/* Quick Zoom prompt overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm">
                  <div className="bg-stone-900/90 px-3.5 py-2 rounded-xl border border-amber-400/40 flex items-center gap-2 shadow-lg">
                    <ZoomIn className="w-4 h-4 text-amber-400" />
                    <span>انقر لتكبير صورة القائمة</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60 shrink-0">
                      {getCategoryIcon(section.id)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-xs text-amber-500/90 font-medium">
                        {section.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-stone-300 text-sm leading-relaxed mb-4">
                    {section.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="space-y-1.5 mb-6 text-xs text-stone-400">
                    {section.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">✦</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-stone-800">
                  <button
                    onClick={() => onSelectSection(section.id)}
                    className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenLightbox(section)}
                    className="py-2.5 px-3 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold border border-red-500/30 hover:border-red-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>تكبير القائمة</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
