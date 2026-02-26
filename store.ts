import { create } from 'zustand';
import { SectionId } from './types';

interface AppState {
  currentSection: SectionId;
  targetSection: number;
  scrollProgress: number; // 0 to 4 (float)
  isTransitioning: boolean;
  reducedMotion: boolean;
  
  setSection: (id: SectionId) => void;
  setScrollProgress: (progress: number) => void;
  toggleReducedMotion: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentSection: SectionId.ENTRY,
  targetSection: 0,
  scrollProgress: 0,
  isTransitioning: false,
  reducedMotion: false,

  setSection: (id) => set({ 
    currentSection: id, 
    targetSection: id 
  }),
  
  setScrollProgress: (progress) => set((state) => {
    // Clamping is handled by the caller (Interface handlers)
    const nearestSection = Math.round(progress);
    return {
      scrollProgress: progress,
      targetSection: progress,
      currentSection: nearestSection !== state.currentSection ? nearestSection : state.currentSection
    };
  }),

  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
}));