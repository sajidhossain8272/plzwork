import { ImageMetadata } from "../types";

/**
 * Extracts basic image properties and metadata from a File / DataURL.
 */
export async function inspectImageFile(file: File, dataUrl: string): Promise<ImageMetadata> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = dataUrl;

    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      // Aspect ratio
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(width, height);
      const aspectRatio = `${width / divisor}:${height / divisor}`;

      // Alpha channel detection via 2D Canvas inspection
      let hasAlpha = false;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.min(width, 100);
        canvas.height = Math.min(height, 100);
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          for (let i = 3; i < data.length; i += 4) {
            if (data[i] < 255) {
              hasAlpha = true;
              break;
            }
          }
        }
      } catch {
        hasAlpha = file.type === "image/png" || file.type === "image/webp";
      }

      resolve({
        width,
        height,
        aspectRatio,
        colorDepth: 24,
        hasAlpha,
        fileSize: file.size,
        mimeType: file.type || "image/unknown",
        exifTags: {
          Format: file.type.split("/")[1]?.toUpperCase() || "UNKNOWN",
          Size: `${(file.size / 1024).toFixed(1)} KB`,
          Resolution: `${width} × ${height} px`,
          Aspect: aspectRatio,
          Alpha: hasAlpha ? "Yes (Transparent)" : "No (Opaque)",
        },
      });
    };

    img.onerror = () => {
      resolve({
        width: 0,
        height: 0,
        aspectRatio: "1:1",
        colorDepth: 24,
        hasAlpha: false,
        fileSize: file.size,
        mimeType: file.type || "image/unknown",
      });
    };
  });
}
