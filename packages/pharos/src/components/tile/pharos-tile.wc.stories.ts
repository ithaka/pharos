import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Tile',
  component: 'pharos-tile',
  argTypes,
  parameters: {
    docs: { page: configureDocsPage('tile') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-tile
      title=${ifDefined(args.title)}
      description=${ifDefined(args.description)}
      icon=${ifDefined(args.icon)}
      label=${ifDefined(args.label)}
      href=${ifDefined(args.href)}
      heading-level=${ifDefined(args.headingLevel)}
      ?disabled=${args.disabled}
    ></storybook-pharos-tile>
  `,
  args: defaultArgs,
};

export const IconWithTitle: Story = {
  render: () => html`
    <storybook-pharos-tile
      href="#"
      icon="gen-ai"
      title="Seeklight Management"
      description="Enable generation on project fields. Configure metadata generation output."
    ></storybook-pharos-tile>
  `,
};

export const IconAboveTitle: Story = {
  name: 'Icon above title (header slot)',
  render: () => html`
    <storybook-pharos-tile
      href="#"
      title="Title"
      label="Label text"
      description="1-2 lines of descriptive, yet simple text"
    >
      <storybook-pharos-icon slot="header" name="gear" a11y-hidden="true"></storybook-pharos-icon>
    </storybook-pharos-tile>
  `,
};

export const CustomLabel: Story = {
  name: 'Custom label (label slot)',
  render: () => html`
    <storybook-pharos-tile
      href="#"
      title="Preservation"
      description="Enable preservation in Portico"
    >
      <storybook-pharos-icon
        slot="label"
        name="checkmark-filled-circle"
        a11y-title="Enabled"
      ></storybook-pharos-icon>
    </storybook-pharos-tile>
  `,
};

export const WithFooter: Story = {
  render: () => html`
    <storybook-pharos-tile
      href="#"
      title="Preservation"
      description="Enable preservation in Portico"
    >
      <span slot="footer" style="color: var(--pharos-color-feedback-error)"
        >Preservation disabled</span
      >
    </storybook-pharos-tile>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <storybook-pharos-tile
      href="#"
      title="Preservation"
      description="Enable preservation in Portico"
      icon="gear"
      disabled
    ></storybook-pharos-tile>
  `,
};

export const CustomContent: Story = {
  name: 'Custom content (pricing)',
  render: () => html`
    <storybook-pharos-tile hide-indicator>
      <span slot="header">Regular plan</span>
      <storybook-pharos-icon
        slot="label"
        name="checkmark-filled-circle"
        a11y-title="Current plan"
      ></storybook-pharos-icon>
      <span slot="title"><strong>$19</strong> / month</span>
      <ul
        style="list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--pharos-color-marble-gray-80); display: grid; gap: var(--pharos-spacing-one-quarter-x); padding-top: var(--pharos-spacing-one-half-x);"
      >
        <li style="display: flex; gap: var(--pharos-spacing-one-quarter-x); align-items: center;">
          <storybook-pharos-icon name="checkmark-small" a11y-hidden="true"></storybook-pharos-icon
          >10 PDF downloads / month
        </li>
        <li style="display: flex; gap: var(--pharos-spacing-one-quarter-x); align-items: center;">
          <storybook-pharos-icon name="checkmark-small" a11y-hidden="true"></storybook-pharos-icon
          >Unlimited reading and saving online
        </li>
        <li style="display: flex; gap: var(--pharos-spacing-one-quarter-x); align-items: center;">
          <storybook-pharos-icon name="checkmark-small" a11y-hidden="true"></storybook-pharos-icon
          >Cancel anytime
        </li>
      </ul>
    </storybook-pharos-tile>
  `,
};

export const FlexLayout: Story = {
  name: 'Layout: flexbox',
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: var(--pharos-spacing-1-x);">
      <storybook-pharos-tile
        style="flex: 1 1 200px;"
        href="#"
        title="Preservation"
        description="Enable preservation in Portico"
      ></storybook-pharos-tile>
      <storybook-pharos-tile
        style="flex: 1 1 200px;"
        href="#"
        icon="gen-ai"
        title="Seeklight Management"
        description="Enable generation on project fields. Configure metadata generation output."
      ></storybook-pharos-tile>
      <storybook-pharos-tile
        style="flex: 1 1 200px;"
        href="#"
        title="Interpretive"
        description="Derives historical framing and draw connections beyond what is literally visible in the item"
      ></storybook-pharos-tile>
    </div>
  `,
};

export const SquareTiles: Story = {
  name: 'Layout: square tiles',
  render: () => html`
    <style>
      .square-tiles {
        display: flex;
        flex-wrap: wrap;
        gap: var(--pharos-spacing-1-x);
      }

      .square-tiles storybook-pharos-tile {
        flex: none;
        width: 200px;
        aspect-ratio: 1;
        min-width: 0;
      }
    </style>
    <div class="square-tiles">
      <storybook-pharos-tile
        href="#"
        title="Preservation"
        description="Enable preservation in Portico"
      ></storybook-pharos-tile>
      <storybook-pharos-tile
        href="#"
        icon="gen-ai"
        title="Seeklight"
        description="Enable generation on project fields"
      ></storybook-pharos-tile>
      <storybook-pharos-tile
        href="#"
        title="Interpretive"
        description="Derives historical framing"
      ></storybook-pharos-tile>
    </div>
  `,
};
