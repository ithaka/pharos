import { action } from '@storybook/addon-actions';
import { useEffect } from '@storybook/preview-api';
import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Components/Dropdown Menu',
  component: 'pharos-dropdown-menu',
  subcomponents: { PharosDropdownMenuItem: 'pharos-dropdown-menu-item' },
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu') },
    options: { selectedPanel: 'addon-controls' },
    chromatic: { delay: 800 },
  },
};

export const Base = {
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

export const Events = {
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
        @pharos-dropdown-menu-select="${(e) => action('Select')(e.detail)}"
        @pharos-dropdown-menu-selected="${(e) => action('Selected')(e.detail)}"
      >
        <storybook-pharos-dropdown-menu-item>Menu item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Menu item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Menu item 3</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
    </div>
  `,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const Icons = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#my-button-icons').click();
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

export const Descriptions = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#my-button-descriptions').click();
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

export const FullWidth = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#my-button-full').click();
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

export const IsOnBackground = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#my-button-on-background').click();
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

export const Links = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#my-link').dispatchEvent(new Event('mouseenter'));
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

export const MultipleTriggers = {
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

export const MultipleDynamicTriggers = {
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
        @click="${(e) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          menu.openWithTrigger(trigger);
        }}"
      >
        One
      </storybook-pharos-button>
      <storybook-pharos-button
        @click="${(e) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          menu.openWithTrigger(trigger);
        }}"
      >
        Two
      </storybook-pharos-button>
      <storybook-pharos-button
        @click="${(e) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          menu.openWithTrigger(trigger);
        }}"
      >
        Three
      </storybook-pharos-button>
    </div>
  `,
};

export const Composition = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#my-button-composition').click();
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
                  menu.open = false;
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
                  menu.open = false;
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

export const CoordinatingDropdowns = {
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
          secondDropdown.openWithTrigger(triggerElement);
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
          secondDropdown.removeAllTriggers();
        }}"
      >
        <storybook-pharos-dropdown-menu-item>I am</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>a new</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>dropdown!</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
    </div>
  `,
};
