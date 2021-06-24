import { tokenTable } from './TokenTable.module.css';
import { useEffect, useState } from 'react';

export const TokenTable = (props: any) => {
  const [StateTable, setStateTable] = useState(<></>);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;
  const { title, subtitle, children } = props;

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
