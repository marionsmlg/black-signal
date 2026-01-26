import React, { useRef, useEffect, useState } from 'react';
import { useStore } from './store';
import { EntrySection } from './sections/EntrySection';
import { ManifestoSection } from './sections/ManifestoSection';
import { GameSection } from './sections/GameSection';
import { FundingSection } from './sections/FundingSection';
import { IntegritySection } from './sections/IntegritySection';
import { ContactSection } from './sections/ContactSection';
import { Navigation } from './components/Navigation';
import { SectionId } from './types';
import { GlitchWrapper } from './components/GlitchWrapper';

// Helper to determine opacity based on scroll distance from section index
const useSectionOpacity = (index: number, scrollProgress: number) => {
  const distance = Math.abs(scrollProgress - index);
  // Fade out quickly as we leave the section
  return Math.max(0, 1 - distance * 1.5); 
};

const SectionContainer = ({ index, children }: { index: number, children?: React.ReactNode }) => {
  const { scrollProgress } = useStore();
  const opacity = useSectionOpacity(index, scrollProgress);
  
  if (opacity === 0) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none flex flex-col"
      style={{ opacity, zIndex: opacity > 0.1 ? 10 : 0 }}
    >
      <div className="flex-1 w-full h-full relative pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

interface InterfaceProps {
  onBoot: boolean;
}

export const Interface: React.FC<InterfaceProps> = ({ onBoot }) => {
  const { scrollProgress, setScrollProgress, toggleReducedMotion, reducedMotion } = useStore();
  const [triggerGlitch, setTriggerGlitch] = useState(false);
  
  // Custom Wheel Handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling behaviour handled by browser usually, but here we takeover
      const delta = e.deltaY * 0.001;
      const newProgress = Math.max(0, Math.min(5, scrollProgress + delta));
      setScrollProgress(newProgress);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollProgress, setScrollProgress]);

  // Handle entry animation trigger
  useEffect(() => {
    if (onBoot) {
      // Delay slightly to match the fade-in
      const timer = setTimeout(() => {
        setTriggerGlitch(true);
        // Turn off after animation completes
        setTimeout(() => setTriggerGlitch(false), 500); 
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [onBoot]);

  // Wrapper classes
  const containerClass = `fixed inset-0 z-10 transition-opacity duration-1000 ease-out ${onBoot ? 'opacity-100' : 'opacity-0'}`;
  const glitchClass = triggerGlitch ? 'animate-glitch' : '';

  return (
    <div className={containerClass}>
       {/* Conditional rendering ensures components mount FRESH when boot is done, triggering their internal onMount effects */}
       {onBoot && (
        <div className={`w-full h-full ${glitchClass}`}>
            
            <div className="absolute top-6 left-6 md:left-12 flex items-center gap-4 pointer-events-auto z-50">
              <div className="w-8 h-8 bg-ash text-void font-bold flex items-center justify-center text-xs">
                BS
              </div>
              <GlitchWrapper>
                <span className="hidden md:inline text-steel text-[10px] font-mono tracking-widest">
                  OPERATIONAL STATUS: NOMINAL
                </span>
              </GlitchWrapper>
            </div>

            <div className="absolute top-6 right-6 pointer-events-auto z-50">
              <button 
                onClick={toggleReducedMotion}
                className="text-[10px] text-muted hover:text-ash font-mono uppercase border border-steel px-2 py-1"
              >
                {reducedMotion ? "Motion: Reduced" : "Motion: Full"}
              </button>
            </div>

            <Navigation />

            <main className="fixed inset-0 z-0">
              <SectionContainer index={SectionId.ENTRY}>
                <EntrySection />
              </SectionContainer>
              <SectionContainer index={SectionId.MANIFESTO}>
                <ManifestoSection />
              </SectionContainer>
              <SectionContainer index={SectionId.GAME}>
                <GameSection />
              </SectionContainer>
              <SectionContainer index={SectionId.FUNDING}>
                <FundingSection />
              </SectionContainer>
              <SectionContainer index={SectionId.INTEGRITY}>
                <IntegritySection />
              </SectionContainer>
              <SectionContainer index={SectionId.CONTACT}>
                <ContactSection />
              </SectionContainer>
            </main>
            
            {/* Scanlines Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] bg-repeat" />
        </div>
       )}
    </div>
  );
};