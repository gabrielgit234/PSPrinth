import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (num: number) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#1bd96a');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  return (
    <SettingsContext.Provider value={{ 
      primaryColor, 
      setPrimaryColor, 
      itemsPerPage, 
      setItemsPerPage,
      theme,
      toggleTheme,
      isSettingsOpen,
      openSettings,
      closeSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
