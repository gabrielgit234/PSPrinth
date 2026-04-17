import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Gamepad2, User, Users, Search, Sparkles, Settings, Heart, ExternalLink, AlertTriangle, Download } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSkinsWarning, setShowSkinsWarning] = useState(false);
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openSettings } = useSettings();

  const DESKTOP_DOWNLOAD_URL = "https://download948.mediafire.com/0fptzl03ph2g3oh0M3yM64drxvQ-8i_Gej9q_g1yUCBBtKmbE9LHjvDtkdcCmw3uiqvykQN3hTT5nnEA3d-PgZ7_Sy9l9S_ooRd2COCOPUqVglFdHWXulVwnWw3Qp1qRS8zLTlqlPuuqYfIHDkBb2NTPSFAxofUba_xRLYMyI820kw/agud4o1t1111qfh/PSPrinth.exe";

  const navLinks = [
    { name: 'Textures', path: '/textures', icon: <Gamepad2 size={18} /> },
    { name: 'Donate', path: '/donate', icon: <Heart size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/textures?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSkinsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSkinsWarning(true);
  };

  const handleContinueSkins = () => {
    window.open('https://mskins.net/en/resolution/64x32', '_blank', 'noopener,noreferrer');
    setShowSkinsWarning(false);
    setIsOpen(false);
  };

  const triggerDownloadMessage = () => {
    window.open(DESKTOP_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
    setShowDownloadMessage(true);
    setTimeout(() => setShowDownloadMessage(false), 3000);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Discord */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link 
              to="/community" 
              className="text-secondary hover:text-[#5865F2] transition-colors"
              aria-label="Community & Discord"
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
               </svg>
            </Link>

            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/5tYNSn3W/upscalemedia-transformed.png" 
                alt="PSPrinth Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="font-bold text-xl tracking-tight">
                <span className="text-primary">PSP</span><span className="text-text">rinth</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-surface-hover text-primary'
                      : 'text-secondary hover:bg-surface-hover hover:text-text'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <a
                href="https://mskins.net/en/resolution/64x32"
                onClick={handleSkinsClick}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-secondary hover:bg-surface-hover hover:text-text"
              >
                <User size={18} />
                Skins
              </a>
            </div>
          </div>

          {/* Search Placeholder (Visual only for nav) */}
          <div className="hidden md:flex items-center gap-3">
             <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-secondary">
                    <Search size={16} />
                </span>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="bg-background text-sm text-text border border-border rounded-full py-1.5 pl-9 pr-4 focus:outline-none focus:border-primary w-48 transition-all"
                />
             </div>
             <button 
                onClick={triggerDownloadMessage}
                className="p-2 rounded-full bg-surface-hover text-secondary hover:text-text hover:bg-surface-hover transition-colors"
                title="Download Desktop App"
              >
                <Download size={20} />
              </button>
              <button 
                onClick={openSettings}
                className="p-2 rounded-full bg-surface-hover text-secondary hover:text-text hover:bg-surface-hover transition-colors"
                title="Settings"
             >
                <Settings size={20} />
             </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden gap-2">
            <button 
              onClick={triggerDownloadMessage}
              className="bg-surface-hover inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-text hover:bg-surface-hover focus:outline-none"
            >
              <Download size={24} />
            </button>
            <button 
              onClick={openSettings}
              className="bg-surface-hover inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-text hover:bg-surface-hover focus:outline-none"
            >
              <Settings size={24} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-surface-hover inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-text hover:bg-surface-hover focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-surface-hover text-primary'
                      : 'text-secondary hover:bg-surface-hover hover:text-text'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <a
                href="https://mskins.net/en/resolution/64x32"
                onClick={handleSkinsClick}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-secondary hover:bg-surface-hover hover:text-text"
            >
                <User size={18} />
                Skins
            </a>
          </div>
        </div>
      )}
      </nav>

      {/* Skins Warning Modal */}
      <AnimatePresence>
        {showSkinsWarning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/10 blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">External Site Warning</h3>
                    <p className="text-sm text-secondary">You are leaving PSPrinth</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-xl p-4 mb-6 border border-border">
                  <p className="text-secondary text-sm leading-relaxed">
                    You are about to be redirected to <strong className="text-text">mskins.net</strong>. This is an external website not affiliated with PSPrinth.
                  </p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowSkinsWarning(false)}
                    className="px-5 py-2.5 rounded-xl font-medium text-text bg-surface-hover hover:bg-border transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContinueSkins}
                    className="px-5 py-2.5 rounded-xl font-bold text-black bg-primary hover:brightness-110 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(27,217,106,0.3)] flex items-center gap-2"
                  >
                    Continue <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Coming Soon Toast */}
      <AnimatePresence>
        {showDownloadMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[110] bg-primary text-black px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2"
          >
            <Sparkles size={18} />
            Starting Desktop App download...
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};