import { action } from 'storybook/actions';
import { useEffect } from 'storybook/preview-api';
import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { PharosDropdownMenu } from './pharos-dropdown-menu';
import type { PharosButton } from '../button/pharos-button';

const meta = {
  title: 'Components/Dropdown Menu',
  component: 'pharos-dropdown-menu',
  subcomponents: { PharosDropdownMenuItem: 'pharos-dropdown-menu-item' },
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu') },
    options: { selectedPanel: 'addon-controls' },
    chromatic: { delay: 800 },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
      <storybook-pharos-button
        id="my-button"
        data-dropdown-menu-id="my-menu"
        icon-right="chevron-down"
        >Click Me</storybook-pharos-button
      >
      <storybook-pharos-dropdown-menu id="my-menu">
        <storybook-pharos-dropdown-menu-item>Menu item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Menu item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Menu item 3</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
    </div>
  `,
  args: defaultArgs,
};

export const Events: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
      <storybook-pharos-button
        id="my-button-events"
        data-dropdown-menu-id="my-menu-events"
        icon-right="chevron-down"
      >
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-dropdown-menu
        id="my-menu-events"
        show-selected
        @pharos-dropdown-menu-select="${(e: CustomEvent) => action('Select')(e.detail)}"
        @pharos-dropdown-menu-selected="${(e: CustomEvent) => action('Selected')(e.detail)}"
      >
        <storybook-pharos-dropdown-menu-item>Menu item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Menu item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Menu item 3</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
    </div>
  `,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Icons: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const withIconsButton = document.querySelector('#my-button-icons');
          if (withIconsButton) {
            (withIconsButton as HTMLElement).click();
          }
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-button
          id="my-button-icons"
          data-dropdown-menu-id="my-menu-icons"
          icon-right="chevron-down"
        >
          With icons
        </storybook-pharos-button>
        <storybook-pharos-dropdown-menu id="my-menu-icons" show-selected>
          <storybook-pharos-dropdown-menu-item icon="view-gallery"
            >Item one</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item icon="view-list" selected
            >Item two</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item icon="image"
            >Item three</storybook-pharos-dropdown-menu-item
          >
        </storybook-pharos-dropdown-menu>
      </div>
    `;
  },
};

export const Descriptions: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const withIconsButton = document.querySelector('#my-button-descriptions');
          if (withIconsButton) {
            (withIconsButton as HTMLElement).click();
          }
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-button
          id="my-button-descriptions"
          data-dropdown-menu-id="my-menu-descriptions"
          icon-right="chevron-down"
        >
          With descriptions
        </storybook-pharos-button>
        <storybook-pharos-dropdown-menu id="my-menu-descriptions" show-selected>
          <storybook-pharos-dropdown-menu-item selected>
            Item 1
            <span slot="description">Description for item 1</span>
          </storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item>
            Item 2
            <span slot="description">Description for item 2</span>
          </storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item>
            Item 3
            <span slot="description">Description for item 3</span>
          </storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item>
            Item 4
            <span slot="description">Description for item 4</span>
          </storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item disabled>
            Disabled
            <span slot="description">This item has been disabled</span>
          </storybook-pharos-dropdown-menu-item>
        </storybook-pharos-dropdown-menu>
      </div>
    `;
  },
};

export const FullWidth: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const withIconsButton = document.querySelector('#my-button-full');
          if (withIconsButton) {
            (withIconsButton as HTMLElement).click();
          }
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-button
          id="my-button-full"
          data-dropdown-menu-id="my-menu-full"
          icon-right="chevron-down"
        >
          With attribute full-width to match the width of the trigger
        </storybook-pharos-button>
        <storybook-pharos-dropdown-menu id="my-menu-full" full-width>
          <storybook-pharos-dropdown-menu-item>
            Use full-width to display lengthy text
          </storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item>
            <span style="white-space: normal">
              Even if longer text is placed in the item, it will span multiple lines to keep the
              width of the item the same size as the trigger
            </span>
          </storybook-pharos-dropdown-menu-item>
        </storybook-pharos-dropdown-menu>
      </div>
    `;
  },
};

export const IsOnBackground: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const withIconsButton = document.querySelector('#my-button-on-background');
          if (withIconsButton) {
            (withIconsButton as HTMLElement).click();
          }
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-button
          id="my-button-on-background"
          data-dropdown-menu-id="my-menu-on-background"
          icon-right="chevron-down"
        >
          A menu on background
        </storybook-pharos-button>
        <storybook-pharos-dropdown-menu id="my-menu-on-background" show-selected is-on-background>
          <storybook-pharos-dropdown-menu-item selected>
            Item One
          </storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item> Item Two </storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item disabled>
            Item Three
          </storybook-pharos-dropdown-menu-item>
        </storybook-pharos-dropdown-menu>
      </div>
    `;
  },
};

export const Links: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const link = document.querySelector('#my-link');
          if (link) {
            (link as HTMLElement).dispatchEvent(new Event('mouseenter'));
          }
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-link
          id="my-link"
          href="https://www.google.com/"
          target="_blank"
          data-dropdown-menu-id="my-menu-links"
          data-dropdown-menu-hover
        >
          With links
        </storybook-pharos-link>
        <storybook-pharos-dropdown-menu id="my-menu-links">
          <storybook-pharos-dropdown-menu-item
            link="https://www.youtube.com/watch?v=gkTb9GP9lVI"
            target="_blank"
            >Menu item 1</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item
            link="https://www.youtube.com/watch?v=ZXsQAXx_ao0"
            target="_blank"
            >Menu item 2</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item
            link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            >Menu item 3</storybook-pharos-dropdown-menu-item
          >
        </storybook-pharos-dropdown-menu>
      </div>
    `;
  },
};

export const MultipleTriggers: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, auto); grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;"
    >
      <storybook-pharos-button data-dropdown-menu-id="my-menu-multiple" icon-right="chevron-down">
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-dropdown-menu id="my-menu-multiple">
        <storybook-pharos-dropdown-menu-item>Item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 3</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 4</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 5</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
      <storybook-pharos-button
        data-dropdown-menu-id="my-menu-multiple"
        data-dropdown-menu-hover
        icon-right="chevron-down"
      >
        Hover here
      </storybook-pharos-button>
      <storybook-pharos-button data-dropdown-menu-id="my-menu-multiple" icon-right="chevron-down">
        Click Me Too
      </storybook-pharos-button>
    </div>
  `,
};

export const MultipleDynamicTriggers: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, auto); grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;"
    >
      <storybook-pharos-dropdown-menu id="my-menu-multiple-dynamic-triggers">
        <storybook-pharos-dropdown-menu-item>Item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 3</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
      <storybook-pharos-button
        @click="${(e: MouseEvent) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          if (menu && trigger) {
            (menu as PharosDropdownMenu).openWithTrigger(trigger as PharosButton);
          }
        }}"
      >
        One
      </storybook-pharos-button>
      <storybook-pharos-button
        @click="${(e: MouseEvent) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          if (menu && trigger) {
            (menu as PharosDropdownMenu).openWithTrigger(trigger as PharosButton);
          }
        }}"
      >
        Two
      </storybook-pharos-button>
      <storybook-pharos-button
        @click="${(e: MouseEvent) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          if (menu && trigger) {
            (menu as PharosDropdownMenu).openWithTrigger(trigger as PharosButton);
          }
        }}"
      >
        Three
      </storybook-pharos-button>
    </div>
  `,
};

export const Composition: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const withIconsButton = document.querySelector('#my-button-composition');
          if (withIconsButton) {
            (withIconsButton as HTMLElement).click();
          }
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-button
          id="my-button-composition"
          data-dropdown-menu-id="my-menu-composition"
          icon-right="chevron-down"
        >
          Save
        </storybook-pharos-button>
        <storybook-pharos-dropdown-menu id="my-menu-composition">
          <div
            style="padding: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--pharos-dropdown-menu-item-color-border-base)"
          >
            <storybook-pharos-heading level="1" preset="2">Save to...</storybook-pharos-heading>
          </div>
          <storybook-pharos-dropdown-menu-item>Workspace</storybook-pharos-dropdown-menu-item>
          <div style="margin: 0.5rem 1rem; display: flex; flex-grow: 1; flex-direction: column;">
            <storybook-pharos-text-input
              hide-label
              placeholder="New folder name"
              style="margin: 0.5rem 0"
              ><span slot="label">My label is hidden</span></storybook-pharos-text-input
            >
            <div style="display: flex; align-items: center;">
              <storybook-pharos-button
                type="button"
                style="margin-right: auto"
                @click="${() => {
                  const menu = document.querySelector('pharos-dropdown-menu');
                  if (menu) {
                    (menu as PharosDropdownMenu).open = false;
                  }
                }}"
              >
                Create
              </storybook-pharos-button>
              <storybook-pharos-button
                type="button"
                variant="secondary"
                style="margin-left: auto"
                @click="${() => {
                  const menu = document.querySelector('pharos-dropdown-menu');
                  if (menu) {
                    (menu as PharosDropdownMenu).open = false;
                  }
                }}"
              >
                Cancel
              </storybook-pharos-button>
            </div>
          </div>
        </storybook-pharos-dropdown-menu>
      </div>
    `;
  },
};

export const CoordinatingDropdowns: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
      <storybook-pharos-button
        id="coordinating-dropdown-trigger-button"
        data-dropdown-menu-id="first-dropdown"
      >
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-dropdown-menu
        id="first-dropdown"
        @pharos-dropdown-menu-selected="${() => {
          const triggerElement = document.querySelector('#coordinating-dropdown-trigger-button');
          const secondDropdown = document.querySelector('#second-dropdown');
          if (secondDropdown) {
            (secondDropdown as PharosDropdownMenu).openWithTrigger(triggerElement as PharosButton);
          }
        }}"
      >
        <storybook-pharos-dropdown-menu-item>Click</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>any of these</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>options</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
      <storybook-pharos-dropdown-menu
        id="second-dropdown"
        @pharos-dropdown-menu-closed="${() => {
          const secondDropdown = document.querySelector('#second-dropdown');
          if (secondDropdown) {
            (secondDropdown as PharosDropdownMenu).removeAllTriggers();
          }
        }}"
      >
        <storybook-pharos-dropdown-menu-item>I am</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>a new</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>dropdown!</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
    </div>
  `,
};
