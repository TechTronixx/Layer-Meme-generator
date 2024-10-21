import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import * as fabric from "fabric";
interface ImageEditorProps {
  template: string | null;
  layers: string[];
  texts: string[];
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  template,
  layers,
  texts,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [textObjects, setTextObjects] = useState<fabric.IText[]>([]);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 700,
        height: 700,
        backgroundColor: "#ffffff",
      });
      setFabricCanvas(canvas);

      // Responsive canvas sizing
      const resizeCanvas = () => {
        const containerWidth =
          canvasRef.current?.parentElement?.clientWidth || 500;
        const scale = containerWidth / 500;
        canvas.setWidth(containerWidth);
        canvas.setHeight(500 * scale);
        canvas.setZoom(scale);
        canvas.renderAll();
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      setIsCanvasReady(true);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        canvas.dispose();
      };
    }
  }, []);

  // Load template image
  useEffect(() => {
    if (isCanvasReady && template && fabricCanvas) {
      fabric.Image.fromURL(
        template,
        (img) => {
          fabricCanvas.clear();
          fabricCanvas.setBackgroundImage(
            img,
            fabricCanvas.renderAll.bind(fabricCanvas),
            {
              scaleX: fabricCanvas.width! / img.width!,
              scaleY: fabricCanvas.height! / img.height!,
            }
          );
        },
        { crossOrigin: "anonymous" }
      );
    }
  }, [isCanvasReady, template, fabricCanvas]);

  // Load layer images
  useEffect(() => {
    if (isCanvasReady && fabricCanvas) {
      fabricCanvas.clear();
      layers.forEach((layer, index) => {
        fabric.Image.fromURL(
          layer,
          (img) => {
            img.scaleToWidth(100);
            img.set({
              left: 50 + index * 20,
              top: 50 + index * 20,
              selectable: true,
              hasControls: true,
            });
            fabricCanvas.add(img);
            fabricCanvas.renderAll();
          },
          { crossOrigin: "anonymous" }
        );
      });
    }
  }, [isCanvasReady, layers, fabricCanvas]);

  // Add text objects
  useEffect(() => {
    if (isCanvasReady && fabricCanvas) {
      const existingTexts = textObjects.map((obj) => obj.text);
      const newTexts = texts.filter((text) => !existingTexts.includes(text));

      newTexts.forEach((text, index) => {
        const newTextObject = new fabric.IText(text, {
          left: 50,
          top: 50 + (textObjects.length + index) * 30,
          fontSize: 20,
          fill: "red",
          fontFamily: "Arial",
          editable: true,
          selectable: true,
          hasControls: true,
        });
        fabricCanvas.add(newTextObject);
        setTextObjects((prev) => [...prev, newTextObject]);
      });

      fabricCanvas.renderAll();
    }
  }, [isCanvasReady, texts, textObjects, fabricCanvas]);

  // Canvas mouse wheel handler for zooming
  const handleCanvasMouseWheel = useCallback(
    (event: React.WheelEvent<HTMLCanvasElement>) => {
      if (fabricCanvas) {
        const delta = event.deltaY;
        let zoom = fabricCanvas.getZoom();
        zoom *= 0.999 ** delta;
        zoom = Math.min(Math.max(0.1, zoom), 20);
        fabricCanvas.zoomToPoint(
          new fabric.Point(
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
          ),
          zoom
        );
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [fabricCanvas]
  );

  const downloadMeme = useCallback(() => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "meme.png";
      link.click();
    }
  }, [fabricCanvas]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="max-w-full border border-gray-300 rounded-lg shadow-lg"
        onWheel={handleCanvasMouseWheel}
      />
      <div className="mt-4 space-x-2">
        <Button onClick={downloadMeme}>Download Meme</Button>
      </div>
    </div>
  );
};

export default ImageEditor;
