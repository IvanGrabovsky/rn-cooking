const SYSTEM_PROMPT = `You are an expert AI image prompt engineer.
Given a simple idea, expand it into a single, richly detailed image generation prompt.
Return ONLY the prompt text — no explanation, no quotes, no preamble.`;

export async function generatePrompt(idea: string, apiKey: string): Promise<string> {
  const res = await fetch(
    "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: idea }
        ],
        max_tokens: 100
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HuggingFace Text error (${res.status}): ${text}`);
  }

  const data = await res.json();
  const prompt = data.choices?.[0]?.message?.content?.trim();
  
  if (!prompt) throw new Error('Empty response from HuggingFace');
  return prompt;
}
