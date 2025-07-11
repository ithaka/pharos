import { action } from 'storybook/actions';

import { PharosTextarea, PharosButton } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PharosTextarea as PTType } from './pharos-textarea';

const meta = {
  title: 'Forms/Textarea',
  component: PharosTextarea,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('textarea') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosTextarea
        name="story-input"
        cols={args.columns}
        disabled={args.disabled}
        hideLabel={args.hideLabel}
        invalidated={args.invalidated}
        message={args.message}
        placeholder={args.placeholder}
        resize={args.resize}
        readonly={args.readonly}
        required={args.required}
        rows={args.rows}
        validated={args.validated}
        value={args.value}
      >
        <span slot="label">{args.label}</span>
      </PharosTextarea>
    </div>
  ),
  args: defaultArgs,
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridGap: '1rem', gridTemplateColumns: 'repeat(2, 250px)' }}>
      <PharosTextarea>
        <span slot="label">Empty textarea</span>
      </PharosTextarea>
      <PharosTextarea disabled>
        <span slot="label">Disabled textarea</span>
      </PharosTextarea>
      <PharosTextarea readonly value="Example text">
        <span slot="label">Read only textarea</span>
      </PharosTextarea>
      <PharosTextarea placeholder="Placeholder text">
        <span slot="label">Placeholder for textarea</span>
      </PharosTextarea>
      <PharosTextarea value="This value is provided">
        <span slot="label">Value provided textarea</span>
      </PharosTextarea>
      <PharosTextarea resize="none">
        <span slot="label">non-resizeable textarea</span>
      </PharosTextarea>
    </div>
  ),
};

export const Events: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosTextarea
        placeholder="Enter some text"
        onChange={(e) => action('Change')((e.target as PTType).value)}
        onInput={(e) => action('Input')((e.target as PTType).value)}
      >
        <span slot="label">I fire events on input</span>
      </PharosTextarea>
    </div>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Validity: Story = {
  ...Base,
  args: {
    ...Base.args,
    label: 'Test me out',
    value: '',
    placeholder: '',
    required: true,
    invalidated: true,
    message: 'This field does not meet the requirements',
  },
};

export const CustomErrorMessage: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosTextarea
        placeholder="Enter some text"
        onChange={(e) => action('Change')((e.target as PTType).value)}
        onInput={(e) => action('Input')((e.target as PTType).value)}
        required={args.required}
        invalidated={args.invalidated}
        validated={args.validated}
        message={args.message}
      >
        <span slot="label">I am invalid</span>
        <span slot="message">
          <p>Must be over 100 characters long</p>
        </span>
      </PharosTextarea>
    </div>
  ),
  args: {
    ...Base.args,
    invalidated: true,
    message: 'This field does not meet the requirements',
  },
};

export const FormData: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <form name="my-form" action="https://httpbin.org/post" method="POST">
        <PharosTextarea
          name="my-textarea"
          placeholder="Enter some text"
          style={{ marginBottom: '0.5rem' }}
          onChange={(e) => action('Change')((e.target as PTType).value)}
          onInput={(e) => action('Input')((e.target as PTType).value)}
          required
        >
          <span slot="label">I am invalid</span>
        </PharosTextarea>
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
    </div>
  ),
};
