
import { Mod, Skin } from './types';

export const MOCK_MODS: Mod[] = [];

export const MOCK_SKINS: Skin[] = [
  { id: '1', name: 'Steve Classic', imageUrl: 'https://raw.githubusercontent.com/minecraft-js/skinview3d/master/assets/1.8_texture.png', views: 5000, downloads: 2000, tags: ['Classic'] },
  { id: '2', name: 'Alex', imageUrl: 'https://raw.githubusercontent.com/minecraft-js/skinview3d/master/assets/alex_texture.png', views: 8900, downloads: 4500, tags: ['Slim', 'Classic'] },
  { id: '3', name: 'Technoblade', imageUrl: 'https://raw.githubusercontent.com/bs-community/skinview3d/master/examples/img/skin.png', views: 1200, downloads: 300, tags: ['Youtuber', 'Crown'] },
  { id: '4', name: 'Iron Man', imageUrl: 'https://raw.githubusercontent.com/bs-community/skinview3d/master/examples/img/ironman_texture.png', views: 15000, downloads: 8000, tags: ['Marvel', 'Hero'] },
  { id: '5', name: 'Diamond King', imageUrl: 'https://raw.githubusercontent.com/minecraft-js/skinview3d/master/assets/1.8_texture.png', views: 3200, downloads: 900, tags: ['PvP', 'Blue'] },
  { id: '6', name: 'Mudkip', imageUrl: 'https://raw.githubusercontent.com/minecraft-js/skinview3d/master/assets/alex_texture.png', views: 7600, downloads: 2100, tags: ['Pokemon', 'Blue'] },
  { id: '7', name: 'Link', imageUrl: 'https://raw.githubusercontent.com/bs-community/skinview3d/master/examples/img/skin.png', views: 9000, downloads: 4000, tags: ['Games', 'Nintendo'] },
  { id: '8', name: 'Mario', imageUrl: 'https://raw.githubusercontent.com/bs-community/skinview3d/master/examples/img/ironman_texture.png', views: 11000, downloads: 5500, tags: ['Games', 'Nintendo'] },
];

export const GEMINI_SYSTEM_INSTRUCTION = `You are an expert on Minecraft PSP Homebrew history and modding. 
You know about Lamecraft, DSP Craft, CrossCraft, and various legacy homebrews. 
You can suggest mods, explain how to install them on a PSP Memory Stick (ms0:/PSP/GAME/), and generate creative ideas for skins.
Keep responses concise and helpful.`;
