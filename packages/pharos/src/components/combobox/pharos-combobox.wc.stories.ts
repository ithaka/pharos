import { html } from 'lit';
import { action } from 'storybook/actions';
import { ifDefined } from 'lit/directives/if-defined.js';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ChangeEvent } from 'react';
import type { PharosCombobox } from './pharos-combobox';

const meta = {
  title: 'Forms/Combobox',
  component: 'pharos-combobox',
  parameters: {
    docs: { page: configureDocsPage('combobox') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-combobox
      .value=${args.value}
      .name=${args.name}
      .open=${args.open}
      .loose-match=${args.looseMatch}
      .disabled=${args.disabled}
      .hide-label=${args.hideLabel}
      .invalidated=${args.invalidated}
      .validated=${args.validated}
      .placeholder=${args.placeholder}
      message=${ifDefined(args.message)}
      .required=${args.required}
      .inline=${args.inline}
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
    </storybook-pharos-combobox>
  `,
  args: defaultArgs,
};

export const States: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 7rem; grid-template-columns: repeat(2, 300px);">
      <storybook-pharos-combobox name="default">
        <span slot="label">I am empty</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </storybook-pharos-combobox>
      <storybook-pharos-combobox name="disabled" disabled>
        <span slot="label">I am disabled</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </storybook-pharos-combobox>
      <storybook-pharos-combobox name="default">
        <span slot="label">I have disabled options</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>Option 2</option>
        <option value="3" disabled>Option 3</option>
        <option value="4">Option 4</option>
        <option value="5" disabled>Option 5</option>
      </storybook-pharos-combobox>
      <storybook-pharos-combobox name="placeholder" placeholder="Enter some text">
        <span slot="label">I have a placeholder</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </storybook-pharos-combobox>
      <storybook-pharos-combobox name="provided" value="2">
        <span slot="label">I have a value provided</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </storybook-pharos-combobox>
      <storybook-pharos-combobox name="hidden" hide-label>
        <span slot="label">My label is hidden</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </storybook-pharos-combobox>
    </div>
  `,
};

export const Events: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 300px;">
      <storybook-pharos-combobox
        placeholder="Select a state"
        @change="${(e: ChangeEvent) => action('Change')((e.target as HTMLInputElement).value)}"
        @input="${(e: InputEvent) => action('Input')((e.target as PharosCombobox)['_input'].value)}"
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
      </storybook-pharos-combobox>
    </div>
  `,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const SearchMode: Story = {
  render: () => html`
    <storybook-pharos-combobox
      placeholder="Search..."
      search-mode
      style="display: grid; grid-template-columns: 300px;"
    >
      <span slot="label">I'm searching for</span>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </storybook-pharos-combobox>
  `,
};

export const Validity: Story = {
  render: (args) => html`
    <div style="display: grid; grid-template-columns: 300px;">
      <storybook-pharos-combobox
        name="my-combobox"
        placeholder="Enter some text"
        @change="${(e: ChangeEvent) => action('Change')((e.target as HTMLInputElement).value)}"
        @input="${(e: InputEvent) => action('Input')((e.target as PharosCombobox)['_input'].value)}"
        .required="${args.required}"
        .invalidated="${args.invalidated}"
        .validated="${args.validated}"
        message="${args.message}"
      >
        <span slot="label">Test me out</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </storybook-pharos-combobox>
    </div>
  `,
  args: {
    required: true,
    invalidated: true,
    validated: false,
    message: 'This field is required, please make a selection',
  },
};

export const FormData: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 300px;">
      <form name="my-form" action="https://httpbin.org/post" method="post">
        <storybook-pharos-combobox
          name="my-combobox"
          style="margin-bottom: 0.5rem;"
          placeholder="Enter some text"
          @change="${(e: ChangeEvent) => action('Change')((e.target as HTMLInputElement).value)}"
          @input="${(e: InputEvent) =>
            action('Input')((e.target as PharosCombobox)['_input'].value)}"
          required
        >
          <span slot="label">Test me out</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </storybook-pharos-combobox>
        <storybook-pharos-button
          type="submit"
          value="Submit"
          @click="${(e: MouseEvent) => {
            e.preventDefault();
            const form = document.querySelector('form[name="my-form"]');
            const formData = createFormData(form as HTMLFormElement);
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
