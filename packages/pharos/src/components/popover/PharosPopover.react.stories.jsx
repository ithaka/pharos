import { PharosPopover } from '../../react-components/popover/pharos-popover';
import { PharosButton } from '../../react-components/button/pharos-button';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
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
};

export const Base = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover">
        <div style="padding: 1rem">Some very simple contents</div>
      </PharosPopover>
    </div>
  ),
};

export const Events = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover">
        <div style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem;">Some very simple contents</div>
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
            }}
          >
            Close
          </PharosButton>
        </div>
      </PharosPopover>
    </div>
  ),
};

export const DarkPopover = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover" is-on-background>
        <div style="background: #444444; color: white; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem">Some very simple contents</div>
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
            }}
          >
            Close
          </PharosButton>
        </div>
      </PharosPopover>
    </div>
  ),
};

export const DarkPopoverOnBackground = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover">
        <div style="background: #444444; color: white; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem">Some very simple contents</div>
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
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

export const LargeContents = {
  render: () => (
    <div>
      <PharosButton id="my-button" data-popover-id="my-popover" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosPopover id="my-popover">
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
          <PharosButton
            onClick={() => {
              const menu = document.querySelector('storybook-pharos-popover');
              menu.open = false;
            }}
          >
            Close
          </PharosButton>
        </div>
      </PharosPopover>
    </div>
  ),
};
