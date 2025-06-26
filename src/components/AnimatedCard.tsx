import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  hoverScale = 1.02,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: hoverScale,
        boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;