import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { HistoryRow, ScheduledRow, HistoryTable, ScheduledTable } from '../types';

import '../../../components/button/pharos-button';

export const ReportsTable = (table: HistoryTable | ScheduledTable): TemplateResult => {
  const isHistory = !Object.keys(table.rows[0]).includes('frequency');
  const tableCols = () => {
    return isHistory
      ? html`<colgroup>
          <col style="width: 30%" />
          <col />
          <col />
          <col style="width: 25%" />
          <col />
        </colgroup>`
      : html`<colgroup>
          <col style="width: 30%" />
          <col style="width: 30%" />
          <col />
          <col />
        </colgroup>`;
  };

  return html`
    <table class="reports-page__table">
      ${tableCols()}
      <thead>
        <tr>
          ${table.columns.map(
            (column) => html` <th class="reports-page__table-header">${column}</th> `
          )}
        </tr>
      </thead>
      <tbody>
        ${table.rows.map((row: HistoryRow | ScheduledRow) => {
          return html`
            <tr class="reports-page__table-row">
              ${Object.keys(row).map((field) => {
                const value = row[field as keyof HistoryRow & keyof ScheduledRow];
                if (Array.isArray(value)) {
                  return html`
                    <td class="reports-page__table-cell">
                      ${value.map((item) => html`<p>${item}</p>`)}
                    </td>
                  `;
                }
                return html`<td class="reports-page__table-cell">${value}</td>`;
              })}
              ${isHistory
                ? html`<td class="reports-page__table-cell--download">
                    <pharos-button
                      variant="secondary"
                      @click="${() => {
                        const event = new CustomEvent('pharos-toast-open', {
                          detail: {
                            status: 'error',
                            content:
                              'Sorry, we were unable to process your download. Please try again later. If the issue persists, <pharos-link href="#" on-background bold>contact JSTOR Support</pharos-link>.',
                          },
                        });
                        document.dispatchEvent(event);
                      }}"
                      >Download</pharos-button
                    >
                  </td>`
                : null}
            </tr>
          `;
        })}
      </tbody>
    </table>
  `;
};
