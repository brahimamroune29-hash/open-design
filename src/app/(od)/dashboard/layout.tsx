'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/dashboard',            icon: '⬡', label: 'Overview'  },
  { href: '/dashboard/analytics',  icon: '📈', label: 'Analytics' },
  { href: '/dashboard/projects',   icon: '◻',  label: 'Projects', badge: '12' },
  { href: '/dashboard/settings',   icon: '⚙',  label: 'Settings' },
];

function pageLabel(p: string) {
  if (p === '/dashboard') return 'Overview';
  if (p.includes('analytics')) return 'Analytics';
  if (p.includes('projects')) return 'Projects';
  if (p.includes('settings')) return 'Settings';
  return 'Dashboard';
}

export default function DashLayout({ children }: { children: ReactNode }) {
  const path = usePathname() ?? '';

  const gold = '#d4a853';
  const goldLight = '#f0c878';
  const bg = '#070605';
  const surface = '#0d0c0a';
  const card = '#131210';
  const border = 'rgba(212,168,83,.18)';
  const textBright = '#f4f0e8';
  const textMuted = '#8a8680';
  const textFaint = '#4a4744';

  return (
    <>
      <style>{`
        .od-nav-item:hover { background: rgba(255,255,255,.04) !important; color: ${textBright} !important; }
        .od-nav-item.active { background: rgba(212,168,83,.1) !important; color: ${gold} !important; border-color: rgba(212,168,83,.2) !important; }
        .od-topbtn:hover { background: rgba(212,168,83,.1) !important; color: ${gold} !important; border-color: rgba(212,168,83,.2) !important; }
        .od-user-card:hover { background: rgba(255,255,255,.04) !important; border-color: rgba(212,168,83,.15) !important; }
      `}</style>

      <div style={{ display:'flex', minHeight:'100vh', background:bg, color:textBright, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
        {/* SIDEBAR */}
        <aside style={{ position:'fixed', top:0, left:0, bottom:0, width:240, background:surface, borderRight:`1px solid ${border}`, display:'flex', flexDirection:'column', zIndex:50 }}>
          {/* Ambient top glow */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:200, background:'radial-gradient(ellipse at 50% 0%, rgba(212,168,83,.06) 0%, transparent 70%)', pointerEvents:'none' }} />

          {/* Logo */}
          <Link href="/dashboard" style={{ padding:'22px 20px 18px', borderBottom:'1px solid rgba(212,168,83,.1)', display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0, position:'relative' }}>
            <span style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#f0c878,#a07830)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0, boxShadow:'0 2px 12px rgba(212,168,83,.3)' }}>◆</span>
            <span style={{ fontSize:16, fontWeight:700, color:textBright, letterSpacing:-.3 }}>Open Design</span>
            <span style={{ fontSize:9, fontWeight:600, letterSpacing:.5, textTransform:'uppercase', color:gold, background:'rgba(212,168,83,.12)', border:'1px solid rgba(212,168,83,.2)', padding:'2px 6px', borderRadius:999, marginLeft:'auto' }}>Beta</span>
          </Link>

          {/* Nav */}
          <nav style={{ flex:1, padding:'14px 10px', display:'flex', flexDirection:'column', gap:2 }}>
            <span style={{ marginTop:8, marginBottom:4, padding:'0 8px', fontSize:10, fontWeight:600, letterSpacing:1.5, textTransform:'uppercase', color:textFaint }}>Workspace</span>
            {NAV.map(item => {
              const active = item.href === '/dashboard' ? path === '/dashboard' : path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={`od-nav-item${active ? ' active' : ''}`}
                  style={{ display:'flex', alignItems:'center', gap:11, padding:'9px 12px', borderRadius:10, fontSize:14, fontWeight:500, color:textMuted, textDecoration:'none', border:'1px solid transparent', transition:'background 140ms,color 140ms,border-color 140ms' }}>
                  <span style={{ fontSize:17, width:20, textAlign:'center', flexShrink:0 }}>{item.icon}</span>
                  {item.label}
                  {item.badge && <span style={{ marginLeft:'auto', fontSize:10, fontWeight:700, background:gold, color:'#0a0805', padding:'2px 7px', borderRadius:999 }}>{item.badge}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div style={{ padding:'14px 10px', borderTop:'1px solid rgba(212,168,83,.1)', flexShrink:0 }}>
            <div className="od-user-card" style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, cursor:'pointer', border:'1px solid transparent', transition:'background 140ms,border-color 140ms' }}>
              <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg,${gold},#8a5a20)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#0a0805', flexShrink:0 }}>B</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:textBright, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>banbrahim</div>
                <div style={{ fontSize:11, color:textFaint }}>Admin · Pro plan</div>
              </div>
              <span style={{ fontSize:16, color:textFaint }}>⋯</span>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{ marginLeft:240, flex:1, display:'flex', flexDirection:'column', minHeight:'100vh' }}>
          {/* Topbar */}
          <header style={{ position:'sticky', top:0, zIndex:40, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', height:60, background:'rgba(7,6,5,.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(212,168,83,.1)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontSize:14, color:textMuted, fontWeight:600 }}>Dashboard</span>
              <span style={{ color:textFaint }}>/</span>
              <span style={{ fontSize:14, color:textBright, fontWeight:600 }}>{pageLabel(path)}</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {['🔔','🔍','?'].map((icon, i) => (
                <button key={i} className="od-topbtn" style={{ width:36, height:36, borderRadius:8, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, cursor:'pointer', color:textMuted, transition:'background 140ms,color 140ms,border-color 140ms' }}>{icon}</button>
              ))}
            </div>
          </header>

          <main style={{ flex:1, padding:32 }}>{children}</main>
        </div>
      </div>
    </>
  );
}
