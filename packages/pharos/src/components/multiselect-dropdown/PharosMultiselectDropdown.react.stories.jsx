import { action } from 'storybook/actions';

import { PharosMultiselectDropdown } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Forms/Multiselect Dropdown',
  component: PharosMultiselectDropdown,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('multiselect-dropdown') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
};

const cities = [
  'Ann Arbor',
  'Battle Creek',
  'Benton Harbor',
  'Big Rapids',
  'Cadillac',
  'Charlevoix',
  'Coldwater',
  'Dearborn',
  'Detroit',
  'Dowagiac',
  'Empire',
  'Escanaba',
  'Flint',
  'Grand Rapids',
  'Holland',
  'Houghton',
  'Kalamazoo',
  'Lansing',
  'Marquette',
  'Mount Pleasant',
  'Muskegon',
  'Port Huron',
  'Rochester Hills',
  'Saginaw',
  'Sault Ste. Marie',
  'St Joseph',
  'Tawas City',
  'Traverse City',
  'Wyoming',
  'Ypsilanti',
];

export const Base = {
  render: (args) => (
    <PharosMultiselectDropdown
      name={args.name}
      displayCharacterCount={args.displayCharacterCount}
      hideSelectAll={args.hideSelectAll}
      looseMatch={args.looseMatch}
      disabled={args.disabled}
      hide-label={args.hideLabel}
      message={args.message}
      style={{ display: 'grid', gridTemplateColumns: '432px' }}
    >
      <span slot="label">{args.label}</span>
      {cities.map((city, i) => (
        <option key={i + 1} value={i + 1}>
          {city}
        </option>
      ))}
    </PharosMultiselectDropdown>
  ),
  args: defaultArgs,
};

export const States = {
  render: () => (
    <div style={{ display: 'grid', gridGap: '7rem', gridTemplateColumns: 'repeat(2, 300px)' }}>
      <PharosMultiselectDropdown name="disabled" disabled>
        <span slot="label">I am Disabled</span>
        {[...Array(8)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            Option {i + 1}
          </option>
        ))}
      </PharosMultiselectDropdown>

      <PharosMultiselectDropdown name="disabled-options">
        <span slot="label">I have disabled options</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>
          Option 2
        </option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5" disabled>
          Option 5
        </option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </PharosMultiselectDropdown>

      <PharosMultiselectDropdown name="no-selected-items">
        <span slot="label">I have no selected items</span>
        {[...Array(8)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            Option {i + 1}
          </option>
        ))}
      </PharosMultiselectDropdown>

      <PharosMultiselectDropdown name="one-selected-option">
        <span slot="label">I have one selected option</span>
        <option value="1">Option 1</option>
        <option value="2" selected>
          Option 2
        </option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </PharosMultiselectDropdown>

      <PharosMultiselectDropdown name="some-selected-option">
        <span slot="label">I have multiple selected options</span>
        <option value="1" selected>
          Option 1
        </option>
        <option value="2">Option 2</option>
        <option value="3" selected>
          Option 3
        </option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </PharosMultiselectDropdown>

      <PharosMultiselectDropdown name="selected-option">
        <span slot="label">I have many selected options</span>
        <option value="1" selected>
          Option 1
        </option>
        <option value="2" selected>
          Option 2
        </option>
        <option value="3" selected>
          Option 3
        </option>
        <option value="4" selected>
          Option 4
        </option>
        <option value="5" selected>
          Option 5
        </option>
        <option value="6">Option 6</option>
        <option value="7">Option 7</option>
        <option value="8">Option 8</option>
      </PharosMultiselectDropdown>

      <PharosMultiselectDropdown name="selected-option">
        <span slot="label">I have all options selected</span>
        {[...Array(8)].map((_, i) => (
          <option key={i + 1} value={i + 1} selected>
            Option {i + 1}
          </option>
        ))}
      </PharosMultiselectDropdown>
    </div>
  ),
};

export const Events = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '300px' }}>
      <PharosMultiselectDropdown
        name="event-demo"
        onChange={(e) => action('Change')(e.target.selectedOptions)}
        style={{ display: 'grid', gridTemplateColumns: '432px' }}
      >
        <span slot="label">Cities in Michigan</span>
        {cities.map((city, i) => (
          <option key={i + 1} value={i + 1}>
            {city}
          </option>
        ))}
      </PharosMultiselectDropdown>
    </div>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const FormData = {
  render: () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      const form = formRef.current;
      const formData = createFormData(form);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://httpbin.org/post', true);
      xhr.onload = function () {
        const response = JSON.parse(this.responseText);
        action('FormData')(JSON.stringify(response.form));
      };
      xhr.send(formData);
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '300px' }}>
        <form name="my-form" action="https://httpbin.org/post" method="POST" ref={formRef}>
          <PharosMultiselectDropdown
            name="my-multiselect-dropdown"
            onChange={(e) => action('Change')(e.target.selectedOptions)}
            style={{ display: 'grid', gridTemplateColumns: '432px' }}
          >
            <span slot="label">Cities in Michigan</span>
            {cities.map((city, i) => (
              <option key={i + 1} value={i + 1}>
                {city}
              </option>
            ))}
          </PharosMultiselectDropdown>
          <storybook-pharos-button type="submit" value="Submit" onClick={handleSubmit}>
            Submit
          </storybook-pharos-button>
        </form>
      </div>
    );
  },
};
