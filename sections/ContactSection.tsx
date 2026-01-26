import React from 'react';
import { Button } from '../components/Button';
import { GlitchWrapper } from '../components/GlitchWrapper';

export const ContactSection: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-8">
        
        {/* Contact Form */}
        <div className="bg-charcoal border border-steel p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-alien to-transparent" />
          
          <GlitchWrapper>
             <h2 className="text-2xl text-ash font-bold mb-6">ESTABLISH UPLINK</h2>
          </GlitchWrapper>
          <form className="space-y-4">
            <div>
              <label className="block text-muted text-[10px] font-mono uppercase mb-1">Identity</label>
              <input type="text" className="w-full bg-void border border-steel p-3 text-ash text-sm focus:border-alien focus:outline-none transition-colors" placeholder="NAME / HANDLE" />
            </div>
            <div>
              <label className="block text-muted text-[10px] font-mono uppercase mb-1">Frequency</label>
              <input type="email" className="w-full bg-void border border-steel p-3 text-ash text-sm focus:border-alien focus:outline-none transition-colors" placeholder="EMAIL ADDRESS" />
            </div>
            <div>
              <label className="block text-muted text-[10px] font-mono uppercase mb-1">Transmission</label>
              <textarea rows={4} className="w-full bg-void border border-steel p-3 text-ash text-sm focus:border-alien focus:outline-none transition-colors resize-none" placeholder="MESSAGE CONTENT..." />
            </div>
            <Button className="w-full mt-2">TRANSMIT</Button>
          </form>
        </div>

        {/* Careers / Info */}
        <div className="flex flex-col justify-between py-4">
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
          
          <div className="text-center md:text-left">
             <a href="#" className="text-muted hover:text-ash text-xs font-mono uppercase transition-colors">
               Legal // Privacy // Terms
             </a>
          </div>
        </div>

      </div>
    </div>
  );
};