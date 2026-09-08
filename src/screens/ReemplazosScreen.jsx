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

export function ReemplazosScreen({ onNav, role }){
  const [nuevo, setNuevo] = useState(false);
  if (nuevo) {
    return (
      <div className="scr active animate-fade">
        <PageHeader title="ASIGNAR" accent="REEMPLAZO" sub="Profesor sustituto — CU GC-07">
          <Btn variant="s" onClick={()=>setNuevo(false)}>← Volver</Btn>
        </PageHeader>
        <FormSection title="Datos del reemplazo">
          <div className="fr">
            <FormField label="Fecha"><input type="date" defaultValue={new Date().toISOString().slice(0,10)}/></FormField>
            <FormField label="Clase">
              <select>{CLASES.map(c => <option key={c.id}>{c.nombre} — {c.dias?c.dias.join('/'):c.dia} {c.hora}</option>)}</select>
            </FormField>
          </div>
          <div className="fr">
            <FormField label="Profesor titular (ausente)">
              <select><option>Martín Acosta</option><option>Laura Díaz</option><option>Carlos Ríos</option><option>Sofía Nielsen</option></select>
            </FormField>
            <FormField label="Profesor sustituto">
              <select><option>Martín Acosta</option><option>Laura Díaz</option><option>Carlos Ríos</option><option>Sofía Nielsen</option></select>
            </FormField>
          </div>
          <FormField label="Motivo de la ausencia">
            <select><option>Licencia médica</option><option>Capacitación</option><option>Vacaciones</option><option>Otro</option></select>
          </FormField>
          <FormField label="Observaciones">
            <textarea rows={3} placeholder="Observaciones internas..."/>
          </FormField>
        </FormSection>
        <Alert variant="info">📧 Al confirmar, el sistema notifica al alumnado inscripto y al profesor sustituto (CU GC-06).</Alert>
        <div className="factions">
          <Btn variant="s" onClick={()=>setNuevo(false)}>Cancelar</Btn>
          <Btn variant="p" onClick={()=>{ notify('Reemplazo asignado y notificaciones enviadas.', 'ok'); setNuevo(false); }}>Confirmar reemplazo</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="scr active animate-fade">
      <PageHeader title="REEMPLAZOS" accent="DOCENTES" sub="Gestión de sustituciones — CU GC-07">
        {role !== 'encargado' && <Btn variant="p" onClick={()=>setNuevo(true)}>+ Asignar Reemplazo</Btn>}
      </PageHeader>

      <div className="g3 mb1">
        <Stat label="Pendientes" value={REEMPLAZOS.filter(r=>r.estado==='Pendiente').length} color="warn"/>
        <Stat label="Confirmados" value={REEMPLAZOS.filter(r=>r.estado==='Confirmado').length} color="ok"/>
        <Stat label="Mes en curso" value={REEMPLAZOS.length} color="acc"/>
      </div>

      <div className="tbl-wrap">
        <div className="tbl-top"><div className="tbl-title">Reemplazos programados</div></div>
        <table>
          <thead><tr><th>Fecha</th><th>Clase</th><th>Profesor titular</th><th>Sustituto</th><th>Motivo</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {REEMPLAZOS.map(r => (
              <tr key={r.id}>
                <td>{r.fecha}</td>
                <td><strong>{r.clase}</strong></td>
                <td>{r.titular}</td>
                <td style={{color:'var(--sg-acc)'}}>{r.sustituto}</td>
                <td style={{fontSize:'.82rem',color:'var(--sg-mut)'}}>{r.motivo}</td>
                <td><Badge variant={r.estado==='Confirmado'?'ok':'warn'}>{r.estado}</Badge></td>
                <td>
                  {r.estado === 'Pendiente' && <button className="ab ab-e" onClick={()=>notify('Reemplazo confirmado.', 'ok')}>✓ Confirmar</button>}
                  <button className="ab ab-d" onClick={()=>notify('Reemplazo cancelado.', 'warn')}>✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// CU GC-02: Verificar Disponibilidad de Turno
