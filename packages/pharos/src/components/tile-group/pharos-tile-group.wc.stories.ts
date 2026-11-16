import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';

import createFormData from '../../utils/createFormData';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { headerIconStyle, headerStackStyle } from '../tile/storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ChangeEvent } from 'react';
import type { PharosTileGroup } from './pharos-tile-group';

const meta = {
  title: 'Components/Tile Group',
  component: 'pharos-tile-group',
  argTypes,
  parameters: {
    docs: { page: configureDocsPage('tile-group') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-tile-group
      selection=${ifDefined(args.selection)}
      name=${ifDefined(args.name)}
      .required=${args.required}
      .disabled=${args.disabled}
      .invalidated=${args.invalidated}
      .validated=${args.validated}
      .message=${args.message}
      @change="${(e: ChangeEvent) => action('Change')((e.target as PharosTileGroup).value)}"
    >
      <span slot="legend">How do you want to start?</span>
      <storybook-pharos-tile value="new">
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Create a new project</storybook-pharos-heading
        >
        Create a new project from scratch with a pre-defined metadata template
      </storybook-pharos-tile>
      <storybook-pharos-tile value="interpretive">
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Interpretive</storybook-pharos-heading
        >
        Derives historical framing and draw connections beyond what is literally visible in the item
      </storybook-pharos-tile>
      <storybook-pharos-tile value="seeklight">
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
      <storybook-pharos-tile value="archive" disabled>
        <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
          >Archive</storybook-pharos-heading
        >
        Not available right now
      </storybook-pharos-tile>
    </storybook-pharos-tile-group>
  `,
  args: defaultArgs,
};

export const Pricing: Story = {
  render: () => html`
    <storybook-pharos-tile-group name="plan">
      <span slot="legend">Choose a plan</span>
      <storybook-pharos-tile value="regular" hide-indicator>
        <div slot="header" style=${headerStackStyle}>
          <span>Regular plan</span>
          <storybook-pharos-heading level="3" preset="2" no-margin
            ><strong>$19</strong> / month</storybook-pharos-heading
          >
        </div>
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
      <storybook-pharos-tile value="plus" hide-indicator>
        <div slot="header" style=${headerStackStyle}>
          <span>Plus plan</span>
          <storybook-pharos-heading level="3" preset="2" no-margin
            ><strong>$29</strong> / month</storybook-pharos-heading
          >
        </div>
        <ul
          style="list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--pharos-color-marble-gray-80); display: grid; gap: var(--pharos-spacing-one-quarter-x); padding-top: var(--pharos-spacing-one-half-x);"
        >
          <li style="display: flex; gap: var(--pharos-spacing-one-quarter-x); align-items: center;">
            <storybook-pharos-icon name="checkmark-small" a11y-hidden="true"></storybook-pharos-icon
            >Unlimited PDF downloads
          </li>
          <li style="display: flex; gap: var(--pharos-spacing-one-quarter-x); align-items: center;">
            <storybook-pharos-icon name="checkmark-small" a11y-hidden="true"></storybook-pharos-icon
            >Cancel anytime
          </li>
        </ul>
      </storybook-pharos-tile>
    </storybook-pharos-tile-group>
  `,
};

export const Form: Story = {
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        action('Submit')(createFormData(e.target as HTMLFormElement));
      }}
    >
      <storybook-pharos-tile-group name="features" selection="multiple">
        <span slot="legend">Features</span>
        <storybook-pharos-tile value="a">
          <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
            >Feature A</storybook-pharos-heading
          >
          First
        </storybook-pharos-tile>
        <storybook-pharos-tile value="b">
          <storybook-pharos-heading slot="header" level="3" preset="2" no-margin
            >Feature B</storybook-pharos-heading
          >
          Second
        </storybook-pharos-tile>
      </storybook-pharos-tile-group>
      <storybook-pharos-button type="submit">Submit</storybook-pharos-button>
    </form>
  `,
};
