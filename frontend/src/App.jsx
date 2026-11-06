import React from 'react';
import { AppProvider } from './context/AppContext';
import { Toast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { ArticlesSection } from './components/ArticlesSection';
import { FlashcardsSection } from './components/FlashcardsSection';
import { TestsSection } from './components/TestsSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { ShopSection } from './components/ShopSection';
import { ResourcesSection } from './components/ResourcesSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { FavoritesModal } from './components/modals/FavoritesModal';
import { OrdersModal } from './components/modals/OrdersModal';
import { ReadArticleModal } from './components/modals/ReadArticleModal';
import { TakeQuizModal } from './components/modals/TakeQuizModal';
import { CoinModal } from './components/modals/CoinModal';
import { ResourceModal } from './components/modals/ResourceModal';
import { AdminDashboard } from './components/modals/AdminDashboard';

export default function App() {
  return (
    <AppProvider>
      <div id="app">
        <Toast />
        <Navbar />

        <main>
          <Hero />
          <Stats />
          <Features />
          <ArticlesSection />
          <FlashcardsSection />
          <TestsSection />
          <LeaderboardSection />
          <ShopSection />
          <ResourcesSection />
          <AboutSection />
          <FaqSection />
          <ContactSection />
        </main>

        <Footer />

        {/* Global Modals */}
        <AuthModal />
        <ProfileModal />
        <FavoritesModal />
        <OrdersModal />
        <ReadArticleModal />
        <TakeQuizModal />
        <CoinModal />
        <ResourceModal />
        <AdminDashboard />
      </div>
    </AppProvider>
  );
}
