import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface TextEditorProps {
  onTextAdd: (text: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onTextAdd }) => {
  const [text, setText] = useState("");

  const handleAddText = () => {
    if (text.trim()) {
      onTextAdd(text);
      setText("");
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-black">Text</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add text to your meme"
          className="w-full p-2 rounded"
        />
        <Button onClick={handleAddText}>Add Text</Button>
      </div>
    </div>
  );
};

export default TextEditor;
