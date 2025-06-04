import { action } from 'storybook/actions';

import { PharosRadioGroup, PharosRadioButton, PharosButton } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Forms/Radio Group',
  component: PharosRadioGroup,
  subcomponents: { PharosRadioButton },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('radio-group') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => (
    <PharosRadioGroup
      name={args.name}
      horizontal={args.horizontal}
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      required={args.required}
      invalidated={args.invalidated}
      validated={args.validated}
      message={args.message}
    >
      <span slot="legend">Radio Group Header</span>
      <PharosRadioButton value="1">
        <span slot="label">Radio Button 1</span>
      </PharosRadioButton>
      <PharosRadioButton value="2">
        <span slot="label">Radio Button 2</span>
      </PharosRadioButton>
      <PharosRadioButton value="3">
        <span slot="label">Radio Button 3</span>
      </PharosRadioButton>
      <PharosRadioButton value="4">
        <span slot="label">Radio Button 4</span>
      </PharosRadioButton>
    </PharosRadioGroup>
  ),
  args: defaultArgs,
};

export const Events = {
  render: () => (
    <PharosRadioGroup onChange={(e) => action('Change')(e.target.value)} name="group2">
      <span slot="legend">Radio Group Header</span>
      <PharosRadioButton value="1">
        <span slot="label">Radio Button 1</span>
      </PharosRadioButton>
      <PharosRadioButton value="2" checked>
        <span slot="label">Radio Button 2</span>
      </PharosRadioButton>
      <PharosRadioButton value="3">
        <span slot="label">Radio Button 3</span>
      </PharosRadioButton>
    </PharosRadioGroup>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
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
  render: () => (
    <form name="my-form" action="https://httpbin.org/post" method="POST">
      <PharosRadioGroup
        style={{ marginBottom: '0.5rem' }}
        name="radio-group4"
        required
        onChange={(e) => action('Change')(e.target.value)}
      >
        <span slot="legend">Radio Group Header</span>
        <PharosRadioButton value="1">
          <span slot="label">Radio Button 1</span>
        </PharosRadioButton>
        <PharosRadioButton value="2">
          <span slot="label">Radio Button 2</span>
        </PharosRadioButton>
        <PharosRadioButton value="3">
          <span slot="label">Radio Button 3</span>
        </PharosRadioButton>
      </PharosRadioGroup>
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
