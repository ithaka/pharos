import type { FC } from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  vSpace?: number;
  hSpace?: number;
  bottom?: number;
  align?: string;
  justify?: string;
  minContent?: boolean;
  justifyContent?: string;
}

const Grid: FC<GridProps> = ({
  children,
  columns = 2,
  vSpace = 1.5,
  hSpace = 1.5,
  bottom = 5,
  align = 'stretch',
  justify,
  minContent,
  justifyContent = 'normal',
}) => {
  const style = {
    display: 'grid',
    columnGap: `${hSpace}rem`,
    rowGap: `${vSpace}rem`,
    gridTemplateColumns: `repeat(${columns}, ${minContent ? 'min-content' : '1fr'})`,
    marginBottom: `${bottom}rem`,
    alignItems: align,
    justifyItems: justify,
    justifyContent,
  };

  return <div style={style}>{children}</div>;
};

export default Grid;
