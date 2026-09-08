import React from 'react';

const Alert = ({ variant = 'info', children }) => <div className={'alert al-' + variant}>{children}</div>;
export default Alert;
