/// <reference lib="webworker" />

self.onmessage = async (event: MessageEvent) => {
  try {
    const {
      dataUrl,
      targetFormat,
      targetQuality,
      targetWidth,
      targetHeight,
      backgroundColor,
      rotation = 0,
      flipHorizontal = false,
      flipVertical = false,
      grayscale = false,
    } = event.data;

    // 1. Convert Data URL to Blob & ImageBitmap
    const response = await fetch(dataUrl);
    const inputBlob = await response.blob();
    const bitmap = await createImageBitmap(inputBlob);

    // Swap canvas dimensions if rotated 90 or 270 degrees
    const swapDimensions = rotation === 90 || rotation === 270;
    const canvasW = swapDimensions ? targetHeight : targetWidth;
    const canvasH = swapDimensions ? targetWidth : targetHeight;

    // 2. Offscreen Canvas Setup
    const offscreen = new OffscreenCanvas(canvasW, canvasH);
    const ctx = offscreen.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get OffscreenCanvas 2D context");
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 3. Fill background if specified (e.g. converting transparent image to JPEG)
    if (backgroundColor && backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasW, canvasH);
    }

    // 4. Transformations: Rotation & Flipping
    ctx.save();
    ctx.translate(canvasW / 2, canvasH / 2);

    if (rotation !== 0) {
      ctx.rotate((rotation * Math.PI) / 180);
    }

    const scaleX = flipHorizontal ? -1 : 1;
    const scaleY = flipVertical ? -1 : 1;
    if (flipHorizontal || flipVertical) {
      ctx.scale(scaleX, scaleY);
    }

    const drawW = swapDimensions ? targetHeight : targetWidth;
    const drawH = swapDimensions ? targetWidth : targetHeight;
    ctx.drawImage(bitmap, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // 5. Apply Grayscale filter if requested
    if (grayscale) {
      const imageData = ctx.getImageData(0, 0, canvasW, canvasH);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
      }
      ctx.putImageData(imageData, 0, 0);
    }

    // 6. Determine MIME Type
    let mimeType = "image/webp";
    if (targetFormat === "jpeg" || targetFormat === "jpg") mimeType = "image/jpeg";
    else if (targetFormat === "png") mimeType = "image/png";
    else if (targetFormat === "bmp") mimeType = "image/bmp";
    else if (targetFormat === "avif") mimeType = "image/avif";
    else if (targetFormat === "ico") mimeType = "image/x-icon";

    // 7. Convert to output Blob
    const outputBlob = await offscreen.convertToBlob({
      type: mimeType,
      quality: targetQuality / 100,
    });

    // 8. Convert Blob to base64 Data URL
    const arrayBuffer = await outputBlob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = btoa(binary);
    const finalDataUrl = `data:${mimeType};base64,${base64String}`;

    self.postMessage({
      converted: finalDataUrl,
      size: outputBlob.size,
      error: null,
    });
  } catch (err) {
    self.postMessage({
      converted: null,
      size: 0,
      error: (err as Error).message || String(err),
    });
  }
};
