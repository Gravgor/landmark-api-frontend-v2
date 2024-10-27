import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const InteractiveMap = () => {
  const [activePin, setActivePin] = useState<number | null>(null);

  const landmarks = [
    { id: 1, name: 'Eiffel Tower', x: 20, y: 40 },
    { id: 2, name: 'Statue of Liberty', x: 70, y: 30 },
    { id: 3, name: 'Great Wall of China', x: 80, y: 60 },
  ];

  return (
    <div className="relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden">
      {landmarks.map((landmark) => (
        <div
          key={landmark.id}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
          onMouseEnter={() => setActivePin(landmark.id)}
          onMouseLeave={() => setActivePin(null)}
        >
          <MapPin className={`h-6 w-6 ${activePin === landmark.id ? 'text-blue-500' : 'text-white'}`} />
          {activePin === landmark.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-white text-black text-xs rounded shadow">
              {landmark.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InteractiveMap;