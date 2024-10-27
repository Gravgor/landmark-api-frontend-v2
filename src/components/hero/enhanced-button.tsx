import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedCTAButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const EnhancedCTAButton: React.FC<EnhancedCTAButtonProps> = ({ text, onClick, variant = 'primary' }) => {
  const baseClasses = "px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-white text-blue-500 hover:bg-gray-100 border border-blue-500",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]}`}
      whileHover={{
        scale: 1.05,
        boxShadow: variant === 'primary' ? '0 0 15px rgba(59, 130, 246, 0.5)' : '0 0 15px rgba(255, 255, 255, 0.5)',
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default EnhancedCTAButton;