import React from 'react';

const Badge = ({ variant = 'mut', children }) => <span className={'badge b-' + variant}>{children}</span>;
export default Badge;
