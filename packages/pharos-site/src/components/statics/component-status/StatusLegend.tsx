import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import StatusIcon from './StatusIcon';
import {
  legend__border,
  legend__cell,
  legend__statusName,
  legend__statusDescription,
  legend__table,
} from './StatusLegend.module.css';
import legend from '../../../pages/components/component-status/legend.json';

const StatusLegend: FC = () => {
  const [StateLegend, setStateLegend] = useState<ReactElement[] | null>(null);

  useEffect(() => {
    const allStatuses = Object.keys(legend).map((key, i) => {
      return (
        <tr key={i} className={legend__border}>
          <td className={`${legend__cell}`}>
            <StatusIcon status={key} />
            <div className={legend__statusName}>{`${legend[key as keyof typeof legend].name}`}</div>
          </td>
          <td className={legend__statusDescription}>{`${
            legend[key as keyof typeof legend].description
          }`}</td>
        </tr>
      );
    });

    setStateLegend(allStatuses);
  }, []);

  return (
    <table className={legend__table}>
      <tbody>{StateLegend}</tbody>
    </table>
  );
};

export default StatusLegend;
