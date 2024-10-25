import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Forms/Switch',
  component: 'pharos-switch',
  parameters: {
    docs: {
      page: configureDocsPage('switch'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) =>
    html`<storybook-pharos-switch
      ><span slot="label">Toggle Switch</span></storybook-pharos-switch
    >`,
  args: {},
};
