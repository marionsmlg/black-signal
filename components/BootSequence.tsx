import React, { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  // Simulation logs
  const bootLogs = [
    "BIOS_CHECK... OK",
    "LOADING_KERNEL... 0x84F2",
    "MOUNTING_VOLUMES... OK",
    "BYPASSING_FIREWALL...",
    "ESTABLISHING_UPLINK...",
    "SIGNAL_DETECTED",
  ];

  useEffect(() => {
    // Sequence Logic
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Phase 0: Quick logs
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog >= bootLogs.length) {
        clearInterval(logInterval);
        setPhase(1);
      } else {
        setLog(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      }
    }, 150);

    // Phase 1: Wait briefly then glitch out
    timeouts.push(setTimeout(() => {
       setPhase(2); // The big glitch
    }, 1800));

    // Phase 2: Complete
    timeouts.push(setTimeout(() => {
       onComplete();
    }, 2200));

    return () => {
      clearInterval(logInterval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  if (phase === 2) {
    // Exit Glitch - The "Turn On" Effect without white flash
    return (
      <div className="fixed inset-0 z-[100] bg-transparent flex items-center justify-center overflow-hidden pointer-events-none">
         {/* Glitching void layer that reveals the app behind it as it skews */}
         <div className="absolute inset-0 bg-void animate-glitch-skew" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center font-mono cursor-none">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      
      {/* Central Content */}
      <div className="w-full max-w-md p-8 relative">
        <div className="border-l-2 border-critical h-32 absolute left-0 top-0 opacity-50" />
        
        {/* Loading Bar */}
        <div className="mb-8 w-full bg-steel/20 h-1 relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 bg-critical animate-[scan_2s_linear_infinite] w-full origin-left" />
        </div>

        {/* Text Logs */}
        <div className="space-y-1">
          {log.map((line, i) => (
            <div key={i} className="text-xs text-muted tracking-wider">
              <span className="text-steel mr-2">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === log.length - 1 ? 'text-ash animate-pulse' : ''}>{line}</span>
            </div>
          ))}
          <div className="text-critical animate-terminal-blink">_</div>
        </div>
      </div>

      {/* Corners */}
      <div className="fixed top-4 left-4 text-[10px] text-steel">SYS.BOOT.V4</div>
      <div className="fixed bottom-4 right-4 text-[10px] text-steel">NO_SIGNAL</div>
    </div>
  );
};