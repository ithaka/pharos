import { tokenTable } from './TokenTable.module.css';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

interface TokenTableProps {
  title?: string;
  subtitle?: string;
}

export const TokenTable: FC<TokenTableProps> = ({ title, subtitle, children }) => {
  const [StateTable, setStateTable] = useState(<></>);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosHeading } = Pharos;
    const table = (
      <div>
        {title ? (
          <PharosHeading level={1} preset={'6'}>
            {title}
          </PharosHeading>
        ) : null}
        {subtitle ? <div>{subtitle}</div> : null}
        <table className={tokenTable}>{children}</table>
        <br />
        <br />
      </div>
    );
    setStateTable(table);
  }, [Pharos, title, subtitle, children]);

  return StateTable;
};
