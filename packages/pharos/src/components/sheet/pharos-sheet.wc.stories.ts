import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Sheet',
  component: 'pharos-sheet',
  parameters: {
    docs: {
      page: configureDocsPage('sheet'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => html`
    <div>
      <storybook-pharos-button id="my-button" data-sheet-id="my-sheet" icon-right="chevron-down">
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-sheet id="my-sheet">
        <div>Lorem ipsum dolor sit amet</div>
      </storybook-pharos-sheet>
    </div>
  `,
};

export const WithClose: Story = {
  render: () => html`
    <div>
      <storybook-pharos-button id="my-button" data-sheet-id="my-sheet" icon-right="chevron-down">
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-sheet id="my-sheet" has-close>
        <div>Lorem ipsum dolor sit amet</div>
      </storybook-pharos-sheet>
    </div>
  `,
};

export const Expanded: Story = {
  render: () => html`
    <div>
      <storybook-pharos-button id="my-button" data-sheet-id="my-sheet" icon-right="chevron-down">
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-sheet id="my-sheet" expanded>
        <div>Lorem ipsum dolor sit amet</div>
      </storybook-pharos-sheet>
    </div>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <div>
      <storybook-pharos-button id="my-button" data-sheet-id="my-sheet" icon-right="chevron-down">
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-sheet id="my-sheet">
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>Lorem ipsum dolor sit amet</div>
      </storybook-pharos-sheet>
    </div>
  `,
};

export const OmitOverlay: Story = {
  render: () => html`
    <div>
      <storybook-pharos-button id="my-button" data-sheet-id="my-sheet" icon-right="chevron-down">
        Click Me
      </storybook-pharos-button>
      <storybook-pharos-sheet id="my-sheet" omit-overlay start-height="100px" expanded-height="700px">
        <div>Lorem ipsum dolor sit amet</div>
      </storybook-pharos-sheet>
    </div>
  `,
};

