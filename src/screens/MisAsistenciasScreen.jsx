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

export function MisAsistenciasScreen({ onNav, perfil }){
  const isDeudor = perfil === 'deudor';
  return (
    <div className="scr active animate-fade">
      <PageHeader title="MIS" accent="ASISTENCIAS" sub="Tu historial">
        <Btn variant="s" onClick={()=>onNav('portal')}>← Volver</Btn>
      </PageHeader>
      {isDeudor && <Alert variant="warn">⚠️ Tu última asistencia fue el 12/03/2026. Desde el vencimiento de tu cuota (15/03) tu acceso está restringido (CU GA-07).</Alert>}
      <div className="g3 mb1">
        <Stat label={isDeudor?'Total Mes':'Total Mes'} value={isDeudor?'3':'12'} color={isDeudor?'err':'ok'}/>
        <Stat label="Presentes" value={isDeudor?'3':'10'} color="ok"/>
        <Stat label="Ausentes" value={isDeudor?'8':'2'} color="err"/>
      </div>
      <div className="tbl-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Clase</th><th>Estado</th></tr></thead>
          <tbody>
            {isDeudor ? (
              <>
                <tr><td>12/03/2026</td><td>Musculación</td><td><Badge variant="ok">Presente</Badge></td></tr>
                <tr><td>15/03/2026</td><td>Musculación</td><td><Badge variant="err">Bloqueado · Deuda</Badge></td></tr>
                <tr><td>17/03/2026</td><td>Musculación</td><td><Badge variant="err">Bloqueado · Deuda</Badge></td></tr>
                <tr><td>19/03/2026</td><td>Musculación</td><td><Badge variant="err">Bloqueado · Deuda</Badge></td></tr>
              </>
            ) : (
              <>
                <tr><td>28/04/2026</td><td>Musculación</td><td><Badge variant="ok">Presente</Badge></td></tr>
                <tr><td>26/04/2026</td><td>Musculación</td><td><Badge variant="ok">Presente</Badge></td></tr>
                <tr><td>24/04/2026</td><td>Musculación</td><td><Badge variant="err">Ausente</Badge></td></tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

