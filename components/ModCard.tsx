
import React from 'react';
import { Mod } from '../types';
import { Download, Calendar, Heart, Box, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModCardProps {
  mod: Mod;
}

export const ModCard: React.FC<ModCardProps> = ({ mod }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays/30)} months ago`;
    return `${Math.floor(diffDays/365)} years ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <Link to={`/mod/${mod.id}`} className="block group">
      <div className="bg-[#1c1c1c] rounded-lg p-4 flex flex-col sm:flex-row gap-5 hover:bg-[#252525] transition-all border border-[#2d2d2d] hover:border-[#404040]">
        {/* Icon */}
        <div className="flex-shrink-0">
          <img 
            src={mod.iconUrl} 
            alt={mod.title} 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-[#0f0f0f] shadow-md"
          />
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start">
            <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">{mod.title}</h3>
                    <span className="text-xs text-gray-500 hidden sm:inline-block">by</span>
                    <span className="text-sm font-medium text-gray-300 hover:underline z-10">{mod.author}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs font-medium text-gray-400">
             <div className="flex gap-2">
                {mod.categories.map(cat => (
                    <span key={cat} className="text-gray-300">{cat}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Stats Column (Right side on desktop) */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-1 text-sm text-gray-400 sm:min-w-[120px] sm:border-l sm:border-[#333] sm:pl-5">
            <div className="flex items-center gap-1.5 w-full sm:justify-end">
                <Download size={14} className="text-gray-500"/>
                <span className="font-semibold text-gray-200">{formatNumber(mod.downloads)}</span>
            </div>
            <div className="flex items-center gap-1.5 w-full sm:justify-end">
                <Heart size={14} className="text-gray-500"/>
                <span>{formatNumber(mod.follows)}</span>
            </div>
             <div className="flex items-center gap-1.5 w-full sm:justify-end mt-0 sm:mt-1">
                <Calendar size={14} className="text-gray-500"/>
                <span>{formatDate(mod.updated)}</span>
            </div>
        </div>
      </div>
    </Link>
  );
};
