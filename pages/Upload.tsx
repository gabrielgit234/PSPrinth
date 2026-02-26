import React, { useState, useRef, useEffect } from 'react';
import { Upload as UploadIcon, X, Check, Gamepad2, User, Image as ImageIcon, Box, FolderPlus, AlertCircle } from 'lucide-react';
// @ts-ignore
import { SkinViewer, WalkingAnimation } from 'skinview3d';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

export const Upload: React.FC = () => {
  const { addMod } = useData();
  const [activeTab, setActiveTab] = useState<'mod'>('mod');
  const [dragActive, setDragActive] = useState(false);
  
  // Files
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Main preview (Mod Icon)
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mod Specific Files
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  
  // Fields
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [version, setVersion] = useState('');
  const [discordUrl, setDiscordUrl] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedId, setUploadedId] = useState<string>('');

  const AVAILABLE_TAGS = [
    'Realistic', 'Utility', 'Vanilla Like', 'UI', 'Dark UI'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.zip')) {
        setZipFile(file);
        setError(null);
      } else {
        setError("Please drop a .zip file.");
      }
    }
  };

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleMainFile(e.target.files[0]);
    }
  };

  const handleMainFile = (file: File) => {
    setError(null);

    // Mod Icon
    setMainFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    if (!name) {
        setName(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setBannerFile(file);
          const reader = new FileReader();
          reader.onload = (ev) => {
              if (ev.target?.result) setBannerUrl(ev.target.result as string);
          }
          reader.readAsDataURL(file);
      }
  };

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setZipFile(e.target.files[0]);
      }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          const files = Array.from(e.target.files) as File[];
          setGalleryFiles(prev => [...prev, ...files]);
          
          // Create object URLs for preview
          const newUrls = files.map(f => URL.createObjectURL(f));
          setGalleryUrls(prev => [...prev, ...newUrls]);
      }
  };

  const removeGalleryImage = (index: number) => {
      setGalleryFiles(prev => prev.filter((_, i) => i !== index));
      setGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return; 

    setIsSubmitting(true);
    
    setTimeout(() => {
        const newId = Date.now().toString();
        
        if (activeTab === 'mod' && previewUrl) {
            addMod({
                id: newId,
                title: name,
                description: description,
                author: author || 'You',
                downloads: 0,
                follows: 0, // Init
                updated: new Date().toISOString().split('T')[0],
                categories: selectedTags.length > 0 ? selectedTags : ['Community'],
                iconUrl: previewUrl, 
                version: version || '1.0',
                license: 'All Rights Reserved',
                loader: 'Lamecraft',
                bannerUrl: bannerUrl || undefined,
                galleryUrls: galleryUrls.length > 0 ? galleryUrls : undefined,
                discordUrl: discordUrl || undefined
            });
        }

        setIsSubmitting(false);
        setSuccess(true);
        setUploadedId(newId);
    }, 1000);
  };

  if (success) {
      return (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
              <div className="bg-[#1c1c1c] rounded-xl p-8 border border-green-500/30 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                      <Check size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Upload Successful!</h2>
                  <p className="text-gray-400 mb-8">Your texture pack "{name}" has been submitted to the forge.</p>
                  
                  <div className="flex gap-4">
                     <button 
                        onClick={() => {
                            setSuccess(false);
                            setMainFile(null);
                            setPreviewUrl(null);
                            setZipFile(null);
                            setError(null);
                            setBannerFile(null);
                            setBannerUrl(null);
                            setGalleryFiles([]);
                            setGalleryUrls([]);
                            setName('');
                            setAuthor('');
                            setDescription('');
                            setSelectedTags([]);
                            setVersion('');
                            setDiscordUrl('');
                        }}
                        className="bg-[#2d2d2d] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#3d3d3d] transition-colors"
                      >
                          Upload Another
                      </button>
                      <Link 
                        to={`/mod/${uploadedId}`}
                        className="bg-primary text-black font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
                      >
                          View Upload
                      </Link>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-8">Upload Content</h1>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Left Col: Upload Area & Preview */}
            <div className="md:col-span-1 space-y-6">
                
                {/* Main Zip Upload (Large) */}
                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                        Texture Pack (.zip)
                    </label>
                    <div 
                        className={`relative border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center text-center p-4 transition-colors ${
                            dragActive ? 'border-primary bg-primary/10' : 'border-[#333] bg-[#1c1c1c] hover:border-gray-500'
                        } ${error ? 'border-red-500 bg-red-500/5' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input 
                            type="file" 
                            id="zip-upload" 
                            className="hidden" 
                            accept=".zip"
                            onChange={handleZipFileChange}
                        />
                        
                        {!zipFile ? (
                            <label htmlFor="zip-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                <FolderPlus size={32} className={`mb-4 ${error ? 'text-red-400' : 'text-gray-400'}`} />
                                <p className="text-white font-medium mb-1">Drag & Drop Texture Pack</p>
                                <p className="text-xs text-gray-500">or click to browse (.zip)</p>
                            </label>
                        ) : (
                            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-lg">
                                <Box size={48} className="text-primary mb-4" />
                                <p className="text-white font-bold break-all px-4">{zipFile.name}</p>
                                <p className="text-xs text-gray-500 mt-2">{(zipFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                <button 
                                    onClick={() => setZipFile(null)}
                                    className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-full hover:bg-red-600 z-10"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg flex items-center gap-2 text-sm mt-3 animate-in slide-in-from-top-2 fade-in duration-300">
                            <AlertCircle size={16} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
                
                {/* Extra Uploads */}
                {activeTab === 'mod' && (
                    <>
                        {/* Icon Upload (Small) */}
                        <div>
                             <label className="block text-sm font-bold text-gray-400 mb-2">Texture Icon</label>
                             {!previewUrl ? (
                                 <label className="flex items-center gap-2 w-full p-3 bg-[#1c1c1c] border border-[#333] rounded-lg cursor-pointer hover:bg-[#252525]">
                                     <UploadIcon size={18} className="text-gray-400" />
                                     <span className="text-sm text-gray-300">Choose Icon...</span>
                                     <input type="file" className="hidden" accept="image/*" onChange={handleMainFileChange} />
                                 </label>
                             ) : (
                                 <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-[#333] group">
                                     <img src={previewUrl} alt="Icon" className="w-full h-full object-cover" />
                                     <button onClick={() => { setMainFile(null); setPreviewUrl(null); }} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                         <X size={24} />
                                     </button>
                                 </div>
                             )}
                        </div>

                        {/* Banner Upload */}
                        <div>
                             <label className="block text-sm font-bold text-gray-400 mb-2">Header Banner (Optional)</label>
                             {!bannerUrl ? (
                                 <label className="flex items-center gap-2 w-full p-3 bg-[#1c1c1c] border border-[#333] rounded-lg cursor-pointer hover:bg-[#252525]">
                                     <ImageIcon size={18} className="text-gray-400" />
                                     <span className="text-sm text-gray-300">Choose Banner Image...</span>
                                     <input type="file" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                 </label>
                             ) : (
                                 <div className="relative h-24 w-full rounded-lg overflow-hidden border border-[#333] group">
                                     <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                                     <button onClick={() => { setBannerFile(null); setBannerUrl(null); }} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                         <X size={24} />
                                     </button>
                                 </div>
                             )}
                        </div>

                        {/* Gallery Upload */}
                        <div>
                             <label className="block text-sm font-bold text-gray-400 mb-2">Gallery Images</label>
                             <label className="flex items-center gap-2 w-full p-3 bg-[#1c1c1c] border border-[#333] rounded-lg cursor-pointer hover:bg-[#252525]">
                                 <FolderPlus size={18} className="text-gray-400" />
                                 <span className="text-sm text-gray-300">Add Screenshots...</span>
                                 <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryChange} />
                             </label>
                             {galleryUrls.length > 0 && (
                                 <div className="mt-2 grid grid-cols-3 gap-2">
                                     {galleryUrls.map((url, i) => (
                                         <div key={i} className="relative aspect-video rounded overflow-hidden border border-[#333] group">
                                             <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                                             <button onClick={() => removeGalleryImage(i)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400">
                                                 <X size={16} />
                                             </button>
                                         </div>
                                     ))}
                                 </div>
                             )}
                        </div>
                    </>
                )}
            </div>

            {/* Right Col: Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
                 <div className="bg-[#1c1c1c] p-6 rounded-xl border border-[#2d2d2d] space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g., Cubic Sun & Moon"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Author Name</label>
                        <input 
                            type="text" 
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g., Your Name"
                        />
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea 
                            rows={8}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-none font-mono text-sm"
                            placeholder="Use Markdown for best results..."
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Tags / Categories</label>
                            <div className="flex flex-wrap gap-2">
                                {AVAILABLE_TAGS.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                            selectedTags.includes(tag)
                                                ? 'bg-primary text-black border-primary'
                                                : 'bg-[#2d2d2d] text-gray-300 border-[#3c3c3c] hover:border-gray-500'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-400 mb-1">Version Number</label>
                            <input 
                                type="text" 
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                                className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="1.0.0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Discord Server URL (Optional)</label>
                        <input 
                            type="url" 
                            value={discordUrl}
                            onChange={(e) => setDiscordUrl(e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="https://discord.gg/..."
                        />
                    </div>
                 </div>

                 <div className="flex justify-end gap-4">
                     <button type="button" className="px-6 py-3 text-gray-400 hover:text-white transition-colors">Cancel</button>
                     <button 
                        type="submit" 
                        disabled={!mainFile || !zipFile || isSubmitting || !!error}
                        className={`bg-primary text-black font-bold px-8 py-3 rounded-lg hover:bg-green-400 transition-colors flex items-center gap-2 ${
                            (!mainFile || !zipFile || isSubmitting || !!error) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                     >
                         {isSubmitting ? 'Uploading...' : 'Publish Project'}
                         {!isSubmitting && <UploadIcon size={18} />}
                     </button>
                 </div>
            </form>
        </div>
    </div>
  );
};