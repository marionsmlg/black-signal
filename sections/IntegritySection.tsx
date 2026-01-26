import React from 'react';
import { motion } from 'framer-motion';
import { GlitchWrapper } from '../components/GlitchWrapper';

export const IntegritySection: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center px-6 md:px-20 lg:px-32">
      <div className="grid md:grid-cols-2 gap-16 w-full max-w-6xl items-center">
        
        {/* Visual Decoration - Moved to Left Column to balance layout */}
        <div className="hidden md:flex items-center justify-center opacity-50 order-2 md:order-1">
          <div className="w-64 h-64 border border-steel relative grid grid-cols-4 grid-rows-4">
             {[...Array(16)].map((_, i) => (
               <div key={i} className="border border-steel/20" />
             ))}
             <div className="absolute inset-0 border-2 border-corrupted/20 animate-pulse" />
             <div className="absolute top-2 right-2 text-[10px] text-corrupted font-mono">SYS.OK</div>
             <div className="absolute -bottom-4 -left-4 text-[10px] text-steel font-mono">integrity_check.exe</div>
          </div>
        </div>

        {/* Text Content - Moved to Right Column */}
        <div className="space-y-8 order-1 md:order-2">
          <div className="text-left md:text-right flex flex-col items-start md:items-end">
             <h3 className="text-corrupted font-mono text-xs mb-2 tracking-widest">SYSTEM DIAGNOSTIC</h3>
             <GlitchWrapper>
                <h2 className="text-4xl font-bold text-ash text-left md:text-right">COMPETITIVE INTEGRITY</h2>
             </GlitchWrapper>
          </div>
          
          <div className="space-y-6 flex flex-col items-start md:items-end text-left md:text-right">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="border-l-2 md:border-l-0 md:border-r-2 border-corrupted pl-4 md:pl-0 md:pr-4 py-2"
            >
                <h4 className="text-ash font-bold uppercase text-sm mb-1">128-Tick Architecture</h4>
                <p className="text-muted text-xs leading-relaxed max-w-xs ml-0 md:ml-auto">
                    What you see is what you hit. Server authority is absolute. No interpolation guessing games.
                </p>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="border-l-2 md:border-l-0 md:border-r-2 border-corrupted pl-4 md:pl-0 md:pr-4 py-2"
            >
                <h4 className="text-ash font-bold uppercase text-sm mb-1">Zero-Tolerance Anti-Cheat</h4>
                <p className="text-muted text-xs leading-relaxed max-w-xs ml-0 md:ml-auto">
                    Hardware-level verification. We do not ban waves; we terminate sessions instantly.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="border-l-2 md:border-l-0 md:border-r-2 border-corrupted pl-4 md:pl-0 md:pr-4 py-2"
            >
                <h4 className="text-ash font-bold uppercase text-sm mb-1">Visual Clarity</h4>
                <p className="text-muted text-xs leading-relaxed max-w-xs ml-0 md:ml-auto">
                    No visual clutter. Character silhouettes are distinct. Effects do not obscure vision.
                </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};