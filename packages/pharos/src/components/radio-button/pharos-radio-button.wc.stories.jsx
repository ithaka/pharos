import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Radio Button',
  parameters: {
    docs: { page: configureDocsPage('radio-button') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => html`
    <storybook-pharos-radio-button
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?hide-label=${args.hideLabel}
      ?invalidated=${args.invalidated}
      ?required=${args.required}
      .message=${args.message}
    >
      <span slot="label">${args.label}</span>
    </storybook-pharos-radio-button>
  `,
  args: defaultArgs,
};

export const States = {
  render: () =>
    html`
      <div>
        <storybook-pharos-radio-button name="base"><span slot="label">Default Radio Button</span></storybook-pharos-radio-button>
      </div>
      <div>
        <storybook-pharos-radio-button name="disabled" disabled><span slot="label">Disabled input</span></storybook-pharos-radio-button>
      </div>
      <div>
        <storybook-pharos-radio-button name="checked" checked><span slot="label">Checked button</span></storybook-pharos-radio-button>
      </div>
      <div>
        <storybook-pharos-radio-button name="checked-disabled" checked disabled>
          <span slot="label">Checked & Disabled</span>
        </storybook-pharos-radio-button>
      </div>
      <div>
        <storybook-pharos-radio-button name="multi" checked>
          <div slot="label">
            <div>Checked button</div>
            <div>Multiple lines</div>
          </div>
        </storybook-pharos-radio-button>
      </div>
      <div>
        <storybook-pharos-radio-button name="invalidated" invalidated><span slot="label">Error button</span></storybook-pharos-checkbox>
      </div>
      <div>
        <storybook-pharos-radio-button name="with-link">
          <span slot="label">
            Label with a <storybook-pharos-link href="#">link</storybook-pharos-link>
          </span>
        </storybook-pharos-radio-button>
      </div>
    `,
};

export const Events = {
  render: () => html`
    <storybook-pharos-radio-button
      value="My value"
      @change="${(e) => action('Change')(e.target.checked)}"
      @input="${(e) => action('Input')(e.target.value)}"
      @click="${(e) => action('Click')(e.target.checked)}"
    >
      <span slot="label">I fire events</span>
    </storybook-pharos-radio-button>
  `,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const Validity = {
  ...Base,
  args: {
    ...Base.args,
    invalidated: true,
    required: true,
    message: 'This field is required, please make a selection',
  },
};
