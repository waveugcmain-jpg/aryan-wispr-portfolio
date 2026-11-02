import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
export function useBookEntrance(deck, enabled, reduced, complete) {
 useLayoutEffect(()=>{
  if(!enabled||!deck.current)return;
  const host=deck.current, stage=host.parentElement, book=host.querySelector('.chapter--first');
  const leaf=book.querySelector('.page:first-child');
  const ink=book.querySelectorAll('.letter,.page-number');
  const ui=[stage.querySelector('.music-player'),stage.querySelector('.ask-preview'),stage.querySelector('.page-controls'),stage.querySelector('.reading-status')];
  const tabs=stage.querySelectorAll('.folder');
  let cancelled=false,skipTween;
  gsap.set(book,{clearProps:'transform'});
  book.style.transform='none';
  const bounds=book.getBoundingClientRect(),mobile=innerWidth<701;
  const leafHeight=leaf.offsetHeight;
  const scale=mobile?Math.min(.4,innerHeight*.32/leafHeight):.43;
  const y=innerHeight*.72-(bounds.top+(mobile?leafHeight:bounds.height)*.5);
  const x=bounds.width*(mobile?1:-.25)*scale;
  book.style.setProperty('--entrance-leaf-height',leafHeight+'px');
  if(mobile)host.style.perspectiveOrigin='50% '+(leafHeight*.5+y)+'px';
  const ctx=gsap.context(()=>{},stage);
  const timeline=gsap.timeline({paused:true,onComplete:()=>{if(cancelled)return;gsap.set([book,leaf,...ink,...ui,...tabs],{clearProps:'transform,opacity,willChange'});complete();}});
  ctx.add(()=>{
   gsap.set(book,{x,y,scale,rotationX:58,rotationZ:-6,transformOrigin:mobile?"50% "+(leafHeight/2)+"px":'50% 50%',willChange:'transform',force3D:true});
   gsap.set(leaf,{rotationY:mobile?-180:180,transformOrigin:mobile?'0% 50%':'100% 50%',willChange:'transform'});
   gsap.set([...ink,...ui,...tabs],{opacity:0});
   if(reduced){gsap.set([book,leaf],{clearProps:'transform'});timeline.to([...ink,...ui,...tabs],{opacity:1,duration:.3});}
   else {
    timeline.to(book,{x:-bounds.width*.07,y:-12,scale:.94,rotationX:8,rotationZ:-1,duration:1.3,ease:'power3.inOut'},.4)
     .to(book,{x:0,y:0,scale:1,rotationX:0,rotationZ:0,duration:1.2,ease:'power2.inOut'},1.7)
     .to(leaf,{rotationY:0,duration:1.2,ease:'power2.inOut'},1.3)
     .to(ink,{opacity:1,duration:.3},2.5)
     .fromTo(tabs,{y:12,opacity:0},{y:0,opacity:1,duration:.3,stagger:.04,ease:'power2.out'},2.4)
     .fromTo(ui,{y:10,opacity:0},{y:0,opacity:1,duration:.4,stagger:.1,ease:'power2.out'},2.7);
   }
  });
  const skip=e=>{if(e.type==='keydown'&&['Shift','Control','Alt','Meta'].includes(e.key))return;e.preventDefault();e.stopPropagation();if(skipTween)return;skipTween=gsap.to(timeline,{time:timeline.duration(),duration:.3,ease:'power2.out'});};
  window.addEventListener('pointerdown',skip,{capture:true});window.addEventListener('keydown',skip,{capture:true});window.addEventListener('wheel',skip,{passive:false,capture:true});
  const photo=document.querySelector('.room-scene img');
  Promise.all([document.fonts.ready,photo?.decode().catch(()=>{})]).then(()=>{if(!cancelled&&!skipTween){const checkpoint=import.meta.env.DEV?new URLSearchParams(location.search).get('entranceFrame'):null;if(checkpoint!==null)timeline.pause(Number(checkpoint)*timeline.duration(),false);else timeline.play();host.dataset.entranceReady='true';}});
  return()=>{cancelled=true;delete host.dataset.entranceReady;host.style.removeProperty('perspective-origin');skipTween?.kill();timeline.kill();ctx.revert();book.style.removeProperty("transform");window.removeEventListener('pointerdown',skip,true);window.removeEventListener('keydown',skip,true);window.removeEventListener('wheel',skip,true);};
 },[enabled,reduced]);
}
