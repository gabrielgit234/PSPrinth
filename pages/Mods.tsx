import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useSettings } from '../contexts/SettingsContext';
import { ModCard } from '../components/ModCard';
import { Search, SlidersHorizontal, ChevronDown, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Mods: React.FC = () => {
  const { mods } = useData();
  const { itemsPerPage } = useSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('Relevance');
  
  // Sidebar State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter Data
  const categories = ['Realistic', 'Utility', 'Vanilla Like', 'UI', 'Dark UI', 'Simple'];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  const filteredMods = mods.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(search.toLowerCase()) || 
                          mod.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                            mod.categories.some(c => selectedCategories.includes(c));

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
      switch (sortBy) {
          case 'Newest':
              return new Date(b.updated).getTime() - new Date(a.updated).getTime();
          case 'Updated':
              return new Date(b.updated).getTime() - new Date(a.updated).getTime();
          default:
              return 0; // Relevance (default order)
      }
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredMods.length / itemsPerPage);
  const paginatedMods = filteredMods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background pb-20"
    >
      {/* Header Area */}
      <div className="relative bg-surface border-b border-border py-16 overflow-hidden">
          {/* Background Gradient/Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-5xl font-extrabold text-text tracking-tight mb-2">Textures</h1>
                    <p className="text-secondary text-lg max-w-2xl">Browse and download the best texture packs for Minecraft PSP.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow group">
                        <input 
                            type="text" 
                            placeholder="Search textures..." 
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full bg-background text-text border border-border rounded-xl py-4 pl-14 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-lg font-medium text-lg placeholder:text-secondary"
                        />
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors pointer-events-none">
                            <Search size={24} />
                        </div>
                    </div>
                    
                    <div className="flex gap-2 min-w-[200px]">
                        <div className="relative w-full">
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full appearance-none bg-background text-text border border-border rounded-xl py-4 pl-5 pr-12 font-medium cursor-pointer hover:bg-surface-hover transition-colors focus:outline-none focus:border-primary/50 text-lg"
                            >
                                <option>Relevance</option>
                                <option>Newest</option>
                                <option>Updated</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" size={20} />
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
            
            {/* Left Sidebar Filters */}
            <div className={`fixed inset-0 z-40 bg-black/80 lg:hidden transition-opacity ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowMobileFilters(false)} />
            
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface p-6 transform transition-transform lg:transform-none lg:sticky lg:top-24 lg:block lg:w-auto lg:bg-transparent lg:p-0 space-y-8 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} border-r lg:border-none border-border`}>
                <div className="flex justify-between items-center lg:hidden mb-6">
                    <h2 className="text-xl font-bold text-text">Filters</h2>
                    <button onClick={() => setShowMobileFilters(false)} className="text-secondary hover:text-text">
                        <X size={24} />
                    </button>
                </div>

                {/* Categories */}
                <div className="bg-surface lg:bg-transparent rounded-2xl p-1 lg:p-0">
                    <h3 className="text-secondary font-bold text-xs uppercase tracking-wider mb-4 px-2">Categories</h3>
                    <div className="space-y-1">
                        {categories.map(cat => (
                            <label key={cat} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all group ${
                                selectedCategories.includes(cat) 
                                    ? 'bg-primary/10 text-text' 
                                    : 'hover:bg-surface text-secondary hover:text-text'
                            }`}>
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                    selectedCategories.includes(cat) 
                                        ? 'bg-primary border-primary' 
                                        : 'border-secondary group-hover:border-text bg-transparent'
                                }`}>
                                     {selectedCategories.includes(cat) && <Check size={14} className="text-black stroke-[3]" />}
                                </div>
                                <span className="font-medium text-base">
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
            <div className="space-y-6">
                {/* Active Filters Display */}
                {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedCategories.map(c => (
                            <button key={c} onClick={() => toggleCategory(c)} className="flex items-center gap-1 bg-surface text-secondary px-2 py-1 rounded text-xs hover:bg-surface-hover border border-border">
                                {c} <X size={12}/>
                            </button>
                        ))}
                         <button 
                            onClick={() => setSelectedCategories([])}
                            className="text-xs text-secondary hover:text-primary underline ml-2"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center pb-2 border-b border-border mb-4">
                     <p className="text-secondary font-medium">
                        Showing {paginatedMods.length} of {filteredMods.length} Results
                     </p>
                </div>

                <div className="flex flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                        {paginatedMods.map(mod => (
                            <motion.div
                                key={mod.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                layout
                            >
                                <ModCard mod={mod} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredMods.length === 0 && (
                        <div className="bg-surface rounded-lg border border-border p-12 text-center">
                            <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-text mb-2">No results found</h3>
                            <p className="text-secondary">Try adjusting your filters or search terms.</p>
                             <button 
                                onClick={() => {setSelectedCategories([]); handleSearchChange('')}}
                                className="mt-6 text-primary hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-surface border border-border text-secondary hover:text-text disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                                    currentPage === page 
                                        ? 'bg-primary text-black' 
                                        : 'bg-surface border border-border text-secondary hover:text-text hover:border-gray-500'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-surface border border-border text-secondary hover:text-text disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
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