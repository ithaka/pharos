import { action } from 'storybook/actions';

import {
  PharosDropdownMenu,
  PharosDropdownMenuItem,
  PharosHeading,
  PharosTextInput,
  PharosLink,
  PharosButton,
} from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PharosButton as PBType } from '../button/pharos-button';
import type { PharosDropdownMenu as PDMType } from './pharos-dropdown-menu';

const meta = {
  title: 'Components/Dropdown Menu',
  component: PharosDropdownMenu,
  subcomponents: { PharosDropdownMenuItem },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu') },
    options: { selectedPanel: 'addon-controls' },
    chromatic: { delay: 800 },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton data-dropdown-menu-id="my-menu">Click Me</PharosButton>
      <PharosDropdownMenu id="my-menu">
        <PharosDropdownMenuItem>Menu item 1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Menu item 2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Menu item 3</PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
};

export const Events: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton data-dropdown-menu-id="my-menu-events" iconRight="chevron-down">
        Click Me
      </PharosButton>
      <PharosDropdownMenu
        id="my-menu-events"
        showSelected
        onPharos-Dropdown-Menu-Select={(e) => action('Select')(e.detail)}
        onPharos-Dropdown-Menu-Selected={(e) => action('Selected')(e.detail)}
      >
        <PharosDropdownMenuItem>Menu item 1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Menu item 2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Menu item 3</PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
  parameters: {
    options: { selectedPanel: 'storybook/actions/panel' },
  },
};

export const Icons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton
        id="my-button-icons"
        data-dropdown-menu-id="my-menu-icons"
        iconRight="chevron-down"
      >
        With icons
      </PharosButton>
      <PharosDropdownMenu id="my-menu-icons" showSelected>
        <PharosDropdownMenuItem icon="view-gallery">Item one</PharosDropdownMenuItem>
        <PharosDropdownMenuItem icon="view-list" selected>
          Item two
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem icon="image">Item three</PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
};

export const Descriptions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton
        id="my-button-descriptions"
        data-dropdown-menu-id="my-menu-descriptions"
        iconRight="chevron-down"
      >
        With descriptions
      </PharosButton>
      <PharosDropdownMenu id="my-menu-descriptions" showSelected>
        <PharosDropdownMenuItem selected>
          Item 1<span slot="description">Description for item 1</span>
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem>
          Item 2<span slot="description">Description for item 2</span>
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem>
          Item 3<span slot="description">Description for item 3</span>
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem>
          Item 4<span slot="description">Description for item 4</span>
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem disabled>
          Disabled
          <span slot="description">This item has been disabled</span>
        </PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton
        id="my-button-full"
        data-dropdown-menu-id="my-menu-full"
        iconRight="chevron-down"
      >
        With attribute fullWidth to match the width of the trigger
      </PharosButton>
      <PharosDropdownMenu id="my-menu-full" fullWidth>
        <PharosDropdownMenuItem>
          <span style={{ whiteSpace: 'normal' }}>Use full-width to display lengthy text</span>
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem>
          <span style={{ whiteSpace: 'normal' }}>
            Even if longer text is placed in the item, it will span multiple lines to keep the width
            of the item the same size as the trigger
          </span>
        </PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
};

export const IsOnBackground: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton
        id="my-button-on-background"
        data-dropdown-menu-id="my-menu-on-background"
        iconRight="chevron-down"
      >
        A menu on background
      </PharosButton>
      <PharosDropdownMenu id="my-menu-on-background" show-selected is-on-background>
        <PharosDropdownMenuItem selected>Item One</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item Two</PharosDropdownMenuItem>
        <PharosDropdownMenuItem disabled>Item Three</PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
};

export const Links: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosLink
        id="my-link"
        href="https://www.google.com/"
        target="_blank"
        data-dropdown-menu-id="my-menu-links"
        data-dropdown-menu-hover
      >
        With links
      </PharosLink>
      <PharosDropdownMenu id="my-menu-links">
        <PharosDropdownMenuItem link="https://www.youtube.com/watch?v=gkTb9GP9lVI" target="_blank">
          Menu item 1
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem link="https://www.youtube.com/watch?v=ZXsQAXx_ao0" target="_blank">
          Menu item 2
        </PharosDropdownMenuItem>
        <PharosDropdownMenuItem link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          Menu item 3
        </PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
};

export const MultipleTriggers: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton data-dropdown-menu-id="my-menu-multiple" iconRight="chevron-down">
        Click Me
      </PharosButton>
      <PharosDropdownMenu id="my-menu-multiple">
        <PharosDropdownMenuItem>Item 1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 3</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 4</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 5</PharosDropdownMenuItem>
      </PharosDropdownMenu>
      <PharosButton
        data-dropdown-menu-id="my-menu-multiple"
        data-dropdown-menu-hover
        iconRight="chevron-down"
      >
        Hover here
      </PharosButton>
      <PharosButton data-dropdown-menu-id="my-menu-multiple" iconRight="chevron-down">
        Click Me Too
      </PharosButton>
    </div>
  ),
};

export const MultipleDynamicTriggers: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosDropdownMenu id="my-menu-multiple-dynamic-triggers">
        <PharosDropdownMenuItem>Item 1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 3</PharosDropdownMenuItem>
      </PharosDropdownMenu>
      <PharosButton
        onClick={(e) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          if (menu && trigger) { (menu as PDMType).openWithTrigger(trigger as PBType); }
        }}
      >
        One
      </PharosButton>
      <PharosButton
        onClick={(e) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          if (menu && trigger) { (menu as PDMType).openWithTrigger(trigger as PBType); }
        }}
      >
        Two
      </PharosButton>
      <PharosButton
        onClick={(e) => {
          const trigger = e.target;
          const menu = document.querySelector('#my-menu-multiple-dynamic-triggers');
          if (menu && trigger) { (menu as PDMType).openWithTrigger(trigger as PBType); }
        }}
      >
        Three
      </PharosButton>
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton
        id="my-button"
        data-dropdown-menu-id="my-menu-composition"
        iconRight="chevron-down"
      >
        Save
      </PharosButton>
      <PharosDropdownMenu id="my-menu-composition">
        <div
          style={{
            padding: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--pharos-dropdown-menu-item-color-border-base)',
          }}
        >
          <PharosHeading level={1} preset={'2'}>Save to...</PharosHeading>
        </div>
        <PharosDropdownMenuItem>Workspace</PharosDropdownMenuItem>
        <div
          style={{
            margin: '0.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
          }}
        >
          <PharosTextInput
            hideLabel
            placeholder="New folder name"
            style={{
              margin: '0.5rem 0',
            }}
          >
            <span slot="label">My label is hidden</span>
          </PharosTextInput>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PharosButton
              type="button"
              style={{
                marginRight: 'auto',
              }}
              onClick={() => {
                const menu = document.querySelector('pharos-dropdown-menu');
                if (menu) { (menu as PDMType).open = false; }
              }}
            >
              Create
            </PharosButton>
            <PharosButton
              type="button"
              variant="secondary"
              style={{
                marginLeft: 'auto',
              }}
              onClick={() => {
                const menu = document.querySelector('pharos-dropdown-menu');
                if (menu) { (menu as PDMType).open = false; }
              }}
            >
              Cancel
            </PharosButton>
          </div>
        </div>
      </PharosDropdownMenu>
    </div>
  ),
};

export const CoordinatingDropdowns: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton
        id="coordinating-dropdown-trigger-button"
        data-dropdown-menu-id="first-dropdown"
      >
        Click Me
      </PharosButton>
      <PharosDropdownMenu
        id="first-dropdown"
        onPharos-Dropdown-Menu-Select={() => {
          const triggerElement = document.querySelector('#coordinating-dropdown-trigger-button');
          const secondDropdown = document.querySelector('#second-dropdown');
          if (secondDropdown && triggerElement) { (secondDropdown as PDMType).openWithTrigger(triggerElement as PBType); }
        }}
      >
        <PharosDropdownMenuItem>Click</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>any of these</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>options</PharosDropdownMenuItem>
      </PharosDropdownMenu>
      <PharosDropdownMenu
        id="second-dropdown"
        onPharos-Dropdown-Menu-Closed={() => {
          const secondDropdown = document.querySelector('#second-dropdown');
          if (secondDropdown) { (secondDropdown as PDMType).removeAllTriggers(); }
        }}
      >
        <PharosDropdownMenuItem>I am</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>a new</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>dropdown!</PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </div>
  ),
};
