import React from 'react';
import { X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';

export const SettingsModal: React.FC = () => {
  const { 
    isSettingsOpen, 
    closeSettings, 
    itemsPerPage, 
    setItemsPerPage,
    primaryColor,
    setPrimaryColor,
    theme,
    toggleTheme,
    animationsEnabled,
    setAnimationsEnabled,
    compactMode,
    setCompactMode
  } = useSettings();

  const colors = [
    { name: 'Green', value: '#1bd96a' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
  ];

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeSettings}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-surface border border-border rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-center relative mb-6 sticky top-0 bg-surface z-10 pb-2 border-b border-border/50">
              <h2 className="text-xl font-bold text-text">Site Settings</h2>
              <button onClick={closeSettings} className="absolute right-0 text-secondary hover:text-text p-1 rounded-full hover:bg-surface-hover transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Theme Toggle */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-3">Appearance</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                      theme === 'light' 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-background border-border text-secondary hover:border-gray-400'
                    }`}
                  >
                    <Sun size={20} /> Light
                  </button>
                  <button
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                      theme === 'dark' 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-background border-border text-secondary hover:border-gray-400'
                    }`}
                  >
                    <Moon size={20} /> Dark
                  </button>
                </div>
              </div>

              {/* Items Per Page */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-3">Items per page</label>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="w-full bg-background text-text border border-border rounded-lg p-3 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value={5}>5 items</option>
                  <option value={10}>10 items</option>
                  <option value={20}>20 items</option>
                  <option value={50}>50 items</option>
                </select>
              </div>

              {/* Site Color */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-3">Site Color</label>
                <div className="grid grid-cols-6 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setPrimaryColor(color.value)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        primaryColor === color.value 
                          ? 'border-text scale-110' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-text font-medium">Animations</h3>
                    <p className="text-sm text-secondary">Enable UI animations and transitions</p>
                  </div>
                  <button 
                    onClick={() => setAnimationsEnabled(!animationsEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${animationsEnabled ? 'bg-primary' : 'bg-surface-hover'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${animationsEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-text font-medium">Compact Mode</h3>
                    <p className="text-sm text-secondary">Reduce padding and spacing in lists</p>
                  </div>
                  <button 
                    onClick={() => setCompactMode(!compactMode)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${compactMode ? 'bg-primary' : 'bg-surface-hover'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${compactMode ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end sticky bottom-0 bg-surface pt-4 border-t border-border/50">
              <button 
                onClick={closeSettings}
                className="bg-primary text-black font-bold py-2 px-6 rounded-lg hover:brightness-110 transition-all"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
