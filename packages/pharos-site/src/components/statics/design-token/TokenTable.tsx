import { tokenTable } from './TokenTable.module.css';
import { useEffect, useState } from 'react';

export const TokenTable = (
  title: string,
  content: JSX.Element,
  subtitle?: JSX.Element
): JSX.Element => {
  const [StateTable, setStateTable] = useState<JSX.Element>(<></>);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosHeading } = Pharos;
    const table = (
      <div>
        <PharosHeading level={1} preset={'6'}>
          {title}
        </PharosHeading>
        {subtitle ? <div>{subtitle}</div> : null}
        <table className={tokenTable}>{content}</table>
        <br />
        <br />
      </div>
    );
    setStateTable(table);
  }, [Pharos, title, content, subtitle]);

  return StateTable;
};
