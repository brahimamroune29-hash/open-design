'use client';

import { useState } from 'react';

const gold='#d4a853',goldLight='#f0c878',bright='#f4f0e8',muted='#8a8680',faint='#4a4744';
const goldText={background:`linear-gradient(135deg,${goldLight},${gold})`,WebkitBackgroundClip:'text' as const,WebkitTextFillColor:'transparent' as const,backgroundClip:'text' as const};
const card={background:'#131210',border:'1px solid rgba(212,168,83,.13)',borderRadius:16};

const KPI=[
  {label:'Total Runs',     value:'1,420',delta:'+22%',up:true, spark:[30,45,32,58,48,72,65,80,70,90]},
  {label:'Avg Run Time',   value:'4.2s', delta:'-8%', up:true, spark:[50,42,48,38,44,35,40,30,36,28]},
  {label:'Success Rate',   value:'97.4%',delta:'+0.8%',up:true,spark:[92,94,93,95,96,95,97,96,98,97]},
  {label:'Tokens Used',    value:'8.3M', delta:'+31%',up:false,spark:[20,35,28,50,42,65,55,72,68,83]},
];
const LINE=[28,35,32,45,42,50,48,62,58,70,65,72,68,80,75,85,78,90,88,95,92,100,97,105,102,110,108,115,112,120];
const LINE2=[15,18,22,25,20,28,30,25,32,35,28,38,35,40,38,42,45,40,48,50,45,52,55,50,58,60,55,62,65,70];
const DONUT=[
  {label:'Prototype',  pct:38,color:gold},
  {label:'Slide Deck', pct:28,color:'#6b8fe8'},
  {label:'Figma',      pct:19,color:'#4caf72'},
  {label:'Media',      pct:15,color:'#a87dd4'},
];
const TOP=[
  {name:'Web Prototype',   runs:'2,840',delta:'+24%',up:true},
  {name:'Slide Deck',      runs:'1,920',delta:'+12%',up:true},
  {name:'From Figma',      runs:'1,340',delta:'+8%', up:true},
  {name:'Media Generation',runs:'980',  delta:'-3%', up:false},
  {name:'Plugin Authoring',runs:'640',  delta:'+41%',up:true},
];

function sparkPath(data:number[],w:number,h:number){
  const max=Math.max(...data),min=Math.min(...data),r=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/r)*h}`);
  return `M ${pts.join(' L ')}`;
}
function linePath(data:number[],w:number,h:number){
  const max=Math.max(...data),min=Math.min(...data),r=max-min||1,n=data.length;
  const pts=data.map((v,i)=>[(i/(n-1))*w, h-((v-min)/r)*(h*.8)-h*.1]);
  let d=`M ${pts[0][0]} ${pts[0][1]}`;
  for(let i=1;i<pts.length;i++){const[px,py]=pts[i-1],[cx,cy]=pts[i],cpx=(px+cx)/2;d+=` C ${cpx} ${py} ${cpx} ${cy} ${cx} ${cy}`;}
  return d;
}
function donutSegs(segs:typeof DONUT,r:number,cx:number,cy:number){
  let off=-Math.PI/2;
  return segs.map(s=>{
    const a=(s.pct/100)*2*Math.PI;
    const x1=cx+r*Math.cos(off),y1=cy+r*Math.sin(off),x2=cx+r*Math.cos(off+a),y2=cy+r*Math.sin(off+a);
    const d=`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${a>Math.PI?1:0} 1 ${x2} ${y2} Z`;
    off+=a;return{d,color:s.color};
  });
}

export default function AnalyticsPage(){
  const[range,setRange]=useState('30D');
  const W=700,H=180;
  return(
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} @keyframes kpiIn{from{opacity:0;transform:scale(.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}} .od-kpi:hover{border-color:rgba(212,168,83,.3)!important;transform:translateY(-2px)} .od-tr:hover{background:rgba(255,255,255,.02)}`}</style>
      <div style={{display:'flex',flexDirection:'column',gap:24,animation:'fadeUp 400ms cubic-bezier(.23,1,.32,1) both'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div>
            <h1 style={{fontSize:'clamp(20px,3vw,28px)',fontWeight:800,letterSpacing:-.8,color:bright,margin:'0 0 4px'}}><span style={goldText}>Analytics</span> Dashboard</h1>
            <p style={{fontSize:13,color:muted,margin:0}}>Track your design workflow performance in real time</p>
          </div>
          <div style={{display:'flex',gap:4,background:'rgba(255,255,255,.04)',border:'1px solid rgba(212,168,83,.1)',borderRadius:10,padding:3}}>
            {['7D','30D','90D','1Y'].map(r=>(
              <button key={r} onClick={()=>setRange(r)} style={{fontSize:13,fontWeight:range===r?600:500,color:range===r?gold:muted,background:range===r?'rgba(212,168,83,.14)':'none',border:'none',cursor:'pointer',padding:'6px 14px',borderRadius:8,transition:'background 140ms,color 140ms'}}>{r}</button>
            ))}
          </div>
        </div>

        {/* KPI */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {KPI.map((k,i)=>(
            <div key={k.label} className="od-kpi" style={{...card,padding:20,transition:'border-color 200ms,transform 200ms',animation:`kpiIn 400ms cubic-bezier(.23,1,.32,1) ${i*60}ms both`}}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:.8,textTransform:'uppercase',color:muted,marginBottom:10}}>{k.label}</div>
              <div style={{fontSize:30,fontWeight:800,letterSpacing:-1,color:bright,lineHeight:1,marginBottom:8}}>{k.value}</div>
              <div style={{display:'flex',alignItems:'center',gap:5,fontSize:12,color:muted,marginBottom:12}}>
                <span style={{fontSize:11,fontWeight:700,padding:'2px 6px',borderRadius:5,color:k.up?'#4caf72':'#e06b65',background:k.up?'rgba(76,175,114,.12)':'rgba(224,107,101,.12)'}}>{k.up?'↑':'↓'} {k.delta}</span>
                vs prev period
              </div>
              <svg width={80} height={30} viewBox="0 0 80 30">
                <defs><linearGradient id={`sg${i}`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={gold} stopOpacity=".3"/><stop offset="100%" stopColor={gold} stopOpacity=".9"/></linearGradient></defs>
                <path d={sparkPath(k.spark,80,30)} fill="none" stroke={`url(#sg${i})`} strokeWidth={2} strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Line chart */}
        <div style={{...card,padding:24}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
            <span style={{fontSize:15,fontWeight:700,color:bright}}>Workflow Runs Over Time</span>
            <div style={{display:'flex',gap:16}}>
              {[{c:gold,l:'Design Runs'},{c:'#6b8fe8',l:'Research Runs'}].map(x=>(
                <div key={x.l} style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:muted}}>
                  <div style={{width:10,height:10,borderRadius:3,background:x.c}}/>
                  {x.l}
                </div>
              ))}
            </div>
          </div>
          <svg width="100%" viewBox={`0 0 ${W} ${H+20}`} preserveAspectRatio="none" height={200} style={{overflow:'visible'}}>
            <defs>
              <linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={gold} stopOpacity=".25"/><stop offset="100%" stopColor={gold} stopOpacity="0"/></linearGradient>
              <linearGradient id="fb" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#6b8fe8" stopOpacity=".15"/><stop offset="100%" stopColor="#6b8fe8" stopOpacity="0"/></linearGradient>
            </defs>
            {[.2,.4,.6,.8].map(f=><line key={f} x1={0} y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,.04)" strokeWidth={1}/>)}
            <path d={`${linePath(LINE,W,H)} L ${W} ${H+20} L 0 ${H+20} Z`} fill="url(#fg)"/>
            <path d={linePath(LINE,W,H)} fill="none" stroke={gold} strokeWidth={2.5} strokeLinecap="round"/>
            <path d={`${linePath(LINE2,W,H)} L ${W} ${H+20} L 0 ${H+20} Z`} fill="url(#fb)"/>
            <path d={linePath(LINE2,W,H)} fill="none" stroke="#6b8fe8" strokeWidth={2} strokeLinecap="round"/>
          </svg>
        </div>

        {/* Two col */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {/* Donut */}
          <div style={{...card,padding:24}}>
            <div style={{fontSize:15,fontWeight:700,color:bright,marginBottom:20}}>Skill Distribution</div>
            <div style={{display:'flex',alignItems:'center',gap:24,flexWrap:'wrap'}}>
              <svg width={140} height={140} viewBox="0 0 140 140">
                <circle cx={70} cy={70} r={55} fill="rgba(255,255,255,.02)" stroke="rgba(212,168,83,.08)" strokeWidth={1}/>
                {donutSegs(DONUT,55,70,70).map((s,i)=><path key={i} d={s.d} fill={s.color} opacity={.85}/>)}
                <circle cx={70} cy={70} r={35} fill="#131210"/>
                <text x={70} y={67} textAnchor="middle" fill={bright} fontSize={13} fontWeight={700}>100%</text>
                <text x={70} y={82} textAnchor="middle" fill={muted} fontSize={10}>Total</text>
              </svg>
              <div style={{flex:1,display:'flex',flexDirection:'column',gap:10,minWidth:120}}>
                {DONUT.map(s=>(
                  <div key={s.label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:muted}}>
                      <div style={{width:10,height:10,borderRadius:3,background:s.color,flexShrink:0}}/>
                      {s.label}
                    </div>
                    <span style={{fontSize:13,fontWeight:600,color:bright}}>{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div style={{...card,overflow:'hidden'}}>
            <div style={{padding:'20px 22px 16px',fontSize:15,fontWeight:700,color:bright,borderBottom:'1px solid rgba(255,255,255,.04)'}}>Top Skills by Usage</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr auto auto',alignItems:'center',gap:16,padding:'10px 22px',borderBottom:'1px solid rgba(255,255,255,.05)'}}>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:.8,textTransform:'uppercase',color:faint}}>Skill</span>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:.8,textTransform:'uppercase',color:faint,textAlign:'right'}}>Runs</span>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:.8,textTransform:'uppercase',color:faint}}>Change</span>
            </div>
            {TOP.map(s=>(
              <div key={s.name} className="od-tr" style={{display:'grid',gridTemplateColumns:'1fr auto auto',alignItems:'center',gap:16,padding:'12px 22px',borderBottom:'1px solid rgba(255,255,255,.03)',transition:'background 120ms'}}>
                <span style={{fontSize:13,color:bright,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</span>
                <span style={{fontSize:13,fontWeight:600,color:bright,textAlign:'right'}}>{s.runs}</span>
                <span style={{fontSize:12,fontWeight:600,padding:'3px 8px',borderRadius:6,color:s.up?'#4caf72':'#e06b65',background:s.up?'rgba(76,175,114,.1)':'rgba(224,107,101,.1)'}}>{s.up?'↑':'↓'} {s.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
