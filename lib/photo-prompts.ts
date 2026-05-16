export type PhotoToolType = "passport" | "outfit" | "style";

export interface PhotoPromptDefinition {
  version: string;
  label: string;
  requiresReference: boolean;
  prompt: string;
}

export const PHOTO_PROMPTS: Record<PhotoToolType, PhotoPromptDefinition> = {
  passport: {
    version: "passport-v2-profile-id-clean",
    label: "Clean professional ID/profile portrait",
    requiresReference: false,
    prompt: [
      "Use Image A as the identity reference and create a realistic professional ID-style portrait of the same person.",
      "Preserve the person's exact facial identity, facial structure, age impression, skin tone, hair color, and natural recognizable features.",
      "Center the face and shoulders, eyes facing camera, neutral expression, mouth closed, clean white or very light gray background, even studio lighting.",
      "Make it suitable for LinkedIn, profile use, or manual cropping into document-style formats.",
      "Do not claim or imply government compliance. Do not add borders, text, logos, stamps, document templates, or decorative elements.",
      "Do not beautify, glamorize, age-change, slim, reshape, or alter identity. Keep natural skin texture and realistic detail.",
      "No extra people, no distorted anatomy, no warped eyes, no plastic skin, no AI artifacts.",
    ].join(" "),
  },
  outfit: {
    version: "outfit-v2-identity-preserving-try-on",
    label: "Identity-preserving outfit try-on",
    requiresReference: true,
    prompt: [
      "Image A is the person photo. Image B is the outfit reference.",
      "Dress the person from Image A in the outfit shown in Image B while preserving the person's face, identity, hairstyle, approximate body proportions, pose, camera angle, and background whenever possible.",
      "Transfer the garment shape, color, fabric, pattern, cut, fit, styling, seams, shadows, and layering from Image B so it looks naturally worn by the person.",
      "Replace visible old clothing only where necessary for a believable try-on result.",
      "Do not copy another model's face, body, skin, pose, or identity from Image B. Do not change the person's face.",
      "Keep hands, neck, shoulders, and garment edges anatomically natural. Avoid glossy plastic skin, broken fabric, warped hands, duplicated limbs, text, logos added by mistake, or AI artifacts.",
      "Photorealistic output, clean commercial try-on style.",
    ].join(" "),
  },
  style: {
    version: "style-v2-editorial-reference-transfer",
    label: "Editorial style and scene transfer",
    requiresReference: true,
    prompt: [
      "Image A is the identity reference. Image B is the visual style and scene reference.",
      "Create a photorealistic premium editorial portrait of the same person from Image A, transformed into the visual world of Image B.",
      "Preserve the person's face, identity, age impression, skin tone, hair color, and recognizable features.",
      "Transfer from Image B only the lighting mood, color palette, environment, composition style, wardrobe vibe, pose direction, atmosphere, and overall aesthetic.",
      "Do not copy any other person's face, identity, exact body, watermark, text, brand mark, or copyrighted graphic from Image B.",
      "Naturally integrate the person into the scene with matching light on face and body, realistic skin texture, natural eyes, believable hands, and coherent anatomy.",
      "High-end lifestyle photography look. No extra people, no AI artifacts, no over-smoothed plastic skin.",
    ].join(" "),
  },
};

export function getPhotoPrompt(toolType: PhotoToolType): PhotoPromptDefinition {
  return PHOTO_PROMPTS[toolType];
}
