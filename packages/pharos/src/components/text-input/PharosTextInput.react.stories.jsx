import { action } from '@storybook/addon-actions';

import { PharosTextInput, PharosButton } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Forms/Text Input',
  components: PharosTextInput,
  parameters: {
    docs: { page: configureDocsPage('text-input') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 300px)',
      }}
    >
      <PharosTextInput
        name={args.name}
        type={args.type}
        hideLabel={args.hideLabel}
        validated={args.validated}
        invalidated={args.invalidated}
        required={args.required}
        message={args.message}
        placeholder={args.placeholder}
        disabled={args.disabled}
        readonly={args.readonly}
        value={args.value}
      >
        <span slot="label">{args.label}</span>
      </PharosTextInput>
    </div>
  ),
  args: defaultArgs,
};

export const States = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(2, 300px)',
      }}
    >
      <PharosTextInput>
        <span slot="label">Empty input</span>
      </PharosTextInput>
      <PharosTextInput disabled>
        <span slot="label">Disabled input</span>
      </PharosTextInput>
      <PharosTextInput readonly value="Example text">
        <span slot="label">Read only input</span>
      </PharosTextInput>
      <PharosTextInput placeholder="example placeholder text">
        <span slot="label">Placeholder for input</span>
      </PharosTextInput>
      <PharosTextInput value="This value was provided">
        <span slot="label">Value provided</span>
      </PharosTextInput>
      <PharosTextInput hideLabel value="Hidden label input">
        <span slot="label">Hidden label</span>
      </PharosTextInput>
      <PharosTextInput value="A validated value" validated>
        <span slot="label">Validated input</span>
      </PharosTextInput>
      <PharosTextInput variant="prominent">
        <span slot="label">Prominent input</span>
      </PharosTextInput>
    </div>
  ),
};

export const Events = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosTextInput
        placeholder="Enter some text"
        onChange={(e) => action('Change')(e.target.value)}
        onInput={(e) => action('Input')(e.target.value)}
      >
        <span slot="label">I fire events on input</span>
      </PharosTextInput>
    </div>
  ),
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const Validity = {
  ...Base,
  args: {
    ...Base.args,
    label: 'Test me out',
    required: true,
    invalidated: true,
    message: 'This password does not meet the requirements',
  },
};

export const CustomErrorMessage = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 300px)',
      }}
    >
      <PharosTextInput
        placeholder="Enter some text"
        onChange={(e) => action('Change')(e.target.value)}
        onInput={(e) => action('Input')(e.target.value)}
        required={args.required}
        invalidated={args.invalidated}
        validated={args.validated}
        message={args.message}
      >
        <span slot="label">I am invalid</span>
        <span slot="message">
          <ul style={{ margin: 0, paddingInlineStart: '1.5rem' }}>
            <li>One upper or lowercase letter</li>
            <li>One number or special character</li>
            <li>6 character minimum</li>
            <li>No whitespace</li>
          </ul>
        </span>
      </PharosTextInput>
    </div>
  ),
  args: {
    ...Base.args,
    invalidated: true,
    message: 'This password does not meet the requirements',
  },
};

export const FormData = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 300px)',
      }}
    >
      <form name="my-form" action="https://httpbin.org/post" method="POST">
        <PharosTextInput
          style={{ marginBottom: '0.5rem' }}
          name="my-text-input"
          placeholder="Enter some text"
          onChange={(e) => action('Change')(e.target.value)}
          onInput={(e) => action('Input')(e.target.value)}
          required
        >
          <span slot="label">Test me out</span>
        </PharosTextInput>
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
    </div>
  ),
};
