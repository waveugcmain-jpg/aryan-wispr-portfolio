import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handler } from '../netlify/functions/ask.mjs';

test('Netlify serves grounded notebook answers and page navigation metadata', async () => {
  const result = await handler({ httpMethod: 'POST', body: JSON.stringify({ question: 'Tell me about Wave' }), headers: { 'x-nf-client-connection-ip': 'test-valid' } });
  assert.equal(result.statusCode, 200);
  const entries = result.body.trim().split('\n').map(JSON.parse);
  assert.equal(entries[0].mode, 'notebook');
  assert.equal(typeof entries[0].page, 'number');
  assert.match(entries.map(e => e.delta || '').join(''), /wave/i);
  assert.equal(entries.at(-1).done, true);
});
test('Netlify rejects empty questions and unsupported methods', async () => {
  assert.equal((await handler({ httpMethod: 'POST', body: '{"question":""}' })).statusCode, 400);
  assert.equal((await handler({ httpMethod: 'GET' })).statusCode, 405);
});
