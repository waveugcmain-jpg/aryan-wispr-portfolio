import { Readable } from 'node:stream';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { askMiddleware } from '../../server/ask.mjs';

// Adapt Netlify's request to the same endpoint used by the local preview.
export async function handler(event) {
  const body = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : Buffer.from(event.body || '');
  const req = Readable.from([body]);
  req.url = '/api/ask';
  req.method = event.httpMethod;
  req.socket = { remoteAddress: event.headers?.['x-nf-client-connection-ip'] || 'unknown' };
  let statusCode = 200, headers = {}, chunks = [];
  const res = {
    headersSent: false,
    destroyed: false,
    writeHead(status, values) { statusCode = status; headers = values; this.headersSent = true; },
    write(chunk) { chunks.push(chunk); },
    end(chunk) { if (chunk) chunks.push(chunk); },
  };
  await askMiddleware(req, res, () => {}, () => readFile(resolve(process.cwd(), 'content/aryan.md'), 'utf8'));
  return { statusCode, headers, body: chunks.join('') };
}
