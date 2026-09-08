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

export function DisponibilidadScreen({ onNav }){
  const [claseId, setClaseId] = useState(CLASES[0].id);
  const c = CLASES.find(x => x.id === Number(claseId));
  const libres = c.capacidad - c.inscriptos;
  const pct = Math.round(c.inscriptos / c.capacidad * 100);
  const estado = libres === 0 ? 'COMPLETO' : libres <= 3 ? 'POCAS PLAZAS' : 'DISPONIBLE';
  const color = libres === 0 ? 'err' : libres <= 3 ? 'warn' : 'ok';

  return (
    <div className="scr active animate-fade">
      <PageHeader title="DISPONIBILIDAD" accent="DE TURNO" sub="Consulta de cupos por clase — CU GC-02"/>

      <FormSection title="Seleccionar clase">
        <div className="fr">
          <FormField label="Clase">
            <select value={claseId} onChange={e=>setClaseId(e.target.value)}>
              {CLASES.map(cl => <option key={cl.id} value={cl.id}>{cl.nombre} — {cl.dias?cl.dias.join('/'):cl.dia} {cl.hora} ({cl.sede})</option>)}
            </select>
          </FormField>
          <FormField label="Sede"><input disabled value={c.sede}/></FormField>
        </div>
      </FormSection>

      <div className="g4 mb1">
        <Stat label="Capacidad" value={c.capacidad} color="acc"/>
        <Stat label="Inscriptos" value={c.inscriptos} color="warn"/>
        <Stat label="Cupos Libres" value={libres} color={color}/>
        <Stat label="Ocupación" value={`${pct}%`} color={color}/>
      </div>

      <div className="fsec" style={{borderLeft:'3px solid var(--sg-acc)'}}>
        <div className="fsec-t">Estado del turno</div>
        <div style={{display:'flex',alignItems:'center',gap:'1.5rem',padding:'1rem 0'}}>
          <div style={{fontFamily:'var(--sg-ff-display)',fontSize:'4rem',color:`var(--sg-${color==='err'?'err':color==='warn'?'warn':'ok'})`,lineHeight:1}}>
            {libres === 0 ? '✗' : '✓'}
          </div>
          <div>
            <Badge variant={color}>{estado}</Badge>
            <div style={{marginTop:'.5rem',fontSize:'.95rem'}}>
              {libres === 0 && 'No hay cupos disponibles. Sugerimos lista de espera.'}
              {libres > 0 && libres <= 3 && `Quedan ${libres} cupos. Sugerimos confirmar pronto.`}
              {libres > 3 && `Hay ${libres} cupos disponibles para inscripción inmediata.`}
            </div>
          </div>
        </div>
        {/* Barra de ocupación */}
        <div style={{height:'10px',background:'var(--sg-sur2)',borderRadius:'5px',overflow:'hidden',marginTop:'.5rem'}}>
          <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,var(--sg-${color==='err'?'err':color==='warn'?'warn':'ok'}),var(--sg-acc))`,transition:'width .3s'}}/>
        </div>
      </div>

      <div className="factions">
        <Btn variant="s" onClick={()=>onNav('clases')}>Ver Cronograma</Btn>
        <Btn variant="p" disabled={libres===0} onClick={()=>notify('Inscripción registrada para la clase.', 'ok')}>
          {libres === 0 ? 'Sin cupos' : '+ Reservar cupo'}
        </Btn>
      </div>
    </div>
  );
}

// Trazabilidad Casos de Uso (referencia interna)
