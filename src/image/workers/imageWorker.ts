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
    } = event.data;

    // 1. Convert Data URL to Blob & ImageBitmap
    const response = await fetch(dataUrl);
    const inputBlob = await response.blob();
    const bitmap = await createImageBitmap(inputBlob);

    // 2. Offscreen Canvas Setup
    const offscreen = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = offscreen.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get OffscreenCanvas 2D context");
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 3. Fill background if specified (e.g. converting transparent image to JPEG)
    if (backgroundColor && backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    // 4. Draw image onto OffscreenCanvas
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

    // 5. Determine MIME Type
    let mimeType = "image/webp";
    if (targetFormat === "jpeg" || targetFormat === "jpg") mimeType = "image/jpeg";
    else if (targetFormat === "png") mimeType = "image/png";
    else if (targetFormat === "bmp") mimeType = "image/bmp";
    else if (targetFormat === "avif") mimeType = "image/avif";
    else if (targetFormat === "ico") mimeType = "image/x-icon";

    // 6. Convert to output Blob
    const outputBlob = await offscreen.convertToBlob({
      type: mimeType,
      quality: targetQuality / 100,
    });

    // 7. Convert Blob to base64 Data URL
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
