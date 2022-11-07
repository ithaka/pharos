import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';

import createFormData from '../../utils/createFormData';
import { defaultArgs, argTypes } from './storyArgs';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Forms/Text Input',
  component: 'pharos-text-input',
  parameters: {
    docs: { page: configureDocsPage('text-input') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 300px;">
        <pharos-text-input
          name="${args.name}"
          type="${ifDefined(args.type)}"
          ?hide-label="${args.hideLabel}"
          ?validated="${args.validated}"
          ?invalidated="${args.invalidated}"
          ?required="${args.required}"
          .message="${args.message}"
          .placeholder=${args.placeholder}
          ?disabled=${args.disabled}
          ?readonly=${args.readonly}
          .value=${args.value}
        >
          <span slot="label">${args.label}</span>
        </pharos-text-input>
      </div>
    `,
  args: defaultArgs,
};

export const States = {
  render: (_) =>
    html`
      <div
        style="display: grid; grid-gap: 1rem; grid-template-columns: repeat(2, 300px); 1rem 300px"
      >
        <pharos-text-input name="default"><span slot="label">Empty input</span></pharos-text-input>
        <pharos-text-input name="disabled" disabled
          ><span slot="label">Disabled input</span></pharos-text-input
        >
        <pharos-text-input name="readonly" readonly value="Example text"
          ><span slot="label">Read only input</span></pharos-text-input
        >
        <pharos-text-input name="placeholder" placeholder="example placeholder text"
          ><span slot="label">Placeholder for input</span></pharos-text-input
        >
        <pharos-text-input name="provided" value="This value was provided"
          ><span slot="label">Value provided</span></pharos-text-input
        >
        <pharos-text-input name="hidden" hide-label value="Hidden label input"
          ><span slot="label">Hidden label</span></pharos-text-input
        >
        <pharos-text-input name="validated" value="A validated value" validated
          ><span slot="label">Validated input</span></pharos-text-input
        >
        <pharos-text-input name="prominent" placeholder="so prominent" variant="prominent"
          ><span slot="label">Prominent input</span></pharos-text-input
        >
      </div>
    `,
};

export const Events = {
  render: (_) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 300px;">
        <pharos-text-input
          placeholder="Enter some text"
          @change="${(e) => action('Change')(e.target.value)}"
          @input="${(e) => action('Input')(e.target.value)}"
        >
          <span slot="label">I fire events on input</span>
        </pharos-text-input>
      </div>
    `,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const Validity = {
  ...Base,
  args: {
    ...Base.args,
    label: 'Test me out',
    required: true,
    invalidated: true,
    message: 'This password does not meet the requirements',
  },
};

export const CustomErrorMessage = {
  render: (args) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 300px;">
        <pharos-text-input
          placeholder="Enter some text"
          @change="${(e) => action('Change')(e.target.value)}"
          @input="${(e) => action('Input')(e.target.value)}"
          ?required="${args.required}"
          ?invalidated=${args.invalidated}
          ?validated=${args.validated}
          .message=${args.message}
        >
          <span slot="label">I am invalid</span>
          <span slot="message">
            <ul style="margin: 0;padding-inline-start: 1.5rem;">
              <li>One upper or lowercase letter</li>
              <li>One number or special character</li>
              <li>6 character minimum</li>
              <li>No whitespace</li>
            </ul>
          </span>
        </pharos-text-input>
      </div>
    `,
  args: {
    ...Base.args,
    invalidated: true,
    message: 'This password does not meet the requirements',
  },
};

export const FormData = {
  render: (_) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 300px;">
        <form name="my-form" action="https://httpbin.org/post" method="POST">
          <pharos-text-input
            style="margin-bottom: 0.5rem;"
            name="my-text-input"
            placeholder="Enter some text"
            @change="${(e) => action('Change')(e.target.value)}"
            @input="${(e) => action('Input')(e.target.value)}"
            required
          >
            <span slot="label">Test me out</span>
          </pharos-text-input>
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
            >Submit
          </pharos-button>
        </form>
      </div>
    `,
};
