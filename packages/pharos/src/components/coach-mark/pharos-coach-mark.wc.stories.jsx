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
  render: (args) =>
    html` <div
        style="border:1px solid #eae8e1;padding:20px;width:fit-content"
        data-coach-mark="example-coachmark"
      >
        Lorem Ipsum
      </div>
      <storybook-pharos-coach-mark ?hide=${false}></storybook-pharos-coach-mark>`,
  args: {},
};

export const Hidden = {
  render: (args) => html`<storybook-pharos-coach-mark ?hide=${true}></storybook-pharos-coach-mark>`,
  args: {},
};
