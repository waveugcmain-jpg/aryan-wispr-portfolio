import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import '@fontsource/newsreader/latin-400.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';

const sections = ['A letter', 'My story', 'Experiences & projects', 'Wispr Flow work', 'contact me'];

function TrainScene() {
  return <div className="scene" aria-hidden="true"><div className="scene__frame">
    <img className="scene__interior" src="/assets/train-cloth.webp" alt="" fetchPriority="high" />
    <div className="scene__landscape" />
  </div></div>;
}

function Rings() {
  return <div className="binding" aria-hidden="true">{Array.from({ length: 6 }, (_, index) =>
    <span className="binding__assembly" key={index}>
      <span className="binding__hole binding__hole--left" />
      <span className="binding__hole binding__hole--right" />
      <span className="binding__ring" />
    </span>)}
  </div>;
}

function PersonalDetails() {
  const start = useRef(null);
  function down(event) {
    if (event.button !== 0) return;
    const el = event.currentTarget;
    start.current = { x:event.clientX, y:event.clientY, dx:Number(el.dataset.dx || 0), dy:Number(el.dataset.dy || 0) };
    el.setPointerCapture(event.pointerId);
  }
  function move(event) {
    if (!start.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const el=event.currentTarget;
    const x=Math.max(-80,Math.min(180,start.current.dx+event.clientX-start.current.x));
    const y=Math.max(-80,Math.min(160,start.current.dy+event.clientY-start.current.y));
    el.dataset.dx=x; el.dataset.dy=y;
    el.style.setProperty('--drag-x',`${x}px`); el.style.setProperty('--drag-y',`${y}px`);
  }
  function key(event) {
    const directions={ArrowLeft:[-8,0],ArrowRight:[8,0],ArrowUp:[0,-8],ArrowDown:[0,8]};
    if(!directions[event.key]) return;
    event.preventDefault(); const el=event.currentTarget; const [x,y]=directions[event.key];
    el.dataset.dx=Math.max(-80,Math.min(180,Number(el.dataset.dx||0)+x));
    el.dataset.dy=Math.max(-80,Math.min(160,Number(el.dataset.dy||0)+y));
    el.style.setProperty('--drag-x',`${el.dataset.dx}px`); el.style.setProperty('--drag-y',`${el.dataset.dy}px`);
  }
  return <aside className="personal-details" aria-label="Personal details">
    <div className="paper-slip" aria-hidden="true"><span>ARYAN</span><span>PERSONAL NOTES</span></div>
    <div className="photo-card" tabIndex={0} role="group" aria-label="Photo placeholder. Drag to move, or use arrow keys when focused." onPointerDown={down} onPointerMove={move} onPointerUp={()=>{start.current=null;}} onPointerCancel={()=>{start.current=null;}} onKeyDown={key}>
      <div className="photo-placeholder"><span>[Your photo]</span></div>
      <span className="photo-caption">Aryan</span>
      <span className="photo-note">[A little about me]</span>
    </div>
    <span className="lavender-marker" aria-hidden="true" />
  </aside>;
}

function FolderNavigation() {
  return <nav className="folder-stack" aria-label="Portfolio sections — visual preview">
    {sections.map((section, index) => <button type="button" className={`folder folder--${index + 1}`} key={section} aria-label={`${section} — preview only`}>
      <span className="folder__tab" aria-hidden="true" />
      <span className="folder__face" aria-hidden="true" />
      <span className="folder__label"><span className="folder__number">{String(index + 1).padStart(2, '0')}</span><span className="folder__title">{section}</span></span>
    </button>)}
  </nav>;
}

export function App() {
  return <main className="home">
    <TrainScene />
    <div className="journal-stage">
      <PersonalDetails />
      <article className="notebook" aria-label="Aryan's portfolio notebook">
        <section className="page page--letter" aria-label="Introduction">
          <div className="introduction"><h1>Aryan<span className="name-underline" aria-hidden="true" /></h1><p>[Your introduction]</p></div>
          <span className="page-number" aria-hidden="true">01</span>
        </section>
        <section className="page page--contents" aria-labelledby="contents-title">
          <h2 id="contents-title" className="eyebrow">IN THIS NOTEBOOK</h2>
          <FolderNavigation />
          <span className="page-number" aria-hidden="true">02</span>
        </section>
        <Rings />
      </article>
      <nav className="page-controls" aria-label="Page navigation — preview only">
        <button type="button" aria-disabled="true"><ArrowLeft size={18} weight="light" aria-hidden="true" /> Previous Page</button>
        <span className="page-controls__divider" aria-hidden="true" />
        <button type="button" aria-disabled="true">Next Page <ArrowRight size={18} weight="light" aria-hidden="true" /></button>
      </nav>
    </div>
  </main>;
}
