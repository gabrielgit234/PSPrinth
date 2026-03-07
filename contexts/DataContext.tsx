import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Mod, Skin } from '../types';
import { MOCK_SKINS, MOCK_MODS } from '../constants';

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
  const [mods, setMods] = useState<Mod[]>(MOCK_MODS);
  const [skins, setSkins] = useState<Skin[]>(MOCK_SKINS);

  useEffect(() => {
    // Optional: Try to fetch fresh data, but we already have MOCK_MODS as initial state
    fetch('/api/mods')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Network response was not ok');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMods(data);
        }
      })
      .catch(err => {
        console.log('Using static mod data (API not available or failed)');
      });
  }, []);

  const addMod = (newMod: Mod) => {
    setMods(prev => [newMod, ...prev]);
  };

  const addSkin = (newSkin: Skin) => {
    setSkins(prev => [newSkin, ...prev]);
  };

  const incrementDownload = (id: string) => {
    // Optimistic update
    setMods(prev => prev.map(m => m.id === id ? { ...m, downloads: m.downloads + 1 } : m));
    
    fetch(`/api/mods/${id}/download`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Confirm with server data if needed, but optimistic update is usually enough for UI
          // setMods(prev => prev.map(m => m.id === id ? { ...m, downloads: data.downloads } : m));
        }
      })
      .catch(err => console.error('Failed to update download count on server:', err));
  };

  const toggleLike = (id: string) => {
    // Optimistic update
    setMods(prev => prev.map(m => m.id === id ? { ...m, follows: m.follows + 1 } : m));

    fetch(`/api/mods/${id}/like`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
           // setMods(prev => prev.map(m => m.id === id ? { ...m, follows: data.follows } : m));
        }
      })
      .catch(err => console.error('Failed to update like count on server:', err));
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