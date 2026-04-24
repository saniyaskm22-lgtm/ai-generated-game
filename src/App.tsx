/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, Wifi, Shield, Layout, Radio, Maximize2, Minimize2, Crosshair } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    const bootTimer = setTimeout(() => setBootSequence(false), 2000);
    return () => {
      clearInterval(timer);
      clearTimeout(bootTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-void relative flex flex-col font-sans overflow-hidden select-none">
      {/* Global Background Elements */}
      <div className="fixed inset-0 crt-vignette pointer-events-none" />
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, transparent, rgba(0,0,0,0.8)) pointer-events-none" />
      
      {/* Boot Overlay */}
      <AnimatePresence>
        {bootSequence && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void flex items-center justify-center flex-col gap-4"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-cyan"
            >
              <Cpu size={48} />
            </motion.div>
            <div className="font-mono text-xs text-cyan animate-pulse tracking-widest uppercase">
              Initializing_VOID_OS_v4.4.2...
            </div>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="h-full bg-cyan shadow-[0_0_15px_#00ffff]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / OS Bar */}
      <header className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Shield className="w-4 h-4 text-magenta" />
            <span className="text-[10px] font-bold tracking-tighter uppercase">Neon_Defense_Safe</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <div className="flex items-center gap-1">
              <Wifi size={12} className="text-cyan" />
              <span>Network_Stable</span>
            </div>
            <div className="flex items-center gap-1">
              <Database size={12} className="text-magenta" />
              <span>Buffer_94%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="text-cyan animate-pulse flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_5px_#00ffff]" />
            LIVE_SESSION
          </div>
          <span className="text-white/50">{time}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        {/* Left Sidebar - Terminal Stats */}
        <aside className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex-1 bg-black/40 border border-white/5 p-4 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-2 opacity-20">
               <Terminal size={14} />
             </div>
             <h3 className="text-[10px] font-mono text-cyan/70 uppercase mb-4 flex items-center gap-2">
               <Crosshair size={10} /> System_Log
             </h3>
             <div className="font-mono text-[9px] text-white/40 space-y-2 uppercase leading-tight">
               <p className="text-green-500/50">[OK] MEMORY_ALLOC_SUCCESS</p>
               <p>[INFO] SEARCHING_FOR_FRAGMENTS...</p>
               <p>[WARN] RETRO_DRIVE_DEGRADED</p>
               <p className="text-cyan/50">[OK] MUSIC_SYNCHRONIZED</p>
               <p>[INFO] SNAKE_THREAT_DETECTED</p>
               <p className="animate-pulse">{`> WAIT_FOR_USER_INPUT`}</p>
             </div>
             
             {/* Decorative grid */}
             <div className="absolute bottom-[-20%] left-[-20%] w-full aspect-square bg-cyan/5 rounded-full blur-3xl" />
          </div>

          <div className="h-[280px]">
            <MusicPlayer />
          </div>
        </aside>

        {/* Center - Game Window */}
        <section className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
           <div className="w-full h-full relative">
             {/* Decorative Corner Ornaments */}
             <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan z-20" />
             <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan z-20" />
             <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan z-20" />
             <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan z-20" />
             
             <div className="w-full h-full bg-black/20 backdrop-blur-sm border border-white/5 p-4 lg:p-8 relative">
                <SnakeGame />
             </div>
           </div>
        </section>

        {/* Right Sidebar - Social / Extra */}
        <aside className="lg:col-span-3 flex flex-col gap-6 order-3">
          <div className="h-1/2 bg-black/40 border border-white/5 p-4">
             <h3 className="text-[10px] font-mono text-magenta/70 uppercase mb-4 flex items-center gap-2">
               <Radio size={10} /> Active_Nodes
             </h3>
             <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-white/20" />
                   <div className="flex-1 space-y-1">
                      <div className="h-1 bg-white/10 w-full rounded-full" />
                      <div className={`h-1 bg-magenta/40 rounded-full`} style={{ width: `${Math.random() * 80}%` }} />
                   </div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="flex-1 bg-black/40 border border-white/5 p-4 group">
            <h3 className="text-[10px] font-mono text-cyan/70 uppercase mb-4 flex items-center gap-2">
               <Maximize2 size={10} /> Neural_Interface
             </h3>
             <div className="grid grid-cols-4 gap-2">
               {[...Array(16)].map((_, i) => (
                 <motion.div 
                  key={i}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                  className="aspect-square bg-cyan/20 border border-cyan/10" 
                 />
               ))}
             </div>
             <p className="text-[8px] font-mono text-white/20 mt-4 leading-relaxed uppercase">
               Simulation parameters are strictly monitored. Any deviation in grid traversal will result in immediate state reset.
             </p>
          </div>
        </aside>
      </main>

      {/* Footer / OS Utilities */}
      <footer className="h-8 border-t border-white/5 bg-black/80 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4 text-[9px] font-mono text-white/40">
           <span className="animate-pulse">SYSTEM_STABLE</span>
           <span className="text-white/10">|</span>
           <span>CPU_LOAD: {Math.floor(Math.random() * 20 + 10)}%</span>
        </div>
        <div className="flex items-center gap-4">
           <Layout size={12} className="text-white/20 hover:text-cyan transition-colors cursor-pointer" />
           <Radio size={12} className="text-white/20 hover:text-magenta transition-colors cursor-pointer" />
        </div>
      </footer>
    </div>
  );
}
