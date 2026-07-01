// HuggingFace returns raw bytes; convert to a base64 data URI so React Native
// <Image> can render it without a network round-trip.
function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function generateImage(prompt: string, apiKey: string): Promise<string> {
  const res = await fetch(
    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HuggingFace error (${res.status}): ${text}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  
  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const base64 = uint8ArrayToBase64(uint8Array);
  
  return `data:${contentType};base64,${base64}`;
}
