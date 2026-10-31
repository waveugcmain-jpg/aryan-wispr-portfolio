import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Microphone, X } from '@phosphor-icons/react';
export function AskAryan({go,reduced}) {
  const [question,setQuestion]=useState(''),[answer,setAnswer]=useState(''),[loading,setLoading]=useState(false),[error,setError]=useState(''),[page,setPage]=useState(null),[mode,setMode]=useState(''),[open,setOpen]=useState(false),[listening,setListening]=useState(false);
  const request=useRef(null),recognition=useRef(null),input=useRef(null);
  const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
  useEffect(()=>{if(input.current){input.current.style.height='auto';input.current.style.height=Math.min(input.current.scrollHeight,100)+'px';}},[question]);
  useEffect(()=>()=>{request.current?.abort();recognition.current?.abort();},[]);
  async function submit(value=question) {
    if(!value.trim()||loading)return;
    setQuestion(value);setAnswer('');setError('');setPage(null);setOpen(true);setLoading(true);setMode('');
    request.current?.abort();const controller=new AbortController();request.current=controller;
    const timeout=setTimeout(()=>controller.abort(),35000);
    try {
      const response=await fetch('/api/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:value}),signal:controller.signal});
      if(!response.ok){const data=await response.json();throw new Error(data.error||'Please try again in a moment.');}
      const reader=response.body.getReader(),decoder=new TextDecoder();let pending='',complete=false;
      while(true){const {value:chunk,done}=await reader.read();if(done)break;pending+=decoder.decode(chunk,{stream:true});const lines=pending.split('\n');pending=lines.pop();for(const line of lines){if(!line)continue;const data=JSON.parse(line);if(data.mode){setMode(data.mode);setPage(data.page);if(data.page)go(data.page-1);}if(data.delta)setAnswer(old=>old+data.delta);if(data.done)complete=true;}}
      if(!complete)throw new Error('The answer was interrupted. Please try again.');
    }catch(err){if(request.current===controller)setError(err.name==='AbortError'?'The answer took too long. Please try again.':err.message);}
    finally{clearTimeout(timeout);if(request.current===controller)setLoading(false);}
  }
  function mic(){
    if(listening){recognition.current?.stop();return;}
    const rec=new Speech();recognition.current=rec;rec.lang='en-IN';rec.interimResults=false;
    rec.onstart=()=>setListening(true);rec.onend=()=>setListening(false);
    rec.onresult=e=>{setQuestion(old=>(old?old+' ':'')+e.results[0][0].transcript);input.current?.focus();};
    rec.onerror=()=>{setListening(false);setError('Microphone unavailable. You can still type or use Wispr Flow.');setOpen(true);};
    try{rec.start();}catch{setListening(false);setError('Couldn’t start the microphone. Please type your question.');setOpen(true);}
  }
  return <div className="ask-preview ask-live">
    <form className={`ask-input ${listening?'ask-listening':''}`} onSubmit={e=>{e.preventDefault();submit();}}>
      <textarea ref={input} rows="1" maxLength={1000} aria-label="Ask Aryan any question" placeholder="Ask Aryan any question." value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();submit();}}}/>
      {Speech&&<button type="button" onClick={mic} aria-label={listening?'Stop dictation':'Dictate a question'} aria-pressed={listening}><Microphone size={21}/></button>}
      <button className="ask-send" type="submit" disabled={loading||!question.trim()} aria-label="Ask question"><ArrowUp size={22}/></button>
    </form>
    <div className="ask-chips">{['Top skills?','Best project?','Why Wispr Flow?'].map(q=><button key={q} type="button" disabled={loading} onClick={()=>submit(q)}>{q}</button>)}</div>
    {open&&<section className="ask-answer" aria-label="Aryan’s answer">
      <div className="ask-answer__heading"><span>{loading?'Reading the notebook…':mode==='ai'?'From Aryan’s notebook':'Notebook search'}</span><button aria-label="Close answer" onClick={()=>{request.current?.abort();request.current=null;setLoading(false);setOpen(false);}}><X size={17}/></button></div>
      {error?<p role="alert">{error}</p>:<p aria-live={loading?'off':'polite'} aria-busy={loading}>{answer||'One moment…'}</p>}
      {page&&!error&&<button className="ask-source" onClick={()=>go(page-1)}>See section {String(page).padStart(2,'0')} →</button>}
      {!loading&&mode==='notebook'&&!error&&<small>Matched from Aryan’s notes · AI connection not configured</small>}
    </section>}
  </div>;
}
