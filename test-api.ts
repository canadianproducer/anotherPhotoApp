import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('Set GEMINI_API_KEY in your environment before running this smoke test.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: [{ text: 'A photo of a cat' }],
      config: {
        responseModalities: ['IMAGE'],
      },
    });
    console.log('Success!');
    console.log(response.candidates?.[0]?.content?.parts?.[0]);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Gemini Error:', message);
    process.exit(1);
  }
}

run();
