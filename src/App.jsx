import { creatives } from './content/creatives.js';
import { ArrowLeft, ArrowRight, ArrowUp, Microphone } from '@phosphor-icons/react';
import { useRef, useEffect, useState } from 'react';
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
  const [active,setActive]=useState(0);
  const go=(index)=>document.getElementById(`chapter-${index+1}`)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{ entries.forEach(entry=>{if(entry.isIntersecting){setActive(Number(entry.target.dataset.chapter));entry.target.classList.add('chapter--seen');}}); },{rootMargin:'-15% 0px -55% 0px',threshold:0});
    document.querySelectorAll('[data-chapter]').forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[]);

  return <main className="home">
    <TrainScene />

    <div className="journal-stage">
      <div className="ask-preview" aria-label="Ask Aryan — design preview">
        <div className="ask-input"><input aria-label="Ask Aryan any question — preview only" placeholder="Ask Aryan any question." readOnly /><button type="button" disabled aria-label="Microphone — coming later"><Microphone size={21} weight="light" /></button><button className="ask-send" type="button" disabled aria-label="Send — coming later"><ArrowUp size={22} weight="light" /></button></div>
        <div className="ask-chips">{['Top skills?', 'Best project?', 'Why Wispr Flow?'].map(q=><button key={q} type="button" disabled>{q}</button>)}</div>
      </div>
      <FolderNavigation active={active} go={go} />
      <article id="chapter-1" data-chapter="0" className="notebook chapter chapter--first" aria-label="Aryan's portfolio notebook">
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
          <span className="page-number" aria-hidden="true">01</span>
        </section>
        <section className="page page--contents" aria-label="Letter, continued">
          <div className="letter">
            <h2>is aryan (insert buzzword here) high agency?</h2>
            <p>i’ve started two companies. nobody handed me either one. when it’s yours, there’s no one to escalate to.</p>
            <h2>is aryan full of crap?</h2>
            <p>i hope you don’t think this :(</p>
            <p>but no. for this challenge i actually signed creators, negotiated with them, made <mark>4 ads for wispr flow</mark> and ran them as trial reels on instagram. real strangers, real views. <button className="letter-proof proof-link" onClick={()=>go(3)}>see the numbers →</button></p>
            <h2>is aryan smart? creative?</h2>
            <p>my mom says i’m smart. and i failed art class.</p>
            <p>so you’ll have to judge that one yourself. you’re holding the evidence.</p>
            <p>ok. that’s it.</p>
            <p>the rest of this notebook is the proof. short on time? ask me anything in the bar below. say it out loud. you know how.</p>
            <p className="letter-signature">— aryan</p>
            <span className="letter-credit">written with Wispr Flow</span>
          </div>
          <span className="page-number" aria-hidden="true">02</span>
        </section>
        <Rings />
        <div className="opening-cover" aria-hidden="true"><div className="opening-cover__front"><span>aryan <i>X</i> wisprflow</span></div><div className="opening-cover__back" /></div>
      </article>
      <InsideChapters />
      <nav className="page-controls" aria-label="Page navigation">
        <button type="button" disabled={active===0} onClick={()=>go(active-1)}><ArrowLeft size={18} weight="light" aria-hidden="true" /> Previous Page</button>
        <span className="page-controls__divider" aria-hidden="true" />
        <button type="button" disabled={active===4} onClick={()=>go(active+1)}>Next Page <ArrowRight size={18} weight="light" aria-hidden="true" /></button>
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
 <Spread number={3} title="Experiences & projects">
  <section className="page editorial-page"><Heading number="03" kicker="THE TRACK RECORD" title={<>Work with<br/><em>something to show.</em></>}/><p className="deck">[A short introduction connecting your experience to the kind of work you want to do next.]</p>{[1,2].map(n=><div className="experience" key={n}><span className="folio">[DATES] / 0{n}</span><h3>[Role] <span>at [Company]</span></h3><p>[What you owned, the challenge, and your contribution.]</p><strong>[Verified outcome or result]</strong></div>)}</section>
  <section className="page editorial-page"><span className="folio">SELECTED PROJECT / 01</span><Placeholder label="Project screenshot"/><h3 className="project-title">[Project name]</h3><p>[The problem you chose to solve, and who it helped.]</p><dl className="project-facts"><div><dt>My role</dt><dd>[Contribution]</dd></div><div><dt>The result</dt><dd>[Verified impact]</dd></div></dl><span className="pending-link">[Project link →]</span><div className="margin-note">NEXT PROJECT <p>[A second project can be added as another spread.]</p></div></section>
 </Spread>
 <Spread number={4} title="Wispr Flow work">
  <section className="page editorial-page"><Heading number="04" kicker="THE FIELD NOTES" title={<>Less claiming.<br/><em>More doing.</em></>}/><p className="deck">[The experiment: what you wanted to learn, who you wanted to reach, and how you tested it.]</p><div className="memo-block"><span className="folio">01 / THE QUESTION</span><p>[The central growth hypothesis.]</p></div><div className="memo-block"><span className="folio">02 / THE READOUT</span><p>[What worked, what didn’t, and what the results actually support.]</p></div><div className="next-test"><span className="folio">03 / WHAT I’D TEST NEXT</span><p>[The next experiment, why it matters, and how you would measure success.]</p></div><small className="data-note">[Results updated: date · observation window]</small></section>
  <section className="page editorial-page"><CreativeNotebook/></section>
 </Spread>
 <Spread number={5} title="Contact">
  <section className="page editorial-page"><Heading number="05" kicker="THE NEXT CONVERSATION" title={<>Let’s take<br/><em>this further.</em></>}/><p className="deck">[Your closing note to the team.]</p><div className="contact-address">[Your email address]</div><p className="caption">[Preferred way to get in touch]</p></section>
  <section className="page editorial-page"><span className="folio">THE PRACTICAL DETAILS</span><dl className="logistics">{['Location','Availability','Time zone','Résumé','LinkedIn','Other links'].map(label=><div key={label}><dt>{label}</dt><dd>[Add {label.toLowerCase()}]</dd></div>)}</dl><div className="margin-note">THANK YOU FOR READING <p>— aryan</p></div></section>
 </Spread>
 </>;}
function CreativeNotebook(){const [selected,setSelected]=useState(0);const reel=creatives[selected];return <><span className="folio">EXPERIMENT LOG / {String(selected+1).padStart(2,'0')}</span><div className="creative-tabs" role="group" aria-label="Choose creative">{creatives.map((r,i)=><button key={r.id} aria-pressed={selected===i} onClick={()=>setSelected(i)}>0{i+1}</button>)}</div><h3 className="project-title">{reel.hook}</h3><div className="creative-body">{reel.video?<video key={reel.video} src={reel.video} controls playsInline preload="none" aria-label={reel.hook}/>:<Placeholder portrait label="Vertical reel video"/>}<div><span className="folio">HYPOTHESIS</span><p>{reel.hypothesis}</p><span className="folio">AUDIENCE & ANGLE</span><p>{reel.audience}</p>{reel.url?<a href={reel.url} target="_blank" rel="noreferrer">Original reel ↗</a>:<span className="pending-link">[Original reel link ↗]</span>}</div></div><dl className="metrics">{Object.entries(reel.metrics).map(([key,value])=><div key={key}><dd>{value??'—'}</dd><dt>{key}</dt></div>)}</dl><div className="memo-block"><span className="folio">WHAT I LEARNED</span><p>{reel.learning}</p></div></>;}
