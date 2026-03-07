import React from 'react';
import { useData } from '../contexts/DataContext';
import { ModCard } from '../components/ModCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Sparkles, Box, Download, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { mods } = useData();
  const featuredMods = mods.slice(0, 2);
  
  const totalDownloads = mods.reduce((acc, mod) => acc + mod.downloads, 0);
  const totalMods = mods.length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Hero */}
      <div className="relative bg-surface border-b border-border overflow-hidden transition-colors duration-300">
        {/* Background Gradient/Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--text-secondary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-text tracking-tight mb-6 leading-tight">
                    The Home of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">PSP Minecraft</span>
                </h1>
                <p className="text-xl md:text-2xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
                    Discover the best textures for your MCPSP with the best active community.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 px-4 sm:px-0">
                    <Link to="/textures" className="w-full sm:w-auto bg-primary text-black px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(27,217,106,0.3)] flex items-center justify-center gap-2">
                        Browse Textures <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Real Stats Counter */}
                <div className="grid grid-cols-2 gap-8 border-t border-border pt-8 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-3xl font-bold text-text mb-1">
                            <Download className="text-primary" size={24} />
                            <span>{totalDownloads.toLocaleString()}</span>
                        </div>
                        <span className="text-sm text-secondary font-medium uppercase tracking-wider">Total Downloads</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-3xl font-bold text-text mb-1">
                            <Layers className="text-primary" size={24} />
                            <span>{totalMods}</span>
                        </div>
                        <span className="text-sm text-secondary font-medium uppercase tracking-wider">Active Textures</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Textures */}
        <div className="mb-12">
            <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
                <h2 className="text-3xl font-bold text-text flex items-center gap-3">
                    <Terminal className="text-primary" /> Featured Textures
                </h2>
                <Link to="/textures" className="text-sm text-primary hover:text-green-300 font-medium flex items-center gap-1 transition-colors">
                    View All <ArrowRight size={14} />
                </Link>
            </div>
            
            {featuredMods.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {featuredMods.map(mod => <ModCard key={mod.id} mod={mod} />)}
                </div>
            ) : (
                <div className="bg-surface border border-border border-dashed rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                        <Box size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">No featured textures yet</h3>
                    <p className="text-secondary mb-6 max-w-md mx-auto">
                        Check back later for new texture packs!
                    </p>
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
};