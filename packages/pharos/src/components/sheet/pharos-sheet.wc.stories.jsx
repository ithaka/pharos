import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Sheet',
  component: 'pharos-sheet',
  parameters: {
    docs: {
      page: configureDocsPage('sheet'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: () =>
    html`
      <div>
        <storybook-pharos-button id="my-button" data-sheet-id="my-sheet" icon-right="chevron-down">
          Click Me
        </storybook-pharos-button>
        <storybook-pharos-sheet id="my-sheet" label="Pharos sheet">
          <div>Lorem ipsum dolor sit amet</div>
        </storybook-pharos-sheet>
      </div>
    `,
};
