import React from 'react';
import { Button } from '../components/Button';

export const CareerSection: React.FC = () => {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-6 py-8">
      <div className="w-full max-w-sm flex flex-col justify-between py-4">
        <div>
          <h3 className="text-steel font-mono text-xs tracking-widest mb-4">CAREER OPPORTUNITIES</h3>
          <h2 className="text-3xl text-ash font-bold mb-4">JOIN THE SIGNAL</h2>
          <p className="text-muted text-sm mb-6">
            We are looking for engineers and artists who thrive in the dark.
            Remote-first. Result-oriented.
          </p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center justify-between border-b border-steel/30 pb-2">
              <span className="text-ash text-sm">Senior Network Engineer</span>
              <span className="text-alien text-xs font-mono">OPEN</span>
            </li>
            <li className="flex items-center justify-between border-b border-steel/30 pb-2">
              <span className="text-ash text-sm">Technical Artist (VFX)</span>
              <span className="text-alien text-xs font-mono">OPEN</span>
            </li>
            <li className="flex items-center justify-between border-b border-steel/30 pb-2">
              <span className="text-ash text-sm">Level Designer</span>
              <span className="text-muted text-xs font-mono">FILLED</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <a href="#" className="text-muted hover:text-ash text-xs font-mono uppercase transition-colors">
            Legal // Privacy // Terms
          </a>
        </div>
      </div>
    </div>
  );
};
