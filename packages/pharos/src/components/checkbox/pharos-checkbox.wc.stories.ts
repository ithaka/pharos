import { html } from 'lit';
import { action } from 'storybook/actions';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ChangeEvent } from 'react';

const meta = {
  title: 'Forms/Checkbox',
  component: 'pharos-checkbox',
  parameters: {
    docs: { page: configureDocsPage('checkbox') },
    options: {
      selectedPanel: 'addon-controls',
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) =>
    html`<storybook-pharos-checkbox
      .checked=${args.checked}
      .disabled=${args.disabled}
      .hide-label=${args.hideLabel}
      .required=${args.required}
      .invalidated=${args.invalidated}
      .message=${args.message}
    >
      <span slot="label">${args.label}</span>
    </storybook-pharos-checkbox>`,
  args: defaultArgs,
};

export const States: Story = {
  render: () => html`
    <div>
      <storybook-pharos-checkbox name="one"
        ><span slot="label">Normal Checkbox</span></storybook-pharos-checkbox
      >
    </div>
    <div>
      <storybook-pharos-checkbox name="two" disabled
        ><span slot="label">Disabled Checkbox</span></storybook-pharos-checkbox
      >
    </div>
    <div>
      <storybook-pharos-checkbox name="three" checked
        ><span slot="label">Checked</span></storybook-pharos-checkbox
      >
    </div>
    <div>
      <storybook-pharos-checkbox name="four" checked disabled
        ><span slot="label">Checked & Disabled</span></storybook-pharos-checkbox
      >
    </div>
    <div>
      <storybook-pharos-checkbox name="five" checked>
        <div slot="label">
          <div>Multiple lined</div>
          <div>Checkbox</div>
        </div>
      </storybook-pharos-checkbox>
    </div>
    <div>
      <storybook-pharos-checkbox name="six" invalidated
        ><span slot="label">Error checkbox</span></storybook-pharos-checkbox
      >
    </div>
    <div>
      <storybook-pharos-checkbox name="seven"
        ><span slot="label"
          >Label with a <storybook-pharos-link href="#">link</storybook-pharos-link></span
        ></storybook-pharos-checkbox
      >
    </div>
    <div>
      <storybook-pharos-checkbox name="eight" indeterminate
        ><span slot="label">Indeterminate checkbox</span></storybook-pharos-checkbox
      >
    </div>
  `,
};

export const Events: Story = {
  render: () =>
    html` <storybook-pharos-checkbox
      value="My value"
      @change="${(e: ChangeEvent) => action('Change')((e.target as HTMLInputElement).checked)}"
      @input="${(e: InputEvent) => action('Input')((e.target as HTMLInputElement).value)}"
      @click="${(e: MouseEvent) => action('Click')((e.target as HTMLInputElement).checked)}"
    >
      <span slot="label">I fire events</span>
    </storybook-pharos-checkbox>`,
  parameters: {
    options: { selectedPanel: 'storybook/actions/panel' },
  },
};

export const Validity: Story = {
  ...Base,
  args: {
    ...Base.args,
    required: true,
    invalidated: true,
    message: 'This field is required, please make a selection',
  },
};

export const FullWidth: Story = {
  render: () =>
    html` <style>
        .full-width-styled-example storybook-pharos-checkbox {
          box-sizing: border-box;
          padding: var(--pharos-spacing-one-half-x, 0.5rem);
          border: 1px solid var(--pharos-color-marble-gray-80, #c3c5c8);
          border-radius: var(--pharos-radius-base, 4px);
        }
        /* When a checkbox is checked, style it like an info alert */
        .full-width-styled-example storybook-pharos-checkbox[checked] {
          background-color: var(--pharos-alert-color-background-info);
          border-color: var(--pharos-alert-color-border-info);
        }
      </style>
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <storybook-pharos-checkbox-group
          style="width: 480px; border: 1px solid var(--pharos-color-marble-gray-80, #c3c5c8); padding: var(--pharos-spacing-one, 1rem); border-radius: var(--pharos-radius-base, 4px);"
        >
          <span slot="legend">Full Width</span>
          <storybook-pharos-checkbox value="email" full-width checked
            ><span slot="label">This is the first choice</span></storybook-pharos-checkbox
          >
          <storybook-pharos-checkbox value="product" full-width
            ><span slot="label">This is the second choice</span></storybook-pharos-checkbox
          >
          <storybook-pharos-checkbox value="research" full-width
            ><span slot="label"
              >This is the third choice with a label that is just entirely too long and someone
              should have said something before shipping this to users</span
            ></storybook-pharos-checkbox
          >
        </storybook-pharos-checkbox-group>
        <storybook-pharos-checkbox-group class="full-width-styled-example" style="width: 480px;">
          <span slot="legend">Full Width with styles</span>
          <storybook-pharos-checkbox value="email" full-width checked
            ><span slot="label">This is the first choice</span></storybook-pharos-checkbox
          >
          <storybook-pharos-checkbox value="product" full-width
            ><span slot="label">This is the second choice</span></storybook-pharos-checkbox
          >
          <storybook-pharos-checkbox value="research" full-width
            ><span slot="label"
              >This is the third choice with a label that is really, really entirely too long and
              someone should have said something before shipping this to to users</span
            ></storybook-pharos-checkbox
          >
        </storybook-pharos-checkbox-group>
      </div>`,
};

export const IsOnBackground: Story = {
  name: 'On background',
  render: () => html`
    <div style="background-color: #000000; padding: 1rem;">
      <storybook-pharos-checkbox name="is-on-background" is-on-background>
        <span slot="label">Unchecked</span>
      </storybook-pharos-checkbox>
    </div>
    <div style="background-color: #000000; padding: 1rem;">
      <storybook-pharos-checkbox name="is-on-background" is-on-background checked>
        <span slot="label">Checked</span>
      </storybook-pharos-checkbox>
    </div>
    <div style="background-color: #000000; padding: 1rem;">
      <storybook-pharos-checkbox name="indeterminate" is-on-background indeterminate>
        <span slot="label">Indeterminate</span>
      </storybook-pharos-checkbox>
    </div>
  `,
};
