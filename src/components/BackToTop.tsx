import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-2xl shadow-red-950/60 hover:from-red-500 hover:to-amber-500 border border-amber-300/30 transition-all transform hover:scale-110 active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-300"
      aria-label="الرجوع إلى أعلى الصفحة"
      title="الرجوع للأعلى"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
};
