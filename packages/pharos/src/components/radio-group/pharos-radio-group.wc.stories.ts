import { html } from 'lit';
import { action } from 'storybook/actions';

import createFormData from '../../utils/createFormData';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ChangeEvent } from 'react';
import type { PharosRadioGroup } from './pharos-radio-group';

const meta = {
  title: 'Forms/Radio Group',
  component: 'pharos-radio-group',
  parameters: {
    docs: { page: configureDocsPage('radio-group') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-radio-group
      name=${args.name}
      .horizontal=${args.horizontal}
      .disabled=${args.disabled}
      .hide-label=${args.hideLabel}
      .required=${args.required}
      .invalidated=${args.invalidated}
      .validated=${args.validated}
      .message=${args.message}
    >
      <span slot="legend">Radio Group Header</span>
      <storybook-pharos-radio-button value="1"
        ><span slot="label">Radio Button 1</span></storybook-pharos-radio-button
      >
      <storybook-pharos-radio-button value="2"
        ><span slot="label">Radio Button 2</span></storybook-pharos-radio-button
      >
      <storybook-pharos-radio-button value="3"
        ><span slot="label">Radio Button 3</span></storybook-pharos-radio-button
      >
      <storybook-pharos-radio-button value="4"
        ><span slot="label">Radio Button 4</span></storybook-pharos-radio-button
      >
    </storybook-pharos-radio-group>
  `,
  args: defaultArgs,
};

export const Events: Story = {
  render: () =>
    html` <storybook-pharos-radio-group
      @change="${(e: ChangeEvent) => action('Change')((e.target as PharosRadioGroup).value)}"
      name="radio-group2"
    >
      <span slot="legend">Radio Group Header</span>
      <storybook-pharos-radio-button value="1"
        ><span slot="label">Radio Button 1</span></storybook-pharos-radio-button
      >
      <storybook-pharos-radio-button value="2" checked
        ><span slot="label">Radio Button 2</span></storybook-pharos-radio-button
      >
      <storybook-pharos-radio-button value="3"
        ><span slot="label">Radio Button 3</span></storybook-pharos-radio-button
      >
    </storybook-pharos-radio-group>`,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Validity: Story = {
  ...Base,
  args: {
    ...Base.args,
    invalidated: true,
    required: true,
    message: 'This field is required, please make a selection',
  },
};

export const FormData: Story = {
  render: () => html`
    <form name="my-form" action="https://httpbin.org/post" method="post">
      <storybook-pharos-radio-group
        style="margin-bottom: 0.5rem;"
        @change="${(e: ChangeEvent) => action('Change')((e.target as PharosRadioGroup).value)}"
        name="radio-group4"
        required
      >
        <span slot="legend">Radio Group Header</span>
        <storybook-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></storybook-pharos-radio-button
        >
        <storybook-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></storybook-pharos-radio-button
        >
        <storybook-pharos-radio-button value="3"
          ><span slot="label">Radio Button 3</span></storybook-pharos-radio-button
        >
      </storybook-pharos-radio-group>
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
        >Submit</storybook-pharos-button
      >
    </form>
  `,
};
