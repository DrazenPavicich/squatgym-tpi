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

export function RegistrarPagoScreen({ onNav, alumno }){
  const a = alumno || ALUMNOS[0];
  const [monto, setMonto] = useState(35000);
  const [metodo, setMetodo] = useState('Transferencia');
  const [promoId, setPromoId] = useState('');
  const promosActivas = PROMOS.filter(p => p.estado === 'Activa');
  const promo = promosActivas.find(p => String(p.id) === promoId);
  const descuento = promo ? Math.round(monto * promo.valor / 100) : 0;
  const total = monto - descuento;

  return (
    <div className="scr active animate-fade">
      <PageHeader title="REGISTRAR" accent="PAGO" sub={`Cuota de ${a.ap}, ${a.no} — CU GA-05 / GA-06`}>
        <Btn variant="s" onClick={()=>onNav('pagos')}>← Volver</Btn>
      </PageHeader>

      <div className="g3 mb1">
        <Stat label="Alumno" value={a.no.split(' ')[0].toUpperCase()} color="acc"/>
        <Stat label="Plan" value={a.plan.split(' ')[0].toUpperCase()} color="ok"/>
        <Stat label="Estado" value={a.estado==='Deudor'?'DEUDOR':'AL DÍA'} color={a.estado==='Deudor'?'err':'ok'}/>
      </div>

      <FormSection title="Datos del Pago">
        <div className="fr">
          <FormField label="Concepto"><input defaultValue={`Cuota ${new Date().toLocaleDateString('es-AR',{month:'long',year:'numeric'})}`}/></FormField>
          <FormField label="Fecha de pago"><input type="date" defaultValue={new Date().toISOString().slice(0,10)}/></FormField>
        </div>
        <div className="fr">
          <FormField label="Monto base ($)"><input type="number" value={monto} onChange={e=>setMonto(Number(e.target.value)||0)}/></FormField>
          <FormField label="Método de pago">
            <select value={metodo} onChange={e=>setMetodo(e.target.value)}>
              <option>Efectivo</option><option>Transferencia</option><option>QR / Mercado Pago</option><option>Débito</option><option>Crédito</option>
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection title="Aplicar Promoción / Descuento (CU GA-06)">
        <div className="fr">
          <FormField label="Promoción vigente">
            <select value={promoId} onChange={e=>setPromoId(e.target.value)}>
              <option value="">— Sin promoción —</option>
              {promosActivas.map(p => (
                <option key={p.id} value={p.id}>{p.codigo} — {p.descripcion} ({p.valor}%)</option>
              ))}
            </select>
          </FormField>
          <FormField label="Vigencia">
            <input disabled value={promo ? `${promo.vigDesde} → ${promo.vigHasta}` : 'Seleccione una promoción'}/>
          </FormField>
        </div>
        {promo && (
          <Alert variant="info">🏷️ Se aplicará <strong>{promo.codigo}</strong> ({promo.valor}% de descuento) por <strong>{promo.descripcion}</strong>.</Alert>
        )}
      </FormSection>

      <div className="fsec" style={{borderLeft:'3px solid var(--sg-acc)'}}>
        <div className="fsec-t">Resumen</div>
        <div className="dr"><span className="dr-lbl">Subtotal</span><span className="dr-val">$ {monto.toLocaleString('es-AR')}</span></div>
        <div className="dr"><span className="dr-lbl">Descuento aplicado</span><span className="dr-val c-acc">– $ {descuento.toLocaleString('es-AR')}</span></div>
        <div className="dr" style={{paddingTop:'.8rem'}}>
          <span className="dr-lbl" style={{fontSize:'.9rem',color:'#FFF'}}>TOTAL A COBRAR</span>
          <span className="dr-val" style={{fontFamily:'var(--sg-ff-display)',fontSize:'1.8rem',color:'var(--sg-ok)'}}>$ {total.toLocaleString('es-AR')}</span>
        </div>
      </div>

      <div className="factions">
        <Btn variant="s" onClick={()=>onNav('pagos')}>Cancelar</Btn>
        <Btn variant="ok" onClick={()=>{ notify(`Pago registrado: $${total.toLocaleString('es-AR')} (${metodo}). Comprobante emitido.`, 'ok'); onNav('pagos'); }}>✓ Confirmar y emitir comprobante</Btn>
      </div>
    </div>
  );
}

// CU GA-06: ABM de Promociones / Descuentos
