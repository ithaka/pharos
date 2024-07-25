import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Select',
  component: 'pharos-select',
  parameters: {
    docs: { page: configureDocsPage('select') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => html`
    <storybook-pharos-select
      disabled=${args.disabled}
      hide-label=${args.hideLabel}
      required=${args.required}
      invalidated=${args.invalidated}
      .message=${args.message}
      style="display: grid; grid-template-columns: 300px;"
    >
      <span slot="label">Select Demo</span>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3" selected>Option 3</option>
      <option value="4">Option 4</option>
      <option value="5">Option 5</option>
    </storybook-pharos-select>
  `,
  args: defaultArgs,
};

export const States = {
  render: () => html`
    <storybook-pharos-select>
      <span slot="label">Normal Select</span>
      <option value="1">Option 1</option>
      <option value="2" selected>Option 2</option>
    </storybook-pharos-select>
    <storybook-pharos-select disabled>
      <span slot="label">Disabled Select</span>
      <option value="1">Option 1</option>
      <option value="2" selected>Option 2</option>
    </storybook-pharos-select>
    <storybook-pharos-select invalidated>
      <span slot="label">Error Select</span>
      <option value="1">Option 1</option>
      <option value="2" selected>Option 2</option>
    </storybook-pharos-select>
  `,
};

export const WithOptionGroups = {
  name: 'With option groups',
  render: () => html`
    <storybook-pharos-select>
      <span slot="label">Normal Select</span>
      <optgroup label="Group 1">
        <option value="1">Option 1</option>
        <option value="2" selected>Option 2</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="3">Option 3</option>
        <option value="4" selected>Option 4</option>
      </optgroup>
    </storybook-pharos-select>
  `,
};

export const Events = {
  render: () => html`
    <storybook-pharos-select @change="${(e) => action('Change')(e.target.value)}">
      <span slot="label">Normal Select</span>
      <option value="1">Option 1 (Value is 1)</option>
      <option value="2">Option 2 (Value is 2)</option>
    </storybook-pharos-select>
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

export const FormData = {
  render: () => html`
    <form name="my-form" action="https://httpbin.org/post" method="POST">
      <storybook-pharos-select name="my-select" required style="margin-bottom: 0.5rem;">
        <span slot="label">Select Demo</span>
        <option value="">Select an option</option>
        <option value="">----------------</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </storybook-pharos-select>
      <storybook-pharos-button
        type="submit"
        value="Submit"
        @click="${(e) => {
          e.preventDefault();
          const form = document.querySelector('form[name="my-form"]');
          const formData = createFormData(form);
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://httpbin.org/post', true);
          xhr.onload = function () {
            const response = JSON.parse(this.responseText);
            action('FormData')(JSON.stringify(response.form));
          };
          xhr.send(formData);
        }}"
        >Submit</storybook-pharos-button
      >
    </form>
  `,
};
