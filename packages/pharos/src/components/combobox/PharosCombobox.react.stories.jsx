import { action } from '@storybook/addon-actions';

import { PharosButton, PharosCombobox } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Combobox',
  component: PharosCombobox,
  parameters: {
    docs: { page: configureDocsPage('combobox') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => (
    <PharosCombobox
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      invalidated={args.invalidated}
      message={args.message}
      name={args.name}
      open={args.open}
      placeholder={args.placeholder}
      required={args.required}
      style={{ display: 'grid', gridTemplateColumns: '300px' }}
      validated={args.validated}
      value={args.value}
    >
      <span slot="label">{args.label}</span>
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
    </PharosCombobox>
  ),
  args: defaultArgs,
};

export const States = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosCombobox
        disabled={args.disabled}
        hideLabel={args.hideLabel}
        open={args.open}
        placeholder={args.placeholder}
        value={args.value}
      >
        <span slot="label">You can edit my attributes</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </PharosCombobox>
    </div>
  ),
  args: {
    placeholder: 'Enter some text',
  },
};

export const Events = {
  render: (_) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosCombobox
        placeholder="Select a state"
        onChange={(e) => action('Change')(e.target.value)}
        onInput={(e) => action('Input')(e.target.value)}
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
      </PharosCombobox>
    </div>
  ),
  parameters: {
    options: { selectedPanel: 'addon-actions' },
  },
};

export const SearchMode = {
  render: (_) => (
    <PharosCombobox
      placeholder="Search..."
      searchMode
      style={{ display: 'grid', gridTemplateColumns: '300px' }}
    >
      <span slot="label">I'm searching for</span>
      <option value="1">Bulbasaur</option>
      <option value="2">Charmander</option>
      <option value="3">Squirtle</option>
      <option value="4">Caterpie</option>
      <option value="5">Weedle</option>
      <option value="6">Pidgey</option>
      <option value="7">Rattata</option>
      <option value="8">Spearow</option>
      <option value="9">Ekans</option>
      <option value="10">Pikachu</option>
      <option value="11">Sandshrew</option>
      <option value="12">Clefairy</option>
    </PharosCombobox>
  ),
};

export const Validity = {
  render: (args) => (
    <div style="display: grid; grid-template-columns: 300px;">
      <PharosCombobox
        name="my-combobox"
        placeholder="Enter some text"
        onChange={(e) => action('Change')(e.target.value)}
        onInput={(e) => action('Input')(e.target['_input'].value)}
        required={args.required}
        invalidated={args.invalidated}
        validated={args.validated}
        message={args.message}
      >
        <span slot="label">Test me out</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </PharosCombobox>
    </div>
  ),
  args: {
    required: true,
    invalidated: true,
    validated: false,
    message: 'This field is required, please make a selection',
  },
};

export const FormData = {
  render: (_) => (
    <div style={{ display: 'grid', gridTemplateColumns: '300px' }}>
      <form name="my-form" action="https://httpbin.org/post" method="POST">
        <PharosCombobox
          name="my-combobox"
          style={{ marginBottom: '0.5rem' }}
          placeholder="Enter some text"
          onChange={(e) => action('Change')(e.target.value)}
          onInput={(e) => action('Input')(e.target['_input'].value)}
          required
        >
          <span slot="label">Test me out</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </PharosCombobox>
        <PharosButton
          type="submit"
          value="Submit"
          onclick={(e) => {
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
