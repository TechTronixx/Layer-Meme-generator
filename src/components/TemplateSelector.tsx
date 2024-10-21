import React from "react";

interface TemplateSelectorProps {
  onSelect: (template: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const templates = [
    {
      id: "181913649",
      name: "Drake Hotline Bling",
      url: "https://i.imgflip.com/30b1gx.jpg",
    },
    {
      id: "87743020",
      name: "Two Buttons",
      url: "https://i.imgflip.com/1g8my4.jpg",
    },
    {
      id: "112126428",
      name: "Distracted Boyfriend",
      url: "https://i.imgflip.com/1ur9b0.jpg",
    },
    {
      id: "131087935",
      name: "Running Away Balloon",
      url: "https://i.imgflip.com/261o3j.jpg",
    },
    {
      id: "129242436",
      name: "Change My Mind",
      url: "https://i.imgflip.com/24y43o.jpg",
    },
  ];

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-black">Select a Template</h2>
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => (
          <img
            key={template.id}
            src={template.url}
            alt={template.name}
            className="object-cover w-20 h-20 transition-all duration-200 border-2 border-transparent cursor-pointer hover:border-blue-500"
            onClick={() => onSelect(template.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
