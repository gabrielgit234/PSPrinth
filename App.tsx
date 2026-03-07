import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Mods } from './pages/Mods';
import { ModDetail } from './pages/ModDetail';
import { Donate } from './pages/Donate';
import { DataProvider } from './contexts/DataContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { SettingsModal } from './components/SettingsModal';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/textures" element={<Mods />} />
        <Route path="/mod/:id" element={<ModDetail />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <SettingsProvider>
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
                        © 2024 PSPBlock Forge. Not affiliated with Mojang or Sony. <br/>
                        Powered by React.
                    </p>
                </div>
            </footer>
          </div>
        </Router>
      </SettingsProvider>
    </DataProvider>
  );
};

export default App;