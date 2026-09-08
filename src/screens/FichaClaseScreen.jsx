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

export function FichaClaseScreen({ onNav, clase, role }){
  const c = clase || CLASES[0];
  const insc = ALUMNOS.slice(0, c.inscriptos > 5 ? 5 : c.inscriptos);
  return (
    <div className="scr active">
      <PageHeader title="FICHA DE" accent="CLASE" sub={`${c.nombre} · ${c.dias?c.dias.join(', '):c.dia} ${c.hora}–${c.fin}`}>
        <Btn variant="s" onClick={()=>onNav('clases')}>← Volver</Btn>
        {(role==='profesor' || role==='secretaria' || role==='admin') && <Btn variant="p" onClick={()=>onNav('asistencia')}>▶ Tomar asistencia</Btn>}
      </PageHeader>
      <div className="g4 mb1">
        <Stat label="Profesor" value={c.prof.split(' ')[0].toUpperCase()} color="acc"/>
        <Stat label="Sala" value={c.sala} color="ok"/>
        <Stat label="Sede" value={c.sede} color="warn"/>
        <Stat label="Cupo" value={`${c.inscriptos}/${c.capacidad}`} color={c.inscriptos>=c.capacidad?'err':'ok'}/>
      </div>
      {role==='profesor' && (
        <div className="flex gap1 mb1">
          <Btn variant="ok">✓ Confirmar asignación</Btn>
          <Btn variant="d">✗ Rechazar</Btn>
        </div>
      )}
      <div className="tbl-wrap">
        <div className="tbl-top"><div className="tbl-title">Alumnos inscriptos</div></div>
        <table>
          <thead><tr><th>#</th><th>Apellido y Nombre</th><th>DNI</th><th>Estado</th></tr></thead>
          <tbody>
            {insc.map((a,i)=>(
              <tr key={a.id}>
                <td>{String(i+1).padStart(2,'0')}</td>
                <td><strong>{a.ap}, {a.no}</strong></td>
                <td>{a.dni}</td>
                <td><Badge variant={a.estado==='Habilitada'?'ok':'err'}>{a.estado}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Registro de Asistencia (alumnos por clase) — Profesor / Secretaria (3.1.12 / 3.1.20)
