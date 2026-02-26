import React, { useRef, useEffect, useState } from 'react';
import { useStore } from './store';
import { EntrySection } from './sections/EntrySection';
import { ManifestoSection } from './sections/ManifestoSection';
import { GameSection } from './sections/GameSection';
import { FundingSection } from './sections/FundingSection';
import { TiersSection } from './sections/TiersSection';
import { IntegritySection } from './sections/IntegritySection';
import { ContactSection } from './sections/ContactSection';
import { CareerSection } from './sections/CareerSection';
import { Navigation } from './components/Navigation';
import { SectionId, MOBILE_IDX } from './types';
import { GlitchWrapper } from './components/GlitchWrapper';

// Helper to determine opacity based on scroll distance from section index
const useSectionOpacity = (index: number, scrollProgress: number) => {
  const distance = Math.abs(scrollProgress - index);
  return Math.max(0, 1 - distance * 1.5);
};

const SectionContainer = ({ index, children }: { index: number, children?: React.ReactNode }) => {
  const { scrollProgress } = useStore();
  const opacity = useSectionOpacity(index, scrollProgress);

  if (opacity === 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col pt-16 pb-4"
      style={{ opacity, zIndex: opacity > 0.1 ? 10 : 0 }}
    >
      <div className="flex-1 w-full relative pointer-events-auto overflow-y-auto">
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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Track mobile/desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Max scroll: 5 on desktop (6 sections 0–5), 7 on mobile (8 sections 0–7)
  const maxScrollRef = useRef(isMobile ? 7 : 5);
  useEffect(() => {
    maxScrollRef.current = isMobile ? 7 : 5;
  }, [isMobile]);

  // Section indices differ between mobile and desktop
  const idx = isMobile ? MOBILE_IDX : {
    ENTRY: SectionId.ENTRY,
    MANIFESTO: SectionId.MANIFESTO,
    GAME: SectionId.GAME,
    FUNDING: SectionId.FUNDING,
    INTEGRITY: SectionId.INTEGRITY,
    CONTACT: SectionId.CONTACT,
  };

  // Custom Wheel Handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.001;
      const newProgress = Math.max(0, Math.min(maxScrollRef.current, scrollProgress + delta));
      setScrollProgress(newProgress);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollProgress, setScrollProgress]);

  // Touch Handler (mobile)
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      const delta = deltaY * 0.003;
      const newProgress = Math.max(0, Math.min(maxScrollRef.current, scrollProgress + delta));
      setScrollProgress(newProgress);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollProgress, setScrollProgress]);

  // Handle entry animation trigger
  useEffect(() => {
    if (onBoot) {
      const timer = setTimeout(() => {
        setTriggerGlitch(true);
        setTimeout(() => setTriggerGlitch(false), 500);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [onBoot]);

  const containerClass = `fixed inset-0 z-10 transition-opacity duration-1000 ease-out ${onBoot ? 'opacity-100' : 'opacity-0'}`;
  const glitchClass = triggerGlitch ? 'animate-glitch' : '';

  return (
    <div className={containerClass}>
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
            <SectionContainer index={idx.ENTRY}>
              <EntrySection />
            </SectionContainer>
            <SectionContainer index={idx.MANIFESTO}>
              <ManifestoSection />
            </SectionContainer>
            <SectionContainer index={idx.GAME}>
              <GameSection />
            </SectionContainer>
            <SectionContainer index={idx.FUNDING}>
              <FundingSection />
            </SectionContainer>

            {/* Mobile only: SUPPLY DROPS */}
            {isMobile && (
              <SectionContainer index={MOBILE_IDX.TIERS}>
                <TiersSection />
              </SectionContainer>
            )}

            <SectionContainer index={idx.INTEGRITY}>
              <IntegritySection />
            </SectionContainer>
            <SectionContainer index={idx.CONTACT}>
              <ContactSection />
            </SectionContainer>

            {/* Mobile only: CAREER */}
            {isMobile && (
              <SectionContainer index={MOBILE_IDX.CAREER}>
                <CareerSection />
              </SectionContainer>
            )}
          </main>

          {/* Scanlines Overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] bg-repeat" />
        </div>
      )}
    </div>
  );
};
