import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Popover',
  component: 'pharos-popover',
  parameters: {
    docs: {
      page: configureDocsPage('popover'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => html`<storybook-pharos-popover></storybook-pharos-popover>`,
  args: {},
};
