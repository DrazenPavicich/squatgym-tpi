import { SB_ICO } from './icons.jsx';

export const ROLES = {
  admin:      { label: 'Administrador General', user: 'admin@squatgym.com' },
  encargado:  { label: 'Encargado de Sede',     user: 'encargado@squatgym.com' },
  secretaria: { label: 'Secretaria',            user: 'secretaria@squatgym.com' },
  profesor:   { label: 'Profesor',              user: 'profesor@squatgym.com' },
  alumno:     { label: 'Alumno',                user: 'alumno@squatgym.com'  },
};

// Navegación por rol — alineada con matriz v2.0 del documento
// Profesor NO tiene horas/observaciones (3.1.22 y 3.1.23 están fuera del alcance del módulo)
// Encargado y Secretaria SÍ tienen Asistencia de Profesores (NUEVO v2.0 — 3.1.7 / 3.1.12)
export const NAV_BY_ROLE = {
  admin: [
    { section: 'PRINCIPAL', items: [['dashboard',SB_ICO.panel,'Panel Principal']] },
    { section: 'GESTIÓN',   items: [['alumnos',SB_ICO.alumnos,'Alumnos'],['clases',SB_ICO.clases,'Clases'],['pagos',SB_ICO.pago,'Pagos'],['promociones',SB_ICO.descuento,'Promociones']] },
    { section: 'ASISTENCIA',items: [['asistencia',SB_ICO.asistAlumnos,'Asist. Alumnos'],['asist-profes',SB_ICO.asistProfes,'Asist. Profesores'],['inasistencias',SB_ICO.inasistencia,'Inasistencias']] },
    { section: 'OPERACIÓN', items: [['reemplazos',SB_ICO.reemplazos,'Reemplazos'],['disponibilidad',SB_ICO.disponib,'Disponibilidad']] },
    { section: 'CONFIG',    items: [['reportes',SB_ICO.reportes,'Reportes'],['notificaciones',SB_ICO.notif,'Notificaciones'],['traza',SB_ICO.traza,'Trazabilidad CU']] },
  ],
  encargado: [
    { section: 'PRINCIPAL', items: [['dashboard',SB_ICO.panel,'Panel']] },
    { section: 'CONSULTA',  items: [['alumnos',SB_ICO.alumnos,'Alumnos (Ver)'],['clases',SB_ICO.clases,'Clases (Ver)']] },
    { section: 'CONTROL',   items: [['asist-profes',SB_ICO.asistProfes,'Asist. Profesores'],['inasistencias',SB_ICO.inasistencia,'Inasistencias'],['reemplazos',SB_ICO.reemplazos,'Reemplazos']] },
  ],
  secretaria: [
    { section: 'PRINCIPAL', items: [['dashboard',SB_ICO.panel,'Panel']] },
    { section: 'OPERACIÓN', items: [['alumnos',SB_ICO.alumnos,'Alumnos'],['clases',SB_ICO.clases,'Clases (Ver)'],['pagos',SB_ICO.pago,'Pagos'],['promociones',SB_ICO.descuento,'Promociones'],['disponibilidad',SB_ICO.disponib,'Disponibilidad']] },
    { section: 'ASISTENCIA',items: [['asistencia',SB_ICO.asistAlumnos,'Asist. Alumnos'],['asist-profes',SB_ICO.asistProfes,'Asist. Profesores'],['inasistencias',SB_ICO.inasistencia,'Inasistencias'],['reemplazos',SB_ICO.reemplazos,'Reemplazos']] },
    { section: 'COMUNIC.',  items: [['notificaciones',SB_ICO.notif,'Notificaciones']] },
  ],
  profesor: [
    { section: 'PRINCIPAL', items: [['dashboard',SB_ICO.panel,'Panel']] },
    { section: 'MIS CLASES',items: [['cronograma',SB_ICO.clases,'Mi Cronograma'],['asistencia',SB_ICO.asistAlumnos,'Tomar Asistencia']] },
  ],
  alumno: [
    { section: 'MI CUENTA', items: [['portal',SB_ICO.inicio,'Inicio'],['mi-plan',SB_ICO.clases,'Mi Plan'],['mi-cuenta',SB_ICO.pago,'Mi Cuenta'],['mis-asistencias',SB_ICO.asistAlumnos,'Mis Asistencias'],['decl-jurada',SB_ICO.declJurada,'Declaración Jurada']] },
  ],
};
