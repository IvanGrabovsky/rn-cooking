import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { GEMINI_TEXT_MODEL } from '../constants/api';

const SYSTEM_PROMPT = `You are an expert AI image prompt engineer.
Given a simple idea, expand it into a single, richly detailed image generation prompt.
Return ONLY the prompt text — no explanation, no quotes, no preamble.`;

export async function generatePrompt(idea: string, apiKey: string): Promise<string> {
  const google = createGoogleGenerativeAI({ apiKey });

  const { text } = await generateText({
    model: google(GEMINI_TEXT_MODEL),
    system: SYSTEM_PROMPT,
    prompt: idea,
  });

  if (!text.trim()) throw new Error('Empty response from Gemini');
  return text.trim();
}
