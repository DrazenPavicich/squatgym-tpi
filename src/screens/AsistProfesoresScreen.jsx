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

export function AsistProfesoresScreen({ onNav }){
  const [tab, setTab] = useState('dia');
  const profes = [
    { id:1, nombre:'Martín Acosta', clase:'Musculación', hora:'19:00–20:30', sala:'Sala 2', estado:'pres' },
    { id:2, nombre:'Laura Díaz',    clase:'Zumba',        hora:'20:30–21:30', sala:'Sala 1', estado:'pres' },
    { id:3, nombre:'Carlos Ríos',   clase:'Kickboxing',   hora:'18:00–19:30', sala:'Sala 3', estado:'pend' },
    { id:4, nombre:'Sofía Nielsen', clase:'Yoga',         hora:'17:00–18:30', sala:'Sala 1', estado:'aus' },
  ];
  const [data, setData] = useState(profes);
  const set = (id, v) => setData(d => d.map(p => p.id===id ? {...p, estado:v} : p));
  const mensual = [
    { nombre:'Martín Acosta', horas:42, conf:38, pend:4 },
    { nombre:'Laura Díaz',    horas:28, conf:28, pend:0 },
    { nombre:'Carlos Ríos',   horas:30, conf:24, pend:6 },
    { nombre:'Sofía Nielsen', horas:18, conf:14, pend:4 },
  ];
  return (
    <div className="scr active">
      <PageHeader title="ASISTENCIA DE" accent="PROFESORES" sub="Cronograma del día y resumen mensual (NUEVO v2.0)">
        <Btn variant="s" onClick={()=>onNav('dashboard')}>← Volver</Btn>
      </PageHeader>
      <div style={{display:'flex',gap:'.4rem',marginBottom:'1rem'}}>
        <button className={'btn ' + (tab==='dia'?'btn-p':'btn-s')} onClick={()=>setTab('dia')}>Cronograma del día</button>
        <button className={'btn ' + (tab==='mes'?'btn-p':'btn-s')} onClick={()=>setTab('mes')}>Resumen mensual</button>
      </div>
      {tab==='dia' ? (
        <>
          <div className="g4 mb1">
            <Stat label="Profesores hoy" value={data.length} color="acc"/>
            <Stat label="Presentes" value={data.filter(p=>p.estado==='pres').length} color="ok"/>
            <Stat label="Ausentes" value={data.filter(p=>p.estado==='aus').length} color="err"/>
            <Stat label="Pendientes" value={data.filter(p=>p.estado==='pend').length} color="warn"/>
          </div>
          {data.some(p=>p.estado==='aus') && <Alert variant="err">⚠ Hay ausencias no justificadas — se notificó al Administrador (3.1.7c).</Alert>}
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Profesor</th><th>Clase</th><th>Horario</th><th>Sala</th><th>Estado</th><th>Acción</th></tr></thead>
              <tbody>
                {data.map(p=>(
                  <tr key={p.id}>
                    <td><strong>{p.nombre}</strong></td>
                    <td>{p.clase}</td>
                    <td>{p.hora}</td>
                    <td>{p.sala}</td>
                    <td>
                      {p.estado==='pres' && <Badge variant="ok">✓ Presente</Badge>}
                      {p.estado==='aus' && <Badge variant="err">✗ Ausente</Badge>}
                      {p.estado==='pend' && <Badge variant="warn">Pendiente</Badge>}
                    </td>
                    <td>
                      <button className="ab ab-e" onClick={()=>set(p.id,'pres')}>✓ Presente</button>
                      <button className="ab ab-d" onClick={()=>set(p.id,'aus')}>✗ Ausente</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="g3 mb1">
            <Stat label="Total horas" value={mensual.reduce((s,p)=>s+p.horas,0)+'h'} color="acc"/>
            <Stat label="Confirmadas" value={mensual.reduce((s,p)=>s+p.conf,0)+'h'} color="ok"/>
            <Stat label="Pendientes" value={mensual.reduce((s,p)=>s+p.pend,0)+'h'} color="warn"/>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Profesor</th><th>Total</th><th>Confirmadas</th><th>Pendientes</th></tr></thead>
              <tbody>
                {mensual.map((p,i)=>(
                  <tr key={i}>
                    <td><strong>{p.nombre}</strong></td>
                    <td>{p.horas}h</td>
                    <td><Badge variant="ok">{p.conf}h</Badge></td>
                    <td>{p.pend>0 ? <Badge variant="warn">{p.pend}h</Badge> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// Baja con motivo (alumno o clase)
