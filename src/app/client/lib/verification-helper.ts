import { createWorker } from 'tesseract.js';

export const CA_DRIVER_LICENSE_POSITIONS = {
  idWidth: 600,
  idHeight: 427,
  dob: {
    y: 225,
    x: 445,
    height: 66,
    width: 204,
  },
};

export function getScaledDimensions(width: number, height: number): Record<string, number> {
  const FIXED = {
    idWidth: 600,
    idHeight: 427,
  };

  const padding = 60;

  const scaleRatio = Math.min(width / FIXED.idWidth, height / FIXED.idHeight);
  const scaledWidth = Math.round(FIXED.idWidth * scaleRatio) - padding * 2;
  const scaledHeight = Math.round(FIXED.idHeight * scaleRatio) - padding * 2;

  const x = (width - scaledWidth) / 2;
  const y = (height - scaledHeight) / 2;

  return { x, y, scaledWidth, scaledHeight };
}

export function isOldeEnough(raw: string) {
  const today = new Date();
  const cutOff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const text = raw.replace(/\D/g, '');
  if (!/^\d{8}$/.test(text)) return false;

  const month = parseInt(text.slice(0, 2), 10) - 1; // JavaScript months are 0-based
  const day = parseInt(text.slice(2, 4), 10);
  const year = parseInt(text.slice(4, 8), 10);

  const userDateOfBirth = new Date(year, month, day);

  return userDateOfBirth <= cutOff;
}

function spliceOcrText(text: string): string | undefined {
  // const chunks = text.split('\n');
  // const result = chunks.find((needle): string | boolean => {
  //   const match = needle.match(/\b\d{8}\b/);
  //   if (match && match[0]) {
  //     return match[0];
  //   }
  //   return false;
  // });
  // console.log('match:', `"${result}"`);
  // return result;

  const chunks = text.split('\n');

  for (const line of chunks) {
    const match = line.match(/\b\d{8}\b/);
    if (match) {
      console.log('match:', `"${match[0]}"`);
      return match[0]; // just the 8-digit number
    }
  }

  return undefined;
}

export async function runOcrFromCanvas(canvas: HTMLCanvasElement): Promise<boolean> {
  const worker = await createWorker('eng');
  const {
    data: { text },
  } = await worker.recognize(canvas);
  console.log('text', text);

  await worker.terminate();
  const OCRResult = spliceOcrText(text);
  if (OCRResult) {
    console.log('checking age of,', OCRResult);
    const ageResults = isOldeEnough(OCRResult);
    console.log('results of age check', ageResults);
    return ageResults;
  }
  return false;
}
