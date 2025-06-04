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
  render: () => html`
    <div>
      <storybook-pharos-button
        id="my-button"
        data-popover-id="my-popover"
        icon-right="chevron-down"
      >
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-popover id="my-popover" a11y-label="Pharos popover">
        <div style="padding: 1rem;">Lorem ipsum dolor sit amet</div>
      </storybook-pharos-popover>
    </div>
  `,
};

export const Events = {
  render: () => html`
    <div>
      <storybook-pharos-button
        id="my-button"
        data-popover-id="my-popover"
        icon-right="chevron-down"
      >
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-popover id="my-popover" a11y-label="Pharos popover">
        <div style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <span>Lorem ipsum dolor sit amet</span>
          <storybook-pharos-button
            @click="${() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
            }}"
          >
            Close
          </storybook-pharos-button>
        </div>
      </storybook-pharos-popover>
    </div>
  `,
};

export const DarkPopover = {
  render: () => html`
    <div>
      <storybook-pharos-button
        id="my-button"
        data-popover-id="my-popover"
        icon-right="chevron-down"
      >
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-popover id="my-popover" is-on-background a11y-label="Pharos popover">
        <div
          style="background: #444444; color: white; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;"
        >
          <span id="popover-content">Lorem ipsum dolor sit amet</span>
          <storybook-pharos-button
            is-on-background
            @click="${() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
            }}"
          >
            Close
          </storybook-pharos-button>
        </div>
      </storybook-pharos-popover>
    </div>
  `,
};

export const DarkPopoverOnBackground = {
  render: () => html`
    <div>
      <storybook-pharos-button
        id="my-button"
        data-popover-id="my-popover"
        icon-right="chevron-down"
        is-on-background
      >
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-popover id="my-popover" a11y-label="Pharos popover">
        <div
          style="background: #444444; color: white; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;"
        >
          <span>Lorem ipsum dolor sit amet</span>
          <storybook-pharos-button
            is-on-background
            @click="${() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
            }}"
          >
            Close
          </storybook-pharos-button>
        </div>
      </storybook-pharos-popover>
    </div>
  `,
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const LargeContents = {
  render: () => html`
    <div>
      <storybook-pharos-button
        id="my-button"
        data-popover-id="my-popover"
        icon-right="chevron-down"
      >
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-popover id="my-popover" a11y-label="Large Pharos Popover">
        <div style="padding: 1rem; width: 300px; display: flex; flex-direction: column; gap: 1rem;">
          <storybook-pharos-heading level="2">Large Pharos Popover</storybook-pharos-heading>
          <div
            style="height: 200px; overflow: auto; border: 1px solid black; padding: 1rem;"
            tabindex="0"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </div>
          <storybook-pharos-button
            @click="${() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
            }}"
          >
            Close
          </storybook-pharos-button>
        </div>
      </storybook-pharos-popover>
    </div>
  `,
};
