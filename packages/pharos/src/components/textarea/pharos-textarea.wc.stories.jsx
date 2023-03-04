import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Textarea',
  component: 'pharos-textarea',
  parameters: {
    docs: { page: configureDocsPage('textarea') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 250px;">
        <storybook-pharos-textarea
          name="story-input"
          .cols="${args.columns}"
          ?disabled=${args.disabled}
          ?hide-label="${args.hideLabel}"
          ?invalidated=${args.invalidated}
          .message=${args.message}
          .placeholder=${args.placeholder}
          .resize="${ifDefined(args.resize)}"
          ?readonly=${args.readonly}
          ?required=${args.required}
          .rows="${args.rows}"
          ?validated=${args.validated}
          .value=${args.value}
        >
          <span slot="label">${args.label}</span>
        </storybook-pharos-textarea>
      </div>
    `,
  args: defaultArgs,
};

export const States = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: repeat(2, 250px);">
        <storybook-pharos-textarea name="default"
          ><span slot="label">Empty textarea</span></storybook-pharos-textarea
        >
        <storybook-pharos-textarea name="disabled" disabled
          ><span slot="label">Disabled textarea</span></storybook-pharos-textarea
        >
        <storybook-pharos-textarea name="readonly" readonly value="Example text"
          ><span slot="label">Read only textarea</span></storybook-pharos-textarea
        >
        <storybook-pharos-textarea name="placeholder" placeholder="Placeholder text"
          ><span slot="label">Placeholder for textarea</span></storybook-pharos-textarea
        >
        <storybook-pharos-textarea name="provided" value="This value is provided"
          ><span slot="label">Value provided textarea</span></storybook-pharos-textarea
        >
        <storybook-pharos-textarea name="resize" resize="none"
          ><span slot="label">non-resizeable textarea</span></storybook-pharos-textarea
        >
      </div>
    `,
};

export const Events = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 250px;">
        <storybook-pharos-textarea
          placeholder="Enter some text"
          @change="${(e) => action('Change')(e.target.value)}"
          @input="${(e) => action('Input')(e.target.value)}"
        >
          <span slot="label">I fire events on input</span>
        </storybook-pharos-textarea>
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
    value: '',
    placeholder: '',
    invalidated: true,
    message: 'This field does not meet the requirements',
  },
};

export const CustomErrorMessage = {
  render: (args) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 350px;">
        <storybook-pharos-textarea
          placeholder="Enter some text"
          @change="${(e) => action('Change')(e.target.value)}"
          @input="${(e) => action('Input')(e.target.value)}"
          ?required=${args.required}
          ?invalidated=${args.invalidated}
          ?validated=${args.validated}
          .message=${args.message}
        >
          <span slot="label">I am invalid</span>
          <span slot="message">
            <p>Must be over 100 characters long</p>
          </span>
        </storybook-pharos-textarea>
      </div>
    `,
  args: {
    ...Base.args,
    invalidated: true,
    message: 'This field does not meet the requirements',
  },
};

export const FormData = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 350px;">
        <form name="my-form" action="https://httpbin.org/post" method="POST">
          <storybook-pharos-textarea
            name="my-textarea"
            placeholder="Enter some text"
            style="margin-bottom: 0.5rem;"
            @change="${(e) => action('Change')(e.target.value)}"
            @input="${(e) => action('Input')(e.target.value)}"
            required
          >
            <span slot="label">I am invalid</span>
          </storybook-pharos-textarea>
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
          >
            Submit
          </storybook-pharos-button>
        </form>
      </div>
    `,
};
