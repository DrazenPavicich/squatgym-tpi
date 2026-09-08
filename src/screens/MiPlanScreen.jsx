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

export function MiPlanScreen({ onNav, perfil }){
  const isDeudor = perfil === 'deudor';
  const misClases = CLASES.filter(c => c.nombre === 'Musculación');
  
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const horasUnicas = Array.from(new Set(misClases.map(c => c.hora))).sort();

  return (
    <div className="scr active animate-fade">
      <PageHeader title="MI PLAN Y" accent="HORARIOS" sub="Tus clases inscritas">
        <Btn variant="s" onClick={()=>onNav('portal')}>← Volver</Btn>
      </PageHeader>
      {isDeudor && <Alert variant="err">⚠️ <strong>Acceso restringido por deuda.</strong> Podés ver el cronograma pero no asistir hasta normalizar el pago. <a style={{color:'inherit',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onNav('mi-cuenta')}>Pagar →</a></Alert>}
      <div className="g3 mb1">
        <Stat label="Plan" value="MUS." color={isDeudor?'mut':'acc'}/>
        <Stat label="Clases Sem." value="2" color={isDeudor?'mut':'ok'}/>
        <Stat label={isDeudor?'Estado':'Próxima'} value={isDeudor?'BLOQUEADO':'Lun 19:00'} color={isDeudor?'err':'warn'}/>
      </div>
      <div className="sec-t">Mi Cronograma de Clases</div>
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
              <tr><td colSpan={6} style={{textAlign:'center', padding:'3rem', color:'var(--sg-mut)'}}>No tenés clases asignadas a tu plan actual.</td></tr>
            ) : horasUnicas.map(hora => (
              <tr key={hora}>
                <td className="time-col">{hora}</td>
                {diasSemana.map(d => {
                  const clasesCell = misClases.filter(c => c.hora === hora && (c.dias ? c.dias.includes(d) : c.dia === d));
                  return (
                    <td key={d}>
                      {clasesCell.map(c => (
                        <div key={c.id} className="matrix-cell-clase" style={{cursor:'default'}}>
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
      <Alert variant="info" style={{marginTop:'1rem', marginBottom:'0'}}>Recordá que para clases con cupo limitado debés llegar 10 minutos antes.</Alert>
    </div>
  );
}

