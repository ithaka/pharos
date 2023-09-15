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
    html`<pharos-checkbox
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?hide-label=${args.hideLabel}
      ?required=${args.required}
      ?invalidated=${args.invalidated}
      .message=${args.message}
    >
      <span slot="label">${args.label}</span>
    </pharos-checkbox>`,
  args: defaultArgs,
};

export const States = {
  render: () =>
    html`
      <div>
        <pharos-checkbox name="one"><span slot="label">Normal Checkbox</span></pharos-checkbox>
      </div>
      <div>
        <pharos-checkbox name="two" disabled
          ><span slot="label">Disabled Checkbox</span></pharos-checkbox
        >
      </div>
      <div>
        <pharos-checkbox name="three" checked><span slot="label">Checked</span></pharos-checkbox>
      </div>
      <div>
        <pharos-checkbox name="four" checked disabled
          ><span slot="label">Checked & Disabled</span></pharos-checkbox
        >
      </div>
      <div>
        <pharos-checkbox name="five" checked>
          <div slot="label">
            <div>Multiple lined</div>
            <div>Checkbox</div>
          </div>
        </pharos-checkbox>
      </div>
      <div>
        <pharos-checkbox name="six" invalidated
          ><span slot="label">Error checkbox</span></pharos-checkbox
        >
      </div>
      <div>
        <pharos-checkbox name="seven"
          ><span slot="label"
            >Label with a <pharos-link href="#">link</pharos-link></span
          ></pharos-checkbox
        >
      </div>
      <div>
        <pharos-checkbox name="eight" indeterminate
          ><span slot="label">Indeterminate checkbox</span></pharos-checkbox
        >
      </div>
    `,
};

export const Events = {
  render: () =>
    html` <pharos-checkbox
      value="My value"
      @change="${(e) => action('Change')(e.target.checked)}"
      @input="${(e) => action('Input')(e.target.value)}"
      @click="${(e) => action('Click')(e.target.checked)}"
    >
      <span slot="label">I fire events</span>
    </pharos-checkbox>`,
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
        <pharos-checkbox name="on-background" on-background>
          <span slot="label">Unchecked</span>
        </pharos-checkbox>
      </div>
      <div style="background-color: #000000; padding: 1rem;">
        <pharos-checkbox name="on-background" on-background checked>
          <span slot="label">Checked</span>
        </pharos-checkbox>
      </div>
      <div style="background-color: #000000; padding: 1rem;">
        <pharos-checkbox name="indeterminate" on-background indeterminate>
          <span slot="label">Indeterminate</span>
        </pharos-checkbox>
      </div>
    `,
};
