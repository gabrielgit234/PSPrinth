import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Mod, Skin } from '../types';
import { MOCK_SKINS } from '../constants';

interface DataContextType {
  mods: Mod[];
  skins: Skin[];
  addMod: (mod: Mod) => void;
  addSkin: (skin: Skin) => void;
  incrementDownload: (id: string) => void;
  toggleLike: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mods, setMods] = useState<Mod[]>([]);
  const [skins, setSkins] = useState<Skin[]>(MOCK_SKINS);

  useEffect(() => {
    fetch('/api/mods')
      .then(res => res.json())
      .then(data => setMods(data))
      .catch(err => console.error('Failed to fetch mods:', err));
  }, []);

  const addMod = (newMod: Mod) => {
    setMods(prev => [newMod, ...prev]);
  };

  const addSkin = (newSkin: Skin) => {
    setSkins(prev => [newSkin, ...prev]);
  };

  const incrementDownload = (id: string) => {
    fetch(`/api/mods/${id}/download`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMods(prev => prev.map(m => m.id === id ? { ...m, downloads: data.downloads } : m));
        }
      })
      .catch(err => console.error('Failed to update download count:', err));
  };

  const toggleLike = (id: string) => {
    fetch(`/api/mods/${id}/like`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMods(prev => prev.map(m => m.id === id ? { ...m, follows: data.follows } : m));
        }
      })
      .catch(err => console.error('Failed to update like count:', err));
  };

  return (
    <DataContext.Provider value={{ mods, skins, addMod, addSkin, incrementDownload, toggleLike }}>
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