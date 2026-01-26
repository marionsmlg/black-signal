import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Crosshair, ShieldAlert, Target } from 'lucide-react';
import { GlitchWrapper } from '../components/GlitchWrapper';

export const GameSection: React.FC = () => {
  const features = [
    { icon: <Target className="w-4 h-4" />, label: "Ballistic Precision" },
    { icon: <ShieldAlert className="w-4 h-4" />, label: "Tactical Asymmetry" },
    { icon: <Crosshair className="w-4 h-4" />, label: "Psychological Stress" },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pointer-events-none">
      {/* Content wrapper - pointer events auto to allow interaction with buttons */}
      <div className="pointer-events-auto flex flex-col items-center gap-12 mt-32 md:mt-0">
        
        <div className="text-center space-y-2">
          <GlitchWrapper>
             <h2 className="text-5xl md:text-7xl font-bold text-ash tracking-tighter">NULL VECTOR</h2>
          </GlitchWrapper>
          <p className="text-alien font-mono text-xs tracking-[0.5em] uppercase">
            Containment Breach Imminent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-charcoal/80 border border-steel/50 p-6 flex flex-col items-center text-center gap-4 hover:border-alien/50 transition-colors"
            >
              <div className="text-alien">{f.icon}</div>
              <span className="text-ash font-mono text-xs uppercase tracking-wider">{f.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="danger">
            INITIATE DEPLOYMENT
          </Button>
          <Button variant="ghost">
            WATCH TEASER
          </Button>
        </div>
      </div>
    </div>
  );
};