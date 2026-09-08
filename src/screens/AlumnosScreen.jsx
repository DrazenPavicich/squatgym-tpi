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

export function AlumnosScreen({ role, onNav, onSelect, filtroInicial }){
  const [q, setQ] = useState('');
  const [estado, setEstado] = useState(filtroInicial?.estado || '');
  const [sede, setSede] = useState('');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  React.useEffect(()=>{ if (filtroInicial?.estado) setEstado(filtroInicial.estado); }, [filtroInicial]);
  // Permisos: Admin puede todo (Altas, Bajas, Modificaciones). Secretaria puede Altas y Modificaciones menores. (3.1.1 vs 3.1.11)
  const puedeCrear = role === 'admin' || role === 'secretaria';
  const puedeEditar = role === 'admin' || role === 'secretaria';
  const puedeBorrar = role === 'admin';
  const filtered = ALUMNOS.filter(a => {
    if (estado && a.estado !== estado) return false;
    if (sede && a.sede !== sede) return false;
    if (desde && a.vto < desde) return false;
    if (hasta && a.vto > hasta) return false;
    if (q) {
      const s = (a.ap + ' ' + a.no + ' ' + a.dni + ' ' + a.plan).toLowerCase();
      return s.includes(q.toLowerCase());
    }
    return true;
  });
  const limpiar = () => { setQ(''); setEstado(''); setSede(''); setDesde(''); setHasta(''); };
  return (
    <div className="scr active">
      <PageHeader title={puedeCrear ? 'GESTIÓN DE' : 'CONSULTA DE'} accent="ALUMNOS" sub={puedeCrear ? 'Buscá, filtrá y gestioná el padrón' : 'Vista de solo consulta — Sede Centro'}>
        {puedeCrear && <Btn variant="p" onClick={()=>onNav('form-alumno')}>+ Nuevo Alumno</Btn>}
      </PageHeader>
      <div className="tbl-wrap">
        <div className="tbl-top">
          <div className="srch">
            <input type="text" placeholder="Buscar nombre, DNI, plan..." value={q} onChange={e=>setQ(e.target.value)}/>
            <select value={estado} onChange={e=>setEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              <option>Habilitada</option><option>Deudor</option><option>Inactivo</option>
            </select>
            <select value={sede} onChange={e=>setSede(e.target.value)}>
              <option value="">Todas las sedes</option>
              <option>Centro</option><option>Norte</option>
            </select>
            <label style={{display:'flex',alignItems:'center',gap:'.3rem',fontSize:'.7rem'}}>Vto. desde <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} style={{width:'auto'}}/></label>
            <label style={{display:'flex',alignItems:'center',gap:'.3rem',fontSize:'.7rem'}}>hasta <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} style={{width:'auto'}}/></label>
            <button className="btn-out" onClick={limpiar}>Limpiar</button>
          </div>
        </div>
        <table>
          <thead><tr><th>#</th><th>Alumno</th><th>Plan</th><th>Sede</th><th>Vto.</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtered.map((a,i) => (
              <tr key={a.id}>
                <td>{String(i+1).padStart(3,'0')}</td>
                <td>
                  <div style={{display:'flex', alignItems:'center', gap:'0.8rem'}}>
                    <div className="avatar-sm">{a.no[0]}{a.ap[0]}</div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <strong style={{color:'#FFF'}}>{a.ap}, {a.no}</strong>
                      <span style={{fontSize:'0.75rem', color:'var(--sg-mut)'}}>DNI {a.dni}</span>
                    </div>
                  </div>
                </td>
                <td>{a.plan}</td><td>{a.sede}</td><td>{a.vto}</td>
                <td><Badge variant={a.estado==='Habilitada'?'ok':a.estado==='Deudor'?'err':'mut'}>{a.estado}</Badge></td>
                <td>
                  <button className="ab ab-v" onClick={()=>{ onSelect(a); onNav('ficha-alumno'); }}>Ver</button>
                  {puedeEditar && <button className="ab ab-e" onClick={()=>{ onSelect(a); onNav('form-alumno'); }}>Editar</button>}
                  {puedeBorrar && <button className="ab ab-d" onClick={()=>{ onSelect(a); onNav('baja-alumno'); }}>Baja</button>}
                </td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={8} style={{textAlign:'center',color:'var(--sg-mut)',padding:'1.5rem'}}>Sin resultados con los filtros aplicados.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

