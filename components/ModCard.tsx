
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
      <div className="bg-surface rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:bg-surface-hover transition-all border border-border hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] relative overflow-hidden group-hover:-translate-y-1 duration-300">
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        {/* Icon */}
        <div className="flex-shrink-0 relative z-10">
          <img 
            src={mod.iconUrl} 
            alt={mod.title} 
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover bg-background shadow-xl border border-border group-hover:border-primary/30 transition-colors"
          />
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-between min-w-0 relative z-10">
          <div className="flex justify-between items-start">
            <div className="min-w-0 pr-4">
                <div className="flex flex-col gap-1 mb-2">
                    <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors truncate">{mod.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-secondary">by</span>
                        <span className="font-medium text-secondary hover:text-text transition-colors z-10">{mod.author}</span>
                    </div>
                </div>
                <p className="text-sm text-secondary line-clamp-2 leading-relaxed mb-3">
                  {mod.description}
                </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-auto">
             {mod.categories.map(cat => (
                <span key={cat} className="px-2.5 py-1 rounded-lg bg-background border border-border text-xs font-medium text-secondary group-hover:border-gray-400 transition-colors">
                    {cat}
                </span>
             ))}
          </div>
        </div>

        {/* Stats Column */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-3 text-sm text-secondary sm:min-w-[140px] sm:border-l sm:border-border sm:pl-6">
            <div className="flex items-center gap-2 w-full sm:justify-end group/stat">
                <div className="p-1.5 rounded-full bg-background group-hover/stat:bg-primary/10 transition-colors">
                    <Download size={14} className="text-secondary group-hover/stat:text-primary transition-colors"/>
                </div>
                <span className="font-semibold text-text">{formatNumber(mod.downloads)}</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:justify-end group/stat">
                <div className="p-1.5 rounded-full bg-background group-hover/stat:bg-red-500/10 transition-colors">
                    <Heart size={14} className="text-secondary group-hover/stat:text-red-500 transition-colors"/>
                </div>
                <span className="font-semibold text-text">{formatNumber(mod.follows)}</span>
            </div>
        </div>
      </div>
    </Link>
  );
};
