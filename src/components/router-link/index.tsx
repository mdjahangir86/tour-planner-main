import React from 'react';
import { Link } from 'react-router-dom';

interface RouterLinkProps {
  children: React.ReactNode;
  to: string;
  style?: object;
}

function RouterLink({ children, to = '/', style }: RouterLinkProps) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

RouterLink.defaultProps = {
  style: {},
};

export default RouterLink;
