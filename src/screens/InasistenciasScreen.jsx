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

export function InasistenciasScreen({ onNav }){
  return (
    <div className="scr active animate-fade">
      <PageHeader title="INASISTENCIAS" accent="FRECUENTES" sub="Alertas automáticas del sistema — CU GA-14"/>
      <Alert variant="warn">⚠ El sistema marca como "Inasistencia frecuente" a alumnos con 3 o más ausencias en los últimos 30 días.</Alert>

      <div className="g3 mb1">
        <Stat label="Riesgo Alto" value={INASIST_FREC.filter(x=>x.riesgo==='Alto').length} color="err"/>
        <Stat label="Riesgo Medio" value={INASIST_FREC.filter(x=>x.riesgo==='Medio').length} color="warn"/>
        <Stat label="Riesgo Bajo" value={INASIST_FREC.filter(x=>x.riesgo==='Bajo').length} color="ok"/>
      </div>

      <div className="tbl-wrap">
        <div className="tbl-top">
          <div className="tbl-title">Alumnos con ausencias reiteradas</div>
          <Btn variant="s" onClick={()=>notify('Notificaciones masivas enviadas a los alumnos en riesgo.', 'ok')}>📧 Notificar a todos</Btn>
        </div>
        <table>
          <thead><tr><th>Alumno</th><th>Plan</th><th>Ausencias</th><th>Período</th><th>Riesgo</th><th>Acciones</th></tr></thead>
          <tbody>
            {INASIST_FREC.map(x => (
              <tr key={x.id}>
                <td><strong>{x.alumno}</strong></td>
                <td>{x.plan}</td>
                <td><strong style={{color:'var(--sg-err)',fontSize:'1.1rem'}}>{x.ausencias}</strong></td>
                <td style={{fontSize:'.8rem',color:'var(--sg-mut)'}}>{x.periodo}</td>
                <td><Badge variant={x.riesgo==='Alto'?'err':x.riesgo==='Medio'?'warn':'ok'}>{x.riesgo}</Badge></td>
                <td>
                  <button className="ab ab-v" onClick={()=>notify(`Contacto preparado para ${x.alumno}.`, 'ok')}>📞 Contactar</button>
                  <button className="ab ab-e" onClick={()=>notify(`Notificación enviada a ${x.alumno}.`, 'ok')}>📧 Notificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// CU GC-07: Gestionar Reemplazo Docente
