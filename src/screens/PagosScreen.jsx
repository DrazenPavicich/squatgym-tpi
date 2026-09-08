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

export function PagosScreen({ onNav }){
  return (
    <div className="scr active">
      <PageHeader title="REGISTRAR" accent="PAGO" sub="Control de cuotas — CU GA-05">
        <Btn variant="p" onClick={()=>onNav('registrar-pago')}>+ Nuevo Pago</Btn>
        <Btn variant="s" onClick={()=>onNav('promociones')}>🏷️ Promociones</Btn>
      </PageHeader>
      <div className="g4 mb1">
        <Stat label="Cobrado Mes" value="$352K" color="ok"/>
        <Stat label="Pendiente" value="$35K" color="warn"/>
        <Stat label="Operaciones" value="4" color="acc"/>
        <Stat label="Transferencias" value="3" color="acc"/>
      </div>
      <div className="tbl-wrap">
        <table>
          <thead><tr><th>Alumno</th><th>Fecha</th><th>Monto</th><th>Método</th><th>Promoción</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>García, María Laura</td><td>28/04/2026</td><td>$35.000</td><td>Transferencia</td><td>—</td><td><Badge variant="ok">Confirmado</Badge></td></tr>
            <tr><td>López, Carlos</td><td>15/03/2026</td><td>$28.000</td><td>Efectivo</td><td><Badge variant="acc">AMIGO15</Badge></td><td><Badge variant="ok">Confirmado</Badge></td></tr>
            <tr><td>Pérez, Sofía</td><td>10/03/2026</td><td>$31.500</td><td>QR</td><td><Badge variant="acc">FAMILIA10</Badge></td><td><Badge variant="ok">Confirmado</Badge></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

