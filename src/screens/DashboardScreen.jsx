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

export function DashboardScreen({ role, perfil, onNav, onFiltrarDeudores }){
  const isAlumno = role === 'alumno';
  const isProf = role === 'profesor';
  const isEnc = role === 'encargado';
  const isSec = role === 'secretaria';
  const isAdm = role === 'admin';
  const isDeudor = isAlumno && perfil === 'deudor';
  const sub = isDeudor ? 'Hola Carlos · Cuota vencida'
    : isAlumno ? 'Hola María · Plan Full Access'
    : isProf ? 'Profesor Martín Acosta · Sede Centro'
    : isEnc ? 'Encargado · Sede Centro'
    : isSec ? 'Secretaria · Sede Centro'
    : 'Administrador · Vista global';
  return (
    <div className="scr active">
      <PageHeader title="PANEL" accent="PRINCIPAL" sub={sub}>
        {/* Encargado NO crea alumnos (3.1.6 — solo consulta) */}
        {(isAdm || isSec) && <Btn variant="p" onClick={()=>onNav('form-alumno')}>+ Nuevo Alumno</Btn>}
        {isEnc && (
          <button className="btn btn-d" onClick={onFiltrarDeudores} title="Filtra deudores en Lista de Alumnos (3.1.8a v2.0)">⚠ Ver Deudores</button>
        )}
        {isProf && <Btn variant="p" onClick={()=>onNav('asistencia')}>▶ Tomar Asistencia</Btn>}
      </PageHeader>
      {isAlumno ? (
        <div className="g3 mb1">
          <Stat label={isDeudor?'Vencimiento':'Próximo Vto.'} value={isDeudor?'15/03':'30/04'} color={isDeudor?'err':'warn'}/>
          <Stat label={isDeudor?'Saldo':'Asistencias'} value={isDeudor?'$28K':'12'} color={isDeudor?'err':'ok'}/>
          <Stat label={isDeudor?'Estado':'Plan'} value={isDeudor?'DEUDOR':'MUSC.'} color={isDeudor?'err':'acc'}/>
        </div>
      ) : isProf ? (
        <div className="g3 mb1">
          <Stat label="Mis clases hoy" value="2" color="acc"/>
          <Stat label="Alumnos hoy" value="32" color="ok"/>
          <Stat label="Próxima" value="19:00 MUSC" color="warn"/>
        </div>
      ) : (
        <div className="g4 mb1">
          <Stat label="Total Alumnos" value="128" color="acc"/>
          <Stat label="Activos" value="96" color="ok"/>
          <Stat label="Deudores" value="18" color="err"/>
          <Stat label="Clases hoy" value="6" color="warn"/>
        </div>
      )}
      <div className="sec-t">Acciones Rápidas</div>
      <div className="g4">
        {isAlumno && (<>
          <QuickAction ico={QA_ICO.cal} title="Mi plan y horarios" onClick={()=>onNav('mi-plan')}/>
          <QuickAction ico={QA_ICO.card} title="Mi cuenta" onClick={()=>onNav('mi-cuenta')}/>
          <QuickAction ico={QA_ICO.check} title="Mis asistencias" onClick={()=>onNav('mis-asistencias')}/>
          <QuickAction ico={QA_ICO.heart} title="Declaración Jurada" onClick={()=>onNav('decl-jurada')}/>
        </>)}
        {isProf && (<>
          <QuickAction ico={QA_ICO.cal} title="Mi cronograma" onClick={()=>onNav('cronograma')}/>
          <QuickAction ico={QA_ICO.check} title="Tomar asistencia" onClick={()=>onNav('asistencia')}/>
        </>)}
        {isEnc && (<>
          <QuickAction ico={QA_ICO.check} title="Asist. Profesores" desc="Confirmar / Modificar" onClick={()=>onNav('asist-profes')}/>
          <QuickAction ico={QA_ICO.chart} title="Ver alumnos" desc="Solo consulta" onClick={()=>onNav('alumnos')}/>
          <QuickAction ico={QA_ICO.cal} title="Ver clases" onClick={()=>onNav('clases')}/>
        </>)}
        {isSec && (<>
          <QuickAction ico={QA_ICO.add} title="Nuevo Alumno" onClick={()=>onNav('form-alumno')}/>
          <QuickAction ico={QA_ICO.pay} title="Registrar Pago" desc="Con descuentos (GA-05/06)" onClick={()=>onNav('registrar-pago')}/>
          <QuickAction ico={QA_ICO.check} title="Asist. Alumnos" onClick={()=>onNav('asistencia')}/>
          <QuickAction ico={QA_ICO.cal} title="Disponibilidad" desc="Cupos por clase (GC-02)" onClick={()=>onNav('disponibilidad')}/>
        </>)}
        {isAdm && (<>
          <QuickAction ico={QA_ICO.add} title="Nuevo Alumno" onClick={()=>onNav('form-alumno')}/>
          <QuickAction ico={QA_ICO.pay} title="Pagos y Promos" onClick={()=>onNav('pagos')}/>
          <QuickAction ico={QA_ICO.check} title="Asistencia" onClick={()=>onNav('asistencia')}/>
          <QuickAction ico={QA_ICO.chart} title="Reportes" onClick={()=>onNav('reportes')}/>
        </>)}
      </div>
      <div className="sec-t mt1">Alertas</div>
      {!isAlumno && <Alert variant="warn">⚠️ <strong>18 alumnos</strong> con cuotas vencidas. <a style={{color:'#3B82F6',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onNav('notificaciones')}>Enviar avisos →</a></Alert>}
      {(isAdm || isSec || isEnc) && <Alert variant="err">⚠️ <strong>{INASIST_FREC.filter(x=>x.riesgo==='Alto').length} alumno(s)</strong> con inasistencias frecuentes (CU GA-14). <a style={{color:'#3B82F6',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onNav('inasistencias')}>Ver detalle →</a></Alert>}
      {(isAdm || isEnc) && <Alert variant="warn">🔄 <strong>{REEMPLAZOS.filter(r=>r.estado==='Pendiente').length} reemplazo(s) docente(s) pendientes</strong> de confirmación. <a style={{color:'#3B82F6',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onNav('reemplazos')}>Gestionar →</a></Alert>}
      {(isEnc || isAdm) && <Alert variant="info">🧑‍🏫 Cronograma docente actualizado — verificar en <a style={{color:'#3B82F6',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onNav('asist-profes')}>Asistencia de Profesores</a>.</Alert>}
      {isProf && <Alert variant="info">📅 Tu próxima clase: Musculación · Lun 19:00 · Sala 2</Alert>}
      {isAlumno && !isDeudor && <Alert variant="warn">💳 Tu cuota vence el 30/04. Pagá desde Mi Cuenta.</Alert>}
      {isDeudor && <Alert variant="err">🔒 <strong>Tu cuota está vencida hace 47 días.</strong> Acceso a clases bloqueado. <a style={{color:'inherit',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onNav('mi-cuenta')}>Pagar ahora →</a></Alert>}
    </div>
  );
}

