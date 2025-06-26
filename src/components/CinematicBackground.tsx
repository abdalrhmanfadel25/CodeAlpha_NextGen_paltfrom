import React from 'react';
import { motion } from 'framer-motion';

const CinematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(30, 58, 138, 0.1), rgba(22, 78, 99, 0.2))',
            'linear-gradient(135deg, rgba(22, 78, 99, 0.2), rgba(147, 51, 234, 0.2), rgba(30, 58, 138, 0.1))',
            'linear-gradient(225deg, rgba(30, 58, 138, 0.1), rgba(22, 78, 99, 0.2), rgba(147, 51, 234, 0.2))',
            'linear-gradient(315deg, rgba(147, 51, 234, 0.2), rgba(30, 58, 138, 0.1), rgba(22, 78, 99, 0.2))'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
            scale: [null, Math.random() * 1.5 + 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-500/20 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 border border-cyan-500/20"
        animate={{
          rotate: -360,
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Liquid glass effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 backdrop-blur-[0.5px]" />
    </div>
  );
};

export default CinematicBackground;