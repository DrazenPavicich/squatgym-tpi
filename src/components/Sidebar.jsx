import React from 'react';
import { NAV_BY_ROLE } from '../data/roles.js';

export const Sidebar = ({ role, active, onNav }) => {
  const nav = NAV_BY_ROLE[role] || NAV_BY_ROLE.admin;
  return (
    <aside className="sidebar">
      {nav.map((sec, i) => (
        <React.Fragment key={i}>
          <div className="sb-section">{sec.section}</div>
          {sec.items.map(([key, ico, label]) => (
            <button type="button" key={key} className={'sb-item' + (active === key ? ' active' : '')} onClick={() => onNav(key)} aria-current={active === key ? 'page' : undefined}>
              <span className="sb-ico">{ico}</span>
              <span>{label}</span>
            </button>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
};
