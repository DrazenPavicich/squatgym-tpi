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

export function FormAlumnoScreen({ onNav, alumno }){
  const [step, setStep] = useState(1);
  const editing = !!alumno;
  return (
    <div className="scr active animate-fade">
      <PageHeader title={editing ? 'EDITAR' : 'ALTA DE'} accent="ALUMNO" sub={editing ? `${alumno.ap}, ${alumno.no}` : 'Inscripción paso a paso'}>
        <Btn variant="s" onClick={()=>onNav('alumnos')}>← Cancelar</Btn>
      </PageHeader>
      
      <div className="wizard-steps">
        <div className={`step ${step>=1?'active':''} ${step>1?'done':''}`}>
          <div className="step-num">{step>1?'✓':'1'}</div><div className="step-lbl">Personales</div>
        </div>
        <div className={`step ${step>=2?'active':''} ${step>2?'done':''}`}>
          <div className="step-num">{step>2?'✓':'2'}</div><div className="step-lbl">Plan</div>
        </div>
        <div className={`step ${step>=3?'active':''} ${step>3?'done':''}`}>
          <div className="step-num">{step>3?'✓':'3'}</div><div className="step-lbl">Salud</div>
        </div>
      </div>

      {step === 1 && (
        <FormSection title="1. Datos personales">
          <div className="fr">
            <FormField label="Apellido"><input defaultValue={alumno?.ap||''} placeholder="Pérez"/></FormField>
            <FormField label="Nombre"><input defaultValue={alumno?.no||''} placeholder="Juan"/></FormField>
          </div>
          <div className="fr3">
            <FormField label="DNI"><input defaultValue={alumno?.dni||''} placeholder="40.123.456"/></FormField>
            <FormField label="Fecha Nac."><input type="date"/></FormField>
            <FormField label="Teléfono"><input placeholder="+54 362..."/></FormField>
          </div>
          <div className="fr">
            <FormField label="Email"><input type="email" placeholder="alumno@correo.com"/></FormField>
            <FormField label="Sede"><select defaultValue={alumno?.sede||'Centro'}><option>Centro</option><option>Norte</option><option>Ambas</option></select></FormField>
          </div>
          <div className="fr3" style={{marginTop:'0.8rem'}}>
            <FormField label="Peso (kg)"><input type="number" step="0.1" placeholder="Ej: 75.5"/></FormField>
            <FormField label="Estatura (cm)"><input type="number" placeholder="Ej: 175"/></FormField>
            <FormField label="Autorización Menor"><input type="file" accept="application/pdf,image/*" title="Requerido para menores de 18 años"/></FormField>
          </div>
          <div className="fr" style={{marginTop:'0.8rem', gridTemplateColumns:'1fr'}}>
            <FormField label="Antecedentes de salud relevantes"><textarea placeholder="Alergias, lesiones previas, patologías o condiciones a tener en cuenta..." rows="2" style={{resize:'none', width:'100%'}}></textarea></FormField>
          </div>
        </FormSection>
      )}

      {step === 2 && (
        <FormSection title="2. Plan y promoción (3.1.2 / 3.1.13c)">
          <div className="fr3">
            <FormField label="Plan / Actividad"><select defaultValue={alumno?.plan||'Musculación'}><option>Full Access</option><option>Musculación</option><option>Zumba</option><option>Kickboxing</option><option>CrossFit</option><option>Spinning</option></select></FormField>
            <FormField label="Cupón / Promoción"><input placeholder="VERANO20"/></FormField>
            <FormField label="Vto. cuota"><input type="date" defaultValue={alumno?.vto||''}/></FormField>
          </div>
        </FormSection>
      )}

      {step === 3 && (
        <FormSection title="3. Declaración Jurada de Salud (3.1.11b / 3.1.28)">
          <div style={{display:'flex',flexDirection:'column',gap:'.4rem',fontSize:'.88rem'}}>
            <label style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'none',letterSpacing:0,fontSize:'.88rem',fontWeight:400}}><input type="checkbox" style={{width:'auto'}}/> Declaro estar en condiciones físicas para realizar actividad.</label>
            <label style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'none',letterSpacing:0,fontSize:'.88rem',fontWeight:400}}><input type="checkbox" style={{width:'auto'}}/> No padezco enfermedades cardiovasculares ni respiratorias.</label>
            <label style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'none',letterSpacing:0,fontSize:'.88rem',fontWeight:400}}><input type="checkbox" style={{width:'auto'}}/> Acepto los términos y condiciones del gimnasio.</label>
          </div>
          <div className="fr" style={{marginTop:'.7rem'}}>
            <FormField label="Certificado médico (PDF/JPG)"><input type="file" accept="application/pdf,image/*"/></FormField>
            <FormField label="Firma digital"><input placeholder="Tipear nombre y apellido"/></FormField>
          </div>
          <Alert variant="info" style={{marginTop:'1rem', marginBottom:'0'}}>El sistema validará si el DNI ya existe (3.1.11c).</Alert>
        </FormSection>
      )}

      <div className="factions">
        {step > 1 && <Btn variant="s" onClick={()=>setStep(s=>s-1)}>Atrás</Btn>}
        {step < 3 ? (
          <Btn variant="p" onClick={()=>setStep(s=>s+1)}>Siguiente paso</Btn>
        ) : (
          <Btn variant="p" onClick={()=>{ notify('Alumno guardado exitosamente.', 'ok'); onNav('alumnos'); }}>Finalizar y Guardar</Btn>
        )}
      </div>
    </div>
  );
}

// Ficha Alumno — vista detallada (consulta) con accesos a Cuenta e Historial
