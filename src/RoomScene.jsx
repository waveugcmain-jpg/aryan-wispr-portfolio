import { useRef, useState } from 'react';

function Movable({ className, label, children }) {
 const [position,setPosition]=useState({x:0,y:0});
 const drag=useRef(null);
 return <div className={`room-note ${className}`} role="group" aria-label={label} style={{'--drag-x':`${position.x}px`,'--drag-y':`${position.y}px`}}>
 <button className="room-note__handle" aria-label={`Move ${label}; drag or use arrow keys`} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,origin:position};}} onPointerMove={e=>{if(!drag.current)return;setPosition({x:drag.current.origin.x+e.clientX-drag.current.x,y:drag.current.origin.y+e.clientY-drag.current.y});}} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onKeyDown={e=>{const movement={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]}[e.key];if(movement){e.preventDefault();e.stopPropagation();setPosition(p=>({x:p.x+movement[0],y:p.y+movement[1]}));}}}><span>⠿</span> move</button>
 {children}
 </div>;
}
export function RoomScene(){return <>
 <div className="room-scene" aria-hidden="true"><img src="/assets/film-room.webp" alt="" fetchPriority="high"/></div>
 <aside className="room-mementos" aria-label="Notes on the wall">
 <Movable className="room-note--portrait" label="portrait card"><div className="room-portrait"><span>[your photo here]</span></div><p>aryan, off the page.</p></Movable>
 <Movable className="room-note--memo" label="note about Aryan"><span className="room-note__eyebrow">A NOTE ABOUT ME</span><p>i run <em>wave.</em><br/>i like to win.<br/>i like to differentiate.</p><small>— aryan</small></Movable>
 <Movable className="room-note--ticket" label="application ticket"><span>ONE APPLICATION</span><strong>aryan ×<br/>wispr flow</strong><small>GROWTH / FIELD NOTES</small></Movable>
 </aside>
 </>;}

