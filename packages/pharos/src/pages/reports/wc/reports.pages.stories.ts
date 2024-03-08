import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../reports.scss';
import { viewports, breakpoints } from '../../shared/viewports';
import { ReportsExample } from './reports-example';

export default {
  title: 'Pages/Reports',
  parameters: {
    chromatic: { viewports: breakpoints },
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
};
export const Reports = (): TemplateResult => {
  customElements.define('reports-example', ReportsExample);
  return html`<reports-example></reports-example>`;
};
