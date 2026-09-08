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

export function FormClaseScreen({ onNav, clase }){
  const TODOS_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const PROFES = ['Martín Acosta', 'Laura Díaz', 'Carlos Ríos', 'Sofía Nielsen'];

  const [nombre, setNombre]       = useState(clase?.nombre || '');
  const [prof,   setProf]         = useState(clase?.prof   || PROFES[0]);
  const [diasSel, setDiasSel]     = useState(clase?.dias || (clase?.dia ? [clase.dia] : []));
  const [hora,   setHora]         = useState(clase?.hora || '');
  const [fin,    setFin]          = useState(clase?.fin  || '');
  const [sala,   setSala]         = useState(clase?.sala || 'Sala 1');
  const [sede,   setSede]         = useState(clase?.sede || 'Centro');
  const [capacidad, setCapacidad] = useState(clase?.capacidad || 20);
  const [forzar, setForzar]       = useState(false);

  const toggleDia = (d) => {
    setDiasSel(prev => {
      const nuevo = prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d];
      return nuevo.sort((a,b) => TODOS_DIAS.indexOf(a) - TODOS_DIAS.indexOf(b));
    });
  };

  // Detección en vivo (CU GC-08)
  const conflictos = detectarSuperposicion(
    { nombre, prof, dias: diasSel, hora, fin, sala, sede, capacidad },
    clase?.id
  );
  const conflictosSala = conflictos.filter(c => c.tipo === 'Sala');
  const conflictosProf = conflictos.filter(c => c.tipo === 'Profesor');
  const datosCompletos = nombre && diasSel.length > 0 && hora && fin && sala;

  const guardar = () => {
    if (conflictos.length > 0 && !forzar) {
      notify('No se puede guardar: hay conflictos sin resolver. Revisá las advertencias o tildá "Forzar guardado".', 'err');
      return;
    }
    notify(conflictos.length > 0
      ? `Clase guardada con conflictos forzados — los responsables fueron notificados.`
      : 'Clase guardada correctamente');
    onNav('clases');
  };

  return (
    <div className="scr active animate-fade">
      <PageHeader title={clase ? 'EDITAR' : 'ALTA DE'} accent="CLASE" sub="Definir horarios, profesor y sala">
        <Btn variant="s" onClick={()=>onNav('clases')}>← Volver</Btn>
      </PageHeader>

      <FormSection title="Datos de la clase">
        <div className="fr">
          <FormField label="Nombre">
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Musculación"/>
          </FormField>
          <FormField label="Profesor">
            <select value={prof} onChange={e=>setProf(e.target.value)}>
              {PROFES.map(p => <option key={p}>{p}</option>)}
            </select>
          </FormField>
        </div>
        
        <div style={{marginBottom:'0.9rem'}}>
          <FormField label="Días de la semana (Selección múltiple)">
            <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem', marginTop:'0.3rem'}}>
              {TODOS_DIAS.map(d => {
                const activo = diasSel.includes(d);
                return (
                  <label key={d} style={{display:'flex', alignItems:'center', gap:'0.4rem', textTransform:'none', letterSpacing:'normal', fontSize:'0.85rem', color:activo?'var(--sg-acc)':'var(--sg-txt)', cursor:'pointer', background:'var(--sg-sur2)', padding:'0.4rem 0.7rem', borderRadius:'6px', border:activo?'1px solid var(--sg-acc)':'1px solid var(--sg-bor)', transition:'all 0.15s'}}>
                    <input type="checkbox" checked={activo} onChange={()=>toggleDia(d)} style={{width:'auto', margin:0, cursor:'pointer'}}/>
                    {d}
                  </label>
                );
              })}
            </div>
            {diasSel.length === 0 && <span style={{color:'var(--sg-err)', fontSize:'0.75rem', display:'block', marginTop:'0.4rem'}}>⚠ Debe seleccionar al menos un día para el cronograma.</span>}
          </FormField>
        </div>

        <div className="fr3">
          <FormField label="Hora inicio"><input type="time" value={hora} onChange={e=>setHora(e.target.value)}/></FormField>
          <FormField label="Hora fin"><input type="time" value={fin} onChange={e=>setFin(e.target.value)}/></FormField>
          <FormField label="Sala">
            <select value={sala} onChange={e=>setSala(e.target.value)}>
              <option>Sala 1</option><option>Sala 2</option><option>Sala 3</option>
            </select>
          </FormField>
        </div>
        <div className="fr3">
          <FormField label="Sede">
            <select value={sede} onChange={e=>setSede(e.target.value)}>
              <option>Centro</option><option>Norte</option>
            </select>
          </FormField>
          <FormField label="Capacidad"><input type="number" value={capacidad} onChange={e=>setCapacidad(Number(e.target.value)||0)}/></FormField>
        </div>
      </FormSection>

      {/* CU GC-08: Validación de superposición en tiempo real */}
      {datosCompletos && conflictos.length === 0 && (
        <Alert variant="ok">✓ Sin conflictos de horario — la clase no se superpone con sala ni profesor de otra clase existente.</Alert>
      )}

      {conflictos.length > 0 && (
        <div className="fsec" style={{borderLeft:'3px solid var(--sg-err)'}}>
          <div className="fsec-t" style={{color:'var(--sg-err)'}}>
            ⚡ Conflicto detectado — Superposición de recursos (CU GC-08)
          </div>
          <div style={{fontSize:'.85rem',color:'#C9C9CF',marginBottom:'.8rem'}}>
            La configuración actual entra en conflicto con clases ya programadas. Revisá los siguientes puntos antes de guardar:
          </div>

          {conflictosSala.length > 0 && (
            <div style={{marginBottom:'1rem'}}>
              <div style={{fontSize:'.78rem',fontWeight:700,color:'var(--sg-warn)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'.5rem'}}>🏢 Conflicto de sala</div>
              {conflictosSala.map((cf, i) => (
                <div key={i} className="alert al-warn" style={{marginBottom:'.4rem'}}>
                  La <strong>{cf.recurso}</strong> ya está ocupada los días <strong>{cf.dias.join(', ')}</strong> de <strong>{cf.con.hora}</strong> a <strong>{cf.con.fin}</strong> por la clase <strong>{cf.con.nombre}</strong> (Prof. {cf.con.prof}).
                </div>
              ))}
            </div>
          )}

          {conflictosProf.length > 0 && (
            <div style={{marginBottom:'1rem'}}>
              <div style={{fontSize:'.78rem',fontWeight:700,color:'var(--sg-err)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'.5rem'}}>🧑‍🏫 Conflicto de profesor</div>
              {conflictosProf.map((cf, i) => (
                <div key={i} className="alert al-err" style={{marginBottom:'.4rem'}}>
                  El profesor <strong>{cf.recurso}</strong> ya tiene asignada la clase <strong>{cf.con.nombre}</strong> los días <strong>{cf.dias.join(', ')}</strong> de <strong>{cf.con.hora}</strong> a <strong>{cf.con.fin}</strong> en {cf.con.sede} ({cf.con.sala}). Un docente no puede dar dos clases en simultáneo.
                </div>
              ))}
            </div>
          )}

          <div style={{padding:'.7rem .9rem',background:'var(--sg-sur2)',borderRadius:'6px',marginTop:'.5rem'}}>
            <div style={{fontSize:'.78rem',color:'var(--sg-mut)',fontWeight:600,marginBottom:'.4rem'}}>SUGERENCIAS:</div>
            <ul style={{fontSize:'.83rem',color:'#C9C9CF',marginLeft:'1.2rem',lineHeight:1.7}}>
              {conflictosSala.length>0 && <li>Cambiá la <strong>sala</strong> o ajustá el <strong>horario</strong> para que no se superponga.</li>}
              {conflictosProf.length>0 && <li>Asigná un <strong>profesor distinto</strong> o reprogramá la clase a otro día/horario.</li>}
              <li>Modificá los <strong>días</strong> seleccionados para evitar el solapamiento.</li>
            </ul>
          </div>

          <label style={{display:'flex',alignItems:'center',gap:'.5rem',marginTop:'1rem',padding:'.6rem .8rem',background:'rgba(232,52,58,.06)',borderRadius:'6px',border:'1px dashed rgba(232,52,58,.3)',textTransform:'none',letterSpacing:'normal',fontSize:'.85rem',fontWeight:400,color:'var(--sg-err)'}}>
            <input type="checkbox" checked={forzar} onChange={e=>setForzar(e.target.checked)} style={{width:'auto'}}/>
            Forzar guardado a pesar de los conflictos (requiere supervisión administrativa)
          </label>
        </div>
      )}

      <div className="factions">
        <Btn variant="s" onClick={()=>onNav('clases')}>Cancelar</Btn>
        <button
          className="btn btn-p"
          disabled={!datosCompletos || (conflictos.length > 0 && !forzar)}
          onClick={guardar}
        >
          {conflictos.length > 0 && forzar ? '⚠ Guardar con conflictos' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}

// Ficha Clase — con inscriptos
