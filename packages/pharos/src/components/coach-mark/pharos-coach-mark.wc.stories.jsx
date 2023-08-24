import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/CoachMark',
  component: 'pharos-coach-mark',
  parameters: {
    docs: {
      page: configureDocsPage('coach-mark'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => html`<storybook-pharos-coach-mark></storybook-pharos-coach-mark>`,
  args: {},
};
