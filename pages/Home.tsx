import React from 'react';
import { MOCK_MODS } from '../constants';
import { ModCard } from '../components/ModCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Sparkles, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const featuredMods = MOCK_MODS.slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#0f0f0f]"
    >
      {/* Hero */}
      <div className="relative bg-[#1c1c1c] border-b border-[#2d2d2d] overflow-hidden">
        {/* Background Gradient/Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center py-24 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d2d2d] border border-[#3c3c3c] text-primary text-xs font-bold mb-6 uppercase tracking-wider">
                    <Sparkles size={12} /> The Ultimate PSP Resource
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                    The Home of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">PSP Minecraft</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Discover the best textures for your MCPSP with the best active community.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/textures" className="bg-primary text-black px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(27,217,106,0.3)] flex items-center justify-center gap-2">
                        Browse Textures <ArrowRight size={20} />
                    </Link>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Textures */}
        <div className="mb-12">
            <div className="flex justify-between items-end mb-8 border-b border-[#2d2d2d] pb-4">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
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
                <div className="bg-[#1c1c1c] border border-[#2d2d2d] border-dashed rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-[#252525] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                        <Box size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No featured textures yet</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Check back later for new texture packs!
                    </p>
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
};