import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Checkbox Group',
  component: 'pharos-checkbox-group',
  subcomponents: { PharosCheckbox: 'pharos-checkbox' },
  parameters: {
    options: { selectedPanel: 'addon-controls' },
    docs: {
      page: configureDocsPage('checkbox'),
    },
  },
};

export const Base = {
  render: (args) =>
    html` <pharos-checkbox-group
      ?disabled=${args.disabled}
      ?hide-label="${args.hideLabel}"
      ?horizontal=${args.horizontal}
      ?invalidated=${args.invalidated}
      .message="${args.message}"
      ?required=${args.required}
      ?validated=${args.validated}
    >
      <span slot="legend">Checkbox Group Header</span>
      <pharos-checkbox value="1"><span slot="label">Checkbox 1</span></pharos-checkbox>
      <pharos-checkbox value="2"><span slot="label">Checkbox 2</span></pharos-checkbox>
    </pharos-checkbox-group>`,
  args: defaultArgs,
};

export const Events = {
  render: (_) =>
    html` <pharos-checkbox-group
      @change="${(e) => action('Change')(JSON.stringify(e.target.value))}"
      name="checkbox-group2"
    >
      <span slot="legend">Checkbox Group Header</span>
      <pharos-checkbox value="1"><span slot="label">Checkbox 1</span></pharos-checkbox>
      <pharos-checkbox value="2"><span slot="label">Checkbox 2</span></pharos-checkbox>
      <pharos-checkbox value="3"><span slot="label">Checkbox 3</span></pharos-checkbox>
    </pharos-checkbox-group>`,
  args: {},
  parameters: { options: { selectedPanel: 'addon-actions' } },
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

export const FormData = {
  render: (_) =>
    html` <form name="my-form" action="https://httpbin.org/post" method="POST">
      <pharos-checkbox-group
        @change="${(e) => action('Change')(e.target.value)}"
        name="checkbox-group4"
        style="margin-bottom: 0.5rem;"
        required
      >
        <span slot="legend">Checkbox Group Header</span>
        <pharos-checkbox value="1"><span slot="label">Checkbox 1</span></pharos-checkbox>
        <pharos-checkbox value="2"><span slot="label">Checkbox 2</span></pharos-checkbox>
        <pharos-checkbox value="3"><span slot="label">Checkbox 3</span></pharos-checkbox>
      </pharos-checkbox-group>
      <pharos-button
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
        >Submit</pharos-button
      >
    </form>`,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};
