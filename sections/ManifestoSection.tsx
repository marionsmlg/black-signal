import React from 'react';
import { motion } from 'framer-motion';
import { GlitchWrapper } from '../components/GlitchWrapper';
import { Cpu, Activity } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visual/Technical Data - Fills the empty space */}
        <div className="hidden md:flex md:col-span-5 flex-col gap-8 opacity-60 pointer-events-none select-none">
            {/* Abstract Graphic */}
            <div className="relative w-full aspect-square border border-steel/30 p-4">
                <div className="absolute inset-0 border-l border-t border-critical/20 w-8 h-8" />
                <div className="absolute inset-0 border-r border-b border-critical/20 w-8 h-8 rotate-180 top-auto left-auto bottom-0 right-0" />
                
                {/* Inner Grid */}
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
                    <div className="bg-steel/5 border border-steel/10 flex items-center justify-center">
                        <Cpu className="w-12 h-12 text-steel/30" strokeWidth={1} />
                    </div>
                    <div className="bg-steel/5 border border-steel/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-void/50 z-10" />
                         <div className="w-full h-[1px] bg-critical/50 absolute top-1/2 -translate-y-1/2 animate-scan" />
                         <div className="grid grid-cols-4 gap-1 w-full h-full p-2 opacity-20">
                            {[...Array(16)].map((_,i) => <div key={i} className="bg-alien/50 rounded-sm" />)}
                         </div>
                    </div>
                    <div className="bg-steel/5 border border-steel/10 col-span-2 flex flex-col justify-between p-4">
                        <div className="flex justify-between text-[10px] text-muted font-mono uppercase">
                            <span>Sector 04</span>
                            <span className="animate-pulse text-critical">Active</span>
                        </div>
                        <div className="w-full bg-steel/20 h-1 mt-2 relative overflow-hidden">
                            <div className="h-full bg-ash w-2/3 animate-[pulse_3s_infinite]" />
                        </div>
                        <div className="mt-2 text-[8px] text-steel font-mono leading-tight">
                            > ANALYZING GEOMETRY<br/>
                            > OPTIMIZING MESH<br/>
                            > COMPILING SHADERS...
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyword List */}
            <div className="grid grid-cols-2 gap-4">
                {['NO_REGEN', 'FRIENDLY_FIRE', 'PERMADEATH', 'FULL_LOOT'].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-muted">
                        <div className="w-1.5 h-1.5 bg-critical" />
                        {tag}
                    </div>
                ))}
            </div>
        </div>

        {/* Right Column: The Manifesto Text */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 bg-charcoal/90 border-l-4 border-l-critical border-y border-r border-y-steel/30 border-r-steel/30 p-8 md:p-12 backdrop-blur-md relative"
        >
          {/* Decorative Background Number */}
          <div className="absolute -right-4 -top-12 text-[120px] font-bold text-ash/5 select-none pointer-events-none font-mono">
            01
          </div>

          <div className="flex items-center gap-4 mb-8 border-b border-steel/20 pb-4">
            <GlitchWrapper className="block">
                <h3 className="text-alien font-mono text-xs tracking-[0.2em] uppercase">
                    Protocol // Philosophy
                </h3>
            </GlitchWrapper>
            <div className="flex-1 h-px bg-steel/20" />
            <div className="flex gap-1">
                <div className="w-1 h-1 bg-ash rounded-full" />
                <div className="w-1 h-1 bg-ash/50 rounded-full" />
                <div className="w-1 h-1 bg-ash/20 rounded-full" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-ash mb-8 leading-[0.9] tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ash to-muted">
              WE DO NOT DESIGN FOR COMFORT.
            </span>
          </h2>

          <div className="space-y-6 text-muted text-sm md:text-base leading-relaxed font-mono">
            <p>
              <strong className="text-ash">THE PROBLEM:</strong> Modern shooters have become soft. Bright colors. Loot boxes. Dances. They treat you like a child.
            </p>
            <p>
              <strong className="text-ash">THE SOLUTION:</strong> Black Signal Studios builds functional pressure. Fear is a mechanic. Darkness is a resource. We strip away the clutter to reveal the raw signal of competition.
            </p>
            
            <div className="p-4 bg-void border border-steel/20 mt-6 relative group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-critical group-hover:bg-alien transition-colors" />
                <p className="text-ash font-bold text-lg uppercase tracking-wider pl-4">
                    "Win or die. There is no second place."
                </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};