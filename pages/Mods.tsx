import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { ModCard } from '../components/ModCard';
import { Search, SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const Mods: React.FC = () => {
  const { mods } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('Relevance');
  
  // Sidebar State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync search state with URL params
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  // Update URL when search changes
  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  // Filter Data
  const categories = ['Realistic', 'Utility', 'Vanilla Like', 'UI', 'Dark UI'];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };
  
  const filteredMods = mods.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(search.toLowerCase()) || 
                          mod.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                            mod.categories.some(c => selectedCategories.includes(c));

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
      switch (sortBy) {
          case 'Downloads':
              return b.downloads - a.downloads;
          case 'Follows':
              return b.follows - a.follows;
          case 'Newest':
              return new Date(b.updated).getTime() - new Date(a.updated).getTime();
          case 'Updated':
              return new Date(b.updated).getTime() - new Date(a.updated).getTime();
          default:
              return 0; // Relevance (default order)
      }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#0f0f0f] pb-20"
    >
      {/* Header Area */}
      <div className="bg-[#111] border-b border-[#2d2d2d] py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Textures</h1>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input 
                            type="text" 
                            placeholder="Search textures..." 
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full bg-[#1c1c1c] text-white border border-[#333] rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors shadow-sm font-medium"
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
                    </div>
                    
                    <div className="flex gap-2">
                        <div className="relative">
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-[#1c1c1c] text-white border border-[#333] rounded-lg py-3 pl-4 pr-10 font-medium cursor-pointer hover:bg-[#252525] transition-colors focus:outline-none"
                            >
                                <option>Relevance</option>
                                <option>Downloads</option>
                                <option>Follows</option>
                                <option>Newest</option>
                                <option>Updated</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
            
            {/* Left Sidebar Filters */}
            <div className={`fixed inset-0 z-40 bg-black/80 lg:hidden transition-opacity ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowMobileFilters(false)} />
            
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1c1c1c] p-6 transform transition-transform lg:transform-none lg:static lg:block lg:w-auto lg:bg-transparent lg:p-0 space-y-8 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex justify-between items-center lg:hidden mb-6">
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                    <button onClick={() => setShowMobileFilters(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-3">Categories</h3>
                    <div className="space-y-1">
                        {categories.map(cat => (
                            <label key={cat} className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1c1c1c] cursor-pointer transition-colors group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                    selectedCategories.includes(cat) 
                                        ? 'bg-primary border-primary' 
                                        : 'border-gray-600 group-hover:border-gray-400 bg-[#1c1c1c]'
                                }`}>
                                     {selectedCategories.includes(cat) && <Check size={14} className="text-black stroke-[3]" />}
                                </div>
                                <span className={`text-sm font-medium ${selectedCategories.includes(cat) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                    {cat}
                                </span>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content List */}
            <div className="space-y-4">
                {/* Active Filters Display */}
                {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedCategories.map(c => (
                            <button key={c} onClick={() => toggleCategory(c)} className="flex items-center gap-1 bg-[#252525] text-gray-300 px-2 py-1 rounded text-xs hover:bg-[#333] border border-[#333]">
                                {c} <X size={12}/>
                            </button>
                        ))}
                         <button 
                            onClick={() => setSelectedCategories([])}
                            className="text-xs text-gray-500 hover:text-primary underline ml-2"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center pb-2 border-b border-[#2d2d2d] mb-4">
                     <p className="text-gray-400 font-medium">{filteredMods.length} Results</p>
                     <div className="flex gap-2">
                         {/* View Toggles could go here */}
                     </div>
                </div>

                <div className="flex flex-col gap-3">
                    {filteredMods.map(mod => (
                        <ModCard key={mod.id} mod={mod} />
                    ))}
                    {filteredMods.length === 0 && (
                        <div className="bg-[#1c1c1c] rounded-lg border border-[#2d2d2d] p-12 text-center">
                            <div className="w-16 h-16 bg-[#252525] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                            <p className="text-gray-400">Try adjusting your filters or search terms.</p>
                             <button 
                                onClick={() => {setSelectedCategories([]); handleSearchChange('')}}
                                className="mt-6 text-primary hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
      
       {/* Mobile Filter Fab (Visible only on small screens) */}
       <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden fixed bottom-6 right-6 bg-primary text-black p-4 rounded-full shadow-lg shadow-primary/20 z-50"
       >
            <SlidersHorizontal size={24} />
       </button>
    </motion.div>
  );
};