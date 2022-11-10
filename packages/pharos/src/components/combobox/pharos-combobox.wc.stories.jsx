import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Combobox',
  component: 'pharos-combobox',
  parameters: {
    docs: {
      page: configureDocsPage('combobox'),
    },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
};

export const Base = {
  render: (args) =>
    html`
      <pharos-combobox
        .value=${ifDefined(args.value)}
        .name=${ifDefined(args.name)}
        ?open=${args.open}
        ?disabled=${args.disabled}
        ?hide-label=${args.hideLabel}
        ?invalidated=${args.invalidated}
        ?validated=${args.validated}
        .placeholder=${ifDefined(args.placeholder)}
        message=${ifDefined(args.message)}
        ?required=${args.required}
        style="display: grid; grid-template-columns: 300px;"
      >
        <span slot="label">${args.label}</span>
        <option value="1">New Hampshire</option>
        <option value="2">Massachusetts</option>
        <option value="3">Connecticut</option>
        <option value="4">Rhode Island</option>
        <option value="5">New York</option>
        <option value="6">New Jersey</option>
        <option value="7">Pennsylvania</option>
        <option value="8">Delaware</option>
        <option value="9">Maryland</option>
        <option value="10">Virginia</option>
        <option value="11">North Carolina</option>
        <option value="12">South Carolina</option>
        <option value="13">Georgia</option>
      </pharos-combobox>
    `,
  args: defaultArgs,
};

export const States = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 7rem; grid-template-columns: repeat(2, 300px);">
        <pharos-combobox name="default">
          <span slot="label">I am empty</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </pharos-combobox>
        <pharos-combobox name="disabled" disabled>
          <span slot="label">I am disabled</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </pharos-combobox>
        <pharos-combobox name="placeholder" placeholder="Enter some text">
          <span slot="label">I have a placeholder</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </pharos-combobox>
        <pharos-combobox name="provided" value="2">
          <span slot="label">I have a value provided</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </pharos-combobox>
        <pharos-combobox name="hidden" hide-label>
          <span slot="label">My label is hidden</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </pharos-combobox>
      </div>
    `,
};

export const Events = {
  render: () =>
    html`
      <div style="display: grid; grid-template-columns: 300px;">
        <pharos-combobox
          placeholder="Select a state"
          @change="${(e) => action('Change')(e.target.value)}"
          @input="${(e) => action('Input')(e.target['_input'].value)}"
        >
          <span slot="label">Events fire on selection</span>
          <option value="NH">New Hampshire</option>
          <option value="MA">Massachusetts</option>
          <option value="CT">Connecticut</option>
          <option value="RI">Rhode Island</option>
          <option value="NY">New York</option>
          <option value="NJ">New Jersey</option>
          <option value="PA">Pennsylvania</option>
          <option value="DE">Delaware</option>
          <option value="MD">Maryland</option>
          <option value="VA">Virginia</option>
          <option value="NC">North Carolina</option>
          <option value="SC">South Carolina</option>
          <option value="GA">Georgia</option>
        </pharos-combobox>
      </div>
    `,
  parameters: {
    options: { selectedPanel: 'addon-actions' },
  },
};

export const SearchMode = {
  render: () =>
    html`
      <pharos-combobox
        placeholder="Search..."
        search-mode
        style="display: grid; grid-template-columns: 300px;"
      >
        <span slot="label">I'm searching for</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pharos-combobox>
    `,
};

export const Validity = {
  render: (args) =>
    html`
      <div style="display: grid; grid-template-columns: 300px;">
        <pharos-combobox
          name="my-combobox"
          placeholder="Enter some text"
          @change="${(e) => action('Change')(e.target.value)}"
          @input="${(e) => action('Input')(e.target['_input'].value)}"
          ?required="${args.required}"
          ?invalidated="${args.invalidated}"
          ?validated="${args.validated}"
          message="${args.message}"
        >
          <span slot="label">Test me out</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </pharos-combobox>
      </div>
    `,
  args: {
    required: true,
    invalidated: true,
    validated: false,
    message: 'This field is required, please make a selection',
  },
};

export const FormData = {
  render: () =>
    html`
      <div style="display: grid; grid-template-columns: 300px;">
        <form name="my-form" action="https://httpbin.org/post" method="POST">
          <pharos-combobox
            name="my-combobox"
            style="margin-bottom: 0.5rem;"
            placeholder="Enter some text"
            @change="${(e) => action('Change')(e.target.value)}"
            @input="${(e) => action('Input')(e.target['_input'].value)}"
            required
          >
            <span slot="label">Test me out</span>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </pharos-combobox>
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
          >
            Submit
          </pharos-button>
        </form>
      </div>
    `,
};
