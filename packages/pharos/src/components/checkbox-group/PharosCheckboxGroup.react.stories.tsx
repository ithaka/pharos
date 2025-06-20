import { action } from 'storybook/actions';

import { PharosButton, PharosCheckbox, PharosCheckboxGroup } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/Checkbox Group',
  component: PharosCheckboxGroup,
  subcomponents: { PharosCheckbox },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('checkbox') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
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

export const Events: Story = {
  render: () => (
    <PharosCheckboxGroup
      onChange={(e) => action('Change')(JSON.stringify((e.target as HTMLInputElement).value))}
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
  render: () => (
    <form name="my-form" action="https://httpbin.org/post" method="POST">
      <PharosCheckboxGroup
        style={{ marginBottom: '0.5rem' }}
        onChange={(e) => action('Change')((e.target as HTMLInputElement).value)}
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
          const formData = createFormData(form as HTMLFormElement);
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
