import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Download, Share2, Flag, Calendar, Heart, Eye, FileText, AlertTriangle, CheckCircle, MessageCircle, Tag, Link as LinkIcon } from 'lucide-react';
import { AUTHOR_AVATARS } from '../constants';

export const ModDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mods, incrementDownload, toggleLike } = useData();
  const mod = mods.find(m => m.id === id);
  const [activeTab, setActiveTab] = useState<'description'>('description');

  const [isFollowed, setIsFollowed] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  if (!mod) return <div className="text-white p-10">Mod not found</div>;

  const handleShare = () => {
      navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
  };

  const handleFollow = () => {
      const newFollowState = !isFollowed;
      setIsFollowed(newFollowState);
      toggleLike(mod.id, newFollowState);
  };

  const handleDownloadClick = () => {
      incrementDownload(mod.id);
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

  const authorsList = mod?.author.split(/, | and /) || [];

  const getHostInfo = (url: string | undefined) => {
      if (!url) return null;
      if (url.includes('drive.google.com')) {
          return (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover border border-border">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Google Drive" className="w-6 h-6 object-contain" />
                  <span className="text-text font-medium">Google Drive</span>
              </div>
          );
      }
      if (url.includes('mediafire.com')) {
          return (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover border border-border">
                  <img src="https://static.mediafire.com/images/backgrounds/header/mf_logo_full_color.svg" alt="MediaFire" className="h-5 object-contain" />
              </div>
          );
      }
      return (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover border border-border">
              <LinkIcon size={20} className="text-secondary" />
              <span className="text-text font-medium">External Link</span>
          </div>
      );
  };

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
                    className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-background shadow-2xl border border-border object-contain"
                  />
                  
                  {/* Title & Metadata */}
                  <div className="flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-extrabold text-text">{mod.title}</h1>
                      </div>
                      <p className="text-secondary max-w-3xl mb-4 line-clamp-2">{mod.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-6 text-sm text-secondary font-medium">
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
                                className="relative flex-1 bg-surface border border-border text-text py-2 rounded-lg hover:bg-surface-hover flex justify-center items-center gap-2 font-medium transition-colors overflow-hidden"
                           >
                               {showCopied ? (
                                 <span className="flex items-center gap-2 text-primary animate-in fade-in slide-in-from-bottom-2">
                                   <CheckCircle size={16} /> Copied!
                                 </span>
                               ) : (
                                 <span className="flex items-center gap-2">
                                   <Share2 size={16} /> Share
                                 </span>
                               )}
                           </button>
                      </div>
                  </div>
              </div>

              {/* Tabs Navigation (Modrinth Style) */}
              <div className="flex gap-4 mt-8 overflow-x-auto no-scrollbar border-t border-border">
                  <TabButton id="description" label="Description" />
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
               </div>

               {/* Right Sidebar */}
               <div className="space-y-6">
                   {/* Members */}
                   <div className="bg-surface rounded-lg border border-border p-5">
                        <h3 className="text-text font-bold mb-4">Members</h3>
                        <div className="flex flex-col gap-4 mb-4">
                            {authorsList.map((author, index) => (
                                <div key={author} className="flex items-center gap-3">
                                    <img 
                                        src={AUTHOR_AVATARS[author] || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author}&backgroundColor=c0aede`} 
                                        alt={author} 
                                        className="w-14 h-14 rounded-lg bg-surface-hover object-cover scale-110"
                                    />
                                    <div>
                                        <div className="text-primary font-bold hover:underline cursor-pointer">{author}</div>
                                        <div className="text-xs text-secondary">{index === 0 ? 'Owner' : 'Member'}</div>
                                    </div>
                                </div>
                            ))}
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

                   {/* Download Source */}
                   <div className="bg-surface rounded-lg border border-border p-5">
                        <h3 className="text-text font-bold mb-4">Download Source</h3>
                        {getHostInfo(mod.zipUrl)}
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};
