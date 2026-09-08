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

export function EstadoCuentaScreen({ onNav, alumno }){
  const a = alumno || ALUMNOS[0];
  return (
    <div className="scr active">
      <PageHeader title="ESTADO DE" accent="CUENTA" sub={`${a.ap}, ${a.no}`}>
        <Btn variant="s" onClick={()=>onNav('ficha-alumno')}>← Volver</Btn>
        <Btn variant="p" onClick={()=>onNav('registrar-pago')}>+ Registrar pago</Btn>
      </PageHeader>
      <div className="g3 mb1">
        <Stat label="Saldo" value={a.estado==='Deudor' ? '$28.000' : '$0'} color={a.estado==='Deudor'?'err':'ok'}/>
        <Stat label="Próx. Vto." value={a.vto} color="warn"/>
        <Stat label="Estado" value={a.estado==='Deudor'?'DEUDOR':'AL DÍA'} color={a.estado==='Deudor'?'err':'ok'}/>
      </div>
      {a.estado==='Deudor' && <Alert variant="err">⚠ Alumno con deuda — acceso a clases restringido (3.1.5b / 3.1.12c).</Alert>}
      <div className="tbl-wrap">
        <div className="tbl-top"><div className="tbl-title">Historial de Pagos</div></div>
        <table>
          <thead><tr><th>Fecha</th><th>Concepto</th><th>Monto</th><th>Método</th><th>Recibo</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>28/03/2026</td><td>Cuota Marzo</td><td>$35.000</td><td>Transferencia</td><td>R-0421</td><td><Badge variant="ok">Confirmado</Badge></td></tr>
            <tr><td>28/02/2026</td><td>Cuota Febrero</td><td>$32.000</td><td>Efectivo</td><td>R-0388</td><td><Badge variant="ok">Confirmado</Badge></td></tr>
            <tr><td>28/01/2026</td><td>Cuota Enero (-20% VERANO)</td><td>$25.600</td><td>QR</td><td>R-0312</td><td><Badge variant="ok">Confirmado</Badge></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Historial de Asistencia (consulta — secretaria/encargado)
