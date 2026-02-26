import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export const TiersSection: React.FC = () => {
  const tiers = [
    { name: "VANGUARD", price: "$30", reward: "Digital Copy + Beta Access" },
    { name: "OPERATOR", price: "$60", reward: "Alpha Access + Name in Credits" },
    { name: "ARCHITECT", price: "$150", reward: "Design a Weapon Skin" },
  ];

  return (
    <div className="min-h-full w-full flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
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
