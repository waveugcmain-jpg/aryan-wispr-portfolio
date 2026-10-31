import test from 'node:test';
import assert from 'node:assert/strict';
import { paperGeometry } from '../src/pageTurn.js';
test('paper starts flat, bends continuously and lands flat on the opposite side', () => {
  for (const progress of [0,.1,.25,.5,.75,.9,1]) {
    const segments=paperGeometry(progress,540);
    segments.forEach((part,i)=>{
      assert.ok(Math.abs(Math.hypot(part.nextX-part.x,part.nextZ-part.z)-part.width)<1e-8);
      if(i) { assert.equal(part.x,segments[i-1].nextX); assert.equal(part.z,segments[i-1].nextZ); }
    });
    if(progress===0||progress===1) {
      assert.ok(Math.abs(segments.at(-1).nextZ)<1e-8);
      assert.ok(Math.abs(segments.at(-1).nextX-(progress===0?540:-540))<1e-8);
    }
  }
  const middle=paperGeometry(.5,540);
  assert.ok(middle.at(-1).angle-middle[0].angle>1);
});
