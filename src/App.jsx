import React, { useState } from 'react';
import { ROLES } from './data/roles.js';
import { Topbar } from './components/Topbar.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import Btn from './components/Btn.jsx';
import Alert from './components/Alert.jsx';
import { PageHeader } from './components/PageHeader.jsx';
import { LoginScreen } from './screens/LoginScreen.jsx';
import { DashboardScreen } from './screens/DashboardScreen.jsx';
import { AlumnosScreen } from './screens/AlumnosScreen.jsx';
import { ClasesScreen } from './screens/ClasesScreen.jsx';
import { PagosScreen } from './screens/PagosScreen.jsx';
import { ReportesScreen } from './screens/ReportesScreen.jsx';
import { NotificacionesScreen } from './screens/NotificacionesScreen.jsx';
import { MiPlanScreen } from './screens/MiPlanScreen.jsx';
import { MiCuentaScreen } from './screens/MiCuentaScreen.jsx';
import { MisAsistenciasScreen } from './screens/MisAsistenciasScreen.jsx';
import { DeclJuradaScreen } from './screens/DeclJuradaScreen.jsx';
import { PortalAlumnoScreen } from './screens/PortalAlumnoScreen.jsx';
import { FormAlumnoScreen } from './screens/FormAlumnoScreen.jsx';
import { FichaAlumnoScreen } from './screens/FichaAlumnoScreen.jsx';
import { EstadoCuentaScreen } from './screens/EstadoCuentaScreen.jsx';
import { HistorialAsistenciaScreen } from './screens/HistorialAsistenciaScreen.jsx';
import { FormClaseScreen } from './screens/FormClaseScreen.jsx';
import { FichaClaseScreen } from './screens/FichaClaseScreen.jsx';
import { RegistroAsistenciaScreen } from './screens/RegistroAsistenciaScreen.jsx';
import { AsistProfesoresScreen } from './screens/AsistProfesoresScreen.jsx';
import { BajaConfirmScreen } from './screens/BajaConfirmScreen.jsx';
import { RegistrarPagoScreen } from './screens/RegistrarPagoScreen.jsx';
import { PromocionesScreen } from './screens/PromocionesScreen.jsx';
import { InasistenciasScreen } from './screens/InasistenciasScreen.jsx';
import { ReemplazosScreen } from './screens/ReemplazosScreen.jsx';
import { DisponibilidadScreen } from './screens/DisponibilidadScreen.jsx';
import { TrazabilidadScreen } from './screens/TrazabilidadScreen.jsx';

export default function App(){
  const [role, setRole] = useState(null);
  const [perfil, setPerfil] = useState('aldia'); // 'aldia' | 'deudor' — solo aplica a rol alumno
  const [scr, setScr] = useState('dashboard');
  const [selected, setSelected] = useState(null);
  const [toasts, setToasts] = useState([]);

  React.useEffect(() => {
    const handleToast = event => {
      const id = Date.now() + Math.random();
      setToasts(current => [...current, {id, message:event.detail.message, type:event.detail.type || 'info'}]);
      window.setTimeout(() => setToasts(current => current.filter(toast => toast.id !== id)), 4200);
    };
    window.addEventListener('sg:toast', handleToast);
    return () => window.removeEventListener('sg:toast', handleToast);
  }, []);

  React.useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem('sg_state') || 'null'); if (saved) { setRole(saved.role); setPerfil(saved.perfil || 'aldia'); setScr(saved.scr || 'dashboard'); } } catch {}
  }, []);
  React.useEffect(() => {
    try { localStorage.setItem('sg_state', JSON.stringify({role, perfil, scr})); } catch {}
  }, [role, perfil, scr]);

  const [filtroAlumnos, setFiltroAlumnos] = useState(null);

  const toastRegion = <div className="toast-region" aria-live="polite">{toasts.map(toast => <div key={toast.id} className={'toast ' + toast.type}>{toast.message}</div>)}</div>;
  if (!role) return <><LoginScreen onLogin={(r, p='aldia') => { setRole(r); setPerfil(p); setScr(r === 'alumno' ? 'portal' : 'dashboard'); }} />{toastRegion}</>;

  const onNav = key => setScr(key);
  const onSelect = a => { setSelected(a); };

  const isAlumno = role === 'alumno';
  const isProf = role === 'profesor';

  // Filtros iniciales (ej: deudores desde dashboard del Encargado)
  const filtrarDeudoresYNavegar = () => { setFiltroAlumnos({ estado:'Deudor' }); setScr('alumnos'); };

  // Guardia de permisos por rol — bloquea acceso directo a pantallas no permitidas
  const PERMISOS = {
    admin:      ['dashboard','alumnos','form-alumno','ficha-alumno','baja-alumno','estado-cuenta','historial-asistencia','clases','form-clase','ficha-clase','baja-clase','pagos','registrar-pago','promociones','asistencia','asist-profes','inasistencias','reemplazos','disponibilidad','reportes','notificaciones','traza','mi-plan','decl-jurada','mi-cuenta','mis-asistencias','portal'],
    encargado:  ['dashboard','alumnos','ficha-alumno','estado-cuenta','historial-asistencia','clases','ficha-clase','asist-profes','inasistencias','reemplazos'],
    secretaria: ['dashboard','alumnos','form-alumno','ficha-alumno','estado-cuenta','historial-asistencia','clases','ficha-clase','pagos','registrar-pago','promociones','disponibilidad','asistencia','asist-profes','inasistencias','reemplazos','notificaciones'],
    profesor:   ['dashboard','clases','ficha-clase','cronograma','asistencia'],
    alumno:     ['portal','mi-plan','mi-cuenta','mis-asistencias','decl-jurada'],
  };
  const permitido = (PERMISOS[role] || []).includes(scr);

  let screen;
  if (!permitido) {
    screen = <div className="scr active"><PageHeader title="ACCESO" accent="DENEGADO" sub="Tu rol no tiene permisos para esta pantalla"/><Alert variant="err">🔒 La pantalla solicitada no está habilitada para el rol <strong>{ROLES[role].label}</strong>. Volvé al panel principal.</Alert><Btn variant="p" onClick={()=>setScr(isAlumno?'portal':'dashboard')}>← Volver al panel</Btn></div>;
  }
  else if (scr === 'dashboard') screen = <DashboardScreen role={role} perfil={perfil} onNav={onNav} onFiltrarDeudores={filtrarDeudoresYNavegar}/>;
  else if (scr === 'portal') screen = <PortalAlumnoScreen onNav={onNav} perfil={perfil}/>;
  else if (scr === 'alumnos') screen = <AlumnosScreen role={role} onNav={onNav} onSelect={onSelect} filtroInicial={filtroAlumnos}/>;
  else if (scr === 'form-alumno') screen = <FormAlumnoScreen onNav={onNav} alumno={selected}/>;
  else if (scr === 'ficha-alumno') screen = <FichaAlumnoScreen onNav={onNav} alumno={selected} role={role}/>;
  else if (scr === 'baja-alumno') screen = <BajaConfirmScreen onNav={onNav} tipo="alumno" item={selected}/>;
  else if (scr === 'estado-cuenta') screen = <EstadoCuentaScreen onNav={onNav} alumno={selected}/>;
  else if (scr === 'historial-asistencia') screen = <HistorialAsistenciaScreen onNav={onNav} alumno={selected}/>;
  else if (scr === 'clases') screen = <ClasesScreen role={role} onNav={onNav} onSelect={onSelect}/>;
  else if (scr === 'form-clase') screen = <FormClaseScreen onNav={onNav} clase={selected}/>;
  else if (scr === 'ficha-clase') screen = <FichaClaseScreen onNav={onNav} clase={selected} role={role}/>;
  else if (scr === 'baja-clase') screen = <BajaConfirmScreen onNav={onNav} tipo="clase" item={selected}/>;
  else if (scr === 'pagos') screen = <PagosScreen onNav={onNav}/>;
  else if (scr === 'registrar-pago') screen = <RegistrarPagoScreen onNav={onNav} alumno={selected}/>;
  else if (scr === 'promociones') screen = <PromocionesScreen onNav={onNav}/>;
  else if (scr === 'inasistencias') screen = <InasistenciasScreen onNav={onNav}/>;
  else if (scr === 'reemplazos') screen = <ReemplazosScreen onNav={onNav} role={role}/>;
  else if (scr === 'disponibilidad') screen = <DisponibilidadScreen onNav={onNav}/>;
  else if (scr === 'traza') screen = <TrazabilidadScreen onNav={onNav}/>;
  else if (scr === 'reportes') screen = <ReportesScreen/>;
  else if (scr === 'notificaciones') screen = <NotificacionesScreen role={role}/>;
  else if (scr === 'mi-plan') screen = <MiPlanScreen onNav={onNav} perfil={perfil}/>;
  else if (scr === 'mi-cuenta') screen = <MiCuentaScreen onNav={onNav} perfil={perfil}/>;
  else if (scr === 'mis-asistencias') screen = <MisAsistenciasScreen onNav={onNav} perfil={perfil}/>;
  else if (scr === 'decl-jurada') screen = <DeclJuradaScreen onNav={onNav}/>;
  else if (scr === 'cronograma') screen = <ClasesScreen role={role} onNav={onNav} onSelect={onSelect}/>;
  else if (scr === 'asistencia') screen = <RegistroAsistenciaScreen onNav={onNav} role={role}/>;
  else if (scr === 'asist-profes') screen = <AsistProfesoresScreen onNav={onNav}/>;
  else screen = <div className="scr active"><PageHeader title="EN" accent="CONSTRUCCIÓN" sub="Pantalla en desarrollo"/></div>;

  return (
    <div style={{minHeight:'100vh'}}>
      <Topbar role={role} perfil={perfil} onLogout={()=>{setRole(null); setScr('dashboard');}} onHome={()=>setScr(isAlumno?'portal':'dashboard')}/>
      <div className="app-body">
        <Sidebar role={role} active={scr} onNav={onNav}/>
        <div className="main">{screen}</div>
        {toastRegion}
      </div>
    </div>
  );
}
