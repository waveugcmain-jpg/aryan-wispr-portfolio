// A sheet is an inextensible strip mesh: neighbouring strips share endpoints.
export function paperGeometry(progress, width, count = 24) {
  const eased = progress * progress * (3 - 2 * progress);
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
  let start;
  function frame(time) {
    if (!sheet.isConnected) return;
    start ??= time;
    const progress = Math.min((time - start) / 3000, 1);
    paperGeometry(progress, width, count).forEach((part, i) => {
      const x = forward ? part.x : width - part.nextX;
      const z = forward ? part.z : part.nextZ;
      strips[i].style.transform = `translate3d(${x}px,0,${z}px) rotateY(${(forward ? -1 : 1) * part.angle}rad)`;
      strips[i].style.setProperty('--paper-shade', .14 * Math.sin(Math.PI * progress) * (i / count));
    });
    if (progress < 1) requestAnimationFrame(frame); else done();
  }
  requestAnimationFrame(frame);
}
