import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Trophy, Users, Zap } from 'lucide-react';
import { GlitchWrapper } from '../components/GlitchWrapper';

export const FundingSection: React.FC = () => {
  const tiers = [
    { name: "VANGUARD", price: "$30", reward: "Digital Copy + Beta Access" },
    { name: "OPERATOR", price: "$60", reward: "Alpha Access + Name in Credits" },
    { name: "ARCHITECT", price: "$150", reward: "Design a Weapon Skin" },
  ];

  return (
    <div className="min-h-full w-full flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">

        {/* Left: Campaign Stats — always visible */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-critical font-mono text-xs tracking-widest mb-2">PRIORITY OBJECTIVE</h3>
            <GlitchWrapper>
              <h2 className="text-5xl font-bold text-ash mb-4">FUND THE RESISTANCE</h2>
            </GlitchWrapper>
            <p className="text-muted text-sm leading-relaxed max-w-md">
              We remain independent to maintain creative lethality.
              Corporate funding comes with chains. We prefer ammo.
              Back the campaign to secure your deployment slot.
            </p>
          </div>

          <div className="bg-charcoal/80 border border-critical/30 p-6 backdrop-blur-sm">
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl text-ash font-bold">$84,230</span>
              <span className="text-xs font-mono text-muted mb-1">of $120,000 GOAL</span>
            </div>
            <div className="w-full h-2 bg-void overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '70%' }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-critical shadow-[0_0_10px_rgba(177,18,38,0.5)]"
              />
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-critical" />
                <div className="flex flex-col">
                  <span className="text-ash font-bold text-lg leading-none">1,240</span>
                  <span className="text-[10px] text-muted font-mono uppercase">Backers</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-critical" />
                <div className="flex flex-col">
                  <span className="text-ash font-bold text-lg leading-none">12</span>
                  <span className="text-[10px] text-muted font-mono uppercase">Days Left</span>
                </div>
              </div>
            </div>
          </div>

          <Button variant="danger" className="w-full md:w-auto text-center justify-center" onClick={() => window.open('https://www.kickstarter.com', '_blank')}>
            ACCESS KICKSTARTER TERMINAL
          </Button>
        </motion.div>

        {/* Right: Tiers — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:block space-y-4"
        >
          <h3 className="text-steel font-mono text-xs tracking-widest mb-4 text-right">SUPPLY DROPS</h3>
          {tiers.map((tier, i) => (
            <div key={i} className="group border border-steel p-4 hover:border-ash hover:bg-steel/10 transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-1">
                <span className="text-ash font-bold text-sm tracking-wider">{tier.name}</span>
                <span className="text-critical font-mono text-sm">{tier.price}</span>
              </div>
              <p className="text-muted text-xs font-mono">{tier.reward}</p>
              <div className="h-[1px] w-full bg-steel/30 mt-3 group-hover:bg-critical/50 transition-colors" />
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <div className="flex items-center gap-2 text-muted text-xs font-mono">
              <Trophy className="w-3 h-3" />
              <span>ALL TIERS INCLUDE DISCORD ACCESS</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
