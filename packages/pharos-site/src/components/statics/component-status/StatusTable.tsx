import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import StatusIcon from './StatusIcon';
import {
  table__row,
  table__cell,
  status__description,
  table,
  table__header,
} from './StatusTable.module.css';
import legend from '../../../pages/components/component-status/legend.json';
import statuses from '../../../pages/components/component-status/status.json';

const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, function (g) {
    return ' ' + g[1].toUpperCase();
  });
};

const StatusTable: FC = () => {
  const [StateTable, setStateTable] = useState<ReactElement[] | null>(null);

  const columns = ['Component', 'Design', 'Development', 'Tests', 'Documentation', 'Released In'];

  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosLink } = Pharos;

    const allComponentStatuses = Object.keys(statuses).map((key, i) => {
      const name = key.charAt(0).toUpperCase() + key.slice(1);

      return (
        <tr key={i} className={table__row}>
          <td className={table__cell}>
            {statuses[key as keyof typeof statuses].documentation.status === 'released' ? (
              <PharosLink href={`/components/${key}`}>{toCamelCase(name)}</PharosLink>
            ) : (
              toCamelCase(name)
            )}
          </td>
          {Object.keys(statuses[key as keyof typeof statuses]).map((lifecycle, j) => {
            const component = statuses[key as keyof typeof statuses];
            const status = component[lifecycle as keyof typeof component].status;
            const description = component[lifecycle as keyof typeof component].description;

            return (
              <td key={j} className={table__cell}>
                {legend[status as keyof typeof legend] ? (
                  <StatusIcon status={status} index={`${i}` + `${j}`} />
                ) : (
                  <strong>{status}</strong>
                )}
                {description ? <span className={status__description}>{description}</span> : null}
              </td>
            );
          })}
        </tr>
      );
    });

    setStateTable(allComponentStatuses);
  }, [setStateTable, Pharos]);

  return (
    <table className={table}>
      <thead>
        <tr>
          {columns.map((column, id) => {
            return (
              <th key={id} className={table__header}>
                {column}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{StateTable}</tbody>
    </table>
  );
};

export default StatusTable;
