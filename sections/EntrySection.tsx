import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchWrapper } from '../components/GlitchWrapper';

export const EntrySection: React.FC = () => {
  const [showNavHint, setShowNavHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNavHint(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center max-w-2xl w-full"
      >
        <GlitchWrapper>
          <h2 className="text-critical font-mono text-xs tracking-[0.3em] mb-4">SIGNAL DETECTED</h2>
        </GlitchWrapper>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-ash mb-6">
          <GlitchWrapper triggerOnMount>BLACK SIGNAL</GlitchWrapper>
        </h1>
        
        <p className="text-muted font-mono tracking-technical text-sm uppercase mb-12">
          Every signal leads to death.
        </p>
      </motion.div>

      {showNavHint && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-steel font-mono uppercase tracking-widest animate-pulse">
            Scroll to Advance
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-steel to-transparent" />
        </motion.div>
      )}
    </div>
  );
};