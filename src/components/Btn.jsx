import React from 'react';

const Btn = ({ variant = 'p', children, ...props }) => {
  const cls = { p: 'btn btn-p', s: 'btn btn-s', d: 'btn btn-d', ok: 'btn btn-ok' }[variant] || 'btn btn-s';
  return <button className={cls} {...props}>{children}</button>;
};
export default Btn;
