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

export function NotificacionesScreen({ role }){
  const [tab, setTab] = useState('historial');
  const [dest, setDest] = useState('todos');

  const isAdmin = role === 'admin' || role === 'secretaria';

  return (
    <div className="scr active animate-fade">
      <PageHeader title="GESTIÓN DE" accent="NOTIFICACIONES" sub="Alertas y envío de mensajes masivos">
        {isAdmin && tab === 'historial' && <Btn variant="p" onClick={()=>setTab('nueva')}>+ Redactar Mensaje</Btn>}
        {tab === 'nueva' && <Btn variant="s" onClick={()=>setTab('historial')}>← Volver a Bandeja</Btn>}
      </PageHeader>
      
      {isAdmin && (
        <div style={{display:'flex',gap:'.4rem',marginBottom:'1.5rem'}}>
          <button className={'btn ' + (tab==='historial'?'btn-p':'btn-s')} onClick={()=>setTab('historial')}>Alertas del Sistema</button>
          <button className={'btn ' + (tab==='nueva'?'btn-p':'btn-s')} onClick={()=>setTab('nueva')}>Enviar Notificación</button>
        </div>
      )}

      {tab === 'historial' ? (
        <div className="g2">
          <div className="fsec">
            <div className="fsec-t">Alertas Recientes</div>
            <div className="dr" style={{flexDirection:'column', alignItems:'flex-start', gap:'0.2rem', padding:'0.8rem 0'}}>
              <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <span style={{fontWeight:600, color:'var(--sg-err)'}}>Cuota vencida</span>
                <span style={{fontSize:'.72rem', color:'var(--sg-mut)'}}>Hoy 09:30</span>
              </div>
              <div style={{fontSize:'.85rem', color:'var(--sg-mut)'}}>El alumno Carlos López tiene su cuota vencida.</div>
            </div>
            <div className="dr" style={{flexDirection:'column', alignItems:'flex-start', gap:'0.2rem', padding:'0.8rem 0'}}>
              <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <span style={{fontWeight:600, color:'var(--sg-warn)'}}>Ausencia Docente</span>
                <span style={{fontSize:'.72rem', color:'var(--sg-mut)'}}>Ayer 18:45</span>
              </div>
              <div style={{fontSize:'.85rem', color:'var(--sg-mut)'}}>Sofía Nielsen no registró asistencia a la clase de Yoga.</div>
            </div>
          </div>
          
          <div className="fsec">
            <div className="fsec-t">Mensajes Enviados (Historial)</div>
            <div className="dr" style={{flexDirection:'column', alignItems:'flex-start', gap:'0.2rem', padding:'0.8rem 0'}}>
              <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <span style={{fontWeight:600, color:'var(--sg-acc)'}}>Clase Cancelada: Zumba</span>
                <span style={{fontSize:'.72rem', color:'var(--sg-mut)'}}>24/04/2026</span>
              </div>
              <div style={{fontSize:'.85rem', color:'var(--sg-mut)'}}>Enviado a: Alumnos inscriptos en Zumba.</div>
            </div>
          </div>
        </div>
      ) : (
        <FormSection title="Redactar Nueva Notificación (Req. 3.1.18a)">
          <div className="fr">
            <FormField label="Destinatarios">
              <select value={dest} onChange={(e)=>setDest(e.target.value)}>
                <option value="todos">Todos los alumnos activos</option>
                <option value="deudores">Alumnos con cuota vencida (Aviso de pago)</option>
                <option value="clase_zumba">Inscriptos en clase: Zumba (Centro)</option>
                <option value="clase_musc">Inscriptos en clase: Musculación (Centro)</option>
                <option value="profesores">Todos los profesores</option>
              </select>
            </FormField>
            <FormField label="Asunto / Título">
              <input placeholder="Ej: Reprogramación de clase por feriado" />
            </FormField>
          </div>
          <div className="fg" style={{marginTop:'1rem'}}>
            <FormField label="Mensaje">
              <textarea rows={5} placeholder="Escriba aquí el cuerpo del mensaje que recibirán los destinatarios por el sistema y por correo..." style={{resize:'vertical'}}></textarea>
            </FormField>
          </div>
          <div className="factions">
            <Btn variant="s" onClick={()=>setTab('historial')}>Cancelar</Btn>
            <Btn variant="p" onClick={()=>{ notify('Notificación masiva enviada correctamente.', 'ok'); setTab('historial'); }}>Enviar Mensaje</Btn>
          </div>
        </FormSection>
      )}
    </div>
  );
}

