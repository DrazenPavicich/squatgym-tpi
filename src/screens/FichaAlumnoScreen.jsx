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

export function FichaAlumnoScreen({ onNav, alumno, role }){
  const a = alumno || ALUMNOS[0];
  const puedeEditar = role === 'admin' || role === 'secretaria';
  const puedeBorrar = role === 'admin';
  return (
    <div className="scr active">
      <PageHeader title="FICHA DEL" accent="ALUMNO" sub={`${a.ap}, ${a.no} · ${a.dni}`}>
        <Btn variant="s" onClick={()=>onNav('alumnos')}>← Volver</Btn>
        {puedeEditar && <Btn variant="p" onClick={()=>onNav('form-alumno')}>Editar</Btn>}
      </PageHeader>
      <div className="profile-box">
        <div className="profile-avatar">{a.no[0]}{a.ap[0]}</div>
        <div style={{flex:1}}>
          <div className="profile-name">{a.ap}, {a.no}</div>
          <div className="profile-sub">DNI {a.dni} · Plan {a.plan} · Sede {a.sede}</div>
          <div style={{marginTop:'.4rem'}}><Badge variant={a.estado==='Habilitada'?'ok':a.estado==='Deudor'?'err':'mut'}>{a.estado}</Badge></div>
        </div>
      </div>
      <div className="g2">
        <div className="fsec">
          <div className="fsec-t">Resumen</div>
          <div className="dr"><span className="dr-lbl">Vto. cuota</span><span className="dr-val">{a.vto}</span></div>
          <div className="dr"><span className="dr-lbl">Sede</span><span className="dr-val">{a.sede}</span></div>
          <div className="dr"><span className="dr-lbl">Plan</span><span className="dr-val">{a.plan}</span></div>
          <div className="dr"><span className="dr-lbl">Decl. Jurada</span><span className="dr-val c-ok">Vigente</span></div>
        </div>
        <div className="fsec">
          <div className="fsec-t">Accesos</div>
          <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
            <Btn variant="s" onClick={()=>onNav('estado-cuenta')}>💳 Estado de cuenta</Btn>
            <Btn variant="s" onClick={()=>onNav('historial-asistencia')}>✅ Historial de asistencia</Btn>
            {puedeBorrar && <Btn variant="d" onClick={()=>onNav('baja-alumno')}>Dar de baja</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Estado de Cuenta detallado (3.1.13 / 3.1.14)
