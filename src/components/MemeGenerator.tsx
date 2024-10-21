import React, { useState, useRef } from "react";
import TemplateSelector from "./TemplateSelector";
import ImageEditor from "./ImageEditor";
import LayerSelector from "./LayerSelector";
import TextEditor from "./TextEditor";
import { Button } from "@/components/ui/button";

const MemeGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [layers, setLayers] = useState<string[]>([]);
  const [texts, setTexts] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadTemplate = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedTemplate(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    // This will trigger the download in the ImageEditor component
    const downloadButton = document.querySelector("button:last-child");
    if (downloadButton instanceof HTMLButtonElement) {
      downloadButton.click();
    }
  };

  const handleAddText = (text: string) => {
    setTexts([...texts, text]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-blue-600/50">
      <h1 className="mb-6 text-4xl font-bold text-black">Meme Generator</h1>
      <div className="flex flex-col w-full max-w-6xl gap-4 md:flex-row">
        <div className="w-full md:w-2/3">
          <ImageEditor
            template={selectedTemplate}
            layers={layers}
            texts={texts}
          />
        </div>
        <div className="w-full space-y-4 md:w-1/3">
          <TemplateSelector onSelect={setSelectedTemplate} />
          <LayerSelector
            onLayerSelect={(layer) => setLayers([...layers, layer])}
          />
          <TextEditor onTextAdd={handleAddText} />
          <div className="flex justify-between">
            <Button
              variant="secondary"
              className="text-black bg-slate-300"
              onClick={handleDownload}
            >
              I'M DONE
            </Button>
            <Button
              variant="secondary"
              className="text-black bg-slate-300"
              onClick={handleUploadTemplate}
            >
              UPLOAD TEMPLATE
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
