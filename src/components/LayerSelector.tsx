import React from "react";

interface LayerSelectorProps {
  onLayerSelect: (layerUrl: string, layerIndex: number) => void;
}

const LayerSelector: React.FC<LayerSelectorProps> = ({ onLayerSelect }) => {
  // Sample layer options for each layer
  const layerOptions = [
    [
      "https://i.imgflip.com/4/9ehk.jpg",
      "https://i.imgflip.com/4/1bij.jpg",
      "https://i.imgflip.com/4/1bgw.jpg",
    ],
    [
      "https://i.imgflip.com/4/26am.jpg",
      "https://i.imgflip.com/4/1bh8.jpg",
      "https://i.imgflip.com/4/1bhf.jpg",
    ],
    [
      "https://i.imgflip.com/4/1bhf.jpg",
      "https://i.imgflip.com/4/1bhf.jpg",
      "https://i.imgflip.com/4/1bhf.jpg",
    ],
  ];

  return (
    <div>
      {layerOptions.map((options, layerIndex) => (
        <div key={layerIndex} className="mb-4">
          <h2 className="mb-2 text-xl font-bold text-black">
            Layer {layerIndex + 1}
          </h2>
          <div className="flex space-x-2 overflow-x-auto">
            {options.map((layerUrl, optionIndex) => (
              <img
                key={optionIndex}
                src={layerUrl}
                alt={`Layer ${layerIndex + 1} Option ${optionIndex + 1}`}
                className="object-cover w-16 h-16 transition-all duration-200 border-2 border-transparent cursor-pointer hover:border-blue-500"
                onClick={() => onLayerSelect(layerUrl, layerIndex)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LayerSelector;
