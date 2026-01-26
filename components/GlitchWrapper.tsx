import React, { useState, useEffect, useRef } from 'react';

interface GlitchWrapperProps {
  children: React.ReactNode;
  className?: string;
  probability?: number;
  triggerOnMount?: boolean;
}

const GLYPHS = '█▓▒░<>/\\[]{}-_+*^?#!010101';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + GLYPHS;

export const GlitchWrapper: React.FC<GlitchWrapperProps> = ({ 
  children, 
  className = "", 
  probability = 0.05,
  triggerOnMount = false
}) => {
  const [displayText, setDisplayText] = useState<React.ReactNode>(children);
  const [isGlitching, setIsGlitching] = useState(false);
  const originalTextRef = useRef<string | null>(null);
  
  // Store original text if children is string
  useEffect(() => {
    if (typeof children === 'string') {
      originalTextRef.current = children;
      setDisplayText(children);
    }
  }, [children]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    
    const scheduleNext = () => {
        // Random time between 2s and 8s
        const delay = 2000 + Math.random() * 6000;
        timeout = setTimeout(() => triggerGlitch(false), delay);
    };

    const triggerGlitch = (forced = false) => {
      // If not forced, roll the dice based on probability (handled here crudely as a 70% chance to skip for variation)
      if (!forced && Math.random() > 0.3) { 
         scheduleNext();
         return; 
      }

      setIsGlitching(true);
      
      const isText = typeof children === 'string' && originalTextRef.current;
      
      // 2. Perform Glitch Animation
      let frames = 0;
      const maxFrames = 5 + Math.floor(Math.random() * 10); // Random duration

      if (isText) {
        interval = setInterval(() => {
            if (frames >= maxFrames) {
                // End glitch
                clearInterval(interval);
                setDisplayText(originalTextRef.current);
                setIsGlitching(false);
                scheduleNext();
            } else {
                // Scramble Logic: Partially replace characters
                const text = originalTextRef.current!;
                const split = text.split('');
                
                // Determine how many chars to corrupt (10-30%)
                const corruptionLevel = 0.1 + Math.random() * 0.2;
                const numCorrupt = Math.ceil(text.length * corruptionLevel);
                
                for(let i=0; i<numCorrupt; i++) {
                    const idx = Math.floor(Math.random() * text.length);
                    // Don't replace spaces often
                    if (split[idx] !== ' ' || Math.random() > 0.8) {
                        split[idx] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    }
                }
                setDisplayText(split.join(''));
                frames++;
            }
        }, 50); // Frame rate of glitch
      } else {
          // Block glitch logic (CSS only)
          setTimeout(() => {
              setIsGlitching(false);
              scheduleNext();
          }, maxFrames * 50);
      }
    };

    // Initial Trigger Logic
    if (triggerOnMount) {
        // Force glitch shortly after mount to simulate initialization
        timeout = setTimeout(() => triggerGlitch(true), 250);
    } else {
        scheduleNext();
    }

    return () => {
        clearTimeout(timeout);
        clearInterval(interval);
    };
  }, [children, triggerOnMount]);

  const isText = typeof children === 'string';

  return (
    <div className={`relative inline-block ${className}`}>
        {/* Main Content */}
        <div className={`relative z-10 ${isGlitching ? 'animate-glitch' : ''}`}>
             {displayText}
        </div>

        {/* CSS-based visual artifacts (Ghosting/Color Split) when glitching */}
        {isGlitching && (
            <>
                <div 
                    className="absolute inset-0 text-critical opacity-50 mix-blend-screen pointer-events-none select-none animate-glitch-skew"
                    style={{ transform: 'translateX(-2px)', clipPath: 'inset(10% 0 40% 0)' }}
                >
                    {isText ? originalTextRef.current : children}
                </div>
                <div 
                    className="absolute inset-0 text-alien opacity-50 mix-blend-screen pointer-events-none select-none animate-glitch"
                    style={{ transform: 'translateX(2px)', animationDirection: 'reverse', clipPath: 'inset(40% 0 10% 0)' }}
                >
                    {isText ? originalTextRef.current : children}
                </div>
                {/* Occasional solid block overlay (alien cursor style) */}
                {Math.random() > 0.7 && (
                    <div className="absolute inset-0 bg-ash mix-blend-overlay opacity-20 animate-matrix-flash" />
                )}
            </>
        )}
    </div>
  );
};