import React from 'react';
import { ROLES } from '../data/roles.js';
import { printPage } from '../utils/helpers.js';

export const Topbar = ({ role, perfil, onLogout, onHome }) => {
  const r = ROLES[role];
  const userLabel = (role === 'alumno' && perfil === 'deudor') ? 'carlos.lopez@squatgym.com' : r.user;
  return (
    <div className="topbar">
      <div className="logo" onClick={onHome}>SQUAT<span>GYM</span></div>
      <div className="topbar-r">
        <span className="role-badge">{r.label}{role==='alumno' && perfil==='deudor' ? ' · DEUDOR' : ''}</span>
        <span className="user-label">{userLabel}</span>
        <button className="btn-out" onClick={printPage}>Imprimir</button>
        <button className="btn-out" onClick={onLogout}>Salir</button>
      </div>
    </div>
  );
};
