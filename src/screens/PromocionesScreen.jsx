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

export function PromocionesScreen({ onNav }){
  const [filtroEstado, setFiltroEstado] = useState('');
  const [editando, setEditando] = useState(null);
  const [nueva, setNueva] = useState(false);
  const lista = PROMOS.filter(p => !filtroEstado || p.estado === filtroEstado);

  if (nueva || editando) {
    const p = editando || { codigo:'', descripcion:'', tipo:'porcentaje', valor:10, vigDesde:'', vigHasta:'', estado:'Activa' };
    return (
      <div className="scr active animate-fade">
        <PageHeader title={editando ? 'EDITAR' : 'NUEVA'} accent="PROMOCIÓN" sub="Beneficio aplicable al cobrar (CU GA-06)">
          <Btn variant="s" onClick={()=>{ setNueva(false); setEditando(null); }}>← Volver</Btn>
        </PageHeader>
        <FormSection title="Datos de la promoción">
          <div className="fr">
            <FormField label="Código"><input defaultValue={p.codigo} placeholder="VERANO20" style={{textTransform:'uppercase'}}/></FormField>
            <FormField label="Descripción"><input defaultValue={p.descripcion} placeholder="Descuento de Verano"/></FormField>
          </div>
          <div className="fr3">
            <FormField label="Tipo">
              <select defaultValue={p.tipo}><option value="porcentaje">Porcentaje (%)</option><option value="fijo">Monto fijo ($)</option></select>
            </FormField>
            <FormField label="Valor"><input type="number" defaultValue={p.valor}/></FormField>
            <FormField label="Estado">
              <select defaultValue={p.estado}><option>Activa</option><option>Vencida</option><option>Suspendida</option></select>
            </FormField>
          </div>
          <div className="fr">
            <FormField label="Vigencia desde"><input type="date" defaultValue={p.vigDesde}/></FormField>
            <FormField label="Vigencia hasta"><input type="date" defaultValue={p.vigHasta}/></FormField>
          </div>
        </FormSection>
        <div className="factions">
          <Btn variant="s" onClick={()=>{ setNueva(false); setEditando(null); }}>Cancelar</Btn>
          <Btn variant="p" onClick={()=>{ notify('Promoción guardada correctamente.', 'ok'); setNueva(false); setEditando(null); }}>Guardar</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="scr active animate-fade">
      <PageHeader title="PROMOCIONES Y" accent="DESCUENTOS" sub="Beneficios vigentes — CU GA-06">
        <Btn variant="p" onClick={()=>setNueva(true)}>+ Nueva Promoción</Btn>
      </PageHeader>

      <div className="g4 mb1">
        <Stat label="Activas" value={PROMOS.filter(p=>p.estado==='Activa').length} color="ok"/>
        <Stat label="Vencidas" value={PROMOS.filter(p=>p.estado==='Vencida').length} color="err"/>
        <Stat label="Aplicadas Mes" value="42" color="acc"/>
        <Stat label="Ahorro Total" value="$ 187K" color="warn"/>
      </div>

      <div className="tbl-wrap">
        <div className="tbl-top">
          <div className="tbl-title">Listado de Promociones</div>
          <div className="srch">
            <select value={filtroEstado} onChange={e=>setFiltroEstado(e.target.value)}>
              <option value="">Todas</option><option>Activa</option><option>Vencida</option><option>Suspendida</option>
            </select>
          </div>
        </div>
        <table>
          <thead><tr><th>Código</th><th>Descripción</th><th>Tipo</th><th>Valor</th><th>Vigencia</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {lista.map(p => (
              <tr key={p.id}>
                <td><strong style={{color:'var(--sg-acc)',fontFamily:'var(--sg-ff-display)',letterSpacing:'.04em'}}>{p.codigo}</strong></td>
                <td>{p.descripcion}</td>
                <td>{p.tipo === 'porcentaje' ? '%' : '$'}</td>
                <td><strong>{p.tipo==='porcentaje'?`${p.valor}%`:`$${p.valor.toLocaleString('es-AR')}`}</strong></td>
                <td style={{fontSize:'.78rem',color:'var(--sg-mut)'}}>{p.vigDesde} → {p.vigHasta}</td>
                <td><Badge variant={p.estado==='Activa'?'ok':p.estado==='Vencida'?'err':'warn'}>{p.estado}</Badge></td>
                <td>
                  <button className="ab ab-e" onClick={()=>setEditando(p)}>✎ Editar</button>
                  <button className="ab ab-d" onClick={()=>notify(`Promoción "${p.codigo}" suspendida.`, 'ok')}>✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// CU GA-14: Inasistencias Frecuentes — alerta automática del sistema
