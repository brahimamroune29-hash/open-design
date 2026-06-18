'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { sanitize, limits } from '@/lib/sanitize';

const gold='#d4a853',goldLight='#f0c878',bright='#f4f0e8',muted='#8a8680',faint='#4a4744';
const goldText={background:`linear-gradient(135deg,${goldLight},${gold})`,WebkitBackgroundClip:'text' as const,WebkitTextFillColor:'transparent' as const,backgroundClip:'text' as const};
const card={background:'#131210',border:'1px solid rgba(212,168,83,.13)',borderRadius:16,overflow:'hidden' as const};
const input:CSSProperties={background:'rgba(255,255,255,.04)',border:'1px solid rgba(212,168,83,.15)',borderRadius:10,padding:'10px 14px',fontSize:14,color:bright,outline:'none',width:'100%',boxSizing:'border-box',fontFamily:'inherit'};

const NAV=[{id:'profile',icon:'◉',label:'Profile'},{id:'appearance',icon:'🎨',label:'Appearance'},{id:'notifications',icon:'🔔',label:'Notifications'},{id:'security',icon:'🛡',label:'Security'},{id:'danger',icon:'⚠',label:'Danger Zone'}];
const THEMES=[
  {id:'dark-gold',label:'Dark Gold',bg:'linear-gradient(135deg,#0a0805,#1a1512)',accent:gold,textColor:'#f4f0e8',border:'rgba(212,168,83,.3)'},
  {id:'dark-blue',label:'Dark Blue',bg:'linear-gradient(135deg,#06080f,#0f1528)',accent:'#6b8fe8',textColor:'#e8edf8',border:'rgba(107,143,232,.3)'},
  {id:'light',    label:'Light',    bg:'linear-gradient(135deg,#faf9f7,#f0ede8)',accent:'#c96442',textColor:'#1a1916',border:'#e1e5eb'},
];
const NOTIFS=[
  {id:'runs',  label:'Run completions',desc:'Get notified when a design run finishes'},
  {id:'collab',label:'Collaboration',   desc:'When someone mentions you or shares a project'},
  {id:'upd',   label:'Product updates', desc:'New features, releases and changelogs'},
  {id:'tips',  label:'Design tips',     desc:'Weekly curated design inspiration'},
];
const DANGER=[
  {label:'Export all data',   desc:'Download a full archive of your projects and settings.',action:'Export'},
  {label:'Clear run history', desc:'Permanently delete all past run logs and artifacts.',   action:'Clear'},
  {label:'Delete account',    desc:'Remove your account and all data. Irreversible.',        action:'Delete'},
];

function Toggle({checked,onChange}:{checked:boolean,onChange:()=>void}){
  return(
    <label style={{position:'relative',width:44,height:24,flexShrink:0,cursor:'pointer',display:'block'}}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{display:'none'}}/>
      <div style={{position:'absolute',inset:0,borderRadius:999,background:checked?`linear-gradient(90deg,${gold},${goldLight})`:'rgba(255,255,255,.1)',transition:'background 200ms',boxShadow:checked?`0 0 10px rgba(212,168,83,.35)`:undefined}}/>
      <div style={{position:'absolute',top:3,left:3,width:18,height:18,borderRadius:'50%',background:'#f4f0e8',transition:'transform 200ms cubic-bezier(.23,1,.32,1)',transform:checked?'translateX(20px)':'translateX(0)'}}/>
    </label>
  );
}

export default function SettingsPage(){
  const[section,setSection]=useState('profile');
  const[theme,setTheme]=useState('dark-gold');
  const[notifs,setNotifs]=useState({runs:true,collab:true,upd:false,tips:false});
  const[saved,setSaved]=useState(false);
  const[firstName,setFirstName]=useState('Ibrahim');
  const[lastName,setLastName]=useState('Al-Ban');
  const[email,setEmail]=useState('banbrahim112233@gmail.com');
  const[role,setRole]=useState('Lead Product Designer');

  const save=()=>{
    // Sanitize all profile fields before they would be sent to an API
    const _payload = {
      firstName: sanitize(firstName, limits.name),
      lastName:  sanitize(lastName,  limits.name),
      email:     sanitize(email,     limits.email),
      role:      sanitize(role,      limits.name),
    };
    // _payload is ready to POST to /api/profile — sanitized & length-capped
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  return(
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .od-sn:hover{background:rgba(255,255,255,.04)!important;color:${bright}!important} .od-sn.active{background:rgba(212,168,83,.1)!important;color:${gold}!important;border-color:rgba(212,168,83,.2)!important;font-weight:600!important}`}</style>
      <div style={{display:'grid',gridTemplateColumns:'210px 1fr',gap:24,alignItems:'start',animation:'fadeUp 400ms cubic-bezier(.23,1,.32,1) both'}}>

        {/* Sidebar */}
        <div style={{...card,padding:8}}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setSection(n.id)} className={`od-sn${section===n.id?' active':''}`}
              style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:8,fontSize:14,color:muted,cursor:'pointer',border:'1px solid transparent',transition:'background 120ms,color 120ms,border-color 120ms',width:'100%',background:'none',textAlign:'left',fontFamily:'inherit'}}>
              <span style={{fontSize:16,flexShrink:0}}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div style={{display:'flex',flexDirection:'column',gap:20}}>

          {/* Profile */}
          {section==='profile'&&(
            <div style={card}>
              <div style={{padding:'20px 24px 16px',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{fontSize:15,fontWeight:700,color:bright,marginBottom:2}}>Profile Information</div>
                <div style={{fontSize:12,color:muted}}>Update your personal details and public profile</div>
              </div>
              <div style={{padding:'20px 24px'}}>
                <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
                  <div style={{width:64,height:64,borderRadius:16,background:`linear-gradient(135deg,${gold},#8a5a20)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,color:'#0a0805',flexShrink:0,border:`2px solid rgba(212,168,83,.3)`,boxShadow:'0 0 20px rgba(212,168,83,.2)'}}>B</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:16,fontWeight:700,color:bright,marginBottom:2}}>banbrahim</div>
                    <div style={{fontSize:13,color:muted}}>Admin · Pro Plan</div>
                  </div>
                  <button style={{fontSize:13,fontWeight:500,color:gold,background:'rgba(212,168,83,.1)',border:'1px solid rgba(212,168,83,.2)',cursor:'pointer',padding:'7px 14px',borderRadius:8}}>Change avatar</button>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:muted,display:'block',marginBottom:6}}>First Name</label>
                    <input value={firstName} onChange={e=>setFirstName(e.target.value)} maxLength={limits.name.maxLength} autoComplete="given-name" style={input}/>
                  </div>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:muted,display:'block',marginBottom:6}}>Last Name</label>
                    <input value={lastName} onChange={e=>setLastName(e.target.value)} maxLength={limits.name.maxLength} autoComplete="family-name" style={input}/>
                  </div>
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:12,fontWeight:600,color:muted,display:'block',marginBottom:6}}>Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={limits.email.maxLength} autoComplete="email" style={input}/>
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:12,fontWeight:600,color:muted,display:'block',marginBottom:6}}>Role</label>
                  <input value={role} onChange={e=>setRole(e.target.value)} maxLength={limits.name.maxLength} autoComplete="organization-title" style={input}/>
                </div>
                <div style={{display:'flex',justifyContent:'flex-end',gap:10,paddingTop:16,borderTop:'1px solid rgba(255,255,255,.04)',marginTop:8}}>
                  <button style={{fontSize:14,fontWeight:500,color:muted,background:'none',border:'1px solid rgba(255,255,255,.1)',cursor:'pointer',padding:'9px 20px',borderRadius:9,fontFamily:'inherit'}}>Cancel</button>
                  <button onClick={save} style={{fontSize:14,fontWeight:600,color:'#0a0805',background:`linear-gradient(135deg,${goldLight},${gold})`,border:'none',cursor:'pointer',padding:'10px 24px',borderRadius:9,boxShadow:'0 2px 12px rgba(212,168,83,.28)',fontFamily:'inherit'}}>{saved?'✓ Saved!':'Save Changes'}</button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {section==='appearance'&&(
            <div style={card}>
              <div style={{padding:'20px 24px 16px',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{fontSize:15,fontWeight:700,color:bright,marginBottom:2}}>Theme</div>
                <div style={{fontSize:12,color:muted}}>Choose your preferred color scheme</div>
              </div>
              <div style={{padding:'20px 24px'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
                  {THEMES.map(t=>(
                    <div key={t.id} onClick={()=>setTheme(t.id)} style={{borderRadius:12,border:`2px solid ${theme===t.id?gold:t.border}`,overflow:'hidden',cursor:'pointer',aspectRatio:'16/10',position:'relative',transition:'border-color 140ms,transform 200ms',transform:'none',boxShadow:theme===t.id?`0 0 16px rgba(212,168,83,.3)`:undefined,background:t.bg}}>
                      <div style={{position:'absolute',inset:0,padding:8,display:'flex',flexDirection:'column',gap:5}}>
                        <div style={{height:6,borderRadius:3,background:t.accent,width:'50%',opacity:.8}}/>
                        <div style={{height:4,borderRadius:3,background:t.textColor,width:'70%',opacity:.3}}/>
                      </div>
                      {theme===t.id&&<div style={{position:'absolute',bottom:8,right:8,width:18,height:18,borderRadius:'50%',background:gold,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#0a0805',fontWeight:700}}>✓</div>}
                      <span style={{position:'absolute',bottom:8,left:10,fontSize:11,fontWeight:600,color:t.textColor,opacity:.7}}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {section==='notifications'&&(
            <div style={card}>
              <div style={{padding:'20px 24px 16px',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{fontSize:15,fontWeight:700,color:bright,marginBottom:2}}>Notification Preferences</div>
                <div style={{fontSize:12,color:muted}}>Choose which updates you want to receive</div>
              </div>
              <div style={{padding:'20px 24px'}}>
                {NOTIFS.map(n=>(
                  <div key={n.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                    <div style={{flex:1,paddingRight:16}}>
                      <div style={{fontSize:14,fontWeight:500,color:bright,marginBottom:2}}>{n.label}</div>
                      <div style={{fontSize:12,color:muted}}>{n.desc}</div>
                    </div>
                    <Toggle checked={notifs[n.id as keyof typeof notifs]} onChange={()=>setNotifs(p=>({...p,[n.id]:!p[n.id as keyof typeof notifs]}))}/>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {section==='security'&&(
            <div style={card}>
              <div style={{padding:'20px 24px 16px',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{fontSize:15,fontWeight:700,color:bright,marginBottom:2}}>Change Password</div>
                <div style={{fontSize:12,color:muted}}>Use a strong unique password</div>
              </div>
              <div style={{padding:'20px 24px'}}>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:12,fontWeight:600,color:muted,display:'block',marginBottom:6}}>Current Password</label>
                  <input type="password" placeholder="••••••••••" maxLength={limits.password.maxLength} autoComplete="current-password" style={input}/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:muted,display:'block',marginBottom:6}}>New Password</label>
                    <input type="password" placeholder="Min 12 characters" maxLength={limits.password.maxLength} autoComplete="new-password" style={input}/>
                  </div>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:muted,display:'block',marginBottom:6}}>Confirm</label>
                    <input type="password" placeholder="Repeat password" maxLength={limits.password.maxLength} autoComplete="new-password" style={input}/>
                  </div>
                </div>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <button onClick={save} style={{fontSize:14,fontWeight:600,color:'#0a0805',background:`linear-gradient(135deg,${goldLight},${gold})`,border:'none',cursor:'pointer',padding:'10px 24px',borderRadius:9,fontFamily:'inherit'}}>{saved?'✓ Updated!':'Update Password'}</button>
                </div>
              </div>
            </div>
          )}

          {/* Danger */}
          {section==='danger'&&(
            <div style={{...card,border:'1px solid rgba(224,107,101,.25)'}}>
              <div style={{padding:'20px 24px 16px',borderBottom:'1px solid rgba(224,107,101,.15)'}}>
                <div style={{fontSize:15,fontWeight:700,color:'#e06b65',marginBottom:2}}>⚠ Danger Zone</div>
                <div style={{fontSize:12,color:muted}}>These actions are permanent and cannot be undone</div>
              </div>
              <div style={{padding:'0 24px'}}>
                {DANGER.map((d,i)=>(
                  <div key={d.label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 0',borderBottom: i<DANGER.length-1?'1px solid rgba(224,107,101,.08)':'none',gap:16}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:500,color:bright,marginBottom:2}}>{d.label}</div>
                      <div style={{fontSize:12,color:muted}}>{d.desc}</div>
                    </div>
                    <button style={{fontSize:13,fontWeight:600,color:'#e06b65',background:'rgba(224,107,101,.1)',border:'1px solid rgba(224,107,101,.25)',cursor:'pointer',padding:'7px 14px',borderRadius:8,flexShrink:0,fontFamily:'inherit'}}>{d.action}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
