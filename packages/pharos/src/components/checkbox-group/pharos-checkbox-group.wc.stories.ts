import { html } from 'lit';
import { action } from 'storybook/actions';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ChangeEvent } from 'react';

const meta = {
  title: 'Forms/Checkbox Group',
  component: 'pharos-checkbox-group',
  parameters: {
    options: { selectedPanel: 'addon-controls' },
    docs: {
      page: configureDocsPage('checkbox'),
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) =>
    html` <storybook-pharos-checkbox-group
      .disabled=${args.disabled}
      .hide-label="${args.hideLabel}"
      .horizontal=${args.horizontal}
      .invalidated=${args.invalidated}
      .message="${args.message}"
      .required=${args.required}
      .validated=${args.validated}
    >
      <span slot="legend">Checkbox Group Header</span>
      <storybook-pharos-checkbox value="1"
        ><span slot="label">Checkbox 1</span></storybook-pharos-checkbox
      >
      <storybook-pharos-checkbox value="2"
        ><span slot="label">Checkbox 2</span></storybook-pharos-checkbox
      >
    </storybook-pharos-checkbox-group>`,
  args: defaultArgs,
};

export const Events: Story = {
  render: () =>
    html` <storybook-pharos-checkbox-group
      @change="${(e: ChangeEvent) =>
        action('Change')(JSON.stringify((e.target as HTMLInputElement).value))}"
      name="checkbox-group2"
    >
      <span slot="legend">Checkbox Group Header</span>
      <storybook-pharos-checkbox value="1"
        ><span slot="label">Checkbox 1</span></storybook-pharos-checkbox
      >
      <storybook-pharos-checkbox value="2"
        ><span slot="label">Checkbox 2</span></storybook-pharos-checkbox
      >
      <storybook-pharos-checkbox value="3"
        ><span slot="label">Checkbox 3</span></storybook-pharos-checkbox
      >
    </storybook-pharos-checkbox-group>`,
  args: {},
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Validity: Story = {
  ...Base,
  args: {
    ...Base.args,
    required: true,
    invalidated: true,
    message: 'This field is required, please make a selection',
  },
};

export const FormData: Story = {
  render: () =>
    html` <form name="my-form" action="https://httpbin.org/post" method="post">
      <storybook-pharos-checkbox-group
        @change="${(e: ChangeEvent) => action('Change')((e.target as HTMLInputElement).value)}"
        name="checkbox-group4"
        style="margin-bottom: 0.5rem;"
        required
      >
        <span slot="legend">Checkbox Group Header</span>
        <storybook-pharos-checkbox value="1"
          ><span slot="label">Checkbox 1</span></storybook-pharos-checkbox
        >
        <storybook-pharos-checkbox value="2"
          ><span slot="label">Checkbox 2</span></storybook-pharos-checkbox
        >
        <storybook-pharos-checkbox value="3"
          ><span slot="label">Checkbox 3</span></storybook-pharos-checkbox
        >
      </storybook-pharos-checkbox-group>
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
    </form>`,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};
