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

export function RegistroAsistenciaScreen({ onNav, role }){
  const clasesDisp = role === 'profesor' ? CLASES.filter(x => x.prof === 'Martín Acosta') : CLASES;
  const [claseId, setClaseId] = useState(clasesDisp[0]?.id || 1);
  const [estados, setEstados] = useState({});
  const c = clasesDisp.find(x => x.id === Number(claseId)) || clasesDisp[0];
  const lista = ALUMNOS.slice(0, 5);
  const set = (id,v) => setEstados(e => ({...e, [id]: v}));
  const presentes = Object.values(estados).filter(v=>v==='P').length;
  const ausentes = Object.values(estados).filter(v=>v==='A').length;
  return (
    <div className="scr active">
      <PageHeader title="REGISTRO DE" accent="ASISTENCIA" sub={`${c?.nombre} · ${c?.dias?c.dias.join(', '):c?.dia} ${c?.hora}`}>
        <Btn variant="s" onClick={()=>onNav(role==='profesor'?'clases':'dashboard')}>← Volver</Btn>
        <Btn variant="p" onClick={()=>notify(`Asistencia guardada: ${presentes} presentes, ${ausentes} ausentes`, 'ok')}>Guardar</Btn>
      </PageHeader>
      <div className="tbl-wrap">
        <div className="tbl-top">
          <div className="srch">
            <select value={claseId} onChange={e=>setClaseId(e.target.value)}>
              {clasesDisp.map(x => <option key={x.id} value={x.id}>{x.nombre} · {x.dias?x.dias.join(', '):x.dia} {x.hora}</option>)}
            </select>
          </div>
          <div style={{display:'flex',gap:'.6rem'}}>
            <Badge variant="ok">Presentes: {presentes}</Badge>
            <Badge variant="err">Ausentes: {ausentes}</Badge>
          </div>
        </div>
        <table>
          <thead><tr><th>#</th><th>Alumno</th><th>Estado</th><th>Asistencia</th></tr></thead>
          <tbody>
            {lista.map((a,i)=>{
              const bloqueado = a.estado==='Deudor';
              return (
                <tr key={a.id}>
                  <td>{String(i+1).padStart(2,'0')}</td>
                  <td><strong>{a.ap}, {a.no}</strong></td>
                  <td><Badge variant={a.estado==='Habilitada'?'ok':'err'}>{a.estado}</Badge></td>
                  <td>
                    {bloqueado ? (
                      <Badge variant="err">🔒 Bloqueado por deuda</Badge>
                    ) : (
                      <>
                        <button className={'ab ' + (estados[a.id]==='P'?'ab-e':'ab-v')} onClick={()=>set(a.id,'P')}>✓ Presente</button>
                        <button className={'ab ' + (estados[a.id]==='A'?'ab-d':'ab-v')} onClick={()=>set(a.id,'A')}>✗ Ausente</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Alert variant="info">El sistema restringe el ingreso de alumnos no habilitados (3.1.12c).</Alert>
    </div>
  );
}

// Asistencia de Profesores — NUEVO v2.0 (3.1.7 / 3.1.12) — Encargado y Secretaria
