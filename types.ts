
export interface Mod {
  id: string;
  title: string;
  description: string;
  author: string;
  downloads: number;
  follows: number;
  updated: string;
  categories: string[];
  iconUrl: string;
  version: string;
  license: string;
  loader: string;
  zipUrl?: string;
  bannerUrl?: string;
  galleryUrls?: string[];
  discordUrl?: string;
}

export interface Skin {
  id: string;
  name: string;
  imageUrl: string; // The flat texture
  views: number;
  downloads: number;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}