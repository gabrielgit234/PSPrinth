import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Mods } from './pages/Mods';
import { ModDetail } from './pages/ModDetail';
import { Upload } from './pages/Upload';
import { DataProvider } from './contexts/DataContext';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/textures" element={<Mods />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/mod/:id" element={<ModDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-primary selection:text-black">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          
          <footer className="bg-[#1c1c1c] border-t border-[#2d2d2d] py-8 mt-12">
              <div className="max-w-7xl mx-auto px-4 text-center">
                  <p className="text-gray-500 text-sm">
                      © 2024 PSPBlock Forge. Not affiliated with Mojang or Sony. <br/>
                      Powered by React.
                  </p>
              </div>
          </footer>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;