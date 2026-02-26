import React from 'react';
import { Skin } from '../types';
import { Link } from 'react-router-dom';
import { Eye, Download } from 'lucide-react';

interface SkinCardProps {
  skin: Skin;
}

export const SkinCard: React.FC<SkinCardProps> = ({ skin }) => {
  // CSS Paper Doll for Front View
  // Using background-image positioning to construct the character
  // Scale factor: The base model is small (16px width x 32px height of texture pixels)
  // We scale this up to fill the card height.
  
  const SkinPart = ({ w, h, x, y, bgX, bgY, flip }: { w: number, h: number, x: number, y: number, bgX: number, bgY: number, flip?: boolean }) => (
    <div 
        className="absolute"
        style={{
            width: `${w}px`,
            height: `${h}px`,
            left: `${x}px`,
            top: `${y}px`,
            backgroundImage: `url(${skin.imageUrl})`,
            backgroundPosition: `-${bgX}px -${bgY}px`,
            backgroundSize: '64px auto', // Assume 64px wide texture
            imageRendering: 'pixelated',
            transform: flip ? 'scaleX(-1)' : 'none',
        }}
    />
  );

  return (
    <Link to={`/skin/${skin.id}`} className="block group">
      <div className="bg-[#1c1c1c] rounded-lg overflow-hidden border border-[#2d2d2d] hover:border-primary transition-all flex flex-col h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
        {/* Preview Area */}
        <div className="relative h-48 bg-[#252525] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#333] to-[#1c1c1c]">
           
           <div className="relative w-[16px] h-[32px] transform scale-[4.5] group-hover:scale-[5] transition-transform duration-300">
                {/* Head (8x8) at 4,0 */}
                <SkinPart w={8} h={8} x={4} y={0} bgX={8} bgY={8} />
                
                {/* Head Layer (8x8) at 4,0 */}
                <SkinPart w={8} h={8} x={4} y={0} bgX={40} bgY={8} />

                {/* Body (8x12) at 4,8 */}
                <SkinPart w={8} h={12} x={4} y={8} bgX={20} bgY={20} />

                {/* Body Layer (8x12) at 4,8 */}
                <SkinPart w={8} h={12} x={4} y={8} bgX={20} bgY={36} />

                {/* Right Arm (4x12) at 0,8 */}
                <SkinPart w={4} h={12} x={0} y={8} bgX={44} bgY={20} />
                
                {/* Right Arm Layer (4x12) at 0,8 */}
                <SkinPart w={4} h={12} x={0} y={8} bgX={44} bgY={36} />

                {/* Left Arm (4x12) at 12,8 - Mirrored Right Arm for safety/universal support */}
                <SkinPart w={4} h={12} x={12} y={8} bgX={44} bgY={20} flip />
                
                {/* Left Arm Layer */}
                <SkinPart w={4} h={12} x={12} y={8} bgX={44} bgY={36} flip />

                {/* Right Leg (4x12) at 4,20 */}
                <SkinPart w={4} h={12} x={4} y={20} bgX={4} bgY={20} />
                
                {/* Right Leg Layer */}
                <SkinPart w={4} h={12} x={4} y={20} bgX={4} bgY={36} />

                {/* Left Leg (4x12) at 8,20 - Mirrored Right Leg */}
                <SkinPart w={4} h={12} x={8} y={20} bgX={4} bgY={20} flip />
                
                {/* Left Leg Layer */}
                <SkinPart w={4} h={12} x={8} y={20} bgX={4} bgY={36} flip />
           </div>

           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
        
        <div className="p-3 bg-[#1c1c1c] flex-grow flex flex-col justify-between border-t border-[#333]">
          <h3 className="font-semibold text-white truncate text-center text-sm mb-2">{skin.name}</h3>
          <div className="flex justify-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1"><Eye size={12}/> {skin.views > 1000 ? (skin.views/1000).toFixed(1) + 'k' : skin.views}</span>
            <span className="flex items-center gap-1"><Download size={12}/> {skin.downloads > 1000 ? (skin.downloads/1000).toFixed(1) + 'k' : skin.downloads}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};