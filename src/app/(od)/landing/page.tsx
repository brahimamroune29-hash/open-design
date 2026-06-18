'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const STAR_COUNT = 60;
const STATS = [
  { value: '12K+', label: 'Active Projects' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '4.2M', label: 'Artifacts Generated' },
  { value: '140+', label: 'Design Systems' },
];
const FEATURES = [
  { icon: '⚡', title: 'Lightning Workflows', desc: 'Accelerate every step of your design process with AI-powered automation.' },
  { icon: '🎨', title: 'Premium Design Systems', desc: 'Ship pixel-perfect brand identities with curated design tokens and components.' },
  { icon: '📊', title: 'Real-time Analytics', desc: 'Track project performance through beautiful interactive dashboards.' },
  { icon: '🔌', title: 'Deep Integrations', desc: 'Connect Figma, GitHub, Slack, and 100+ tools in one intelligent workspace.' },
  { icon: '🛡️', title: 'Enterprise Security', desc: 'SOC 2 Type II compliant with SSO, audit logs, and role-based permissions.' },
  { icon: '🌍', title: 'Global Collaboration', desc: 'Async-first multiplayer editing. Work across 24 time zones, effortlessly.' },
];
const PREVIEW_BARS = [0.4, 0.65, 0.5, 0.8, 0.55, 0.9, 0.7, 0.45, 0.75, 0.6];

export default function LandingPage() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      Object.assign(star.style, {
        position: 'absolute',
        width: `${1 + Math.random() * 2}px`,
        aspectRatio: '1',
        borderRadius: '50%',
        background: 'rgba(212,168,83,0.7)',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: `${0.2 + Math.random() * 0.5}`,
        animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`,
      });
      container.appendChild(star);
    }
  }, []);

  const goldText: React.CSSProperties = {
    background: 'linear-gradient(135deg, #f0c878, #d4a853)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:.9;transform:scale(1.4)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { from{opacity:.5;transform:scale(1)} to{opacity:1;transform:scale(1.12)} }
        .od-feature-card:hover { border-color: rgba(212,168,83,.3) !important; transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,.5), 0 0 20px rgba(212,168,83,.07); }
        .od-nav-link:hover { color: #f4f0e8 !important; }
        .od-btn-ghost:hover { color: #f4f0e8 !important; background: rgba(255,255,255,.05) !important; }
        .od-btn-gold:hover  { opacity: .9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(212,168,83,.5) !important; }
        .od-hero-btn:hover  { transform: translateY(-2px) !important; box-shadow: 0 8px 40px rgba(212,168,83,.5) !important; }
        .od-footer-link:hover { color: #8a8680 !important; }
      `}</style>

      <div style={{ background:'#070605', color:'#f4f0e8', minHeight:'100vh', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', position:'relative', overflowX:'hidden' }}>
        {/* Ambient */}
        <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0 }}>
          <div style={{ position:'absolute', top:'-30%', left:'50%', transform:'translateX(-50%)', width:900, height:600, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(212,168,83,.06) 0%, transparent 70%)', animation:'pulse 8s ease-in-out infinite alternate' }} />
        </div>
        <div ref={starsRef} style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0 }} />

        {/* NAV */}
        <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 40px', height:68, background:'rgba(7,6,5,.8)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(212,168,83,.12)' }}>
          <Link href="/landing" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', color:'#f4f0e8', fontWeight:700, fontSize:18 }}>
            <span style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#f0c878,#a07830)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, boxShadow:'0 2px 12px rgba(212,168,83,.3)' }}>◆</span>
            Open Design
          </Link>
          <div style={{ display:'flex', gap:32 }}>
            {['Features','Pricing','Docs'].map(l => (
              <a key={l} href="#features" className="od-nav-link" style={{ fontSize:14, color:'#8a8680', textDecoration:'none', transition:'color 140ms' }}>{l}</a>
            ))}
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button className="od-btn-ghost" style={{ fontSize:14, color:'#8a8680', background:'none', border:'none', cursor:'pointer', padding:'8px 14px', borderRadius:8, transition:'color 140ms,background 140ms' }}>Sign in</button>
            <Link href="/dashboard" className="od-btn-gold" style={{ fontSize:14, fontWeight:600, color:'#0a0805', background:'linear-gradient(135deg,#f0c878,#d4a853)', border:'none', cursor:'pointer', padding:'9px 20px', borderRadius:8, boxShadow:'0 2px 12px rgba(212,168,83,.3)', textDecoration:'none', transition:'opacity 140ms,transform 140ms,box-shadow 200ms' }}>
              Open Dashboard →
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', minHeight:'100vh', padding:'120px 24px 80px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 16px', borderRadius:999, border:'1px solid rgba(212,168,83,.22)', background:'rgba(212,168,83,.07)', fontSize:12, fontWeight:500, color:'#d4a853', letterSpacing:.5, textTransform:'uppercase', marginBottom:32, animation:'fadeUp 600ms cubic-bezier(.23,1,.32,1) both' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#d4a853', boxShadow:'0 0 6px #d4a853', display:'inline-block', animation:'blink 2s ease-in-out infinite' }} />
            Now in public beta · v0.10
          </div>

          <h1 style={{ fontSize:'clamp(44px,7vw,88px)', fontWeight:800, lineHeight:1.08, letterSpacing:-2, margin:'0 0 24px', maxWidth:900, animation:'fadeUp 700ms cubic-bezier(.23,1,.32,1) 100ms both' }}>
            Design at the speed<br />of <span style={goldText}>intelligence</span>
          </h1>

          <p style={{ fontSize:'clamp(16px,2vw,20px)', lineHeight:1.7, color:'#8a8680', maxWidth:560, margin:'0 0 48px', animation:'fadeUp 700ms cubic-bezier(.23,1,.32,1) 200ms both' }}>
            The AI-first workspace where design systems, skills, and code converge — so your team ships extraordinary products, faster.
          </p>

          <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', animation:'fadeUp 700ms cubic-bezier(.23,1,.32,1) 300ms both' }}>
            <Link href="/dashboard" className="od-hero-btn" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:16, fontWeight:600, color:'#0a0805', background:'linear-gradient(135deg,#f0c878,#d4a853)', border:'none', cursor:'pointer', padding:'15px 32px', borderRadius:12, boxShadow:'0 4px 24px rgba(212,168,83,.35)', textDecoration:'none', transition:'transform 200ms,box-shadow 200ms' }}>
              Open Dashboard →
            </Link>
            <a href="#features" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:16, fontWeight:500, color:'#f4f0e8', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', cursor:'pointer', padding:'14px 28px', borderRadius:12, textDecoration:'none', transition:'background 140ms' }}>
              Watch demo ▶
            </a>
          </div>

          {/* Preview mockup */}
          <div style={{ position:'relative', marginTop:64, width:'100%', maxWidth:960, animation:'fadeUp 800ms cubic-bezier(.23,1,.32,1) 500ms both' }}>
            <div style={{ borderRadius:16, border:'1px solid rgba(212,168,83,.2)', background:'#131210', overflow:'hidden', boxShadow:'0 0 0 1px rgba(212,168,83,.06), 0 40px 80px rgba(0,0,0,.8)' }}>
              {/* Window chrome */}
              <div style={{ display:'flex', gap:8, padding:'12px 16px', background:'#0f0d0b', borderBottom:'1px solid rgba(212,168,83,.1)', alignItems:'center' }}>
                {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />)}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', height:300 }}>
                {/* Sidebar */}
                <div style={{ background:'#0c0b09', borderRight:'1px solid rgba(212,168,83,.08)', padding:'20px 14px', display:'flex', flexDirection:'column', gap:6 }}>
                  {['Overview','Analytics','Projects','Settings'].map((item,i) => (
                    <div key={item} style={{ height:32, borderRadius:6, display:'flex', alignItems:'center', gap:10, padding:'0 10px', fontSize:13, color: i===0 ? '#d4a853' : '#8a8680', background: i===0 ? 'rgba(212,168,83,.1)' : 'transparent' }}>
                      <div style={{ width:14, height:14, borderRadius:4, background:'currentColor', opacity:.5, flexShrink:0 }} />
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main */}
                <div style={{ padding:24, display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'auto 1fr', gap:16 }}>
                  {[0,1].map(i => (
                    <div key={i} style={{ background:'#181614', border:'1px solid rgba(212,168,83,.1)', borderRadius:10, padding:16 }}>
                      <div style={{ height:8, borderRadius:4, background:'rgba(255,255,255,.07)', width:'40%', marginBottom:12 }} />
                      <div style={{ height:24, borderRadius:4, background:'linear-gradient(90deg, rgba(212,168,83,.5), rgba(212,168,83,.1))', width:'60%' }} />
                    </div>
                  ))}
                  <div style={{ gridColumn:'1/-1', background:'#181614', border:'1px solid rgba(212,168,83,.1)', borderRadius:10, padding:16, display:'flex', alignItems:'flex-end', gap:6 }}>
                    {PREVIEW_BARS.map((h,i) => (
                      <div key={i} style={{ flex:1, borderRadius:'4px 4px 0 0', background:'linear-gradient(to top, rgba(212,168,83,.7), rgba(212,168,83,.15))', height:`${h*100}%`, minHeight:8 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', width:'60%', height:80, background:'radial-gradient(ellipse, rgba(212,168,83,.2) 0%, transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
          </div>
        </section>

        {/* STATS */}
        <div style={{ position:'relative', zIndex:1, display:'flex', borderTop:'1px solid rgba(212,168,83,.1)', borderBottom:'1px solid rgba(212,168,83,.1)', background:'rgba(212,168,83,.025)', flexWrap:'wrap' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ flex:'1 1 200px', padding:'40px 32px', textAlign:'center', borderRight:'1px solid rgba(212,168,83,.1)' }}>
              <div style={{ fontSize:40, fontWeight:800, letterSpacing:-1.5, ...goldText, marginBottom:6 }}>{s.value}</div>
              <div style={{ fontSize:14, color:'#8a8680' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <section id="features" style={{ position:'relative', zIndex:1, padding:'120px 24px', maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ display:'inline-block', fontSize:11, fontWeight:600, letterSpacing:2, textTransform:'uppercase', color:'#d4a853', marginBottom:16 }}>Everything you need</div>
            <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:800, letterSpacing:-1.5, lineHeight:1.1, margin:'0 0 16px' }}>
              Built for teams that <span style={goldText}>demand excellence</span>
            </h2>
            <p style={{ fontSize:17, color:'#8a8680', maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
              Every feature crafted with obsessive attention to detail.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:20 }}>
            {FEATURES.map(f => (
              <div key={f.title} className="od-feature-card" style={{ position:'relative', padding:32, borderRadius:16, border:'1px solid rgba(212,168,83,.1)', background:'#131210', transition:'border-color 200ms, transform 200ms, box-shadow 200ms', cursor:'default' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'linear-gradient(135deg, rgba(212,168,83,.2), rgba(212,168,83,.05))', border:'1px solid rgba(212,168,83,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:20 }}>{f.icon}</div>
                <h3 style={{ fontSize:18, fontWeight:700, color:'#f4f0e8', margin:'0 0 10px' }}>{f.title}</h3>
                <p style={{ fontSize:14, lineHeight:1.7, color:'#8a8680', margin:0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ position:'relative', zIndex:1, padding:'100px 24px', textAlign:'center' }}>
          <div style={{ maxWidth:760, margin:'0 auto', padding:'72px 48px', borderRadius:24, border:'1px solid rgba(212,168,83,.22)', background:'linear-gradient(135deg, rgba(212,168,83,.06), rgba(212,168,83,.02))', position:'relative' }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:-1.5, margin:'0 0 16px' }}>
              Ready to build <span style={goldText}>something extraordinary?</span>
            </h2>
            <p style={{ fontSize:17, color:'#8a8680', margin:'0 0 40px', lineHeight:1.6 }}>Join thousands of teams shipping premium digital products.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/dashboard" className="od-hero-btn" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:16, fontWeight:600, color:'#0a0805', background:'linear-gradient(135deg,#f0c878,#d4a853)', border:'none', cursor:'pointer', padding:'15px 32px', borderRadius:12, boxShadow:'0 4px 24px rgba(212,168,83,.35)', textDecoration:'none', transition:'transform 200ms,box-shadow 200ms' }}>
                Get started free →
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ position:'relative', zIndex:1, borderTop:'1px solid rgba(212,168,83,.1)', padding:'32px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <Link href="/landing" style={{ fontSize:15, fontWeight:700, color:'#f4f0e8', textDecoration:'none' }}>◆ Open Design</Link>
          <div style={{ display:'flex', gap:24 }}>
            {['Privacy','Terms','Status','GitHub'].map(l => (
              <a key={l} href="#" className="od-footer-link" style={{ fontSize:13, color:'#4a4744', textDecoration:'none', transition:'color 140ms' }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize:12, color:'#4a4744' }}>© 2026 Open Design</span>
        </footer>
      </div>
    </>
  );
}
