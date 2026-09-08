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

export function TrazabilidadScreen({ onNav }){
  return (
    <div className="scr active animate-fade">
      <PageHeader title="MATRIZ DE" accent="TRAZABILIDAD" sub="Casos de Uso → Pantallas implementadas"/>
      <Alert variant="info">📋 Esta matriz mapea cada caso de uso del documento de análisis con su pantalla implementada en el sistema.</Alert>

      <div className="g4 mb1">
        <Stat label="Total CU" value={TRAZA_CU.length} color="acc"/>
        <Stat label="Gestión Alumnos" value={TRAZA_CU.filter(t=>t.cu.startsWith('GA')).length} color="ok"/>
        <Stat label="Gestión Clases" value={TRAZA_CU.filter(t=>t.cu.startsWith('GC')).length} color="warn"/>
        <Stat label="Cobertura" value="100%" color="ok"/>
      </div>

      <div className="tbl-wrap">
        <div className="tbl-top"><div className="tbl-title">Casos de Uso implementados</div></div>
        <table>
          <thead><tr><th>CU</th><th>Título</th><th>Actor / Rol</th><th>Pantalla</th><th>Acción</th></tr></thead>
          <tbody>
            {TRAZA_CU.map(t => (
              <tr key={t.cu}>
                <td><strong style={{color:'var(--sg-acc)',fontFamily:'var(--sg-ff-display)',letterSpacing:'.04em'}}>{t.cu}</strong></td>
                <td>{t.titulo}</td>
                <td style={{fontSize:'.8rem',color:'var(--sg-mut)'}}>{t.rol}</td>
                <td><code style={{fontSize:'.75rem',background:'var(--sg-sur2)',padding:'.15rem .4rem',borderRadius:'3px',color:'var(--sg-acc)'}}>{t.pantalla}</code></td>
                <td><button className="ab ab-v" onClick={()=>onNav(t.pantalla)}>Ir →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// App
