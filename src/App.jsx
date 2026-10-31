import { RoomScene } from './RoomScene.jsx';
import { MusicPlayer } from './MusicPlayer.jsx';
import { curveSheet } from './pageTurn.js';
import { AskAryan } from './AskAryan.jsx';
import { creatives } from './content/creatives.js';
import { ArrowLeft, ArrowRight, ArrowUp, Microphone } from '@phosphor-icons/react';
import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import '@fontsource/newsreader/latin-400.css';
import '@fontsource/newsreader/latin-400-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';

const sections = ['A letter', 'My story', 'Building Wave', 'Before Wave', 'Wispr Flow work', 'contact me'];

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

function FolderNavigation({active, go}) {
  return <nav className="folder-stack" aria-label="Portfolio chapters">
    {sections.map((section, index) => <button type="button" className={`folder folder--${index + 1}`} key={section} aria-label={`Go to ${section}`} aria-current={active === index ? "page" : undefined} onClick={()=>go(index)}>
      <span className="folder__tab" aria-hidden="true" />
      <span className="folder__face" aria-hidden="true" />
      <span className="folder__label"><span className="folder__number">{String(index + 1).padStart(2, '0')}</span><span className="folder__title">{section}</span></span>
    </button>)}
  </nav>;
}

export function App() {
  const [room,setRoom]=useState(()=>new URLSearchParams(window.location.search).get('scene')!=='train');
  const [active,setActive]=useState(0);
  const [reduced,setReduced]=useState(()=>sessionStorage.getItem('portfolio-motion')==='off');
  useEffect(()=>{sessionStorage.setItem('portfolio-motion',reduced?'off':'on');},[reduced]);
  const [intro,setIntro]=useState(()=>new URLSearchParams(window.location.search).get('scene')==='train' && sessionStorage.getItem('portfolio-motion')!=='off');
  const [opening,setOpening]=useState(true);
  const deck=useRef(null), busy=useRef(false), timers=useRef([]), touch=useRef(null);
  const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.current.push(id);return id;};
  useEffect(()=>{if(!intro)return;const id=setTimeout(()=>setIntro(false),2600);return()=>clearTimeout(id);},[intro]);
  useEffect(()=>{if(!intro){const id=setTimeout(()=>setOpening(false),reduced?0:4000);return()=>clearTimeout(id);}},[intro,reduced]);
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  useLayoutEffect(()=>{
    if(!deck.current)return;
    deck.current.querySelectorAll(':scope > .chapter').forEach((el,i)=>{el.hidden=i!==active;el.inert=i!==active;});
  },[active,intro]);
  const go=(index)=>{
    if(intro||opening||busy.current||index===active||index<0||index>=sections.length)return;
    const host=deck.current, pages=[...host.querySelectorAll(':scope > .chapter')];
    if(reduced){setActive(index);return;}
    busy.current=true;
    const from=pages[active],to=pages[index],forward=index>active;
    to.hidden=false;to.inert=true;
    const height=Math.max(from.offsetHeight,to.offsetHeight);
    to.classList.add('turn-destination');
    host.style.height=height+'px';
    const mobile=window.matchMedia('(max-width:700px)').matches;
    const sheet=document.createElement('div');sheet.className='turn-sheet '+(forward?'turn-forward':'turn-backward')+(mobile?' turn-mobile':'');sheet.setAttribute('aria-hidden','true');sheet.inert=true;
    const face=(source,back)=>{
      const panel=document.createElement('div');panel.className='turn-face '+(back?'turn-face--back':'turn-face--front');
      const content=mobile?source.cloneNode(true):source.querySelectorAll(':scope > .page')[forward?(back?0:1):(back?1:0)].cloneNode(true);
      if(!mobile){const original=source.querySelectorAll(':scope > .page')[forward?(back?0:1):(back?1:0)];content.style.padding=getComputedStyle(original).padding;}
      content.removeAttribute('id');content.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));content.hidden=false;content.classList.remove('turn-destination');
      panel.append(content);sheet.append(panel);
    };
    face(from,false);face(to,true);host.append(sheet);
    host.classList.add('is-turning',forward?'is-forward':'is-backward');
    from.classList.add('turn-source');
    const finish=()=>{
      sheet.remove();from.classList.remove('turn-source');to.classList.remove('turn-destination');host.classList.remove('is-turning','is-forward','is-backward');host.style.height='';setActive(index);busy.current=false;
    };
    curveSheet(sheet,forward,finish);
    later(()=>{if(sheet.isConnected)finish();},3600);
  };
  useEffect(()=>{
    let accumulated=0,last=0;
    const wheel=e=>{
      if(e.ctrlKey||e.target.closest('input,textarea,video'))return;
      const atBottom=window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-4;
      const atTop=window.scrollY<=4;
      if((e.deltaY>0&&atBottom)||(e.deltaY<0&&atTop)){
        if(busy.current){e.preventDefault();return;}
        if(Date.now()-last>200)accumulated=0;last=Date.now();accumulated+=e.deltaY;
        if(Math.abs(accumulated)>90){go(active+(accumulated>0?1:-1));accumulated=0;}
      }
    };
    const key=e=>{if(e.target.closest('input,textarea,video'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(active+(e.key==='ArrowRight'?1:-1));}};
    window.addEventListener('wheel',wheel,{passive:false});window.addEventListener('keydown',key);
    return()=>{window.removeEventListener('wheel',wheel);window.removeEventListener('keydown',key);};
  },[active,intro,opening,reduced]);

  return <main className={`home ${room?"room-version":"train-version"} ${reduced?"motion-reduced":"motion-full"}`}>
    {room?<RoomScene/>:<TrainScene />}
    <div className="scene-tools"><button onClick={()=>{setRoom(!room);setIntro(false);const url=new URL(window.location.href);url.searchParams.set("scene",room?"train":"room");window.history.replaceState(null,"",url);}}>{room?"Train version ↗":"Room version ↗"}</button><button onClick={()=>{setReduced(!reduced);if(!reduced){setIntro(false);setOpening(false);}}} aria-pressed={!reduced}>Motion {reduced?'off':'on'}</button><button onClick={()=>{if(busy.current)return;setReduced(false);setActive(0);setOpening(true);setIntro(!room);}}>Replay opening</button></div>
    {intro&&<div className="train-intro"><div className="train-intro__view"><TrainScene/></div><div className="train-intro__caption"><span>THE PASSENGER’S JOURNAL</span><p>aryan × wispr flow</p></div><button onClick={()=>setIntro(false)}>Skip intro →</button></div>}

    <div className={`journal-stage ${intro?"stage-waiting":"stage-arrived"} ${opening?"book-opening":"book-ready"}`} inert={intro||undefined}>
      <MusicPlayer />
      <AskAryan go={go} reduced={reduced} />
      <FolderNavigation active={active} go={go} />
      <div className="book-deck" ref={deck} key={intro?'waiting':'arrived'} onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)go(active+(dx<0?1:-1));touch.current=null;}}>
      <article id="chapter-1" data-chapter="0" className="notebook chapter chapter--first" aria-label="Aryan's portfolio notebook">
        <section className="page page--letter" aria-label="Introduction">
          <div className="letter letter--final">
            <h1 className="letter-opening">everything on this page, i <mark className="highlight-purple">said out loud</mark> and built using <mark className="highlight-green">wispr flow.</mark></h1>
            <p>but this opening letter was the hardest part. i wanted my application to be cinematic, the one that makes you say "wow".</p>
            <p className="letter-pivot">and i realised no portfolio can do that.<br/><em className="letter-turn">only real work can.</em></p>
            <p className="letter-action">so instead of boring y'all with buzzwords, i went ahead, <mark className="highlight-green">signed 3 indian creators</mark>, negotiated with them, <mark className="highlight-purple">paid them out of my own pocket</mark>, and published their reels on instagram.</p>
            <p className="letter-reels">they're live, and you can watch them right here.<br/><button className="letter-proof proof-link" onClick={()=>go(4)}>[reels + views →]</button></p>
            <p className="letter-aside">nobody asked me to do this (well, you kinda did).</p>
          </div>
          <span className="page-number" aria-hidden="true">01</span>
        </section>
        <section className="page page--contents" aria-label="Letter, continued">
          <div className="letter letter--final">
            <p>but <mark className="highlight-purple">i like to win.</mark> i like to differentiate. and this part was easy for me, because <mark className="highlight-green">i run wave</mark>, a viral growth agency where we launch large ugc programs for brands.</p>
            <p className="letter-history">before that, i used to fall asleep thinking about what goes viral (i know, kinda sad), and wrote <mark className="highlight-green">200+ ad scripts</mark> for brands like adani, meesho, country delight, vama and goodscore.</p>
            <p>i'm <mark className="highlight-purple">stubborn in a useful way.</mark> if something doesn't work, i keep poking at it until it does. and being a founder, <mark className="highlight-green">i don't wait for anyone</mark> to tell me what to do.</p>
            <p className="letter-game">okay, enough boring y'all. let's play a game. try aiming your mouse at me :)</p>
            <p className="letter-signature">— aryan</p>
          </div>
          <span className="page-number" aria-hidden="true">02</span>
        </section>
        <Rings />
        <div className="opening-cover" aria-hidden="true"><div className="opening-cover__front"><span>aryan <i>X</i> wisprflow</span></div><div className="opening-cover__back" /></div>
      </article>
      <InsideChapters />
      </div>
      <p className="reading-status" aria-live="polite">{String(active+1).padStart(2,'0')} / 06 · {sections[active]}</p>
      <nav className="page-controls" aria-label="Page navigation">
        <button type="button" disabled={active===0} onClick={()=>go(active-1)}><ArrowLeft size={18} weight="light" aria-hidden="true" /> Previous Page</button>
        <span className="page-controls__divider" aria-hidden="true" />
        <button type="button" disabled={active===sections.length-1} onClick={()=>go(active+1)}>Next Page <ArrowRight size={18} weight="light" aria-hidden="true" /></button>
      </nav>

    </div>
  </main>;
}

function Placeholder({label,portrait=false}) { return <div className={`asset-slot ${portrait?'asset-slot--portrait':''}`}><span>＋</span><small>[{label}]</small></div>; }
function Heading({number,title,kicker}) {return <header className="chapter-heading"><span className="folio">{number} / {kicker}</span><h2>{title}</h2></header>;}
function Spread({number,title,children}) {return <article id={`chapter-${number}`} data-chapter={number-1} className="notebook chapter chapter--inside" aria-label={title}>{children}<Rings/><span className="spread-folio">{String(number).padStart(2,'0')} — {title}</span></article>;}
function InsideChapters(){return <>
 <Spread number={2} title="My story">
  <section className="page editorial-page"><Heading number="02" kicker="THE PERSON" title={<>A little<br/><em>backstory.</em></>}/><p className="deck">[Your story, in your own words. The starting point, the turning point, and what you’re pursuing now.]</p><blockquote>[One belief that shapes how you work.]</blockquote><div className="margin-note">A PERSONAL NOTE <p>[A detail people wouldn’t find on your résumé.]</p></div></section>
  <section className="page editorial-page"><Placeholder label="Portrait or a meaningful photograph"/><div className="caption">[Where this was taken · why it matters]</div><div className="timeline">{['Where it began','What changed','Where I’m going'].map((t,i)=><div key={t}><span>0{i+1}</span><div><h3>{t}</h3><p>[Add your story here.]</p></div></div>)}</div></section>
 </Spread>
 <Spread number={3} title="Building Wave">
  <section className="page editorial-page wave-page">
    <Heading number="03" kicker="building wave" title={<>i started <em>wave.</em></>}/>
    <p className="wave-intro">a viral growth agency.</p>
    <p>consumer apps and d2c brands hire us when they want to go viral, have an always-on organic channel. we help them become top of mind and drive conversions.</p>
    <p className="wave-aside">similar to the organic ugc and paid ugc program hector from wispr flow ran (yes, i stalk).</p>
    <p className="wave-bridge">being a founder means i've done every job in the building. two of them taught me the most:</p>
    <div className="wave-role"><h3>01 / creative strategy</h3><p>i write the scripts, and more importantly, <mark>i test them.</mark> hooks, formats, angles. we set up attribution so we know which reels bring users, not just views, then double down on what works and kill what doesn't.</p></div>
    <div className="wave-role"><h3>02 / sales</h3><p>i built a linkedin outbound motion from zero, closed our clients myself, and manage a team of <span className="copy-placeholder">[number]</span>. biggest lesson: <span className="copy-placeholder">[one real learning from selling]</span>.</p></div>
    <p className="wave-closing">so yes, i've owned a growth channel.<br/><em>i just had to build it first.</em></p>
  </section>
  <section className="page editorial-page wave-case">
    <span className="folio">case study / 01</span>
    <h3 className="wave-client">linkrunner<span aria-hidden="true">↗</span></h3>
    <p className="wave-client-description">attribution for app marketers.<br/>backed by titan capital and 2am vc.</p>
    <div className="wave-brief"><span className="folio">the brief</span><p><strong>100 reels.</strong><br/><em>6 weeks.</em></p><span>reach growth marketers in india.</span></div>
    <div className="wave-setup"><h4 className="folio">the setup</h4><p>two pages. one teaches marketing in 60 seconds, the other runs on personality and a product demo. every reel scripted, every shoot with two hook takes.</p></div>
    <div className="wave-status"><h4 className="folio">where it stands</h4><p>honestly? we went live 3 days ago. no viral moment yet <em>(give it a week).</em></p><p className="wave-results"><span>[views so far] <small>views</small></span><span>[reels posted] <small>reels live</small></span></p></div>
    <span className="wave-pending">[watch the reels →]<small>link to be added</small></span>
  </section>
 </Spread>
 <Spread number={4} title="Before Wave">
  <section className="page editorial-page past-page">
    <span className="folio">04 / before wave</span>
    <h2 className="past-company">zyra</h2>
    <p className="past-role">growth &amp; creative strategy · 1 year</p>
    <p className="past-intro">i wrote <mark>200+ performance ads</mark> that worked, for adani, meesho, country delight, vama and goodscore.</p>
    <p>that's where i got good at figuring out <em>why people stop scrolling.</em> and why they don't.</p>
    <div className="past-takeaway past-takeaway--lesson"><h3>what it taught me</h3><p className="copy-placeholder">[one real learning from zyra, e.g. something about hooks, testing, or what made an ad win]</p></div>
  </section>
  <section className="page editorial-page past-page past-page--nebula">
    <span className="folio" aria-hidden="true">experience / 02</span>
    <h2 className="past-company">nebula</h2>
    <p className="past-role">founder</p>
    <p className="past-intro">a digital workspace for remote startup teams. got selected, mentored and a grant from <mark>iit bombay's e-cell.</mark></p>
    <p>i learnt how to sell, how to build a product, and how to manage a team.</p>
    <p className="past-turn">then it failed.</p>
    <div className="past-takeaway past-takeaway--lesson"><h3>what it taught me</h3><p>speed matters more than i thought. and there's a big difference between okay work and <em>work that wins.</em></p></div>
    <p className="past-postscript">i learnt more from nebula failing than i could have anywhere else.</p>
  </section>
 </Spread>
 <Spread number={5} title="Wispr Flow work">
  <section className="page editorial-page"><Heading number="05" kicker="THE FIELD NOTES" title={<>Less claiming.<br/><em>More doing.</em></>}/><p className="deck">[The experiment: what you wanted to learn, who you wanted to reach, and how you tested it.]</p><div className="memo-block"><span className="folio">01 / THE QUESTION</span><p>[The central growth hypothesis.]</p></div><div className="memo-block"><span className="folio">02 / THE READOUT</span><p>[What worked, what didn’t, and what the results actually support.]</p></div><div className="next-test"><span className="folio">03 / WHAT I’D TEST NEXT</span><p>[The next experiment, why it matters, and how you would measure success.]</p></div><small className="data-note">[Results updated: date · observation window]</small></section>
  <section className="page editorial-page"><CreativeNotebook/></section>
 </Spread>
 <Spread number={6} title="Contact">
  <section className="page editorial-page"><Heading number="06" kicker="THE NEXT CONVERSATION" title={<>Let’s take<br/><em>this further.</em></>}/><p className="deck">[Your closing note to the team.]</p><div className="contact-address">[Your email address]</div><p className="caption">[Preferred way to get in touch]</p></section>
  <section className="page editorial-page"><span className="folio">THE PRACTICAL DETAILS</span><dl className="logistics">{['Location','Availability','Time zone','Résumé','LinkedIn','Other links'].map(label=><div key={label}><dt>{label}</dt><dd>[Add {label.toLowerCase()}]</dd></div>)}</dl><div className="margin-note">THANK YOU FOR READING <p>— aryan</p></div></section>
 </Spread>
 </>;}
function CreativeNotebook(){const [selected,setSelected]=useState(0);const reel=creatives[selected];return <><span className="folio">EXPERIMENT LOG / {String(selected+1).padStart(2,'0')}</span><div className="creative-tabs" role="group" aria-label="Choose creative">{creatives.map((r,i)=><button key={r.id} aria-pressed={selected===i} onClick={()=>setSelected(i)}>0{i+1}</button>)}</div><h3 className="project-title">{reel.hook}</h3><div className="creative-body">{reel.video?<video key={reel.video} src={reel.video} controls playsInline preload="none" aria-label={reel.hook}/>:<Placeholder portrait label="Vertical reel video"/>}<div><span className="folio">HYPOTHESIS</span><p>{reel.hypothesis}</p><span className="folio">AUDIENCE & ANGLE</span><p>{reel.audience}</p>{reel.url?<a href={reel.url} target="_blank" rel="noreferrer">Original reel ↗</a>:<span className="pending-link">[Original reel link ↗]</span>}</div></div><dl className="metrics">{Object.entries(reel.metrics).map(([key,value])=><div key={key}><dd>{value??'—'}</dd><dt>{key}</dt></div>)}</dl><div className="memo-block"><span className="folio">WHAT I LEARNED</span><p>{reel.learning}</p></div></>;}


