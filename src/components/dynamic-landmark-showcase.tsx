import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const landmarks = [
  { name: "Mount Fuji", location: "Fujinomiya, Japan" },
  { name: "Eiffel Tower", location: "Paris, France" },
  { name: "Statue of Liberty", location: "New York City, USA" },
  { name: "Great Wall of China", location: "Beijing, China" },
  { name: "Taj Mahal", location: "Agra, India" }
];

const DynamicLandmarkShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % landmarks.length);
    }, 5000); // Change landmark every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <h3 className="text-xl font-semibold text-white">{landmarks[currentIndex].name}</h3>
          <p className="text-gray-400">{landmarks[currentIndex].location}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DynamicLandmarkShowcase;
