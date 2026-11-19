import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ArchitecturePage from './pages/ArchitecturePage';
import CampaignsPage from './pages/CampaignsPage';
import DomainsPage from './pages/DomainsPage';
import ConsolePage from './pages/ConsolePage';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-oled text-[#F5F5F5] flex flex-col justify-between selection:bg-emerald-cold selection:text-black">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/domains" element={<DomainsPage />} />
          <Route path="/console" element={<ConsolePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </HashRouter>
  );
};

export default App;
