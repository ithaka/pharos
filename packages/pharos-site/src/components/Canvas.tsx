import type { FC } from 'react';

const Canvas: FC = ({ children }) => {
  const style = {
    margin: '1.875rem 0rem',
  };

  return <div style={style}>{children}</div>;
};

export default Canvas;
