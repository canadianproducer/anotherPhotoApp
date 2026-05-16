import { GoogleGenAI } from '@google/genai';
import { getPhotoPrompt, type PhotoToolType } from './photo-prompts';

// Note: If GEMINI_API_KEY is missing, we use mock mode.

export interface GenerateImageParams {
  toolType: PhotoToolType;
  userImage: string; // base64
  referenceImage?: string; // base64
}

export async function generateImageWithGemini({
  toolType,
  userImage,
  referenceImage
}: GenerateImageParams): Promise<Buffer> {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  if (!ai) {
    console.warn("No GEMINI_API_KEY provided. Using mock image generation fallback.");
    // In mock mode, we just return a grey box image
    return generateMockImage();
  }

  const promptDefinition = getPhotoPrompt(toolType);
  const prompt = promptDefinition.prompt;

  const parts: Array<{ inlineData?: { mimeType: string, data: string }, text?: string }> = [];
  
  // Clean base64 strings
  const cleanBase64 = (b64: string) => {
    const matches = b64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      return { mimeType: matches[1], data: matches[2] };
    }
    return { mimeType: "image/jpeg", data: b64 };
  };

  const userImgParts = cleanBase64(userImage);
  parts.push({ inlineData: { mimeType: userImgParts.mimeType, data: userImgParts.data } });
  
  if (referenceImage) {
    const refImgParts = cleanBase64(referenceImage);
    parts.push({ inlineData: { mimeType: refImgParts.mimeType, data: refImgParts.data } });
  }

  parts.push({ text: prompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: parts,
      config: {
        responseModalities: ["IMAGE"],
        // If image generation specific configs are needed, we pass them here
        // The API might return the image as base64 in response.text() or specific field
      }
    });

    // Handle output based on the SDK structure
    // If the image comes as inlineData in the response part
    const base64Data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Data) {
      const cleanData = base64Data.startsWith('data:') ? base64Data.split(',')[1] : base64Data;
      return Buffer.from(cleanData, 'base64');
    } else {
      throw new Error("No image data found in response");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate image with Gemini.");
  }
}

function generateMockImage(): Buffer {
  // A valid SVG placeholder that Sharp can read in local/mock mode.
  return Buffer.from(`
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e5e7eb" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#bg)" />
      <circle cx="512" cy="400" r="150" fill="#94a3b8" opacity="0.65" />
      <rect x="256" y="600" width="512" height="120" rx="60" fill="#94a3b8" opacity="0.65" />
      <text x="512" y="835" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" fill="#475569">
        Mock Studio Preview
      </text>
    </svg>
  `);
}
