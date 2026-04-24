import React from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, Play, Pause } from 'lucide-react';

export default function SnakeGame() {
  const {
    snake,
    food,
    score,
    highScore,
    isGameOver,
    isPaused,
    resetGame,
    setIsPaused,
    GRID_SIZE
  } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {/* Game Window Header */}
      <div className="w-full max-w-[500px] mb-4 flex items-center justify-between px-2 border-b border-cyan/20 pb-2">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] font-mono text-cyan/50 block">SCORE</span>
            <span className="font-mono text-xl text-cyan">{score.toString().padStart(4, '0')}</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-[10px] font-mono text-magenta/50 block">BEST</span>
            <span className="font-mono text-xl text-magenta">{highScore.toString().padStart(4, '0')}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            disabled={isGameOver}
            className="p-2 border border-cyan/30 text-cyan hover:bg-cyan hover:text-void transition-colors disabled:opacity-20"
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button 
            onClick={resetGame}
            className="p-2 border border-magenta/30 text-magenta hover:bg-magenta hover:text-void transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Game Board */}
      <motion.div 
        animate={score > 0 ? {
          x: [0, -2, 2, -2, 0],
          transition: { duration: 0.1 }
        } : {}}
        key={score}
        className="relative aspect-square w-full max-w-[500px] glitch-border bg-black/80 overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 pixel-grid" />
        
        {/* Scanline Effect */}
        <div className="scanline" />

        {/* Snake & Food Rendering */}
        <div 
          className="relative w-full h-full grid" 
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {/* Food */}
          <motion.div
            className="bg-magenta shadow-[0_0_15px_#ff00ff]"
            style={{
              gridColumnStart: food.x + 1,
              gridRowStart: food.y + 1,
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />

          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={`${index}-${segment.x}-${segment.y}`}
              className={`${index === 0 ? 'bg-cyan' : 'bg-cyan/60'} shadow-[0_0_5px_rgba(0,255,255,0.5)] border-[0.5px] border-black/20`}
              style={{
                gridColumnStart: segment.x + 1,
                gridRowStart: segment.y + 1,
                zIndex: snake.length - index
              }}
            />
          ))}
        </div>

        {/* Overlay Screens */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm"
            >
              <div className="text-center p-8 border-2 border-magenta">
                <h2 className="text-4xl font-black text-magenta mb-4 glitch-text tracking-tighter" data-text="GAME OVER">
                  GAME OVER
                </h2>
                <div className="space-y-2 mb-6">
                  <p className="text-white/60 font-mono text-sm uppercase">Terminal Session Terminated</p>
                  <p className="text-cyan font-mono">Final Score: {score}</p>
                </div>
                <button
                  onClick={resetGame}
                  className="px-8 py-3 bg-white text-void font-bold hover:bg-magenta hover:text-white transition-all transform hover:scale-105 active:scale-95"
                >
                  REBOOT_SYSTEM
                </button>
              </div>
            </motion.div>
          )}

          {isPaused && !isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-void/40 backdrop-blur-[2px]"
            >
              <div className="text-center">
                <span className="text-cyan font-mono animate-pulse text-2xl tracking-[0.5em] uppercase">Paused</span>
                <p className="text-[10px] text-white/40 mt-2 font-mono uppercase tracking-widest">Press Space to Resume</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan shadow-[0_0_4px_#00ffff]" />
          <span>CODE_STREAM</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-magenta shadow-[0_0_4px_#ff00ff]" />
          <span>DATA_FRAGMENT</span>
        </div>
      </div>
    </div>
  );
}
