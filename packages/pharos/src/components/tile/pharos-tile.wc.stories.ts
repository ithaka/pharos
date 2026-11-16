import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  defaultArgs,
  argTypesWC,
  headerIconStyle,
  headerLabelStyle,
  headerRowStyle,
  headerStackStyle,
  type ComponentArgs,
  type StoryArgs,
} from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import registerStorybookComponents from '../../utils/_storybook/registerStorybookComponents';
import { PharosTile } from './pharos-tile';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosHeading } from '../heading/pharos-heading';

registerStorybookComponents([PharosTile, PharosIcon, PharosHeading]);

const meta = {
  title: 'Components/Tile',
  component: 'pharos-tile',
  argTypes: argTypesWC,
  parameters: {
    docs: { page: configureDocsPage('tile') },
    options: { selectedPanel: 'addon-controls' },
    controls: {
      exclude: ['hideIndicator', 'indicatorPosition', 'indicatorIcon', 'hideLabel', 'hide-label'],
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

const listStyle =
  'list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--pharos-color-marble-gray-80); display: grid; gap: var(--pharos-spacing-one-quarter-x); padding-top: var(--pharos-spacing-one-half-x);';
const listItemStyle =
  'display: flex; gap: var(--pharos-spacing-one-quarter-x); align-items: center;';

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-tile
      href=${ifDefined(args.href)}
      .disabled=${args.disabled}
      .indicatorPosition=${args['indicator-position'] ?? 'bottom-end'}
      .hideIndicator=${args['hide-indicator'] ?? args.hideIndicator}
    >
      <storybook-pharos-icon
        slot="header"
        name="gear"
        a11y-hidden="true"
        style=${headerIconStyle}
      ></storybook-pharos-icon>
      <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
        >Preservation</storybook-pharos-heading
      >
      <span slot="header" style=${headerLabelStyle}>Beta</span>
      Enable preservation in Portico
    </storybook-pharos-tile>
  `,
  args: defaultArgs,
};

export const IconWithTitle: Story = {
  render: () => html`
    <storybook-pharos-tile href="#">
      <storybook-pharos-icon
        slot="header"
        name="gen-ai"
        a11y-hidden="true"
        style=${headerIconStyle}
      ></storybook-pharos-icon>
      <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
        >Seeklight Management</storybook-pharos-heading
      >
      Enable generation on project fields. Configure metadata generation output.
    </storybook-pharos-tile>
  `,
};

export const CustomIndicator: Story = {
  name: 'Custom indicator icon',
  render: () => html`
    <storybook-pharos-tile
      href="https://example.com"
      target="_blank"
      indicator-icon="link-external"
    >
      <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
        >Open the documentation</storybook-pharos-heading
      >
      The icon replaces the arrow on a link tile
    </storybook-pharos-tile>
  `,
};

export const IconAboveTitle: Story = {
  name: 'Icon above title',
  render: () => html`
    <storybook-pharos-tile href="#">
      <div slot="header" style=${headerStackStyle}>
        <div style=${headerRowStyle}>
          <storybook-pharos-icon name="gear" a11y-hidden="true"></storybook-pharos-icon>
          <span style=${headerLabelStyle}>Label text</span>
        </div>
        <storybook-pharos-heading level="3" preset="2" no-margin>Title</storybook-pharos-heading>
      </div>
      1-2 lines of descriptive, yet simple text
    </storybook-pharos-tile>
  `,
};

export const CustomLabel: Story = {
  name: 'Custom label',
  render: () => html`
    <storybook-pharos-tile href="#">
      <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
        >Preservation</storybook-pharos-heading
      >
      <storybook-pharos-icon
        slot="header"
        name="checkmark-inverse"
        a11y-title="Enabled"
        style=${headerLabelStyle}
      ></storybook-pharos-icon>
      Enable preservation in Portico
    </storybook-pharos-tile>
  `,
};

export const WithFooter: Story = {
  render: () => html`
    <storybook-pharos-tile href="#">
      <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
        >Preservation</storybook-pharos-heading
      >
      Enable preservation in Portico
      <span slot="footer" style="color: var(--pharos-color-feedback-error)"
        >Preservation disabled</span
      >
    </storybook-pharos-tile>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <storybook-pharos-tile href="#" disabled>
      <storybook-pharos-icon
        slot="header"
        name="gear"
        a11y-hidden="true"
        style=${headerIconStyle}
      ></storybook-pharos-icon>
      <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
        >Preservation</storybook-pharos-heading
      >
      Enable preservation in Portico
    </storybook-pharos-tile>
  `,
};

export const CustomContent: Story = {
  name: 'Custom content (pricing)',
  render: () => html`
    <storybook-pharos-tile hide-indicator>
      <div slot="header" style=${headerStackStyle}>
        <div style=${headerRowStyle}>
          <span>Regular plan</span>
          <storybook-pharos-icon
            name="checkmark-inverse"
            a11y-title="Current plan"
            style="color: var(--pharos-color-text-20);"
          ></storybook-pharos-icon>
        </div>
        <storybook-pharos-heading level="3" preset="2" no-margin
          ><strong>$19</strong> / month</storybook-pharos-heading
        >
      </div>
      <ul style=${listStyle}>
        <li style=${listItemStyle}>
          <storybook-pharos-icon name="checkmark-small" a11y-hidden="true"></storybook-pharos-icon
          >10 PDF downloads / month
        </li>
        <li style=${listItemStyle}>
          <storybook-pharos-icon name="checkmark-small" a11y-hidden="true"></storybook-pharos-icon
          >Unlimited reading and saving online
        </li>
        <li style=${listItemStyle}>
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
      <storybook-pharos-tile style="flex: 1 1 200px;" href="#">
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Preservation</storybook-pharos-heading
        >
        Enable preservation in Portico
      </storybook-pharos-tile>
      <storybook-pharos-tile style="flex: 1 1 200px;" href="#">
        <storybook-pharos-icon
          slot="header"
          name="gen-ai"
          a11y-hidden="true"
          style=${headerIconStyle}
        ></storybook-pharos-icon>
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Seeklight Management</storybook-pharos-heading
        >
        Enable generation on project fields. Configure metadata generation output.
      </storybook-pharos-tile>
      <storybook-pharos-tile style="flex: 1 1 200px;" href="#">
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Interpretive</storybook-pharos-heading
        >
        Derives historical framing and draw connections beyond what is literally visible in the item
      </storybook-pharos-tile>
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
      <storybook-pharos-tile href="#">
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Preservation</storybook-pharos-heading
        >
        Enable preservation in Portico
      </storybook-pharos-tile>
      <storybook-pharos-tile href="#">
        <storybook-pharos-icon
          slot="header"
          name="gen-ai"
          a11y-hidden="true"
          style=${headerIconStyle}
        ></storybook-pharos-icon>
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Seeklight</storybook-pharos-heading
        >
        Enable generation on project fields
      </storybook-pharos-tile>
      <storybook-pharos-tile href="#">
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Interpretive</storybook-pharos-heading
        >
        Derives historical framing
      </storybook-pharos-tile>
    </div>
  `,
};
