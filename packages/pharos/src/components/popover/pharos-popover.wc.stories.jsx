import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

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
  render: () =>
    html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-button
          id="my-button"
          data-dropdown-menu-id="my-popover"
          icon-right="chevron-down"
        >
          Click Me
        </storybook-pharos-button>
        <storybook-pharos-popover id="my-popover">
          Some very simple contents2
        </storybook-pharos-popover>
      </div>
    `,
  args: defaultArgs,
};
