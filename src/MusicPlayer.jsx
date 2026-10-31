import { useEffect, useRef, useState } from 'react';
export function MusicPlayer() {
 const audio=useRef(null);
 const [playing,setPlaying]=useState(false);
 const [time,setTime]=useState(0);
 const [duration,setDuration]=useState(0);
 const [error,setError]=useState(false);
 useEffect(()=>{
   const start=()=>audio.current?.play().catch(()=>{});
   const timer=setTimeout(start,7000);
   return()=>clearTimeout(timer);
 },[]);
 const stamp=value=>`${Math.floor(value/60)}:${String(Math.floor(value%60)).padStart(2,'0')}`;
 return <section className="music-player" aria-label="Music for the journey">
 <div className="music-player__caption"><span>FOR THE JOURNEY</span><span>{playing?'NOW PLAYING':'PRESS PLAY & STAY A WHILE'}</span></div>
 <div className="music-track"><div className="music-art" aria-hidden="true">◒</div><div><strong>Innerbloom</strong><small>RÜFÜS DU SOL</small></div><button aria-label={playing?'Pause music':'Play music'} onClick={()=>playing?audio.current.pause():audio.current.play().catch(()=>setError(true))}>{playing?'Ⅱ':'▶'}</button></div>
 <div className="music-progress"><span>{stamp(time)}</span><input aria-label="Music position" type="range" min="0" max={duration||1} step="1" value={time} onChange={e=>{audio.current.currentTime=Number(e.target.value);setTime(Number(e.target.value));}}/><span>{stamp(duration)}</span></div>
 {error&&<small>Tap play to try again.</small>}
 <audio ref={audio} src="/audio/innerbloom.mp3" preload="none" onPlay={()=>{setPlaying(true);setError(false);}} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} onTimeUpdate={()=>setTime(audio.current.currentTime)} onLoadedMetadata={()=>setDuration(audio.current.duration)} onError={()=>setError(true)}/>
 </section>;
}
