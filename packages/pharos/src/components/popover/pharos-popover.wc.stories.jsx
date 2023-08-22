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
  render: () =>
    html`
      <div>
        <storybook-pharos-button
          id="my-button"
          data-popover-id="my-popover"
          icon-right="chevron-down"
        >
          Click Me
        </storybook-pharos-button>
        <storybook-pharos-popover id="my-popover">
          <div style="padding: 1rem;">Some very simple contents</div>
        </storybook-pharos-popover>
      </div>
    `,
};

export const Events = {
  render: () =>
    html`
      <div>
        <storybook-pharos-button
          id="my-button"
          data-popover-id="my-popover"
          icon-right="chevron-down"
        >
          Click Me
        </storybook-pharos-button>
        <storybook-pharos-popover id="my-popover">
          <div style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
            <span>Some really cool stuff</span>
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
  render: () =>
    html`
      <div>
        <storybook-pharos-button
          id="my-button"
          data-popover-id="my-popover"
          icon-right="chevron-down"
        >
          Click Me
        </storybook-pharos-button>
        <storybook-pharos-popover id="my-popover" is-on-background>
          <div
            style="background: #444444; color: white; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;"
          >
            <span>Some really cool stuff</span>
            <storybook-pharos-button
              on-background
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
  render: () =>
    html`
      <div>
        <storybook-pharos-button
          id="my-button"
          data-popover-id="my-popover"
          icon-right="chevron-down"
          on-background
        >
          Click Me
        </storybook-pharos-button>
        <storybook-pharos-popover id="my-popover">
          <div
            style="background: #444444; color: white; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;"
          >
            <span>Some really cool stuff</span>
            <storybook-pharos-button
              on-background
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
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const LargeContents = {
  render: () =>
    html`
      <div>
        <storybook-pharos-button
          id="my-button"
          data-popover-id="my-popover"
          icon-right="chevron-down"
        >
          Click Me
        </storybook-pharos-button>
        <storybook-pharos-popover id="my-popover">
          <div style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="height: 200px; overflow: auto; border: 1px solid black; padding: 1rem;">
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
              <div>Some really cool stuff</div>
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
