import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';

import createFormData from '../../utils/createFormData';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
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
      <storybook-pharos-tile
        value="new"
        title="Create a new project"
        description="Create a new project from scratch with a pre-defined metadata template"
      ></storybook-pharos-tile>
      <storybook-pharos-tile
        value="interpretive"
        title="Interpretive"
        description="Derives historical framing and draw connections beyond what is literally visible in the item"
      ></storybook-pharos-tile>
      <storybook-pharos-tile
        value="seeklight"
        icon="gen-ai"
        title="Seeklight Management"
        description="Enable generation on project fields. Configure metadata generation output."
      ></storybook-pharos-tile>
      <storybook-pharos-tile
        value="archive"
        title="Archive"
        description="Not available right now"
        disabled
      ></storybook-pharos-tile>
    </storybook-pharos-tile-group>
  `,
  args: defaultArgs,
};

export const Pricing: Story = {
  render: () => html`
    <storybook-pharos-tile-group name="plan">
      <span slot="legend">Choose a plan</span>
      <storybook-pharos-tile value="regular" hide-indicator>
        <span slot="header">Regular plan</span>
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
      <storybook-pharos-tile value="plus" hide-indicator>
        <span slot="header">Plus plan</span>
        <span slot="title"><strong>$29</strong> / month</span>
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
        <storybook-pharos-tile
          value="a"
          title="Feature A"
          description="First"
        ></storybook-pharos-tile>
        <storybook-pharos-tile
          value="b"
          title="Feature B"
          description="Second"
        ></storybook-pharos-tile>
      </storybook-pharos-tile-group>
      <storybook-pharos-button type="submit">Submit</storybook-pharos-button>
    </form>
  `,
};
