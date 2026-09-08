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

export function ClasesScreen({ role, onNav, onSelect }){
  const [dia, setDia] = useState('');
  const [sede, setSede] = useState('');
  const [vista, setVista] = useState('matriz');
  // Permisos: solo Admin (acceso completo) crea/edita/elimina clases (3.1.17 — Encargado y Secretaria solo VER, Profesor solo SUS clases)
  const puedeABM = role === 'admin';
  // Profesor ve solo sus clases (3.1.19a)
  const base = role === 'profesor' ? CLASES.filter(c => c.prof === 'Martín Acosta') : CLASES;
  const filtered = base.filter(c => (!dia || (c.dias ? c.dias.includes(dia) : c.dia === dia)) && (!sede || c.sede === sede));

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const horasUnicas = Array.from(new Set(filtered.map(c => c.hora))).sort();

  return (
    <div className="scr active animate-fade">
      <PageHeader title={role==='profesor' ? 'MIS' : 'CLASES Y'} accent={role==='profesor' ? 'CLASES' : 'CRONOGRAMA'} sub={role==='profesor' ? 'Solo tus clases asignadas' : 'Horarios semanales'}>
        {puedeABM && <Btn variant="p" onClick={()=>onNav('form-clase')}>+ Nueva Clase</Btn>}
      </PageHeader>
      <div className="g4 mb1">
        <Stat label="Clases Activas" value="5" color="acc"/>
        <Stat label="Hoy" value="4" color="ok"/>
        <Stat label="Profesores" value="4" color="warn"/>
        <Stat label="Cupo Total" value="98" color="acc"/>
      </div>
      <div className="tbl-top" style={{border:'none', padding:'0 0 1.5rem 0', background:'transparent'}}>
        <div className="srch">
          <select value={dia} onChange={e=>setDia(e.target.value)} style={{minWidth:'180px'}}>
            <option value="">Todos los días</option>
            <option>Lunes</option><option>Martes</option><option>Miércoles</option><option>Jueves</option><option>Viernes</option>
          </select>
          <select value={sede} onChange={e=>setSede(e.target.value)} style={{minWidth:'180px'}}>
            <option value="">Todas las sedes</option>
            <option>Centro</option><option>Norte</option>
          </select>
        </div>
        <div className="srch" style={{background:'var(--sg-sur2)', padding:'0.3rem', borderRadius:'8px', display:'flex', gap:'0.2rem'}}>
          <button className="btn-out" style={{border:'none', borderRadius:'6px', background:vista==='matriz'?'rgba(255,107,0,0.15)':'transparent', color:vista==='matriz'?'var(--sg-acc)':'var(--sg-mut)'}} onClick={()=>setVista('matriz')}>Matriz</button>
          <button className="btn-out" style={{border:'none', borderRadius:'6px', background:vista==='tarjetas'?'rgba(255,107,0,0.15)':'transparent', color:vista==='tarjetas'?'var(--sg-acc)':'var(--sg-mut)'}} onClick={()=>setVista('tarjetas')}>Tarjetas</button>
        </div>
      </div>
      
      {vista === 'tarjetas' ? (
        <div className="card-grid">
          {filtered.map((c,i) => {
            const pct = Math.round(c.inscriptos / c.capacidad * 100);
            return (
              <div key={c.id} className="class-card">
                <div className="cc-top">
                  <div>
                    <div className="cc-title">{c.nombre}</div>
                    <div className="cc-prof">Prof. {c.prof}</div>
                  </div>
                  <Badge variant={pct>=90?'err':pct>=70?'warn':'ok'}>{c.inscriptos}/{c.capacidad} Cupos</Badge>
                </div>
                <div className="cc-info">
                  <div className="cc-info-item">📅 {c.dias ? c.dias.join(', ') : c.dia}</div>
                  <div className="cc-info-item">⏰ {c.hora} – {c.fin}</div>
                </div>
                <div className="cc-info">
                  <div className="cc-info-item">📍 {c.sede} — {c.sala}</div>
                </div>
                <div className="cc-bot">
                  <button className="btn-s" style={{fontSize:'0.7rem', padding:'0.4rem 0.8rem'}} onClick={()=>{ onSelect && onSelect(c); onNav('ficha-clase'); }}>Detalles</button>
                  <div style={{display:'flex', gap:'0.4rem'}}>
                    {puedeABM && <button className="ab ab-e" onClick={()=>{ onSelect && onSelect(c); onNav('form-clase'); }}>✎</button>}
                    {puedeABM && <button className="ab ab-d" onClick={()=>{ onSelect && onSelect(c); onNav('baja-clase'); }}>✖</button>}
                    {role==='profesor' && <button className="btn-ok" style={{fontSize:'0.7rem', padding:'0.4rem 0.8rem', border:'none', borderRadius:'4px', cursor:'pointer'}} onClick={()=>onNav('asistencia')}>Asistencia</button>}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length===0 && <div style={{gridColumn:'1/-1', textAlign:'center', padding:'3rem', color:'var(--sg-mut)'}}>No hay clases para los filtros seleccionados.</div>}
        </div>
      ) : (
        <div className="matrix-wrap">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Horario</th>
                {diasSemana.map(d => <th key={d}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {horasUnicas.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign:'center', padding:'3rem', color:'var(--sg-mut)'}}>No hay clases para los filtros seleccionados.</td></tr>
              ) : horasUnicas.map(hora => (
                <tr key={hora}>
                  <td className="time-col">{hora}</td>
                  {diasSemana.map(d => {
                    const clasesCell = filtered.filter(c =>
                      c.hora === hora &&
                      (c.dias ? c.dias.includes(d) : c.dia === d) &&
                      (!dia || d === dia)
                    );
                    return (
                      <td key={d}>
                        {clasesCell.map(c => (
                          <div key={c.id} className="matrix-cell-clase" onClick={()=>{ onSelect && onSelect(c); onNav('ficha-clase'); }}>
                            <span className="matrix-cell-t">{c.nombre}</span>
                            <span className="matrix-cell-p">{c.prof} • {c.sala}</span>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

