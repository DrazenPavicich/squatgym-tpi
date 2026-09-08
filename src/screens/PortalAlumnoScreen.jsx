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

export function PortalAlumnoScreen({ onNav, perfil }){
  const isDeudor = perfil === 'deudor';
  const datos = isDeudor
    ? { nombre:'Carlos', plan:'MUSCULACIÓN', vto:'15/03', clases:'3', estVto:'err', estClases:'err', estPlan:'warn' }
    : { nombre:'María',  plan:'FULL',         vto:'28/04', clases:'8', estVto:'warn', estClases:'ok',  estPlan:'acc' };
  return (
    <div className="scr active">
      <PageHeader title="MI" accent="PORTAL" sub={`Bienvenido, ${datos.nombre}`} />
      {isDeudor && (
        <Alert variant="err">⚠️ <strong>Cuota vencida el {datos.vto}/2026.</strong> Tu acceso a las clases está restringido (CU GA-07). Regularizá el pago en <a style={{color:'inherit',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onNav('mi-cuenta')}>Mi Cuenta</a> para reactivar el ingreso.</Alert>
      )}
      <div className="g3 mb1">
        <Stat label={isDeudor ? 'Vto. (Vencido)' : 'Próximo Vto.'} value={datos.vto} color={datos.estVto}/>
        <Stat label={isDeudor ? 'Clases bloqueadas' : 'Clases Mes'} value={datos.clases} color={datos.estClases}/>
        <Stat label="Plan" value={datos.plan.slice(0,4)} color={datos.estPlan}/>
      </div>
      <div className="sec-t">Acciones Rápidas</div>
      <div className="g4">
        <QuickAction ico={QA_ICO.cal} title="Mi plan y horarios" onClick={()=>onNav('mi-plan')}/>
        <QuickAction ico={QA_ICO.card} title="Mi cuenta" desc={isDeudor ? '⚠ Acción requerida' : null} onClick={()=>onNav('mi-cuenta')}/>
        <QuickAction ico={QA_ICO.check} title="Mis asistencias" onClick={()=>onNav('mis-asistencias')}/>
        <QuickAction ico={QA_ICO.heart} title="Declaración Jurada" onClick={()=>onNav('decl-jurada')}/>
      </div>
    </div>
  );
}

// === PANTALLAS NUEVAS / FALTANTES (auditoría v2.0) ===

// Form Alumno (Alta/Modif) — incluye declaración jurada (3.1.11 + 3.1.28)
