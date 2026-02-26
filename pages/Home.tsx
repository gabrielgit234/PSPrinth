import React from 'react';
import { MOCK_MODS } from '../constants';
import { ModCard } from '../components/ModCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
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
      <div className="relative bg-[#1c1c1c] border-b border-[#2d2d2d] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                The Home of PSP Minecraft
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Discover the best textures for you mcpsp 
                with best active community
            </p>
            <div className="flex justify-center gap-4">
                <Link to="/textures" className="bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition-colors">
                    Browse Textures
                </Link>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Textures */}
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Terminal className="text-primary" /> Featured Textures
                </h2>
                <Link to="/textures" className="text-sm text-primary hover:underline flex items-center gap-1">
                    View All <ArrowRight size={14} />
                </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {featuredMods.map(mod => <ModCard key={mod.id} mod={mod} />)}
            </div>
        </div>
      </div>
    </motion.div>
  );
};