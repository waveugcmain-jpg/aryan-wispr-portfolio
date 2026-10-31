// A sheet is an inextensible strip mesh: neighbouring strips share endpoints.
export function paperGeometry(progress, width, count = 24) {
  const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
  const base = Math.PI * eased;
  const curl = 1.18 * Math.sin(Math.PI * eased);
  const step = width / count;
  let x = 0, z = 0;
  return Array.from({ length: count }, (_, i) => {
    const angle = base + curl * ((i + .5) / count - .5);
    const nextX = x + step * Math.cos(angle), nextZ = z + step * Math.sin(angle);
    const segment = { x, z, nextX, nextZ, angle, width: step };
    x = nextX; z = nextZ;
    return segment;
  });
}

export function curveSheet(sheet, forward, done) {
  const width = sheet.getBoundingClientRect().width;
  const faces = [...sheet.children];
  const count = window.innerWidth < 701 ? 16 : 24;
  sheet.classList.add('turn-sheet--curved');
  const strips = Array.from({ length: count }, (_, i) => {
    const strip = document.createElement('div');
    strip.className = 'paper-strip';
    strip.style.width = (width / count + .45) + 'px';
    faces.forEach((face, side) => {
      const clipped = document.createElement('div');
      clipped.className = 'paper-strip__face' + (side ? ' paper-strip__face--back' : '');
      const image = face.cloneNode(true);
      const offset = (forward !== Boolean(side) ? i : count - 1 - i) * width / count;
      image.style.width = width + 'px';
      image.style.left = -offset + 'px';
      image.style.transform = 'none';
      clipped.append(image);
      strip.append(clipped);
    });
    sheet.append(strip);
    return strip;
  });
  faces.forEach(face => face.remove());
  // Precompute once; compositor-driven transforms avoid per-frame layout/paint work.
  const frames = Array.from({length: 91}, (_, i) => paperGeometry(i / 90, width, count));
  const animations = strips.map((strip, i) => strip.animate(frames.map(parts => {
    const part=parts[i];
    const x=forward?part.x:width-part.nextX;
    const z=forward?part.z:part.nextZ;
    return {transform:`translate3d(${x}px,0,${z}px) rotateY(${(forward?-1:1)*part.angle}rad)`};
  }), {duration:2800, easing:'linear', fill:'both'}));
  const epoch=document.timeline.currentTime;
  animations.forEach(animation=>animation.startTime=epoch);
  Promise.all(animations.map(animation=>animation.finished)).then(()=>{
    if(sheet.isConnected) done();
  }).catch(()=>{});
}
