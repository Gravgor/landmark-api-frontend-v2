import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveEndpoint: React.FC = () => {
  const [landmarkName, setLandmarkName] = useState('Mount Fuji');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLandmarkName(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`GET /api/v1/landmarks/name/${landmarkName}`);
    // You might want to add a toast notification here to confirm the copy action
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-4">
      <div className="flex items-center mb-2">
        <span className="text-gray-400 mr-2">GET</span>
        <input
          type="text"
          value={`/api/v1/landmarks/name/${landmarkName}`}
          onChange={handleChange}
          className="bg-gray-700 text-white px-2 py-1 rounded flex-grow"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Copy
        </motion.button>
      </div>
      <p className="text-sm text-gray-400">Try changing the landmark name in the URL!</p>
    </div>
  );
};

export default InteractiveEndpoint;
