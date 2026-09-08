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

export function BajaConfirmScreen({ onNav, tipo='alumno', item }){
  const [motivo, setMotivo] = useState('');
  const label = tipo==='alumno'
    ? (item ? `${item.ap}, ${item.no}` : 'el alumno')
    : (item ? item.nombre : 'la clase');
  return (
    <div className="scr active">
      <div className="confirm-box">
        <div className="confirm-title">⚠ Confirmar baja de {tipo}</div>
        <p className="text-mut text-sm" style={{marginBottom:'1rem'}}>
          Vas a dar de baja {tipo==='alumno'?'al alumno':'la clase'} <strong>{label}</strong>. {tipo==='alumno' ? 'El alumno pasará a estado Inactivo, pero seguirá existiendo para historial, reportes y asistencias pasadas.' : 'Esta acción queda registrada en auditoría (3.1.4a).'}
        </p>
        <FormField label="Motivo de la baja">
          <textarea rows={3} value={motivo} onChange={e=>setMotivo(e.target.value)} placeholder="Detalle el motivo..."/>
        </FormField>
        <div className="factions">
          <Btn variant="s" onClick={()=>onNav(tipo==='alumno'?'alumnos':'clases')}>Cancelar</Btn>
          <button className="btn btn-d" disabled={!motivo} onClick={()=>{
            if (tipo === 'alumno' && item) {
              const idx = ALUMNOS.findIndex(a => a.id === item.id);
              if (idx >= 0) ALUMNOS[idx].estado = 'Inactivo';
              notify(`El alumno ${item.ap}, ${item.no} ha sido marcado como Inactivo.`, 'ok');
            } else if (tipo === 'clase' && item) {
              const idx = CLASES.findIndex(c => c.id === item.id);
              if (idx >= 0) CLASES.splice(idx, 1);
              notify(`La clase ${item.nombre} fue eliminada del sistema.`, 'ok');
            }
            onNav(tipo==='alumno'?'alumnos':'clases');
          }}>Confirmar baja</button>
        </div>
      </div>
    </div>
  );
}

// === PANTALLAS NUEVAS — COBERTURA TOTAL CASOS DE USO ===

// CU GA-05 + GA-06: Registrar Pago + Aplicar Promoción/Descuento
