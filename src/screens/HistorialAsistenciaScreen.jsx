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

export function HistorialAsistenciaScreen({ onNav, alumno }){
  const a = alumno || ALUMNOS[0];
  return (
    <div className="scr active">
      <PageHeader title="HISTORIAL DE" accent="ASISTENCIA" sub={`${a.ap}, ${a.no}`}>
        <Btn variant="s" onClick={()=>onNav('ficha-alumno')}>← Volver</Btn>
      </PageHeader>
      <div className="g3 mb1">
        <Stat label="Presentes" value="22" color="ok"/>
        <Stat label="Ausentes" value="3" color="err"/>
        <Stat label="% Asist." value="88%" color="acc"/>
      </div>
      <div className="tbl-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Clase</th><th>Profesor</th><th>Estado</th><th>Tomado por</th></tr></thead>
          <tbody>
            <tr><td>28/04/2026</td><td>Musculación</td><td>M. Acosta</td><td><Badge variant="ok">Presente</Badge></td><td>secretaria@</td></tr>
            <tr><td>26/04/2026</td><td>Musculación</td><td>M. Acosta</td><td><Badge variant="err">Ausente</Badge></td><td>profesor@</td></tr>
            <tr><td>24/04/2026</td><td>CrossFit</td><td>M. Acosta</td><td><Badge variant="ok">Presente</Badge></td><td>profesor@</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Form Clase — solo Admin (3.1.17)
