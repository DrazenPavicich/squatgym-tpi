import React from 'react';

export const PageHeader = ({ title, accent, sub, children }) => (
  <div className="ph">
    <div>
      <div className="ph-title">{title} <span>{accent}</span></div>
      {sub && <div className="ph-sub">{sub}</div>}
    </div>
    {children && <div className="flex gap1">{children}</div>}
  </div>
);
