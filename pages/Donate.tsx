import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Star, ArrowRight } from 'lucide-react';

export const Donate: React.FC = () => {
  // Mock data for donations
  const goal = 3;
  const raised = 0;
  const percentage = Math.min(100, Math.round((raised / goal) * 100));

  const recentDonors: any[] = [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background pb-20"
    >
      {/* Hero Section */}
      <div className="relative bg-surface border-b border-border py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-6">
            <Heart size={40} className="fill-current" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text tracking-tight mb-6">
            Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">PSPrinth</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Help us keep the servers running and continue developing new features for the Minecraft PSP community.
          </p>
          
          <a 
            href="https://ko-fi.com/psprinthproject" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF5E5B] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,94,91,0.3)] text-lg"
          >
            <Coffee size={24} />
            Donate on Ko-fi
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Goal Tracker */}
          <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" /> Year Goal
            </h2>
            
            <div className="mb-4 flex justify-between items-end">
              <div className="text-4xl font-extrabold text-text">${raised}</div>
              <div className="text-secondary font-medium">of ${goal} goal</div>
            </div>
            
            <div className="w-full bg-background rounded-full h-4 mb-2 overflow-hidden border border-border">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-full"
              />
            </div>
            <p className="text-right text-sm text-secondary font-medium">{percentage}% reached</p>
            
            <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <h3 className="font-bold text-primary mb-2">Why Donate?</h3>
              <ul className="text-sm text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>To motivate me to continue on the MCPSP path and create a desktop app</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Recent Donors */}
          <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
              <Heart className="text-red-500" /> Recent Supporters
            </h2>
            
            <div className="space-y-4">
              {recentDonors.length > 0 ? (
                recentDonors.map((donor, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-4 rounded-xl bg-background border border-border flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center text-secondary font-bold shrink-0">
                      {donor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-text">{donor.name}</span>
                        <span className="text-sm font-medium text-green-500">bought {donor.amount / 5} coffees</span>
                      </div>
                      {donor.message && (
                        <p className="text-sm text-secondary mt-1 italic">"{donor.message}"</p>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-secondary">
                  <p>No supporters yet. Be the first!</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href="https://ko-fi.com/psprinthproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-secondary hover:text-text underline transition-colors"
              >
                View all supporters on Ko-fi
              </a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};
