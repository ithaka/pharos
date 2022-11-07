import { action } from '@storybook/addon-actions';
import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Loading Spinner',
  component: 'pharos-loading-spinner',
  parameters: {
    docs: { page: configureDocsPage('loading-spinner') },
    options: { selectedPanel: 'addon-controls' },
    chromatic: { disable: true },
  },
};

export const Base = {
  render: (_) =>
    html`
      <pharos-loading-spinner></pharos-loading-spinner>
      <pharos-heading level="1" preset="5">Loading spinner demonstration</pharos-heading>
      <pharos-button @click="${() => action('Click')('Clicked')}">Can't press me!</pharos-button>
    `,
};

export const Scoped = {
  render: (_) =>
    html`
      <div style="height: 5rem; width: 5rem; border: 1px solid black; position: relative;">
        <pharos-loading-spinner></pharos-loading-spinner>
      </div>
    `,
};
