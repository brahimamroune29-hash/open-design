'use client';

import { useState, useMemo } from 'react';
import { sanitize, limits } from '@/lib/sanitize';

const gold='#d4a853',goldLight='#f0c878',bright='#f4f0e8',muted='#8a8680',faint='#4a4744';
const goldText={background:`linear-gradient(135deg,${goldLight},${gold})`,WebkitBackgroundClip:'text' as const,WebkitTextFillColor:'transparent' as const,backgroundClip:'text' as const};
const card={background:'#131210',border:'1px solid rgba(212,168,83,.13)',borderRadius:16};

const PROJECTS=[
  {id:1,name:'E-commerce Redesign',    desc:'Full rebrand of the Luxora storefront with a new design system.',    kind:'Prototype',    status:'Active',   updated:'2 hours ago',  icon:'🛍',bg:'linear-gradient(135deg,rgba(212,168,83,.18),rgba(160,120,48,.08))'},
  {id:2,name:'Mobile Banking App',     desc:'iOS/Android banking dashboard with biometric auth flows.',            kind:'Prototype',    status:'Review',   updated:'Yesterday',     icon:'📱',bg:'linear-gradient(135deg,rgba(107,143,232,.18),rgba(60,90,200,.08))'},
  {id:3,name:'SaaS Landing Page',      desc:'Marketing landing page for Veritas — analytics platform.',           kind:'Landing',      status:'Active',   updated:'3 days ago',    icon:'🚀',bg:'linear-gradient(135deg,rgba(76,175,114,.18),rgba(30,120,60,.08))'},
  {id:4,name:'Brand Style Guide',      desc:'Comprehensive brand identity guide with color and typography.',      kind:'Design System',status:'Draft',    updated:'1 week ago',    icon:'🎨',bg:'linear-gradient(135deg,rgba(168,125,212,.18),rgba(100,60,160,.08))'},
  {id:5,name:'Annual Report Deck',     desc:'Executive-level slide deck for Q4 board presentation.',             kind:'Slide Deck',   status:'Active',   updated:'2 days ago',    icon:'📊',bg:'linear-gradient(135deg,rgba(212,100,83,.18),rgba(160,60,50,.08))'},
  {id:6,name:'Design System v3',       desc:'Next generation tokens, primitives, and Figma component set.',      kind:'Design System',status:'Draft',    updated:'4 days ago',    icon:'⚡',bg:'linear-gradient(135deg,rgba(212,168,83,.15),rgba(83,168,212,.08))'},
  {id:7,name:'Podcast Campaign',       desc:'Multi-format campaign assets — audio covers, social kit.',          kind:'Media',        status:'Archived', updated:'2 weeks ago',   icon:'🎙',bg:'linear-gradient(135deg,rgba(83,168,212,.18),rgba(50,100,160,.08))'},
  {id:8,name:'Investor Pitch Deck',    desc:'Series B fundraising presentation with competitive analysis.',      kind:'Slide Deck',   status:'Review',   updated:'5 days ago',    icon:'💼',bg:'linear-gradient(135deg,rgba(76,175,114,.15),rgba(212,168,83,.08))'},
  {id:9,name:'UX Research Report',     desc:'Synthesized findings from 40 user interviews on onboarding.',       kind:'Document',     status:'Draft',    updated:'6 days ago',    icon:'🔬',bg:'linear-gradient(135deg,rgba(168,125,212,.15),rgba(107,143,232,.08))'},
];

const statusStyle=(s:string):{color:string,background:string,border:string}=>{
  if(s==='Active')   return {color:'#4caf72',background:'rgba(76,175,114,.2)',border:'1px solid rgba(76,175,114,.3)'};
  if(s==='Draft')    return {color:muted,    background:'rgba(138,134,128,.15)',border:'1px solid rgba(138,134,128,.25)'};
  if(s==='Review')   return {color:gold,     background:'rgba(212,168,83,.15)',border:'1px solid rgba(212,168,83,.25)'};
  if(s==='Archived') return {color:'#6b8fe8',background:'rgba(107,143,232,.15)',border:'1px solid rgba(107,143,232,.25)'};
  return {color:muted,background:'transparent',border:'none'};
};

export default function ProjectsPage(){
  const[filter,setFilter]=useState('All');
  const[search,setSearch]=useState('');

  // Sanitize search input before filtering to neutralize any XSS payloads
  const safeSearch = sanitize(search, limits.search);
  const filtered=useMemo(()=>PROJECTS.filter(p=>(filter==='All'||p.status===filter)&&(!safeSearch||p.name.toLowerCase().includes(safeSearch.toLowerCase()))),[filter,safeSearch]);

  return(
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} @keyframes cIn{from{opacity:0;transform:scale(.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}} .od-pc:hover{border-color:rgba(212,168,83,.3)!important;transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.5),0 0 20px rgba(212,168,83,.06);}`}</style>
      <div style={{display:'flex',flexDirection:'column',gap:24,animation:'fadeUp 400ms cubic-bezier(.23,1,.32,1) both'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div>
            <h1 style={{fontSize:'clamp(20px,3vw,28px)',fontWeight:800,letterSpacing:-.8,color:bright,margin:'0 0 4px'}}><span style={goldText}>Projects</span></h1>
            <p style={{fontSize:13,color:muted,margin:0}}>{PROJECTS.length} total · {PROJECTS.filter(p=>p.status==='Active').length} active</p>
          </div>
          <button style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:14,fontWeight:600,color:'#0a0805',background:`linear-gradient(135deg,${goldLight},${gold})`,border:'none',cursor:'pointer',padding:'10px 20px',borderRadius:10,boxShadow:'0 2px 16px rgba(212,168,83,.28)'}}>+ New Project</button>
        </div>

        {/* Toolbar */}
        <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{flex:1,minWidth:200,maxWidth:360,display:'flex',alignItems:'center',gap:10,background:'#131210',border:'1px solid rgba(212,168,83,.14)',borderRadius:10,padding:'0 14px',height:40}}>
            <span style={{fontSize:14,color:muted}}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects…"
              maxLength={limits.search.maxLength}
              autoComplete="off"
              spellCheck={false}
              style={{flex:1,background:'none',border:'none',outline:'none',fontSize:13,color:bright,fontFamily:'inherit'}}
            />
          </div>
          <div style={{display:'flex',gap:4,background:'rgba(255,255,255,.04)',border:'1px solid rgba(212,168,83,.1)',borderRadius:10,padding:3}}>
            {['All','Active','Draft','Review','Archived'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{fontSize:13,fontWeight:filter===f?600:500,color:filter===f?gold:muted,background:filter===f?'rgba(212,168,83,.14)':'none',border:'none',cursor:'pointer',padding:'5px 12px',borderRadius:7,transition:'background 140ms,color 140ms'}}>{f}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length===0 ? (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 24px',gap:16,textAlign:'center'}}>
            <div style={{fontSize:48,opacity:.4}}>◻</div>
            <div style={{fontSize:18,fontWeight:700,color:bright}}>No projects found</div>
            <div style={{fontSize:14,color:muted}}>Try adjusting your filters or create a new project.</div>
          </div>
        ):(
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {filtered.map((p,i)=>(
              <div key={p.id} className="od-pc" style={{...card,overflow:'hidden',cursor:'pointer',transition:'border-color 200ms,transform 200ms,box-shadow 200ms',animation:`cIn 400ms cubic-bezier(.23,1,.32,1) ${i*60}ms both`,position:'relative'}}>
                {/* Thumb */}
                <div style={{height:140,background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,position:'relative'}}>
                  {p.icon}
                  <span style={{position:'absolute',top:12,right:12,fontSize:10,fontWeight:700,letterSpacing:.5,textTransform:'uppercase',padding:'3px 9px',borderRadius:999,...statusStyle(p.status)}}>{p.status}</span>
                </div>
                {/* Body */}
                <div style={{padding:'16px 18px 18px'}}>
                  <div style={{fontSize:15,fontWeight:700,color:bright,margin:'0 0 4px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.name}</div>
                  <div style={{fontSize:12,color:muted,margin:'0 0 14px',lineHeight:1.5,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical' as const}}>{p.desc}</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:11,fontWeight:600,color:gold,background:'rgba(212,168,83,.1)',border:'1px solid rgba(212,168,83,.15)',padding:'3px 9px',borderRadius:999}}>{p.kind}</span>
                    <span style={{fontSize:11,color:faint}}>{p.updated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
