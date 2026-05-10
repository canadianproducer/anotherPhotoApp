import sharp from 'sharp';

export async function createWatermarkedImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    
    // Resize to max 900px width
    const targetWidth = Math.min(metadata.width || 900, 900);
    const targetHeight = metadata.height 
      ? Math.round(metadata.height * (targetWidth / metadata.width!)) 
      : targetWidth;

    // Create SVG overlay with diagonal text
    const svgText = `
      <svg width="${targetWidth}" height="${targetHeight}">
        <style>
          .text {
            fill: rgba(255, 255, 255, 0.4);
            font-size: ${targetWidth * 0.08}px;
            font-family: sans-serif;
            font-weight: bold;
          }
        </style>
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dominant-baseline="middle" 
          transform="rotate(-30, ${targetWidth / 2}, ${targetHeight / 2})" 
          class="text"
        >
          StudioSnap AI Preview
        </text>
      </svg>
    `;

    const svgBuffer = Buffer.from(svgText);

    return await image
      .resize(targetWidth, null, { withoutEnlargement: true })
      .composite([{ input: svgBuffer, gravity: 'center' }])
      .jpeg({ quality: 80 })
      .toBuffer();
  } catch (error) {
    console.error("Watermark generation failed:", error);
    // If it fails for some reason, return the original buffer (though we shouldn't in production)
    return imageBuffer;
  }
}
