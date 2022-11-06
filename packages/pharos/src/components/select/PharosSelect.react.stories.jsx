import { Fragment } from 'react';
import { action } from '@storybook/addon-actions';

import { PharosSelect, PharosButton } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Select',
  component: PharosSelect,
  parameters: {
    docs: { page: configureDocsPage('select') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => (
    <PharosSelect
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      required={args.required}
      invalidated={args.invalidated}
      message={args.message}
      value={3}
      style={{ display: 'grid', gridTemplateColumns: '300px' }}
    >
      <span slot="label">Select Demo</span>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="4">Option 4</option>
      <option value="5">Option 5</option>
    </PharosSelect>
  ),
  args: defaultArgs,
};

export const States = {
  render: (_) => (
    <Fragment>
      <PharosSelect>
        <span slot="label">Normal Select</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </PharosSelect>
      <PharosSelect disabled>
        <span slot="label">Disabled Select</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </PharosSelect>
      <PharosSelect invalidated>
        <span slot="label">Error Select</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </PharosSelect>
    </Fragment>
  ),
};

export const WithOptionGroups = {
  name: 'With option groups',
  render: (_) => (
    <PharosSelect>
      <span slot="label">Normal Select</span>
      <optgroup label="Group 1">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </optgroup>
    </PharosSelect>
  ),
};

export const Events = {
  render: (_) => (
    <PharosSelect onChange={(e) => action('Change')(e.target.value)}>
      <span slot="label">Normal Select</span>
      <option value="1">Option 1 (Value is 1)</option>
      <option value="2">Option 2 (Value is 2)</option>
    </PharosSelect>
  ),
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
  render: (_) => (
    <form name="my-form" action="https://httpbin.org/post" method="POST">
      <PharosSelect name="my-select" required style={{ marginBottom: '0.5rem' }}>
        <span slot="label">Select Demo</span>
        <option value="">Select an option</option>
        <option value="">----------------</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </PharosSelect>
      <PharosButton
        type="submit"
        value="Submit"
        onClick={(e) => {
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
        }}
      >
        Submit
      </PharosButton>
    </form>
  ),
};
