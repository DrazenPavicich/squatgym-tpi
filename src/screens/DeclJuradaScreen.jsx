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

export function DeclJuradaScreen({ onNav }){
  const [editar, setEditar] = useState(false);
  return (
    <div className="scr active">
      <PageHeader title="DECLARACIÓN" accent="JURADA" sub="Estado de salud (3.1.28)">
        <Btn variant="s" onClick={()=>onNav('portal')}>← Volver</Btn>
        {!editar && <Btn variant="p" onClick={()=>setEditar(true)}>Actualizar</Btn>}
      </PageHeader>
      {!editar ? (
        <>
          <div className="profile-box" style={{background:'linear-gradient(135deg, rgba(34,197,94,.1), transparent)'}}>
            <div style={{color:'var(--sg-ok)',fontSize:'2rem'}}>✓</div>
            <div>
              <div className="profile-name" style={{color:'var(--sg-ok)'}}>Declaración activa</div>
              <div className="profile-sub">Vencimiento: 12/08/2027</div>
            </div>
          </div>
          <div className="fsec">
            <div className="fsec-t">Última declaración</div>
            <div className="dr"><span className="dr-lbl">Fecha de firma</span><span className="dr-val">12/08/2026</span></div>
            <div className="dr"><span className="dr-lbl">Certificado médico</span><span className="dr-val c-ok">Adjunto (PDF)</span></div>
            <div className="dr"><span className="dr-lbl">Apto físico</span><span className="dr-val c-ok">Sí</span></div>
          </div>
        </>
      ) : (
        <>
          <FormSection title="Formulario digital de salud">
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem',fontSize:'.88rem'}}>
              <label style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'none',letterSpacing:0,fontSize:'.88rem',fontWeight:400}}><input type="checkbox" defaultChecked style={{width:'auto'}}/> Declaro estar en condiciones físicas para realizar actividad.</label>
              <label style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'none',letterSpacing:0,fontSize:'.88rem',fontWeight:400}}><input type="checkbox" defaultChecked style={{width:'auto'}}/> No padezco enfermedades cardiovasculares ni respiratorias.</label>
              <label style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'none',letterSpacing:0,fontSize:'.88rem',fontWeight:400}}><input type="checkbox" style={{width:'auto'}}/> Tomo medicación regularmente.</label>
              <label style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'none',letterSpacing:0,fontSize:'.88rem',fontWeight:400}}><input type="checkbox" defaultChecked style={{width:'auto'}}/> Acepto los términos y condiciones.</label>
            </div>
            <div className="fr" style={{marginTop:'.7rem'}}>
              <FormField label="Certificado médico (3.1.28b)"><input type="file" accept="application/pdf,image/*"/></FormField>
              <FormField label="Firma digital"><input placeholder="Carlos Andrés López"/></FormField>
            </div>
          </FormSection>
          <div className="factions">
            <Btn variant="s" onClick={()=>setEditar(false)}>Cancelar</Btn>
            <Btn variant="p" onClick={()=>{ notify('Declaración guardada correctamente.', 'ok'); setEditar(false); }}>Guardar</Btn>
          </div>
        </>
      )}
    </div>
  );
}

// (Pantallas Horas/Observaciones eliminadas: 3.1.22 y 3.1.23 están fuera del alcance del módulo, según nota del documento)

