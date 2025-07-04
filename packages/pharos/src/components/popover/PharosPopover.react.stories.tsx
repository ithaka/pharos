import { PharosPopover } from '../../react-components/popover/pharos-popover';
import { PharosButton } from '../../react-components/button/pharos-button';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { PharosPopover as PPType } from './pharos-popover';

const meta = {
  title: 'Components/Popover',
  component: PharosPopover,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('popover'),
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover" a11yLabel="Pharos Popover">
        <div style={{ padding: '1rem' }}>Lorem ipsum dolor sit amet</div>
      </PharosPopover>
    </div>
  ),
};

export const Events: Story = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover" a11yLabel="Pharos Popover">
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem' }}>Lorem ipsum dolor sit amet</div>
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              if (menu) {
                (menu as PPType).open = false;
              }
            }}
          >
            Close
          </PharosButton>
        </div>
      </PharosPopover>
    </div>
  ),
};

export const DarkPopover: Story = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover" is-on-background a11yLabel="Pharos Popover">
        <div
          style={{
            background: '#444444',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ padding: '1rem' }}>Lorem ipsum dolor sit amet</div>
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              if (menu) {
                (menu as PPType).open = false;
              }
            }}
          >
            Close
          </PharosButton>
        </div>
      </PharosPopover>
    </div>
  ),
};

export const DarkPopoverOnBackground: Story = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover" a11yLabel="Pharos Popover">
        <div
          style={{
            background: '#444444',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ padding: '1rem' }}>Lorem ipsum dolor sit amet</div>
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              if (menu) {
                (menu as PPType).open = false;
              }
            }}
          >
            Close
          </PharosButton>
        </div>
      </PharosPopover>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const LargeContents: Story = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover" a11yLabel="Large Pharos Popover">
        <div
          style={{
            padding: '1rem',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h2>Large Pharos Popover</h2>
          <div
            style={{
              height: '200px',
              overflow: 'auto',
              border: '1px solid black',
              padding: '1rem',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </div>
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              if (menu) {
                (menu as PPType).open = false;
              }
            }}
          >
            Close
          </PharosButton>
        </div>
      </PharosPopover>
    </div>
  ),
};
