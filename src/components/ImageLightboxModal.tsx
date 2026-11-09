import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { MENU_SECTIONS, MenuSectionItem, calculateZoom, clampPanPosition } from '../utils/menuData';

interface ImageLightboxModalProps {
  currentSection: MenuSectionItem | null;
  onClose: () => void;
  onSelectSection: (section: MenuSectionItem) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  currentSection,
  onClose,
  onSelectSection,
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const posStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTapRef = useRef<number>(0);

  // Reset zoom & pan when image changes or modal opens
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [currentSection]);

  // Handle keyboard events (ESC, Left, Right, +/-)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToPrevious();
      } else if (e.key === 'ArrowLeft') {
        goToNext();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, zoom]);

  if (!currentSection) return null;

  const currentIndex = MENU_SECTIONS.findIndex((s) => s.id === currentSection.id);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % MENU_SECTIONS.length;
    onSelectSection(MENU_SECTIONS[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + MENU_SECTIONS.length) % MENU_SECTIONS.length;
    onSelectSection(MENU_SECTIONS[prevIndex]);
  };

  const getViewportDimensions = () => {
    if (viewportRef.current) {
      return {
        width: viewportRef.current.clientWidth,
        height: viewportRef.current.clientHeight,
      };
    }
    return { width: window.innerWidth, height: window.innerHeight * 0.8 };
  };

  const handleZoomIn = () => {
    setZoom((prev) => {
      const next = calculateZoom(prev, 0.25);
      const dims = getViewportDimensions();
      setPosition((pos) => clampPanPosition(pos.x, pos.y, next, dims.width, dims.height));
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = calculateZoom(prev, -0.25);
      if (next <= 1) {
        setPosition({ x: 0, y: 0 });
      } else {
        const dims = getViewportDimensions();
        setPosition((pos) => clampPanPosition(pos.x, pos.y, next, dims.width, dims.height));
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Double-tap or double-click to quickly toggle 1x / 2x zoom
  const handleDoubleAction = () => {
    if (zoom > 1) {
      handleResetZoom();
    } else {
      setZoom(2);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Pointer Events for combined Mouse & Touch drag handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Check for quick double tap
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      handleDoubleAction();
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;

    if (zoom <= 1) return;

    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if not supported on target
    }

    setIsDragging(true);
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    posStartRef.current = { x: position.x, y: position.y };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || zoom <= 1) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;
    const rawX = posStartRef.current.x + deltaX;
    const rawY = posStartRef.current.y + deltaY;

    const dims = getViewportDimensions();
    const clamped = clampPanPosition(rawX, rawY, zoom, dims.width, dims.height);
    setPosition(clamped);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 select-none overflow-hidden touch-none"
      role="dialog"
      aria-modal="true"
      aria-label={`عرض صورة قائمة ${currentSection.title}`}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-stone-950/95 border-b border-stone-800 text-white z-20">
        
        {/* Title & Section Tag */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-500/50 bg-stone-900 shrink-0">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_5.57.52_PM__3__b1bd6a9f.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="truncate">
            <h2 className="text-sm sm:text-lg font-bold text-white flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="truncate">{currentSection.title}</span>
              <span className="text-[11px] text-stone-400 font-normal hidden md:inline">({currentSection.englishTitle})</span>
            </h2>
            <p className="text-[10px] sm:text-xs text-amber-400 truncate">قائمة الأسعار والأصناف الأصلية المعتمدة</p>
          </div>
        </div>

        {/* Zoom Controls & Close Action (Mobile-friendly >= 44px touch targets) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            className="min-h-[44px] min-w-[44px] px-2.5 sm:px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 active:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="تكبير (+)"
            aria-label="تكبير الصورة"
          >
            <ZoomIn className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">تكبير</span>
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className={`min-h-[44px] min-w-[44px] px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              zoom <= 1
                ? 'bg-stone-900/40 border-stone-800 text-stone-600 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-stone-800 active:bg-stone-700 border-stone-700 text-stone-200 hover:text-white'
            }`}
            title="تصغير (-)"
            aria-label="تصغير الصورة"
          >
            <ZoomOut className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">تصغير</span>
          </button>

          {/* Reset Zoom */}
          <button
            onClick={handleResetZoom}
            className="min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 active:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            title="إعادة التعيين إلى 100% (اضغط 0)"
            aria-label="إعادة ضبط الحجم"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="text-amber-400 font-mono font-bold text-xs whitespace-nowrap">
              {Math.round(zoom * 100)}%
            </span>
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-red-600/90 hover:bg-red-600 active:bg-red-700 text-white transition-colors cursor-pointer mr-1 shadow-md flex items-center justify-center"
            title="إغلاق (Esc)"
            aria-label="إغلاق نافذة العرض"
          >
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

      </div>

      {/* Main Viewport for Pan & Zoom with Pointer Events */}
      <div
        ref={viewportRef}
        className={`relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden ${
          zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Next / Previous floating navigation arrows (min touch size 44px) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 min-h-[44px] min-w-[44px] p-2.5 sm:p-3 rounded-full bg-stone-900/85 hover:bg-red-600 text-white border border-stone-700/80 hover:border-red-400 shadow-2xl transition-all cursor-pointer backdrop-blur-md flex items-center justify-center"
          aria-label="القائمة السابقة"
          title="القائمة السابقة"
        >
          <ChevronRight className="w-6 h-6 shrink-0" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 min-h-[44px] min-w-[44px] p-2.5 sm:p-3 rounded-full bg-stone-900/85 hover:bg-red-600 text-white border border-stone-700/80 hover:border-red-400 shadow-2xl transition-all cursor-pointer backdrop-blur-md flex items-center justify-center"
          aria-label="القائمة التالية"
          title="القائمة التالية"
        >
          <ChevronLeft className="w-6 h-6 shrink-0" />
        </button>

        {/* The Menu Image itself */}
        <div
          className="transition-transform duration-75 ease-out max-h-full max-w-full flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={currentSection.image}
            alt={currentSection.title}
            className="max-h-[72vh] sm:max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl border border-stone-800 pointer-events-auto"
            draggable={false}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Helper Hint */}
        {zoom > 1 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-stone-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700 text-[11px] text-stone-300 pointer-events-none flex items-center gap-1.5 shadow-lg">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>اسحب بالماوس أو اللمس للتحريك والتنقل بين الأسعار</span>
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Bar to Switch Easily Between All 3 Menus */}
      <div className="bg-stone-950/95 border-t border-stone-800/90 px-3 py-2.5 z-20">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
          {MENU_SECTIONS.map((sec) => {
            const isSelected = sec.id === currentSection.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec)}
                className={`min-h-[44px] flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-bold ${
                  isSelected
                    ? 'bg-red-950/80 border-red-500 text-white shadow-lg shadow-red-950/50'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <div className="w-6 h-8 rounded overflow-hidden bg-stone-950 shrink-0 border border-stone-700">
                  <img
                    src={sec.image}
                    alt={sec.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="whitespace-nowrap">{sec.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
