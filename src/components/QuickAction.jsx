import React from 'react';

const QuickAction = ({ ico, title, desc, onClick }) => (
  <button type="button" className="qa" onClick={onClick} aria-label={title}>
    <div className="qa-ico">{ico}</div><div className="qa-title">{title}</div>
    {desc && <div className="qa-desc">{desc}</div>}
  </button>
);
export default QuickAction;
