import { ArrowLeft, ArrowRight, ArrowUp, Microphone } from '@phosphor-icons/react';
import { useRef, useEffect } from 'react';
import '@fontsource/newsreader/latin-400.css';
import '@fontsource/newsreader/latin-400-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';

const sections = ['A letter', 'My story', 'Experiences & projects', 'Wispr Flow work', 'contact me'];

function TrainScene() {
  return <div className="scene" aria-hidden="true"><div className="scene__frame">
    <img className="scene__interior" src="/assets/train-table.webp" alt="" fetchPriority="high" />
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

function MovableCard({className, label, children}) {
  const start = useRef(null);
  const card = useRef(null);
  const position = useRef({x:0,y:0});
  function shift(dx,dy) {
    const el=card.current;
    const rect=el.getBoundingClientRect();
    const width=document.documentElement.clientWidth;
    const height=window.innerHeight;
    position.current.x+=Math.max(8-rect.left,Math.min(width-8-rect.right,dx));
    position.current.y+=Math.max(8-rect.top,Math.min(height-8-rect.bottom,dy));
    el.style.setProperty('--drag-x',`${position.current.x}px`);
    el.style.setProperty('--drag-y',`${position.current.y}px`);
  }
  useEffect(()=>{
    const fit=()=>shift(0,0);
    window.addEventListener('resize',fit);
    return ()=>window.removeEventListener('resize',fit);
  },[]);
  function down(event) {
    if (event.button !== 0) return;
    const el = event.currentTarget;
    start.current = { x:event.clientX, y:event.clientY };
    el.style.zIndex=String(Date.now());
    el.setPointerCapture(event.pointerId);
  }
  function move(event) {
    if (!start.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    shift(event.clientX-start.current.x,event.clientY-start.current.y);
    start.current={x:event.clientX,y:event.clientY};
  }
  function key(event) {
    const directions={ArrowLeft:[-8,0],ArrowRight:[8,0],ArrowUp:[0,-8],ArrowDown:[0,8]};
    if(!directions[event.key]) return;
    event.preventDefault(); const [x,y]=directions[event.key]; shift(x,y);
  }
  return <div ref={card} className={`movable-card ${className}`} tabIndex={0} role="group" aria-label={`${label}. Drag anywhere on screen, or use arrow keys when focused.`} onPointerDown={down} onPointerMove={move} onPointerUp={()=>{start.current=null;}} onPointerCancel={()=>{start.current=null;}} onKeyDown={key}>{children}</div>;
}

function PersonalDetails() {
  return <aside className="personal-details" aria-label="Personal details">
    <MovableCard className="paper-slip" label="Personal note placeholder"><span>ARYAN</span><span>[A personal note]</span></MovableCard>
    <MovableCard className="photo-card" label="Photo placeholder">
      <div className="photo-placeholder"><span>[Your photo]</span></div>
      <span className="photo-caption">Aryan</span>
      <span className="photo-note">[A little about me]</span>
    </MovableCard>
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
    <PersonalDetails />
    <div className="journal-stage">
      <FolderNavigation />
      <article className="notebook" aria-label="Aryan's portfolio notebook">
        <section className="page page--letter" aria-label="Introduction">
          <div className="letter">
            <h1>hi,</h1>
            <p>you’ve probably opened a few hundred of these this week. and i know they all say the same things.</p>
            <p>obsessed with growth. huge fan of the product. and my favourite, “extremely high agency.”</p>
            <p>i want to do this a little differently.</p>
            <p>you’re on a train now. breathe in. grab a coffee. hit play on the music.</p>
            <p>i’ll answer the only questions that matter. it’ll take exactly <mark>180 seconds.</mark></p>
            <p>let’s begin.</p>
            <h2>has aryan actually owned a growth channel before?</h2>
            <p>yes. i run <mark>wave.</mark> we build creator armies: creators posting about one product every single day until it goes viral. the same playbook you run with ugc in the us. right now we’re running it for linkrunner, backed by titan capital and 2am vc. before wave, i wrote <mark>200+ winning ads</mark> at zyra for adani, meesho, country delight and more.</p>
          </div>
          <img className="letter-illustration" src="/assets/alpine-sketch.webp" alt="" />
          <span className="page-number" aria-hidden="true">01</span>
        </section>
        <section className="page page--contents" aria-label="Letter, continued">
          <div className="letter">
            <h2>is aryan (insert buzzword here) high agency?</h2>
            <p>i’ve started two companies. nobody handed me either one. when it’s yours, there’s no one to escalate to.</p>
            <h2>is aryan full of crap?</h2>
            <p>i hope you don’t think this :(</p>
            <p>but no. for this challenge i actually signed creators, negotiated with them, made <mark>4 ads for wispr flow</mark> and ran them as trial reels on instagram. real strangers, real views. <span className="letter-proof">[see the numbers →]</span></p>
            <h2>is aryan smart? creative?</h2>
            <p>my mom says i’m smart. and i failed art class.</p>
            <p>so you’ll have to judge that one yourself. you’re holding the evidence.</p>
            <p>ok. that’s it.</p>
            <p>the rest of this notebook is the proof. short on time? ask me anything in the bar below. say it out loud. you know how.</p>
            <p className="letter-signature">— aryan</p>
            <span className="letter-credit">written with Wispr Flow</span>
          </div>
          <img className="coffee-illustration" src="/assets/coffee-sketch.webp" alt="" />
          <span className="page-number" aria-hidden="true">02</span>
        </section>
        <Rings />
      </article>
      <nav className="page-controls" aria-label="Page navigation — preview only">
        <button type="button" aria-disabled="true"><ArrowLeft size={18} weight="light" aria-hidden="true" /> Previous Page</button>
        <span className="page-controls__divider" aria-hidden="true" />
        <button type="button" aria-disabled="true">Next Page <ArrowRight size={18} weight="light" aria-hidden="true" /></button>
      </nav>
      <div className="ask-preview" aria-label="Ask Aryan — design preview">
        <div className="ask-input"><input aria-label="Ask Aryan any question — preview only" placeholder="Ask Aryan any question." readOnly /><button type="button" disabled aria-label="Microphone — coming later"><Microphone size={21} weight="light" /></button><button className="ask-send" type="button" disabled aria-label="Send — coming later"><ArrowUp size={22} weight="light" /></button></div>
        <div className="ask-chips">{['Top skills?', 'Best project?', 'Why Wispr Flow?'].map(q=><button key={q} type="button" disabled>{q}</button>)}</div>
      </div>
    </div>
  </main>;
}
