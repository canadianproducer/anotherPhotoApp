const MAX_REQUEST_BYTES = 18 * 1024 * 1024; // JSON/base64 overhead for up to two 10MB-ish images.
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export interface GenerateRequestBody {
  toolType: 'passport' | 'outfit' | 'style';
  userImage: string;
  referenceImage?: string;
  website?: string; // Honeypot field; real users should never fill it.
}

export class RequestValidationError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export async function parseLimitedJson(req: Request): Promise<unknown> {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength && contentLength > MAX_REQUEST_BYTES) {
    throw new RequestValidationError('Upload is too large.', 413);
  }

  const raw = await req.text();
  if (Buffer.byteLength(raw, 'utf8') > MAX_REQUEST_BYTES) {
    throw new RequestValidationError('Upload is too large.', 413);
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new RequestValidationError('Invalid JSON body.', 400);
  }
}

function parseImageData(value: unknown, fieldName: string, required: boolean): string | undefined {
  if (!value) {
    if (required) throw new RequestValidationError(`${fieldName} is required.`, 400);
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new RequestValidationError(`${fieldName} must be a base64 image string.`, 400);
  }

  const dataUrlMatch = value.match(/^data:([^;]+);base64,(.+)$/);
  const mimeType = dataUrlMatch?.[1] || 'image/jpeg';
  const base64 = dataUrlMatch?.[2] || value;

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new RequestValidationError(`${fieldName} must be JPEG, PNG, or WEBP.`, 400);
  }

  const normalizedBase64 = base64.replace(/\s/g, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(normalizedBase64)) {
    throw new RequestValidationError(`${fieldName} is not valid base64.`, 400);
  }

  const estimatedBytes = Math.floor((normalizedBase64.length * 3) / 4);
  if (estimatedBytes > MAX_IMAGE_BYTES) {
    throw new RequestValidationError(`${fieldName} must be less than 10MB.`, 413);
  }

  return value;
}

export function validateGenerateRequest(input: unknown): GenerateRequestBody {
  if (!input || typeof input !== 'object') {
    throw new RequestValidationError('Request body must be an object.', 400);
  }

  const body = input as Record<string, unknown>;

  if (typeof body.website === 'string' && body.website.trim()) {
    throw new RequestValidationError('Request rejected.', 400);
  }

  if (!['passport', 'outfit', 'style'].includes(String(body.toolType))) {
    throw new RequestValidationError('Invalid tool type.', 400);
  }

  const toolType = body.toolType as GenerateRequestBody['toolType'];
  const userImage = parseImageData(body.userImage, 'userImage', true)!;
  const referenceImage = parseImageData(body.referenceImage, 'referenceImage', toolType !== 'passport');

  return {
    toolType,
    userImage,
    referenceImage,
  };
}
