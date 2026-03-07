import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Download, Share2, Flag, Calendar, Heart, Eye, FileText, AlertTriangle, CheckCircle, MessageCircle, Tag } from 'lucide-react';

export const ModDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mods, incrementDownload, toggleLike } = useData();
  const mod = mods.find(m => m.id === id);
  const [activeTab, setActiveTab] = useState<'description' | 'gallery'>('description');

  const [isFollowed, setIsFollowed] = useState(false);

  if (!mod) return <div className="text-white p-10">Mod not found</div>;

  const handleShare = () => {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
  };

  const handleFollow = () => {
      setIsFollowed(!isFollowed);
      toggleLike(mod.id);
  };

  const handleDownloadClick = () => {
      incrementDownload(mod.id);
  };

  const handleReport = () => {
      alert('Report submitted for review. Thank you for keeping the community safe.');
  };

  const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`px-4 py-4 font-medium text-sm transition-all border-b-2 relative ${
            activeTab === id 
                ? 'border-primary text-white' 
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
        }`}
      >
          {label}
      </button>
  );

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
       {/* Header Section */}
       <div className="bg-surface border-b border-border relative overflow-hidden transition-colors duration-300">
          {/* Optional Background Banner (Blurry effect) */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <img src={mod.bannerUrl || mod.iconUrl} className="w-full h-full object-cover blur-3xl" />
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0 relative z-10">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {/* Icon */}
                  <img 
                    src={mod.iconUrl} 
                    alt={mod.title} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-background shadow-2xl border border-border object-cover"
                  />
                  
                  {/* Title & Metadata */}
                  <div className="flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-extrabold text-text">{mod.title}</h1>
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-surface-hover border border-border text-primary">
                            RESOURCE PACK
                        </span>
                      </div>
                      <p className="text-secondary max-w-3xl mb-4 line-clamp-2">{mod.description}</p>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-secondary font-medium">
                          <span className="flex items-center gap-2 hover:text-text cursor-pointer transition-colors">
                              <Download size={18} /> {mod.downloads.toLocaleString()} downloads
                          </span>
                          <span className="flex items-center gap-2 hover:text-text cursor-pointer transition-colors">
                              <Heart size={18} /> {mod.follows.toLocaleString()} followers
                          </span>
                          <span className="flex items-center gap-2">
                              <Tag size={18} /> v{mod.version}
                          </span>
                      </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                      <a 
                        href={mod.zipUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleDownloadClick}
                        className="bg-primary text-black font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-colors flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(27,217,106,0.3)]"
                      >
                          <Download size={20} /> Download
                      </a>
                      <div className="flex gap-2">
                           <button 
                                onClick={handleShare}
                                className="flex-1 bg-surface border border-border text-text py-2 rounded-lg hover:bg-surface-hover flex justify-center items-center gap-2 font-medium transition-colors"
                           >
                               <Share2 size={16} /> Share
                           </button>
                           <button 
                                onClick={handleFollow}
                                className={`flex-1 border border-border py-2 rounded-lg flex justify-center items-center gap-2 font-medium transition-colors ${
                                    isFollowed 
                                        ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                                        : 'bg-surface text-text hover:bg-surface-hover'
                                }`}
                           >
                               <Heart size={16} fill={isFollowed ? "currentColor" : "none"} /> {isFollowed ? 'Unfollow' : 'Follow'}
                           </button>
                      </div>
                  </div>
              </div>

              {/* Tabs Navigation (Modrinth Style) */}
              <div className="flex gap-4 mt-8 overflow-x-auto no-scrollbar border-t border-border">
                  <TabButton id="description" label="Description" />
                  <TabButton id="gallery" label="Gallery" />
              </div>
          </div>
       </div>

       {/* Main Content Grid */}
       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
               
               {/* Left Column (Main) */}
               <div className="space-y-6">
                   {activeTab === 'description' && (
                       <div className="bg-surface rounded-lg p-8 border border-border min-h-[400px]">
                           
                           <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                                <h2 className="text-xl font-bold text-text">About this pack</h2>
                           </div>
                           
                           <div className="prose prose-invert max-w-none prose-headings:text-text prose-p:text-secondary prose-a:text-primary prose-strong:text-text">
                               <p className="text-lg leading-relaxed mb-6">{mod.description}</p>
                           </div>
                       </div>
                   )}

                   {activeTab === 'gallery' && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {(mod.galleryUrls || [1, 2, 3, 4]).map((item, i) => (
                               <div key={i} className="group relative aspect-video bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer">
                                   <img 
                                      src={typeof item === 'string' ? item : `https://picsum.photos/seed/${mod.id}${item}/800/450`} 
                                      alt="Screenshot" 
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                   />
                                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <Eye className="text-white" size={32} />
                                   </div>
                               </div>
                           ))}
                       </div>
                   )}
               </div>

               {/* Right Sidebar */}
               <div className="space-y-6">
                   {/* Members */}
                   <div className="bg-surface rounded-lg border border-border p-5">
                        <h3 className="text-text font-bold mb-4">Members</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center text-lg font-bold text-secondary">
                                {mod.author.charAt(0)}
                            </div>
                            <div>
                                <div className="text-primary font-bold hover:underline cursor-pointer">{mod.author}</div>
                                <div className="text-xs text-secondary">Owner</div>
                            </div>
                        </div>
                        
                        {mod.discordUrl && (
                            <a 
                               href={mod.discordUrl} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                            >
                                <MessageCircle size={16} /> Join Discord
                            </a>
                        )}
                   </div>

                   {/* Tags */}
                   <div className="bg-surface rounded-lg border border-border p-5">
                        <h3 className="text-text font-bold mb-4">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {mod.categories.map(cat => (
                                <span key={cat} className="px-3 py-1.5 rounded text-xs font-medium bg-surface-hover border border-border text-secondary hover:text-text hover:border-text cursor-pointer transition-colors">
                                    {cat}
                                </span>
                            ))}
                        </div>
                   </div>
                   
                   <div className="flex justify-center">
                       <button 
                            onClick={handleReport}
                            className="text-secondary hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                       >
                           <Flag size={12} /> Report Project
                       </button>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};
