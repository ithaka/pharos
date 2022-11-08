import { action } from '@storybook/addon-actions';

import { PharosButton, PharosCheckbox, PharosCheckboxGroup } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Checkbox Group',
  component: PharosCheckboxGroup,
  subcomponents: { PharosCheckbox },
  options: { selectedPanel: 'addon-controls' },
};

export const Base = {
  render: (args) => (
    <PharosCheckboxGroup
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      horizontal={args.horizontal}
      invalidated={args.invalidated}
      message={args.message}
      required={args.required}
      validated={args.validated}
    >
      <span slot="legend">Checkbox Group Header</span>
      <PharosCheckbox value="1">
        <span slot="label">Checkbox 1</span>
      </PharosCheckbox>
      <PharosCheckbox value="2">
        <span slot="label">Checkbox 2</span>
      </PharosCheckbox>
    </PharosCheckboxGroup>
  ),
  args: defaultArgs,
};

export const Events = {
  render: () => (
    <PharosCheckboxGroup
      onChange={(e) => action('Change')(JSON.stringify(e.target.value))}
      name="group2"
    >
      <span slot="legend">Checkbox Group Header</span>
      <PharosCheckbox value="1">
        <span slot="label">Checkbox 1</span>
      </PharosCheckbox>
      <PharosCheckbox value="2">
        <span slot="label">Checkbox 2</span>
      </PharosCheckbox>
      <PharosCheckbox value="3">
        <span slot="label">Checkbox 3</span>
      </PharosCheckbox>
    </PharosCheckboxGroup>
  ),
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
  render: () => (
    <form name="my-form" action="https://httpbin.org/post" method="POST">
      <PharosCheckboxGroup
        style={{ marginBottom: '0.5rem' }}
        onChange={(e) => action('Change')(e.target.value)}
        name="checkbox-group4"
        required
      >
        <span slot="legend">Checkbox Group Header</span>
        <PharosCheckbox value="1">
          <span slot="label">Checkbox 1</span>
        </PharosCheckbox>
        <PharosCheckbox value="2">
          <span slot="label">Checkbox 2</span>
        </PharosCheckbox>
        <PharosCheckbox value="3">
          <span slot="label">Checkbox 3</span>
        </PharosCheckbox>
      </PharosCheckboxGroup>
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
