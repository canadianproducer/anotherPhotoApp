import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { get as getBlob, put } from '@vercel/blob';

const DATA_DIR = path.join(process.cwd(), '.data');
const isVercelRuntime = process.env.VERCEL === '1';
const hasVercelBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const storageDriver = hasVercelBlob ? 'vercel-blob' : 'local';

if (isVercelRuntime && !hasVercelBlob) {
  console.warn('BLOB_READ_WRITE_TOKEN is missing. Image storage will fail on Vercel until durable storage is configured.');
}

if (storageDriver === 'local' && !fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface JobMetadata {
  jobId: string;
  toolType: string;
  createdAt: number;
  previewPath: string;
  hdPath: string;
  paymentStatus: 'pending' | 'paid';
  storageDriver?: 'local' | 'vercel-blob';
}

function assertDurableStorageAvailable() {
  if (isVercelRuntime && !hasVercelBlob) {
    throw new Error('Durable image storage is not configured. Add BLOB_READ_WRITE_TOKEN / Vercel Blob before deploying.');
  }
}

function localPath(jobId: string, suffix: string) {
  return path.join(DATA_DIR, `${jobId}-${suffix}`);
}

function blobPath(jobId: string, filename: string) {
  return `jobs/${jobId}/${filename}`;
}

async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const arrayBuffer = await new Response(stream).arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function readBlobBuffer(pathname: string): Promise<Buffer | null> {
  const result = await getBlob(pathname, { access: 'private', useCache: false });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  return streamToBuffer(result.stream);
}

async function saveJobToBlob(jobId: string, toolType: string, previewBuffer: Buffer, hdBuffer: Buffer): Promise<void> {
  assertDurableStorageAvailable();

  const previewPath = blobPath(jobId, 'preview.jpg');
  const hdPath = blobPath(jobId, 'hd.jpg');
  const metadataPath = blobPath(jobId, 'metadata.json');

  await put(previewPath, previewBuffer, {
    access: 'private',
    contentType: 'image/jpeg',
    allowOverwrite: true,
  });
  await put(hdPath, hdBuffer, {
    access: 'private',
    contentType: 'image/jpeg',
    allowOverwrite: true,
  });

  const metadata: JobMetadata = {
    jobId,
    toolType,
    createdAt: Date.now(),
    previewPath,
    hdPath,
    paymentStatus: 'pending',
    storageDriver: 'vercel-blob',
  };

  await put(metadataPath, JSON.stringify(metadata, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
  });
}

async function getBlobJob(jobId: string): Promise<JobMetadata | null> {
  assertDurableStorageAvailable();
  const buffer = await readBlobBuffer(blobPath(jobId, 'metadata.json'));
  if (!buffer) return null;
  return JSON.parse(buffer.toString('utf8')) as JobMetadata;
}

async function updateBlobJobStatus(jobId: string, status: 'pending' | 'paid'): Promise<void> {
  const job = await getBlobJob(jobId);
  if (!job) return;
  job.paymentStatus = status;
  await put(blobPath(jobId, 'metadata.json'), JSON.stringify(job, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
  });
}

export async function saveJob(toolType: string, previewBuffer: Buffer, hdBuffer: Buffer): Promise<string> {
  const jobId = crypto.randomUUID();

  if (storageDriver === 'vercel-blob') {
    await saveJobToBlob(jobId, toolType, previewBuffer, hdBuffer);
    return jobId;
  }

  assertDurableStorageAvailable();
  const previewPath = localPath(jobId, 'preview.jpg');
  const hdPath = localPath(jobId, 'hd.jpg');
  const metadataPath = localPath(jobId, 'metadata.json');

  fs.writeFileSync(previewPath, previewBuffer);
  fs.writeFileSync(hdPath, hdBuffer);

  const metadata: JobMetadata = {
    jobId,
    toolType,
    createdAt: Date.now(),
    previewPath,
    hdPath,
    paymentStatus: 'pending',
    storageDriver: 'local',
  };

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  return jobId;
}

export async function getJob(jobId: string): Promise<JobMetadata | null> {
  if (storageDriver === 'vercel-blob') {
    return getBlobJob(jobId);
  }

  const metadataPath = localPath(jobId, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  const data = fs.readFileSync(metadataPath, 'utf8');
  return JSON.parse(data) as JobMetadata;
}

export async function updateJobStatus(jobId: string, status: 'pending' | 'paid'): Promise<void> {
  if (storageDriver === 'vercel-blob') {
    await updateBlobJobStatus(jobId, status);
    return;
  }

  const job = await getJob(jobId);
  if (job) {
    job.paymentStatus = status;
    const metadataPath = localPath(jobId, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(job, null, 2));
  }
}

export async function getJobHdImage(jobId: string): Promise<Buffer | null> {
  const job = await getJob(jobId);
  if (!job || job.paymentStatus !== 'paid') {
    return null; // Not paid or doesn't exist
  }

  if (job.storageDriver === 'vercel-blob') {
    return readBlobBuffer(job.hdPath);
  }

  if (!fs.existsSync(job.hdPath)) return null;
  return fs.readFileSync(job.hdPath);
}

export async function getJobPreviewImage(jobId: string): Promise<Buffer | null> {
  const job = await getJob(jobId);
  if (!job) return null;

  if (job.storageDriver === 'vercel-blob') {
    return readBlobBuffer(job.previewPath);
  }

  if (!fs.existsSync(job.previewPath)) return null;
  return fs.readFileSync(job.previewPath);
}
