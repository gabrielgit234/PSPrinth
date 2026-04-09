import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Mods } from './pages/Mods';
import { ModDetail } from './pages/ModDetail';
import { Donate } from './pages/Donate';
import { Community } from './pages/Community';
import { Maker } from './pages/Maker';
import { DataProvider } from './contexts/DataContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { SettingsModal } from './components/SettingsModal';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useSettings } from './contexts/SettingsContext';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/textures" element={<Mods />} />
        <Route path="/mod/:id" element={<ModDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/maker" element={<Maker />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const { animationsEnabled } = useSettings();

  return (
    <MotionConfig reducedMotion={animationsEnabled ? "never" : "always"}>
      <Router>
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-black transition-colors duration-300">
          <Navbar />
          <SettingsModal />
          <main>
            <AnimatedRoutes />
          </main>
          
          <footer className="bg-surface border-t border-border py-8 mt-12 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 text-center">
                  <p className="text-secondary text-sm">
                      © 2026 PSPrinth not affiliated with Mojang. <br/>
                      Powered by React.
                  </p>
              </div>
          </footer>
        </div>
      </Router>
    </MotionConfig>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </DataProvider>
  );
};

export default App;