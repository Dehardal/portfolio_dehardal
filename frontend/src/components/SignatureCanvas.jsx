import React, { useEffect, useRef, useState } from 'react';
import signatureImg from '../images/WhatsApp Image 2026-06-03 at 12.27.30 PM.jpeg';

/**
 * SignatureCanvas — Renders the signature with a 100% transparent background.
 * Uses high-fidelity luminance-to-alpha mapping to extract the signature strokes 
 * with perfect anti-aliased smoothness, preserving the natural pen strokes.
 */
export default function SignatureCanvas() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = signatureImg;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const renderHeight = 56; // Layout display height
      const renderWidth = renderHeight * aspectRatio;

      // 3x Supersampling for ultra-crisp Retina display
      const scale = 3;
      const canvasWidth = Math.round(renderWidth * scale);
      const canvasHeight = Math.round(renderHeight * scale);

      // Lock canvas display size in layout
      canvas.style.width = `${renderWidth}px`;
      canvas.style.height = `${renderHeight}px`;

      // Set internal rendering buffer to the exact supersampled size
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Create offscreen canvas at the exact supersampled resolution
      const offscreen = document.createElement('canvas');
      const offscreenCtx = offscreen.getContext('2d');
      offscreen.width = canvasWidth;
      offscreen.height = canvasHeight;

      // Draw original high-res image onto offscreen canvas (downscales smoothly)
      offscreenCtx.fillStyle = '#ffffff';
      offscreenCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      offscreenCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // Extract processed pixel array at exact output resolution
      const imgData = offscreenCtx.getImageData(0, 0, canvasWidth, canvasHeight);
      const data = imgData.data;

      // Calculate min & max brightness of downscaled image for adaptive thresholding
      let minB = 255;
      let maxB = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        if (brightness < minB) minB = brightness;
        if (brightness > maxB) maxB = brightness;
      }
      
      // Define paper white color with a safe margin to filter out paper texture/shadow noise
      const paperWhite = maxB - 25;

      // Create output image buffer
      const outputData = ctx.createImageData(canvasWidth, canvasHeight);
      const out = outputData.data;

      for (let i = 0; i < data.length; i += 4) {
        const pixelIdx = i / 4;
        const x = pixelIdx % canvasWidth;
        const y = Math.floor(pixelIdx / canvasWidth);

        // Crop 3.5% padding around edges to crop camera vignette/shadows
        if (x < canvasWidth * 0.035 || x > canvasWidth * 0.965 || y < canvasHeight * 0.035 || y > canvasHeight * 0.965) {
          out[i] = 0;
          out[i + 1] = 0;
          out[i + 2] = 0;
          out[i + 3] = 0;
          continue;
        }

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        if (brightness < paperWhite) {
          // Render stroke pixel as solid white
          out[i] = 255;
          out[i + 1] = 255;
          out[i + 2] = 255;
          
          // Continuous alpha mapping: 0 opacity at paperWhite, 1 opacity at minB
          let opacity = (paperWhite - brightness) / (paperWhite - minB);
          
          // Apply a contrast curve (gamma) to make the strokes solid but keep the edges perfectly smooth
          opacity = Math.pow(Math.max(0, Math.min(1, opacity)), 1.3);
          
          out[i + 3] = Math.floor(opacity * 255);
        } else {
          // Keep background paper completely transparent
          out[i] = 0;
          out[i + 1] = 0;
          out[i + 2] = 0;
          out[i + 3] = 0;
        }
      }

      // Draw the transparent pixel data 1-to-1 onto the visible canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.putImageData(outputData, 0, 0);
      
      setLoaded(true);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-end select-none pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className={`block object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
      />
    </div>
  );
}
