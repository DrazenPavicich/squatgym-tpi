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

export function ReportesScreen(){
  const [sede, setSede] = useState('');
  const [plan, setPlan] = useState('');
  const planOptions = Array.from(new Set(ALUMNOS.map(a => a.plan)));

  const filteredAlumnos = ALUMNOS.filter(a =>
    (sede ? a.sede === sede : true) &&
    (plan ? a.plan === plan : true)
  );

  const selectedClasses = CLASES.filter(c =>
    (sede ? c.sede === sede : true) &&
    (plan ? (plan === 'Full Access' ? true : c.nombre === plan) : true)
  );

  const totalRevenue = filteredAlumnos.reduce((sum, alumno) => {
    const priceMap = {
      'Full Access': 45000,
      'Musculación': 32000,
      'Zumba': 31000,
      'Kickboxing': 33000,
      'Spinning': 30000,
      'CrossFit': 34000,
    };
    return sum + (priceMap[alumno.plan] || 30000);
  }, 0);

  const totalCapacity = selectedClasses.reduce((sum, clase) => sum + clase.capacidad, 0);
  const totalInscriptos = selectedClasses.reduce((sum, clase) => sum + clase.inscriptos, 0);
  const asistencia = selectedClasses.length ? Math.round((totalInscriptos / totalCapacity) * 100) : 0;
  const ocupacion = selectedClasses.length ? Math.round((selectedClasses.filter(c => c.inscriptos / c.capacidad >= 0.75).length / selectedClasses.length) * 100) : 0;

  const formatMoney = value => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="scr active">
      <PageHeader title="REPORTES Y" accent="ESTADÍSTICAS" sub="KPIs de gestión">
        <Btn variant="p" onClick={()=>downloadCSV('squatgym-reporte.csv', [['Alumno','DNI','Plan','Sede','Vencimiento','Estado'], ...filteredAlumnos.map(a=>[`${a.ap}, ${a.no}`,a.dni,a.plan,a.sede,a.vto,a.estado])])}>Exportar CSV</Btn>
        <Btn variant="s" onClick={printPage}>Imprimir</Btn>
      </PageHeader>

      <div className="srch mb1" style={{display:'flex',gap:'1rem',alignItems:'center',flexWrap:'wrap'}}>
        <select value={sede} onChange={e => setSede(e.target.value)}>
          <option value="">Todas las sedes</option>
          {Array.from(new Set(ALUMNOS.map(a => a.sede))).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={plan} onChange={e => setPlan(e.target.value)}>
          <option value="">Todos los planes</option>
          {planOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="g3 mb1">
        <Stat label="Total recaudado" value={formatMoney(totalRevenue)} color="acc"/>
        <Stat label="Asistencia" value={`${asistencia}%`} color="ok"/>
        <Stat label="Ocupación" value={`${ocupacion}%`} color="warn"/>
      </div>
    </div>
  );
}

