'use client';

import Link from 'next/link';

const gold = '#d4a853';
const goldLight = '#f0c878';
const goldText = { background:`linear-gradient(135deg,${goldLight},${gold})`, WebkitBackgroundClip:'text' as const, WebkitTextFillColor:'transparent' as const, backgroundClip:'text' as const };

const STATS = [
  { label:'Active Projects',     value:'24',   delta:'+3',   up:true,  icon:'◻' },
  { label:'Artifacts Generated', value:'1.4K', delta:'+18%', up:true,  icon:'⚡' },
  { label:'Team Members',        value:'8',    delta:'+1',   up:true,  icon:'◉' },
  { label:'Storage Used',        value:'72%',  delta:'+4%',  up:false, icon:'⬡' },
];
const BARS = [0.45,0.62,0.38,0.80,0.55,0.70,0.50];
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const ACTIVITY = [
  { icon:'🎨', text:'Design System v2.1 exported to Figma', bold:'Design System v2.1', time:'2 min ago' },
  { icon:'⚡', text:'Landing Page skill run completed — 3 artifacts', bold:'Landing Page', time:'18 min ago' },
  { icon:'◉', text:'Sarah joined the E-commerce project', bold:'E-commerce', time:'1 hr ago' },
  { icon:'📋', text:'Brand Guidelines updated with new tokens', bold:'Brand Guidelines', time:'3 hr ago' },
  { icon:'✅', text:'Mobile App design review approved', bold:'Mobile App', time:'Yesterday' },
];
const SKILLS = [
  { name:'Prototype',  pct:82, color:gold },
  { name:'Slide Deck', pct:61, color:'#6b8fe8' },
  { name:'From Figma', pct:47, color:'#4caf72' },
];
const RECENTS = [
  { name:'E-commerce Redesign', meta:'Updated 2 hr ago', icon:'🛍', bg:'rgba(212,168,83,.15)' },
  { name:'Mobile Banking App',  meta:'Updated yesterday', icon:'📱', bg:'rgba(107,143,232,.15)' },
  { name:'SaaS Landing Page',   meta:'3 days ago', icon:'🚀', bg:'rgba(76,175,114,.15)' },
];

const card   = { background:'#131210', border:'1px solid rgba(212,168,83,.13)', borderRadius:16 };
const muted  = '#8a8680';
const bright = '#f4f0e8';
const faint  = '#4a4744';

export default function DashOverview() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:scale(.94) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .od-stat-card:hover { border-color:rgba(212,168,83,.32) !important; transform:translateY(-2px); box-shadow:0 12px 30px rgba(0,0,0,.4),0 0 16px rgba(212,168,83,.07); }
        .od-feature-card:hover { border-color:rgba(212,168,83,.3) !important; }
        .od-recent-row:hover { background:rgba(255,255,255,.03); }
      `}</style>
      <div style={{ display:'flex', flexDirection:'column', gap:28, animation:'fadeUp 400ms cubic-bezier(.23,1,.32,1) both' }}>
        {/* Welcome */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:13, color:muted, marginBottom:4 }}>Good day, banbrahim 👋</div>
            <h1 style={{ fontSize:'clamp(22px,3vw,30px)', fontWeight:800, letterSpacing:-.8, color:bright, margin:'0 0 4px' }}>
              Your <span style={goldText}>workspace</span> is thriving
            </h1>
            <p style={{ fontSize:14, color:muted, margin:0 }}>3 new artifacts generated today · All systems operational</p>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <Link href="/dashboard/projects" style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:14, fontWeight:600, color:'#0a0805', background:`linear-gradient(135deg,${goldLight},${gold})`, border:'none', cursor:'pointer', padding:'10px 20px', borderRadius:10, boxShadow:'0 2px 16px rgba(212,168,83,.28)', textDecoration:'none' }}>+ New Project</Link>
            <Link href="/dashboard/analytics" style={{ display:'inline-flex', fontSize:14, fontWeight:500, color:bright, background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', cursor:'pointer', padding:'10px 18px', borderRadius:10, textDecoration:'none' }}>View Analytics →</Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {STATS.map((s,i) => (
            <div key={s.label} className="od-stat-card" style={{ ...card, padding:'24px 22px', position:'relative', overflow:'hidden', transition:'border-color 200ms,transform 200ms,box-shadow 200ms', animation:`cardIn 400ms cubic-bezier(.23,1,.32,1) ${i*60}ms both` }}>
              <div style={{ position:'absolute', top:-30, right:-30, width:100, height:100, borderRadius:'50%', background:'radial-gradient(circle, rgba(212,168,83,.07) 0%, transparent 70%)', pointerEvents:'none' }} />
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                <span style={{ fontSize:12, fontWeight:600, letterSpacing:.5, textTransform:'uppercase', color:muted }}>{s.label}</span>
                <span style={{ width:32, height:32, borderRadius:8, background:'rgba(212,168,83,.12)', border:'1px solid rgba(212,168,83,.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize:34, fontWeight:800, letterSpacing:-1.5, color:bright, lineHeight:1, marginBottom:8 }}>{s.value}</div>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:muted }}>
                <span style={{ fontSize:11, fontWeight:700, padding:'2px 7px', borderRadius:6, color: s.up ? '#4caf72' : '#e06b65', background: s.up ? 'rgba(76,175,114,.12)' : 'rgba(224,107,101,.12)' }}>
                  {s.up ? '↑' : '↓'} {s.delta}
                </span>
                vs last week
              </div>
            </div>
          ))}
        </div>

        {/* Two col */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:20 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {/* Chart */}
            <div style={card}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 22px 0', marginBottom:16 }}>
                <span style={{ fontSize:15, fontWeight:700, color:bright }}>Weekly Artifact Output</span>
                <button style={{ fontSize:13, color:gold, background:'none', border:'none', cursor:'pointer' }}>This week ▾</button>
              </div>
              <div style={{ padding:'0 22px 22px' }}>
                <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:120 }}>
                  {BARS.map((h,i) => (
                    <div key={i} style={{ flex:1, borderRadius:'4px 4px 0 0', height:`${h*100}%`, background: i===3 ? `linear-gradient(to top, ${gold}, ${goldLight})` : 'linear-gradient(to top, rgba(212,168,83,.6), rgba(212,168,83,.15))', boxShadow: i===3 ? `0 0 12px rgba(212,168,83,.4)` : 'none' }} />
                  ))}
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                  {DAYS.map(d => <span key={d} style={{ fontSize:11, color:faint }}>{d}</span>)}
                </div>
              </div>
            </div>

            {/* Activity */}
            <div style={card}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 22px 0', marginBottom:16 }}>
                <span style={{ fontSize:15, fontWeight:700, color:bright }}>Recent Activity</span>
                <button style={{ fontSize:13, color:gold, background:'none', border:'none', cursor:'pointer' }}>See all</button>
              </div>
              <div style={{ padding:'0 22px 22px' }}>
                {ACTIVITY.map((a,i) => (
                  <div key={i} style={{ display:'flex', gap:12, padding:'12px 0', borderBottom: i < ACTIVITY.length-1 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:'rgba(212,168,83,.12)', border:'1px solid rgba(212,168,83,.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{a.icon}</div>
                    <div>
                      <div style={{ fontSize:13, color:bright, lineHeight:1.5 }}>{a.text}</div>
                      <div style={{ fontSize:11, color:faint, marginTop:2 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick panel */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ ...card, padding:'20px 22px' }}>
              <div style={{ fontSize:14, fontWeight:700, color:bright, marginBottom:16 }}>Skills Usage</div>
              {SKILLS.map(s => (
                <div key={s.name} style={{ marginBottom:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:13, color:muted }}>{s.name}</span>
                    <span style={{ fontSize:13, fontWeight:600, color:bright }}>{s.pct}%</span>
                  </div>
                  <div style={{ height:4, background:'rgba(255,255,255,.06)', borderRadius:999, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${s.pct}%`, borderRadius:999, background:`linear-gradient(90deg, ${s.color}, ${s.color}aa)`, transition:'width 600ms cubic-bezier(.23,1,.32,1)' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...card, padding:'20px 22px' }}>
              <div style={{ fontSize:14, fontWeight:700, color:bright, marginBottom:12 }}>Recent Projects</div>
              {RECENTS.map((p,i) => (
                <div key={p.name} className="od-recent-row" style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 8px', margin:'0 -8px', borderRadius:8, borderBottom: i < RECENTS.length-1 ? '1px solid rgba(255,255,255,.04)' : 'none', cursor:'pointer', transition:'background 140ms' }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{p.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:bright, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                    <div style={{ fontSize:11, color:faint, marginTop:1 }}>{p.meta}</div>
                  </div>
                  <span style={{ fontSize:14, color:faint }}>›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
