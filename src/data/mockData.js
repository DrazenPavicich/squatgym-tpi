export const ALUMNOS = [
  { id:1, ap:'García', no:'María Laura', dni:'40.123.456', plan:'Full Access', sede:'Centro', vto:'2026-04-28', estado:'Habilitada' },
  { id:2, ap:'López',  no:'Carlos Andrés', dni:'38.456.789', plan:'Musculación', sede:'Centro', vto:'2026-03-15', estado:'Deudor' },
  { id:3, ap:'Pérez',  no:'Sofía Belén',  dni:'42.987.654', plan:'Zumba',       sede:'Norte',  vto:'2026-05-02', estado:'Habilitada' },
  { id:4, ap:'Martínez', no:'Juan Pablo', dni:'36.541.987', plan:'Kickboxing',  sede:'Centro', vto:'2026-04-30', estado:'Habilitada' },
  { id:5, ap:'Rodríguez', no:'Valentina', dni:'44.221.330', plan:'Spinning',    sede:'Norte',  vto:'2026-04-10', estado:'Deudor' },
  { id:6, ap:'Fernández', no:'Lucas Iván', dni:'39.112.008', plan:'CrossFit',   sede:'Centro', vto:'2026-04-22', estado:'Habilitada' },
];

export const CLASES = [
  { id:1, nombre:'Musculación', dias:['Lunes', 'Miércoles'], hora:'19:00', fin:'20:30', prof:'Martín Acosta', sala:'Sala 2', sede:'Centro', capacidad:20, inscriptos:15 },
  { id:2, nombre:'Zumba', dias:['Lunes', 'Miércoles'], hora:'20:30', fin:'21:30', prof:'Laura Díaz', sala:'Sala 1', sede:'Centro', capacidad:25, inscriptos:22 },
  { id:3, nombre:'Kickboxing', dias:['Martes', 'Jueves'], hora:'18:00', fin:'19:30', prof:'Carlos Ríos', sala:'Sala 3', sede:'Centro', capacidad:15, inscriptos:12 },
  { id:4, nombre:'CrossFit', dias:['Miércoles', 'Viernes'], hora:'19:00', fin:'20:00', prof:'Martín Acosta', sala:'Sala 2', sede:'Centro', capacidad:18, inscriptos:18 },
  { id:5, nombre:'Yoga', dias:['Jueves'], hora:'17:00', fin:'18:30', prof:'Sofía Nielsen', sala:'Sala 1', sede:'Norte', capacidad:20, inscriptos:14 },
];

export const SEDES = [
  { id:1, nombre:'Centro', direccion:'Av. Colón 1234', estado:'Activa', alumnos:85 },
  { id:2, nombre:'Norte', direccion:'Juan B. Justo 5678', estado:'Activa', alumnos:43 },
];

// Promociones / Descuentos vigentes (CU GA-06)
export const PROMOS = [
  { id:1, codigo:'VERANO20', descripcion:'Descuento de Verano',     tipo:'porcentaje', valor:20, vigDesde:'2026-01-01', vigHasta:'2026-02-28', estado:'Vencida' },
  { id:2, codigo:'AMIGO15',  descripcion:'Trae a un amigo',          tipo:'porcentaje', valor:15, vigDesde:'2026-03-01', vigHasta:'2026-12-31', estado:'Activa'  },
  { id:3, codigo:'FAMILIA10',descripcion:'Plan familiar',            tipo:'porcentaje', valor:10, vigDesde:'2026-01-01', vigHasta:'2026-12-31', estado:'Activa'  },
  { id:4, codigo:'ANUAL25',  descripcion:'Pago anual adelantado',    tipo:'porcentaje', valor:25, vigDesde:'2026-04-01', vigHasta:'2026-06-30', estado:'Activa'  },
];

// Reemplazos docentes (CU GC-07)
export const REEMPLAZOS = [
  { id:1, fecha:'2026-05-03', clase:'Yoga',        titular:'Sofía Nielsen', sustituto:'Laura Díaz',    motivo:'Licencia médica',    estado:'Confirmado' },
  { id:2, fecha:'2026-05-05', clase:'CrossFit',    titular:'Martín Acosta', sustituto:'Carlos Ríos',   motivo:'Capacitación',       estado:'Pendiente'  },
];

// Inasistencias frecuentes detectadas por el sistema (CU GA-14)
export const INASIST_FREC = [
  { id:1, alumno:'López, Carlos Andrés',   plan:'Musculación', ausencias:5, periodo:'Últimos 30 días', riesgo:'Alto'  },
  { id:2, alumno:'Rodríguez, Valentina',   plan:'Spinning',    ausencias:4, periodo:'Últimos 30 días', riesgo:'Medio' },
  { id:3, alumno:'Pérez, Sofía Belén',     plan:'Zumba',       ausencias:3, periodo:'Últimos 30 días', riesgo:'Bajo'  },
];

// Matriz Trazabilidad CU → Pantalla (referencia interna, también navegable)
export const TRAZA_CU = [
  { cu:'GA-01', titulo:'ABM Alumno',                     pantalla:'alumnos',           rol:'Administrador' },
  { cu:'GA-02', titulo:'Registrar Inscripción',          pantalla:'form-alumno',       rol:'Secretaria' },
  { cu:'GA-03', titulo:'Declaración Jurada Salud',       pantalla:'decl-jurada',       rol:'Alumno' },
  { cu:'GA-04', titulo:'Consultar Estado de Cuenta',     pantalla:'estado-cuenta',     rol:'Alumno / Secretaria' },
  { cu:'GA-05', titulo:'Registrar Pago de Cuota',        pantalla:'registrar-pago',    rol:'Secretaria' },
  { cu:'GA-06', titulo:'Aplicar Promoción / Descuento',  pantalla:'promociones',       rol:'Secretaria / Admin' },
  { cu:'GA-07', titulo:'Restricción por Deuda',          pantalla:'estado-cuenta',     rol:'Sistema / Secretaria' },
  { cu:'GA-08', titulo:'Inscripciones por Sede',         pantalla:'alumnos',           rol:'Encargado' },
  { cu:'GA-09', titulo:'Gestionar Asistencia',           pantalla:'asistencia',        rol:'Secretaria / Profesor' },
  { cu:'GA-10', titulo:'Historial de Asistencia',        pantalla:'historial-asistencia', rol:'Alumno' },
  { cu:'GA-11', titulo:'Cronograma y Plan',              pantalla:'mi-plan',           rol:'Alumno' },
  { cu:'GA-12', titulo:'Enviar Notificación',            pantalla:'notificaciones',    rol:'Secretaria' },
  { cu:'GA-13', titulo:'Alerta Vencimiento',             pantalla:'notificaciones',    rol:'Sistema' },
  { cu:'GA-14', titulo:'Inasistencias Frecuentes',       pantalla:'inasistencias',     rol:'Sistema' },
  { cu:'GC-01', titulo:'Cronograma de Clases',           pantalla:'clases',            rol:'Todos' },
  { cu:'GC-02', titulo:'Disponibilidad de Turno',        pantalla:'disponibilidad',    rol:'Secretaria' },
  { cu:'GC-03', titulo:'Asistencia en Clase',            pantalla:'asistencia',        rol:'Profesor' },
  { cu:'GC-04', titulo:'Habilitación Alumno',            pantalla:'asistencia',        rol:'Sistema' },
  { cu:'GC-05', titulo:'Actualizar Cronograma',          pantalla:'form-clase',        rol:'Administrador' },
  { cu:'GC-06', titulo:'Notificar Cambio/Cancelación',   pantalla:'notificaciones',    rol:'Sistema' },
  { cu:'GC-07', titulo:'Reemplazo Docente',              pantalla:'reemplazos',        rol:'Encargado' },
  { cu:'GC-08', titulo:'Superposición de Clases',        pantalla:'form-clase',        rol:'Sistema (validación al crear/editar)' },
  { cu:'GC-09', titulo:'Clases Asignadas',               pantalla:'clases',            rol:'Profesor' },
];

