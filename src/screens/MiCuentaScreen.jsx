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

export function MiCuentaScreen({ onNav, perfil }){
  const isDeudor = perfil === 'deudor';
  return (
    <div className="scr active animate-fade">
      <PageHeader title="MI" accent="CUENTA" sub={isDeudor ? 'Tu cuota está vencida — regularizá tu situación' : 'Estado de pagos'}>
        <Btn variant="s" onClick={()=>onNav('portal')}>← Volver</Btn>
      </PageHeader>

      {isDeudor && (
        <Alert variant="err">⚠️ <strong>Cuota de Marzo 2026 vencida hace 47 días.</strong> Por política del gimnasio (CU GA-07) el acceso a las clases está restringido hasta normalizar el pago. Inscripción a clases nuevas también bloqueada.</Alert>
      )}

      <div className="g3 mb1">
        <Stat label={isDeudor ? 'Vencimiento' : 'Próximo Vto.'} value={isDeudor ? '15/03' : '28/04'} color={isDeudor ? 'err' : 'warn'}/>
        <Stat label={isDeudor ? 'Saldo Adeudado' : 'Último Pago'} value={isDeudor ? '$28.000' : '$35K'} color={isDeudor ? 'err' : 'ok'}/>
        <Stat label="Estado" value={isDeudor ? 'DEUDOR' : 'AL DÍA'} color={isDeudor ? 'err' : 'ok'}/>
      </div>

      {isDeudor && (
        <div className="fsec" style={{borderLeft:'3px solid var(--sg-err)'}}>
          <div className="fsec-t" style={{color:'var(--sg-err)'}}>Restricciones activas en tu cuenta</div>
          <div className="dr"><span className="dr-lbl">Acceso a clases regulares</span><span className="dr-val c-err">✗ Bloqueado</span></div>
          <div className="dr"><span className="dr-lbl">Inscripción a clases nuevas</span><span className="dr-val c-err">✗ Bloqueado</span></div>
          <div className="dr"><span className="dr-lbl">Reserva de turnos</span><span className="dr-val c-err">✗ Bloqueado</span></div>
          <div className="dr"><span className="dr-lbl">Consulta de cronograma</span><span className="dr-val c-ok">✓ Disponible</span></div>
          <div className="dr"><span className="dr-lbl">Declaración jurada</span><span className="dr-val c-ok">✓ Disponible</span></div>
        </div>
      )}

      <div className="tbl-wrap">
        <div className="tbl-top"><div className="tbl-title">Historial de Pagos</div></div>
        <table>
          <thead><tr><th>Fecha</th><th>Concepto</th><th>Monto</th><th>Método</th><th>Estado</th></tr></thead>
          <tbody>
            {isDeudor ? (
              <>
                <tr style={{background:'rgba(232,52,58,.05)'}}><td>15/03/2026</td><td><strong style={{color:'var(--sg-err)'}}>Cuota Marzo (PENDIENTE)</strong></td><td>$28.000</td><td>—</td><td><Badge variant="err">VENCIDA</Badge></td></tr>
                <tr><td>15/02/2026</td><td>Cuota Febrero</td><td>$26.000</td><td>Efectivo</td><td><Badge variant="ok">Pagada</Badge></td></tr>
                <tr><td>15/01/2026</td><td>Cuota Enero</td><td>$24.000</td><td>QR</td><td><Badge variant="ok">Pagada</Badge></td></tr>
              </>
            ) : (
              <>
                <tr><td>28/03/2026</td><td>Cuota Marzo</td><td>$35.000</td><td>Transferencia</td><td><Badge variant="ok">Pagada</Badge></td></tr>
                <tr><td>28/02/2026</td><td>Cuota Febrero</td><td>$32.000</td><td>Efectivo</td><td><Badge variant="ok">Pagada</Badge></td></tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

