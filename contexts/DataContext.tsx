import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Mod, Skin } from '../types';
import { MOCK_MODS, MOCK_SKINS } from '../constants';

interface DataContextType {
  mods: Mod[];
  skins: Skin[];
  addMod: (mod: Mod) => void;
  addSkin: (skin: Skin) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mods, setMods] = useState<Mod[]>(MOCK_MODS);
  const [skins, setSkins] = useState<Skin[]>(MOCK_SKINS);

  const addMod = (newMod: Mod) => {
    setMods(prev => [newMod, ...prev]);
  };

  const addSkin = (newSkin: Skin) => {
    setSkins(prev => [newSkin, ...prev]);
  };

  return (
    <DataContext.Provider value={{ mods, skins, addMod, addSkin }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};