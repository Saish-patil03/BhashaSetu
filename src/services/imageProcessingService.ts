export type ImageFilterType = 'original' | 'grayscale' | 'high_contrast' | 'binarize';

export interface ProcessedImageData {
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Loads a base64 or blob image URL into an HTMLImageElement
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load image for processing: ' + e));
    img.src = src;
  });
}

/**
 * Rotates an image by degrees (e.g. 90, -90, 180)
 */
export async function rotateImage(dataUrl: string, degrees: number): Promise<string> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const rad = (degrees * Math.PI) / 180;
  const isRightAngle = Math.abs(degrees % 180) === 90;

  canvas.width = isRightAngle ? img.height : img.width;
  canvas.height = isRightAngle ? img.width : img.height;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  return canvas.toDataURL('image/jpeg', 0.95);
}

/**
 * Applies OCR pre-processing filters to clean up phone camera photos:
 * - 'grayscale': converts to mono luminance
 * - 'high_contrast': shadow removal and dynamic range stretching
 * - 'binarize': clean black and white thresholding for OCR
 */
export async function applyImageFilter(
  dataUrl: string,
  filter: ImageFilterType
): Promise<string> {
  if (filter === 'original') return dataUrl;

  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const len = data.length;

  if (filter === 'grayscale') {
    for (let i = 0; i < len; i += 4) {
      const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
  } else if (filter === 'high_contrast') {
    // Contrast enhancement & shadow leveling
    // 1. Calculate luminance and compute contrast curve
    const contrastFactor = 1.35; // boost contrast
    const brightnessBoost = 15; // lighten paper background

    for (let i = 0; i < len; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Convert to luminance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Contrast stretch
      let newLum = ((lum - 128) * contrastFactor) + 128 + brightnessBoost;
      if (newLum < 0) newLum = 0;
      if (newLum > 255) newLum = 255;

      data[i] = newLum;
      data[i + 1] = newLum;
      data[i + 2] = newLum;
    }
  } else if (filter === 'binarize') {
    // Adaptive-like binarization threshold
    let sumLum = 0;
    for (let i = 0; i < len; i += 4) {
      sumLum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    const avgThreshold = Math.min(Math.max(sumLum / (len / 4) * 0.9, 110), 160);

    for (let i = 0; i < len; i += 4) {
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const val = lum < avgThreshold ? 0 : 255;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.95);
}

/**
 * Crops a sub-region from an image dataUrl
 */
export async function cropImage(
  dataUrl: string,
  cropArea: { x: number; y: number; width: number; height: number }
): Promise<string> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  canvas.width = Math.max(10, cropArea.width);
  canvas.height = Math.max(10, cropArea.height);

  ctx.drawImage(
    img,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    cropArea.width,
    cropArea.height
  );

  return canvas.toDataURL('image/jpeg', 0.95);
}
