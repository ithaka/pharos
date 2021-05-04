import type { FC } from 'react';
import type { HistoryRow, ScheduledRow, HistoryTable, ScheduledTable } from '../types';

import { PharosButton } from '../../../react-components/button/pharos-button';

export const ReportsTable: FC<HistoryTable | ScheduledTable> = ({ rows, columns }) => {
  const isHistory = !Object.keys(rows[0]).includes('frequency');
  const label = isHistory ? 'history' : 'scheduled';
  const tableCols = () => {
    return isHistory ? (
      <colgroup>
        <col style={{ width: '30%' }} />
        <col />
        <col />
        <col style={{ width: '25%' }} />
        <col />
      </colgroup>
    ) : (
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '30%' }} />
        <col />
        <col />
      </colgroup>
    );
  };
  return (
    <table className="reports-page__table">
      {tableCols()}
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th className="reports-page__table-header" key={`${label}header${index}`}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: HistoryRow | ScheduledRow, index: number) => {
          return (
            <tr className="reports-page__table-row" key={`${label}row${index}`}>
              {Object.keys(row).map((field) => {
                const value = row[field as keyof HistoryRow & keyof ScheduledRow];
                if (Array.isArray(value)) {
                  return (
                    <td
                      className="reports-page__table-cell"
                      key={`${label}${field}arr-cell${index}`}
                    >
                      {value.map((item, index) => (
                        <p key={`${label}text${index}`}>{item}</p>
                      ))}
                    </td>
                  );
                }
                return (
                  <td className="reports-page__table-cell" key={`${label}${field}cell${index}`}>
                    {value}
                  </td>
                );
              })}
              {isHistory ? (
                <td className="reports-page__table-cell--download">
                  <PharosButton
                    variant="secondary"
                    onClick={() => {
                      const event = new CustomEvent('pharos-toast-open', {
                        detail: {
                          status: 'error',
                          content:
                            'Sorry, we were unable to process your download. Please try again later. If the issue persists, <pharos-link href="#" on-background bold>contact JSTOR Support</pharos-link>.',
                        },
                      });
                      document.dispatchEvent(event);
                    }}
                  >
                    Download
                  </PharosButton>
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
