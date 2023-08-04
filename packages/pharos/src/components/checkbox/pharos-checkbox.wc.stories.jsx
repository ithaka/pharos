import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Checkbox',
  component: 'pharos-checkbox',
  parameters: {
    docs: { page: configureDocsPage('checkbox') },
    options: {
      selectedPanel: 'addon-controls',
    },
  },
};

export const Base = {
  render: (args) =>
    html`<storybook-pharos-checkbox
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?hide-label=${args.hideLabel}
      ?required=${args.required}
      ?invalidated=${args.invalidated}
      .message=${args.message}
    >
      <span slot="label">${args.label}</span>
    </storybook-pharos-checkbox>`,
  args: defaultArgs,
};

export const States = {
  render: () =>
    html`
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

export const Events = {
  render: () =>
    html` <storybook-pharos-checkbox
      value="My value"
      @change="${(e) => action('Change')(e.target.checked)}"
      @input="${(e) => action('Input')(e.target.value)}"
      @click="${(e) => action('Click')(e.target.checked)}"
    >
      <span slot="label">I fire events</span>
    </storybook-pharos-checkbox>`,
  parameters: {
    options: { selectedPanel: 'addon-actions' },
  },
};

export const Validity = {
  ...Base,
  args: {
    ...Base.args,
    required: true,
    invalidated: true,
    message: 'This field is required, please make a selection',
  },
};

export const OnBackground = {
  name: 'On background',
  render: () =>
    html`
      <div style="background-color: #000000; padding: 1rem;">
        <storybook-pharos-checkbox name="on-background" on-background>
          <span slot="label">Unchecked</span>
        </storybook-pharos-checkbox>
      </div>
      <div style="background-color: #000000; padding: 1rem;">
        <storybook-pharos-checkbox name="on-background" on-background checked>
          <span slot="label">Checked</span>
        </storybook-pharos-checkbox>
      </div>
      <div style="background-color: #000000; padding: 1rem;">
        <storybook-pharos-checkbox name="indeterminate" on-background indeterminate>
          <span slot="label">Indeterminate</span>
        </storybook-pharos-checkbox>
      </div>
    `,
};
