/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesOverview } from './components/CategoriesOverview';
import { MenuSection } from './components/MenuSection';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { OrderModal } from './components/OrderModal';
import { AboutUs } from './components/AboutUs';
import { OnlineOrderingNotice } from './components/OnlineOrderingNotice';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { MenuSectionItem, MenuItem } from './utils/menuData';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lightboxSection, setLightboxSection] = useState<MenuSectionItem | null>(null);
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [selectedOrderItem, setSelectedOrderItem] = useState<MenuItem | null>(null);

  // Monitor scroll position to update active navbar item
  useEffect(() => {
    const sectionIds = ['home', 'sections', 'menu', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSections = () => {
    const secEl = document.getElementById('sections');
    if (secEl) {
      secEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSectionFromOverview = (sectionId: string) => {
    setSelectedFilter(sectionId);
    const targetElement = document.getElementById(`menu-${sectionId}`) || document.getElementById('menu');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col font-sans overflow-x-hidden w-full max-w-full" dir="rtl">
      {/* Fixed Navigation Header */}
      <Navbar
        onNavigateToMenu={scrollToMenu}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onExploreSections={scrollToSections}
        />

        {/* 2. Overview of Main Categories */}
        <CategoriesOverview
          onSelectSection={handleSelectSectionFromOverview}
          onOpenLightbox={(sec) => setLightboxSection(sec)}
        />

        {/* 3. Detailed Menu Section with Individual Items & High-Res Image Sheets */}
        <MenuSection
          onOpenLightbox={(sec) => setLightboxSection(sec)}
          selectedFilter={selectedFilter}
          onFilterChange={(filter) => setSelectedFilter(filter)}
          onOpenDetails={(item) => setSelectedDetailItem(item)}
          onOrderNow={(item) => setSelectedOrderItem(item)}
        />

        {/* 4. Upcoming Online Ordering Preview Notice */}
        <OnlineOrderingNotice />

        {/* 5. About Us / Brand Story */}
        <AboutUs />

        {/* 6. Contact Us & Social Links */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Interactive Fullscreen Image Lightbox & Zoom Modal */}
      {lightboxSection && (
        <ImageLightboxModal
          currentSection={lightboxSection}
          onClose={() => setLightboxSection(null)}
          onSelectSection={(sec) => setLightboxSection(sec)}
        />
      )}

      {/* Item Details Modal */}
      {selectedDetailItem && (
        <ItemDetailsModal
          item={selectedDetailItem}
          onClose={() => setSelectedDetailItem(null)}
          onOrderNow={(item) => {
            setSelectedDetailItem(null);
            setSelectedOrderItem(item);
          }}
        />
      )}

      {/* Item Order Now Modal */}
      {selectedOrderItem && (
        <OrderModal
          item={selectedOrderItem}
          onClose={() => setSelectedOrderItem(null)}
        />
      )}
    </div>
  );
}
