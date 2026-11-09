import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, PhoneCall, ChevronLeft } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/menuData';

interface NavbarProps {
  onNavigateToMenu: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToMenu, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home', id: 'home' },
    { name: 'أقسامنا', href: '#sections', id: 'sections' },
    { name: 'قائمة الطعام', href: '#menu', id: 'menu' },
    { name: 'من نحن', href: '#about', id: 'about' },
    { name: 'تواصل معنا', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0a09]/95 backdrop-blur-md border-b border-stone-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Zone */}
          <a
            href="#home"
            className="flex items-center gap-3.5 group shrink-0"
            aria-label="الرئيسية - مطاعم كت كاك"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-lg shadow-red-950/40 bg-stone-900 shrink-0 transition-transform group-hover:scale-105">
              <img
                src={RESTAURANT_INFO.logo}
                alt="شعار مطاعم كت كاك KET KAK"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>كت كاك</span>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                  KET KAK
                </span>
              </span>
              <span className="text-[11px] text-stone-400 font-medium">سلسلة مطاعم النكهة الأصيلة</span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Single-line, desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`transition-colors whitespace-nowrap py-1 relative ${
                    isActive
                      ? 'text-amber-400 font-bold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToMenu}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 rounded-xl shadow-lg shadow-red-900/30 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-400/20"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-200" />
              <span>استعرض المنيو</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900/80 text-stone-200 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-950/98 border-b border-stone-800 px-4 pt-4 pb-6 mt-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-stone-200 hover:bg-stone-900 hover:text-amber-400 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronLeft className="w-4 h-4 text-stone-500" />
              </a>
            ))}
            <div className="pt-2 border-t border-stone-800/80 mt-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToMenu();
                }}
                className="w-full py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-200" />
                <span>استعراض قائمة الطعام بالكامل</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
