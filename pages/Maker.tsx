import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Trash2, RefreshCw, Info, Grid3X3, Layers, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const GRID_SIZE = 16;
const TILE_SIZE = 16; // 16x16 pixels per tile
const ATLAS_SIZE = GRID_SIZE * TILE_SIZE; // 256x256 pixels

interface Tile {
  id: number;
  name: string;
  image: string | null;
}

// Common tiles in the terrain.png atlas for MCPSP
const DEFAULT_TILES = [
  { id: 0, name: 'Grass Top' },
  { id: 1, name: 'Stone' },
  { id: 2, name: 'Dirt' },
  { id: 3, name: 'Grass Side' },
  { id: 4, name: 'Wood Planks' },
  { id: 5, name: 'Double Slab Side' },
  { id: 6, name: 'Slab Top' },
  { id: 7, name: 'Brick' },
  { id: 8, name: 'TNT Side' },
  { id: 9, name: 'TNT Top' },
  { id: 10, name: 'TNT Bottom' },
  { id: 11, name: 'Cobweb' },
  { id: 12, name: 'Red Flower' },
  { id: 13, name: 'Yellow Flower' },
  { id: 15, name: 'Sapling' },
  { id: 16, name: 'Cobblestone' },
  { id: 17, name: 'Bedrock' },
  { id: 18, name: 'Sand' },
  { id: 19, name: 'Gravel' },
  { id: 20, name: 'Oak Log Side' },
  { id: 21, name: 'Oak Log Top' },
  { id: 22, name: 'Iron Block' },
  { id: 23, name: 'Gold Block' },
  { id: 24, name: 'Diamond Block' },
  { id: 31, name: 'Red Mushroom' },
  { id: 32, name: 'Gold Ore' },
  { id: 33, name: 'Iron Ore' },
  { id: 34, name: 'Coal Ore' },
  { id: 35, name: 'Bookshelf' },
  { id: 36, name: 'Mossy Cobblestone' },
  { id: 37, name: 'Obsidian' },
  { id: 48, name: 'Glass' },
  { id: 49, name: 'Diamond Ore' },
  { id: 50, name: 'Redstone Ore' },
  { id: 51, name: 'Leaves' },
  { id: 64, name: 'Torch' },
  { id: 65, name: 'Wood Door Top' },
  { id: 66, name: 'Iron Door Top' },
  { id: 67, name: 'Ladder' },
  { id: 68, name: 'Trapdoor' },
  { id: 81, name: 'Wood Door Bottom' },
  { id: 82, name: 'Iron Door Bottom' },
];

export const Maker: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
      id: i,
      name: DEFAULT_TILES.find(t => t.id === i)?.name || `Slot ${i}`,
      image: null
    }));
  });
  
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingBase, setIsLoadingBase] = useState(false);
  const [baseError, setBaseError] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const baseUploadRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load base atlas on mount
  useEffect(() => {
    // Using a proxy to avoid CORS issues
    loadBaseAtlas('https://images.weserv.nl/?url=https://i.postimg.cc/mD3m8f0P/terrain.png');
  }, []);

  const loadBaseAtlas = (url: string) => {
    setIsLoadingBase(true);
    setBaseError(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = ATLAS_SIZE;
      canvas.height = ATLAS_SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, ATLAS_SIZE, ATLAS_SIZE);
      
      const newTiles = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
        id: i,
        name: DEFAULT_TILES.find(t => t.id === i)?.name || `Slot ${i}`,
        image: null as string | null
      }));

      for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const x = (i % GRID_SIZE) * TILE_SIZE;
        const y = Math.floor(i / GRID_SIZE) * TILE_SIZE;
        
        const tileCanvas = document.createElement('canvas');
        tileCanvas.width = TILE_SIZE;
        tileCanvas.height = TILE_SIZE;
        const tileCtx = tileCanvas.getContext('2d');
        
        if (tileCtx) {
          tileCtx.drawImage(canvas, x, y, TILE_SIZE, TILE_SIZE, 0, 0, TILE_SIZE, TILE_SIZE);
          newTiles[i].image = tileCanvas.toDataURL('image/png');
        }
      }
      setTiles(newTiles);
      setIsLoadingBase(false);
    };
    img.onerror = () => {
      console.error('Failed to load base atlas');
      setIsLoadingBase(false);
      setBaseError('Failed to load default atlas. Please upload your own terrain.png');
      
      // If proxy fails, generate a fallback magenta grid so the user can still use the tool
      const newTiles = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
        id: i,
        name: DEFAULT_TILES.find(t => t.id === i)?.name || `Slot ${i}`,
        image: null as string | null
      }));
      
      setTiles(newTiles);
    };
    img.src = url;
  };

  const handleBaseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        loadBaseAtlas(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTileClick = (id: number) => {
    setSelectedTile(id);
  };

  const handleUploadClick = () => {
    if (selectedTile !== null) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedTile !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newTiles = [...tiles];
        newTiles[selectedTile].image = event.target?.result as string;
        setTiles(newTiles);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt || selectedTile === null) return;
    
    setIsGenerating(true);
    setAiError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a 16x16 pixel art texture for Minecraft. 
        Theme: ${aiPrompt}. 
        Return ONLY a JSON object with a "colors" property which is a 1D array of 256 hex color strings (e.g. "#FFFFFF") representing the grid from top-left to bottom-right.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              colors: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of 256 hex color strings"
              }
            },
            required: ["colors"]
          }
        }
      });

      const data = JSON.parse(response.text);
      if (data.colors && data.colors.length === 256) {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          data.colors.forEach((color: string, index: number) => {
            const x = index % 16;
            const y = Math.floor(index / 16);
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
          });
          
          const newTiles = [...tiles];
          newTiles[selectedTile].image = canvas.toDataURL('image/png');
          setTiles(newTiles);
        }
      } else {
        setAiError('Invalid response from AI. Please try again.');
      }
    } catch (error) {
      console.error('AI Generation error:', error);
      setAiError('Failed to generate texture. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearTile = (id: number) => {
    const newTiles = [...tiles];
    newTiles[id].image = null;
    setTiles(newTiles);
  };

  const resetAtlas = () => {
    loadBaseAtlas('https://images.weserv.nl/?url=https://i.postimg.cc/mD3m8f0P/terrain.png');
  };

  const downloadAtlas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);
    
    // Draw magenta background for empty slots
    ctx.fillStyle = '#FF00FF';
    ctx.fillRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);

    let loadedCount = 0;
    const totalToLoad = tiles.filter(t => t.image).length;

    if (totalToLoad === 0) {
      setAiError('Atlas is empty. Add some textures before downloading.');
      return;
    }

    tiles.forEach((tile) => {
      if (tile.image) {
        const img = new Image();
        img.onload = () => {
          const x = (tile.id % GRID_SIZE) * TILE_SIZE;
          const y = Math.floor(tile.id / GRID_SIZE) * TILE_SIZE;
          ctx.drawImage(img, x, y, TILE_SIZE, TILE_SIZE);
          
          loadedCount++;
          if (loadedCount === totalToLoad) {
            const link = document.createElement('a');
            link.download = 'terrain.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
          }
        };
        img.src = tile.image;
      } else {
        // If no image, just keep the magenta background
      }
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20"
          >
            <Sparkles size={14} /> Experimental Feature
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black text-text mb-4 tracking-tight">
            Atlas <span className="text-primary text-glow">Maker</span>
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Edit the MCPSP <span className="text-text font-mono">terrain.png</span>. Click any block to replace it with AI or upload your own.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Atlas Grid */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-text font-bold">
                <Grid3X3 size={20} className="text-primary" />
                Terrain Atlas (16x16)
              </div>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover text-secondary hover:text-primary transition-colors text-xs font-bold cursor-pointer">
                  <Upload size={14} />
                  Upload Base
                  <input type="file" className="hidden" accept="image/*" onChange={handleBaseUpload} />
                </label>
                <button 
                  onClick={resetAtlas}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover text-secondary hover:text-primary transition-colors text-xs font-bold"
                  title="Reload Base"
                >
                  <RefreshCw size={14} className={isLoadingBase ? 'animate-spin' : ''} />
                  Reload Base
                </button>
              </div>
            </div>

            <div 
              className="grid gap-px bg-border border border-border rounded-lg overflow-hidden mx-auto relative"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                width: 'fit-content',
                maxWidth: '100%'
              }}
            >
              {isLoadingBase && (
                <div className="absolute inset-0 z-50 bg-surface/80 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 size={40} className="text-primary animate-spin" />
                </div>
              )}
              
              {tiles.map((tile) => (
                <div
                  key={tile.id}
                  onClick={() => handleTileClick(tile.id)}
                  className={`aspect-square w-6 sm:w-8 md:w-10 lg:w-12 cursor-pointer relative group transition-all ${
                    selectedTile === tile.id ? 'ring-2 ring-primary z-20 scale-110 shadow-2xl' : ''
                  } ${
                    tile.image ? 'bg-background' : 'bg-[#FF00FF]'
                  }`}
                  title={tile.name}
                >
                  {tile.image ? (
                    <img 
                      src={tile.image} 
                      alt={tile.name} 
                      className="w-full h-full object-contain image-pixelated"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[8px] text-white/20">{tile.id}</span>
                    </div>
                  )}
                  
                  {tile.image && selectedTile === tile.id && (
                    <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>
            
            <p className="mt-6 text-xs text-secondary text-center italic">
              Tip: Click on a block to select it, then use the panel on the right to modify it.
            </p>
          </div>

          {/* Controls & Info */}
          <div className="space-y-6">
            {/* AI Generation Panel */}
            <div className="bg-surface border border-border rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wand2 size={60} />
              </div>
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <Wand2 size={20} className="text-primary" />
                Editor Panel
              </h3>
              
              <div className="space-y-4 relative z-10">
                {baseError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-xs text-red-500 font-bold mb-2">{baseError}</p>
                    <button 
                      onClick={() => baseUploadRef.current?.click()}
                      className="text-[10px] font-black text-primary uppercase underline hover:brightness-110"
                    >
                      Upload terrain.png manually
                    </button>
                  </div>
                )}
                
                <div className="p-4 bg-background rounded-2xl border border-border flex items-center gap-4">
                  <div className="w-16 h-16 bg-surface-hover rounded-lg border border-border overflow-hidden flex items-center justify-center">
                    {selectedTile !== null && tiles[selectedTile].image ? (
                      <img src={tiles[selectedTile].image!} className="w-full h-full image-pixelated" />
                    ) : (
                      <Grid3X3 size={24} className="text-secondary/20" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-secondary uppercase">Selected Slot</div>
                    <div className="text-sm font-bold text-text">
                      {selectedTile !== null ? `${selectedTile}: ${tiles[selectedTile].name}` : 'None'}
                    </div>
                  </div>
                </div>

                {aiError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-xs text-red-500 font-bold">{aiError}</p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-secondary uppercase mb-2 block">
                    AI Prompt
                  </label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe the new texture..."
                    className="w-full bg-background border border-border rounded-xl p-3 text-sm text-text focus:outline-none focus:border-primary min-h-[80px] resize-none"
                    disabled={selectedTile === null || isGenerating}
                  />
                </div>
                
                <button
                  onClick={generateWithAI}
                  disabled={!aiPrompt || selectedTile === null || isGenerating}
                  className="w-full bg-primary text-black font-black py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(27,217,106,0.2)]"
                >
                  {isGenerating ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Sparkles size={18} />
                  )}
                  {isGenerating ? 'Generating...' : 'Replace with AI'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleUploadClick}
                    disabled={selectedTile === null || isGenerating}
                    className="flex-1 bg-surface-hover text-text font-bold py-2 rounded-xl hover:bg-border transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Upload size={16} />
                    Upload File
                  </button>
                  <button
                    onClick={() => selectedTile !== null && clearTile(selectedTile)}
                    disabled={selectedTile === null || isGenerating}
                    className="p-2 bg-surface-hover text-secondary hover:text-red-500 rounded-xl border border-border transition-all disabled:opacity-50"
                    title="Clear Slot"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <Layers size={20} className="text-primary" />
                Finish Atlas
              </h3>
              <div className="space-y-4">
                <button
                  onClick={downloadAtlas}
                  className="w-full bg-surface-hover text-text border border-border font-black py-4 rounded-2xl hover:bg-border transition-all flex items-center justify-center gap-3"
                >
                  <Download size={20} />
                  Download terrain.png
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden elements */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <input
        type="file"
        ref={baseUploadRef}
        onChange={handleBaseUpload}
        accept="image/*"
        className="hidden"
      />
      <canvas 
        ref={canvasRef} 
        width={ATLAS_SIZE} 
        height={ATLAS_SIZE} 
        className="hidden" 
      />
      
      <style>{`
        .image-pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(27,217,106,0.3);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
