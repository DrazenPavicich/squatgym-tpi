import React, { useState } from 'react';
import { ALUMNOS, CLASES, SEDES, PROMOS, REEMPLAZOS, INASIST_FREC, TRAZA_CU } from '../data/mockData.js';
import { QA_ICO, ROLE_SVG } from '../data/icons.jsx';
import { notify, printPage, downloadCSV, detectarSuperposicion } from '../utils/helpers.js';
import Btn from '../components/Btn.jsx';
import Badge from '../components/Badge.jsx';
import Stat from '../components/Stat.jsx';
import Alert from '../components/Alert.jsx';
import QuickAction from '../components/QuickAction.jsx';
import FormField from '../components/FormField.jsx';
import FormSection from '../components/FormSection.jsx';
import { PageHeader } from '../components/PageHeader.jsx';

export function LoginScreen({ onLogin }){
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if(user && pass) {
      // Para el prototipo, si escriben un rol válido los loguea con ese rol, si no, por defecto admin
      const r = ['admin','encargado','secretaria','profesor','alumno'].includes(user.toLowerCase()) ? user.toLowerCase() : 'admin';
      onLogin(r, 'aldia');
    }
  };

  return (
    <div id="login-screen">
      <div className="login-l">
        <div className="login-logo">SQUAT<span>GYM</span></div>
        <div className="login-tag">Sistema Integrado de Gestión</div>
        <div className="login-form">
          <div className="login-t">Iniciar Sesión</div>
          <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'0.8rem', marginBottom:'1rem'}}>
            <input type="text" placeholder="Usuario o Correo electrónico" value={user} onChange={e=>setUser(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} required />
            <button className="btn btn-p" type="submit" style={{width:'100%',justifyContent:'center',padding:'.9rem',fontSize:'.9rem', marginTop:'0.5rem'}}>▶ INGRESAR</button>
          </form>
          <div style={{marginTop:'1.7rem',paddingTop:'1.3rem',borderTop:'1px solid rgba(255,255,255,.09)'}}>
            <div style={{fontSize:'.78rem',fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'.8rem',color:'var(--sg-acc)'}}>Acceso rápido (Demo)</div>
            <div className="role-btns">
              {['admin','encargado','secretaria','profesor','alumno'].map(r => (
                <button type="button" key={r} className="role-btn" onClick={()=>onLogin(r, 'aldia')}>
                  <span className="role-ico">{ROLE_SVG[r]}</span>
                  <span>{r[0].toUpperCase()+r.slice(1)}</span>
                </button>
              ))}
            </div>
            <div style={{fontSize:'.7rem',fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',marginTop:'1.1rem',marginBottom:'.5rem',color:'var(--sg-warn)'}}>Perfiles especiales</div>
            <div className="role-btns" style={{gridTemplateColumns:'1fr'}}>
              <button type="button" className="role-btn" onClick={()=>onLogin('alumno', 'deudor')} style={{flexDirection:'row', justifyContent:'flex-start', gap:'.6rem', borderColor:'rgba(232,52,58,.35)'}}>
                <span className="role-ico" style={{borderColor:'rgba(232,52,58,.4)', color:'var(--sg-err)', background:'rgba(232,52,58,.08)'}}>{ROLE_SVG.alumno}</span>
                <span style={{textAlign:'left', flex:1}}>Alumno · Cuota Vencida<br/><span style={{fontSize:'.62rem', color:'var(--sg-mut)', letterSpacing:'.04em', textTransform:'none', fontWeight:500}}>Carlos López — ver restricciones por deuda</span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="login-r">
        <div className="login-r-num">SG</div>
        <div style={{position:'relative',zIndex:2,textAlign:'center',color:'#FFFFFF'}}>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:'3rem',lineHeight:1,letterSpacing:'.04em'}}>GESTIÓN<br/>INTEGRAL</div>
        </div>
      </div>
    </div>
  );
}

