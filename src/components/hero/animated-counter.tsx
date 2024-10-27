import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration: number;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration, label }) => {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (latest) => Math.floor(latest));

  React.useEffect(() => {
    spring.set(end);
  }, [spring, end]);

  return (
    <div className="text-center">
      <motion.div className="text-3xl font-bold text-blue-500">
        <motion.span>{display}</motion.span>+
      </motion.div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
};

export default AnimatedCounter;