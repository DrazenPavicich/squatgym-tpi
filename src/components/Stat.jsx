import React from 'react';

const Stat = ({ label, value, color }) => (
  <div className="stat"><div className="stat-lbl">{label}</div><div className={'stat-val' + (color ? ' c-' + color : '')}>{value}</div></div>
);
export default Stat;
