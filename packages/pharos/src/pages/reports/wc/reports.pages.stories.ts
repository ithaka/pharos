import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../reports.scss';
import { viewports, breakpoints } from '../../shared/viewports';
import './reports-example.ts';

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
  return html`<reports-example></reports-example>`;
};
