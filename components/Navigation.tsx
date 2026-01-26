import React from 'react';
import { useStore } from '../store';
import { SECTIONS, SectionId } from '../types';
import { useNavigate } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const { currentSection, setSection, setScrollProgress } = useStore();
  const navigate = useNavigate();

  const handleNav = (index: number, path: string) => {
    setSection(index);
    setScrollProgress(index);
    navigate(path);
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-steel/30" />
      
      {SECTIONS.map((section, index) => {
        const isActive = currentSection === index;
        const isFunding = section.id === SectionId.FUNDING;

        return (
          <div key={section.id} className="relative flex items-center group/item">
            <button
              onClick={() => handleNav(index, section.path)}
              className="group relative pl-6 flex items-center"
              aria-label={`Navigate to ${section.label}`}
            >
              {/* Node Indicator */}
              <div className={`
                absolute left-0 w-3.5 h-3.5 border transition-all duration-500
                ${isActive 
                  ? 'bg-ash border-ash scale-100' 
                  : isFunding 
                    ? 'bg-void border-corrupted scale-90 shadow-[0_0_8px_rgba(255,106,43,0.3)] animate-pulse' // Pulsing orange for War Effort
                    : 'bg-void border-steel scale-75 group-hover:border-muted group-hover:scale-90'}
              `}>
                {isActive && (
                  <div className="absolute inset-0 animate-ping opacity-20 bg-ash" />
                )}
              </div>

              {/* Label */}
              <span className={`
                font-mono text-[10px] tracking-widest transition-all duration-500 whitespace-nowrap
                ${isActive 
                  ? 'text-ash opacity-100 translate-x-0' 
                  : isFunding 
                    ? 'text-corrupted opacity-80 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0' // Orange text for War Effort
                    : 'text-muted opacity-40 -translate-x-2 group-hover:opacity-80 group-hover:translate-x-0'}
              `}>
                {isActive ? `// ${section.label}` : section.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};