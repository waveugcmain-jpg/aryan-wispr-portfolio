import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { retrieve } from '../server/ask.mjs';
const knowledge=await readFile(new URL('../content/aryan.md',import.meta.url),'utf8');
test('routes known facts without inventing missing information',()=>{
  assert.equal(retrieve('Top skills?',knowledge).page,3);
  assert.equal(retrieve('Tell me about Nebula',knowledge).page,4);
  assert.equal(retrieve('Why Wispr Flow?',knowledge).page,5);
  assert.match(retrieve('email?',knowledge).answer,/not yet been provided/);
  assert.equal(retrieve('What is his favourite food?',knowledge).page,null);
});
