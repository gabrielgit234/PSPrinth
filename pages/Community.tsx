import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Palette, MessageSquare } from 'lucide-react';

export const Community: React.FC = () => {
  const textureCreators = [
    {
      name: 'mega_biel10',
      role: 'Principal Creator',
      avatar: 'https://i.postimg.cc/Z911nshF/image.png',
      description: 'Creator of most of the incredible textures and mods for the PSP.',
    },
    {
      name: 'sexy shrek',
      role: 'Texture Artist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sexyshrek&backgroundColor=c0aede',
      description: 'Texture and UI expert, co-creator of several packs.',
    },
    {
      name: 'Bonkunph',
      role: 'Modder & Artist',
      avatar: 'https://i.postimg.cc/wzCPyTrb/2-removebg-preview.png',
      description: 'Contributor of classic mods and textures.',
    }
  ];

  const siteCreators = [
    {
      name: 'mega_biel10',
      role: 'Lead Developer & Designer',
      avatar: 'https://i.postimg.cc/Z911nshF/image.png',
      description: 'Lead developer and creator of PSPrinth.',
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Discord Hero Section */}
      <div className="bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-2xl p-8 md:p-12 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5865F2]/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#5865F2]/30">
            <MessageSquare size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
            Join our <span className="text-[#5865F2]">Community</span>
          </h1>
          <p className="text-xl text-secondary mb-8">
            Be part of our Discord servers! Chat with other players, share your creations, ask questions, and stay up to date with all the Minecraft PSP news.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://discord.gg/xESmef8mJq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#5865F2]/25"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
              </svg>
              Join PSPrinth Server
            </a>
            <a 
              href="https://discord.gg/cHvq5UwuXb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#5865F2]/25"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
              </svg>
              Join MCPSP Textures Server
            </a>
          </div>
        </div>
      </div>

      {/* Main Creators Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Palette className="text-primary" size={28} />
          <h2 className="text-3xl font-bold text-text">Main Creators</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {textureCreators.map((creator, index) => (
            <motion.div 
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
            >
              <img 
                src={creator.avatar} 
                alt={creator.name} 
                className="w-24 h-24 rounded-full mb-4 shadow-lg object-cover object-center"
              />
              <h3 className="text-xl font-bold text-text mb-1">{creator.name}</h3>
              <span className="text-primary text-sm font-medium mb-3 px-3 py-1 bg-primary/10 rounded-full">
                {creator.role}
              </span>
              <p className="text-secondary text-sm">
                {creator.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Site Creators Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Code className="text-primary" size={28} />
          <h2 className="text-3xl font-bold text-text">Site Creators</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteCreators.map((creator, index) => (
            <motion.div 
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
            >
              <img 
                src={creator.avatar} 
                alt={creator.name} 
                className="w-24 h-24 rounded-full mb-4 shadow-lg object-cover object-center"
              />
              <h3 className="text-xl font-bold text-text mb-1">{creator.name}</h3>
              <span className="text-primary text-sm font-medium mb-3 px-3 py-1 bg-primary/10 rounded-full">
                {creator.role}
              </span>
              <p className="text-secondary text-sm">
                {creator.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
