import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { GEMINI_IMAGE_MODEL } from '../constants/api';

// Gemini returns raw bytes; convert to a base64 data URI so React Native
// <Image> can render it without a network round-trip.
function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function generateImage(prompt: string, apiKey: string): Promise<string> {
  const google = createGoogleGenerativeAI({ apiKey });

  const result = await generateText({
    model: google(GEMINI_IMAGE_MODEL),
    prompt,
  });

  const imageFile = result.files?.find((f) => f.mediaType.startsWith('image/'));
  if (!imageFile) throw new Error('No image returned by Gemini');

  const base64 = uint8ArrayToBase64(imageFile.uint8Array);
  return `data:${imageFile.mediaType};base64,${base64}`;
}
