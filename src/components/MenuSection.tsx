import React, { useState, useMemo } from 'react';
import {
  ZoomIn,
  Utensils,
  Drumstick,
  Pizza,
  GlassWater,
  Sparkles,
  Eye,
  CheckCircle2,
  Search,
  ShoppingBag,
  Info,
  X,
  FileImage,
  Layers,
} from 'lucide-react';
import {
  MENU_SECTIONS,
  INDIVIDUAL_MENU_ITEMS,
  MenuSectionItem,
  MenuItem,
  filterMenuItems,
} from '../utils/menuData';

interface MenuSectionProps {
  onOpenLightbox: (section: MenuSectionItem) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onOpenDetails: (item: MenuItem) => void;
  onOrderNow: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onOpenLightbox,
  selectedFilter,
  onFilterChange,
  onOpenDetails,
  onOrderNow,
}) => {
  // View mode: 'items' (individual item cards with Order Now & Details) OR 'sheets' (original menu pictures)
  const [viewMode, setViewMode] = useState<'items' | 'sheets'>('items');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on active category and search input
  const filteredItems = useMemo(() => {
    return filterMenuItems(INDIVIDUAL_MENU_ITEMS, selectedFilter, searchQuery);
  }, [selectedFilter, searchQuery]);

  const displayedSections =
    selectedFilter === 'all'
      ? MENU_SECTIONS
      : MENU_SECTIONS.filter((s) => s.id === selectedFilter);

  const getFilterIcon = (id: string) => {
    switch (id) {
      case 'all':
        return <Utensils className="w-4 h-4" />;
      case 'broast-grill':
        return <Drumstick className="w-4 h-4" />;
      case 'pizza':
        return <Pizza className="w-4 h-4" />;
      case 'juices':
        return <GlassWater className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <section id="menu" className="py-20 bg-[#080706] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-red-950/20 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/40 px-3.5 py-1 rounded-full border border-red-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>قائمة طعام مطاعم كت كاك المعتمدة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            قائمة الأصناف <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-red-500">والأسعار الرسمية</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            استعرض جميع أصناف البروست، المشاوي، البيتزا، والعصائر بالتفاصيل الدقيقة والأسعار الرسمية المعتمدة مع إمكانية الطلب المباشر.
          </p>
        </div>

        {/* View Mode Switcher (Tab Toggle between Individual Items & Original Menu Sheets) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-stone-900/90 rounded-2xl border border-stone-800 shadow-xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode('items')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] ${
                viewMode === 'items'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/50'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>عرض الأصناف والطلب الفوري ({INDIVIDUAL_MENU_ITEMS.length} صنف)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('sheets')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] ${
                viewMode === 'sheets'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/50'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <FileImage className="w-4 h-4 text-amber-300" />
              <span>عرض القوائم الأصلية المصورة (3 قوائم)</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 p-2 bg-stone-900/80 backdrop-blur-md rounded-2xl border border-stone-800/80 max-w-2xl mx-auto shadow-xl">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[44px] ${
              selectedFilter === 'all'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-950/40'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            {getFilterIcon('all')}
            <span>جميع الأقسام</span>
          </button>

          {MENU_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onFilterChange(section.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[44px] ${
                selectedFilter === section.id
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-950/40'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              {getFilterIcon(section.id)}
              <span>{section.title}</span>
            </button>
          ))}
        </div>

        {/* View Mode 1: Individual Items Grid */}
        {viewMode === 'items' && (
          <div>
            {/* Real-time Search Input */}
            <div className="max-w-md mx-auto mb-10 relative">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-stone-400 absolute right-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن صنفك المفضل (مثال: بروست، بيتزا، موهيتو...)"
                  className="w-full pr-12 pl-10 py-3 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-500 shadow-inner text-right min-h-[48px]"
                  aria-label="البحث في قائمة الطعام"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
                    aria-label="مسح البحث"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center text-xs text-stone-400 mt-2 px-2">
                <span>النتائج المعروضة: <strong className="text-amber-400 font-mono">{filteredItems.length}</strong> صنف</span>
                {searchQuery && (
                  <span>تصفية بحسب: &quot;{searchQuery}&quot;</span>
                )}
              </div>
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-3xl bg-gradient-to-b from-stone-900/95 to-stone-950/95 border border-stone-800/90 hover:border-amber-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between hover:-translate-y-1"
                  >
                    {/* Item Top: Image & Badges */}
                    <div>
                      <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden cursor-pointer" onClick={() => onOpenDetails(item)}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                        {/* Badges on Image */}
                        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 max-w-[85%]">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 shadow-md">
                            {item.categoryTitle}
                          </span>
                          {item.badge && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-md">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Quick View overlay hint */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-bold text-white bg-stone-900/90 px-3 py-1.5 rounded-xl border border-stone-700 shadow-lg flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-amber-400" />
                            <span>عرض التفاصيل</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5">
                        <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors mb-1 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-2.5 truncate">
                          {item.englishName}
                        </p>

                        <p className="text-xs text-stone-300 leading-relaxed line-clamp-2 mb-4 h-9">
                          {item.description}
                        </p>

                        {/* Price Tag Strip */}
                        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-stone-400 font-semibold">
                            {item.sizes && item.sizes.length > 1 ? 'الأسعار تبدأ من:' : 'السعر المعتمد:'}
                          </span>
                          <div className="text-right">
                            <span className="text-base font-black font-mono text-amber-400 tabular-nums">
                              {item.priceDisplay}
                            </span>
                          </div>
                        </div>

                        {/* Sizes Pill Preview if multiple */}
                        {item.sizes && item.sizes.length > 1 && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {item.sizes.slice(0, 3).map((s, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-stone-800/80 text-stone-300 font-medium"
                              >
                                {s.name}: {s.price}
                              </span>
                            ))}
                            {item.sizes.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-800/80 text-stone-400">
                                +{item.sizes.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Buttons: Details Button & Order Now Button */}
                    <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => onOpenDetails(item)}
                        className="min-h-[44px] py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-stone-700"
                        aria-label={`تفاصيل ${item.name}`}
                      >
                        <Info className="w-4 h-4 text-amber-400" />
                        <span>التفاصيل</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOrderNow(item)}
                        className="min-h-[44px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-xs transition-all shadow-md shadow-red-950/40 flex items-center justify-center gap-1.5 cursor-pointer border border-amber-300/30 active:scale-95"
                        aria-label={`اطلب ${item.name} الآن`}
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>اطلب الآن</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-stone-900/50 rounded-3xl border border-stone-800 max-w-md mx-auto">
                <Utensils className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">لا توجد نتائج مطابقة</h4>
                <p className="text-stone-400 text-xs mb-4">
                  لم نجد أي صنف يطابق &quot;{searchQuery}&quot; في هذا القسم.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onFilterChange('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  إعادة ضبط البحث والتصنيفات
                </button>
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Original High-Res Menu Sheets with Lightbox */}
        {viewMode === 'sheets' && (
          <div className="space-y-16">
            {displayedSections.map((section, index) => (
              <div
                key={section.id}
                id={`menu-${section.id}`}
                className="rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/95 border border-stone-800/90 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative side accent glow */}
                <div
                  className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 ${
                    section.id === 'broast-grill'
                      ? 'bg-red-600'
                      : section.id === 'pizza'
                      ? 'bg-amber-500'
                      : 'bg-orange-500'
                  }`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Column 1: Info, Highlights, & Call to Action */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full text-right order-2 lg:order-1">
                    <div>
                      {/* Badge & Index */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600/30 text-red-400 border border-red-500/30">
                          {section.badge}
                        </span>
                        <span className="text-xs font-mono text-stone-500 font-bold uppercase">
                          {section.englishTitle}
                        </span>
                      </div>

                      {/* Section Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
                        {section.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-amber-400 text-sm font-semibold mb-5">
                        {section.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                        {section.description}
                      </p>

                      {/* Highlights from the sheet */}
                      <div className="space-y-3 mb-8 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                          أبرز ما تجده في هذه القائمة:
                        </h4>
                        {section.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions: Zoom Sheet OR View Individual Items */}
                    <div className="pt-2 space-y-3">
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(section)}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-red-950/40 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-amber-300/30 min-h-[44px]"
                      >
                        <ZoomIn className="w-5 h-5 text-amber-200" />
                        <span>تكبير القائمة وتصفح الأسعار بوضوح</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setViewMode('items');
                          onFilterChange(section.id);
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>استعراض أصناف هذا القسم والطلب الفوري</span>
                      </button>
                    </div>
                  </div>

                  {/* Column 2: The Original High-Res Menu Sheet */}
                  <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
                    <div
                      onClick={() => onOpenLightbox(section)}
                      className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-stone-800 hover:border-amber-500/60 transition-all duration-300 shadow-2xl bg-stone-950 max-w-lg w-full"
                    >
                      {/* The Menu Image */}
                      <div className="relative aspect-[3/4.2] overflow-hidden">
                        <img
                          src={section.image}
                          alt={`صورة قائمة طعام ${section.title}`}
                          className="w-full h-full object-contain bg-stone-950 transition-transform duration-500 group-hover:scale-[1.02]"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          referrerPolicy="no-referrer"
                        />

                        {/* Hover Overlay with Zoom Icon */}
                        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-white backdrop-blur-[2px]">
                          <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl border border-red-400/50 transform group-hover:scale-110 transition-transform">
                            <ZoomIn className="w-7 h-7 text-white" />
                          </div>
                          <span className="bg-stone-900/90 px-4 py-2 rounded-xl text-sm font-bold border border-stone-700 shadow-lg">
                            انقر للتكبير والتنقل
                          </span>
                        </div>
                      </div>

                      {/* Bottom Bar on the Image Card */}
                      <div className="p-3 bg-stone-950/90 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                        <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                          <Eye className="w-4 h-4" />
                          <span>القائمة الأصلية المعتمدة</span>
                        </span>
                        <span className="font-mono text-[11px]">KET KAK MENU</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
