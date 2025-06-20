import { html } from 'lit';
import { action } from 'storybook/actions';
import { ifDefined } from 'lit/directives/if-defined.js';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ChangeEvent } from 'react';
import type { PharosMultiselectDropdown } from './pharos-multiselect-dropdown';

const meta = {
  title: 'Forms/Multiselect Dropdown',
  component: 'pharos-multiselect-dropdown',
  parameters: {
    docs: { page: configureDocsPage('multiselect-dropdown') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-multiselect-dropdown
      .name=${ifDefined(args.name)}
      .displayCharacterCount=${args.displayCharacterCount}
      .hideSelectAll=${args.hideSelectAll}
      .looseMatch=${args.looseMatch}
      ?disabled=${args.disabled}
      ?hide-label=${args.hideLabel}
      message=${ifDefined(args.message)}
      style="display: grid; grid-template-columns: 432px;"
    >
      <span slot="label">${args.label}</span>
      <option value="1">Ann Arbor</option>
      <option value="2">Battle Creek</option>
      <option value="3">Benton Harbor</option>
      <option value="4">Big Rapids</option>
      <option value="5">Cadillac</option>
      <option value="6">Charlevoix</option>
      <option value="7">Coldwater</option>
      <option value="8">Dearborn</option>
      <option value="9">Detroit</option>
      <option value="10">Dowagiac</option>
      <option value="11">Empire</option>
      <option value="12">Escanaba</option>
      <option value="13">Flint</option>
      <option value="14">Grand Rapids</option>
      <option value="15">Holland</option>
      <option value="16">Houghton</option>
      <option value="17">Kalamazoo</option>
      <option value="18">Lansing</option>
      <option value="19">Marquette</option>
      <option value="20">Mount Pleasant</option>
      <option value="21">Muskegon</option>
      <option value="22">Port Huron</option>
      <option value="23">Rochester Hills</option>
      <option value="24">Saginaw</option>
      <option value="25">Sault Ste. Marie</option>
      <option value="26">St Joseph</option>
      <option value="27">Tawas City</option>
      <option value="28">Traverse City</option>
      <option value="29">Wyoming</option>
      <option value="30">Ypsilanti</option>
    </storybook-pharos-multiselect-dropdown>
  `,
  args: defaultArgs,
};

export const States: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 7rem; grid-template-columns: repeat(2, 300px);">
      <storybook-pharos-multiselect-dropdown name="disabled" disabled>
        <span slot="label">I am Disabled</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </storybook-pharos-multiselect-dropdown>

      <storybook-pharos-multiselect-dropdown name="disabled-options">
        <span slot="label">I have disabled options</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5" disabled>Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </storybook-pharos-multiselect-dropdown>

      <storybook-pharos-multiselect-dropdown name="no-selected-items">
        <span slot="label">I have no selected items</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </storybook-pharos-multiselect-dropdown>

      <storybook-pharos-multiselect-dropdown name="one-selected-option">
        <span slot="label">I have one selected option</span>
        <option value="1">Option 1</option>
        <option value="2" selected>Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </storybook-pharos-multiselect-dropdown>

      <storybook-pharos-multiselect-dropdown name="some-selected-option">
        <span slot="label">I have multiple selected options</span>
        <option value="1" selected>Option 1</option>
        <option value="2">Option 2</option>
        <option value="3" selected>Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </storybook-pharos-multiselect-dropdown>

      <storybook-pharos-multiselect-dropdown name="selected-option">
        <span slot="label">I have many selected options</span>
        <option value="1" selected>Option 1</option>
        <option value="2" selected>Option 2</option>
        <option value="3" selected>Option 3</option>
        <option value="4" selected>Option 4</option>
        <option value="5" selected>Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </storybook-pharos-multiselect-dropdown>

      <storybook-pharos-multiselect-dropdown name="selected-option">
        <span slot="label">I have all options selected</span>
        <option value="1" selected>Option 1</option>
        <option value="2" selected>Option 2</option>
        <option value="3" selected>Option 3</option>
        <option value="4" selected>Option 4</option>
        <option value="5" selected>Option 5</option>
        <option value="6" selected>Option 6</option>
        <option value="7" selected>Option 7</option>
        <option value="8" selected>Option 8</option>
      </storybook-pharos-multiselect-dropdown>
    </div>
  `,
};

export const Events: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 300px;">
      <storybook-pharos-multiselect-dropdown
        name="event-demo"
        @change="${(e: ChangeEvent) => action('Change')((e.target as PharosMultiselectDropdown).selectedOptions)}"
        style="display: grid; grid-template-columns: 432px;"
      >
        <span slot="label">Cities in Michigan</span>
        <option value="1">Ann Arbor</option>
        <option value="2">Battle Creek</option>
        <option value="3">Benton Harbor</option>
        <option value="4">Big Rapids</option>
        <option value="5">Cadillac</option>
        <option value="6">Charlevoix</option>
        <option value="7">Coldwater</option>
        <option value="8">Dearborn</option>
        <option value="9">Detroit</option>
        <option value="10">Dowagiac</option>
        <option value="11">Empire</option>
        <option value="12">Escanaba</option>
        <option value="13">Flint</option>
        <option value="14">Grand Rapids</option>
        <option value="15">Holland</option>
        <option value="16">Houghton</option>
        <option value="17">Kalamazoo</option>
        <option value="18">Lansing</option>
        <option value="19">Marquette</option>
        <option value="20">Mount Pleasant</option>
        <option value="21">Muskegon</option>
        <option value="22">Port Huron</option>
        <option value="23">Rochester Hills</option>
        <option value="24">Saginaw</option>
        <option value="25">Sault Ste. Marie</option>
        <option value="26">St Joseph</option>
        <option value="27">Tawas City</option>
        <option value="28">Traverse City</option>
        <option value="29">Wyoming</option>
        <option value="30">Ypsilanti</option>
      </storybook-pharos-multiselect-dropdown>
    </div>
  `,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const FormData: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 300px;">
      <form name="my-form" action="https://httpbin.org/post" method="post">
        <storybook-pharos-multiselect-dropdown
          name="my-multiselect-dropdown"
          @change="${(e: ChangeEvent) => action('Change')((e.target as PharosMultiselectDropdown).selectedOptions)}"
          style="display: grid; grid-template-columns: 432px;"
        >
          <span slot="label">Cities in Michigan</span>
          <option value="1">Ann Arbor</option>
          <option value="2">Battle Creek</option>
          <option value="3">Benton Harbor</option>
          <option value="4">Big Rapids</option>
          <option value="5">Cadillac</option>
          <option value="6">Charlevoix</option>
          <option value="7">Coldwater</option>
          <option value="8">Dearborn</option>
          <option value="9">Detroit</option>
          <option value="10">Dowagiac</option>
          <option value="11">Empire</option>
          <option value="12">Escanaba</option>
          <option value="13">Flint</option>
          <option value="14">Grand Rapids</option>
          <option value="14">Grand Rapids</option>
          <option value="15">Holland</option>
          <option value="16">Houghton</option>
          <option value="17">Kalamazoo</option>
          <option value="18">Lansing</option>
          <option value="19">Marquette</option>
          <option value="20">Mount Pleasant</option>
          <option value="21">Muskegon</option>
          <option value="22">Port Huron</option>
          <option value="23">Rochester Hills</option>
          <option value="24">Saginaw</option>
          <option value="25">Sault Ste. Marie</option>
          <option value="26">St Joseph</option>
          <option value="27">Tawas City</option>
          <option value="28">Traverse City</option>
          <option value="29">Wyoming</option>
          <option value="30">Ypsilanti</option>
        </storybook-pharos-multiselect-dropdown>
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
