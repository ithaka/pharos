import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Pill',
  component: 'pharos-pill',
  parameters: {
    docs: { page: configureDocsPage('pill') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

const sampleColors = [
  'jstor-red',
  'night-blue-15',
  'night-blue-base',
  'living-coral-50',
  'living-coral-53',
  'marble-gray-10',
  'marble-gray-20',
  'marble-gray-30',
  'marble-gray-40',
  'black',
  'green-base',
  'engineering-orange',
  'dark-garnet',
];

const sampleLightColors = [
  'night-blue-60',
  'glacier-blue-base',
  'glacier-blue-40',
  'glacier-blue-70',
  'glacier-blue-80',
  'glacier-blue-90',
  'green-93',
  'green-97',
  'living-coral-base',
  'living-coral-80',
  'living-coral-90',
  'marble-gray-50',
  'marble-gray-80',
  'marble-gray-94',
  'marble-gray-97',
  'marble-gray-base',
  'white',
  'yellow-97',
  'yellow-base',
];
export const Base: Story = {
  render: () => html`<storybook-pharos-pill>Some content</storybook-pharos-pill>`,
  args: defaultArgs,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
      <storybook-pharos-pill>Normal Pill</storybook-pharos-pill>
      <storybook-pharos-pill size="small">Small Pill</storybook-pharos-pill>
    </div>
  `,
};

export const Dismissible: Story = {
  render: () =>
    html`<div>
      <storybook-pharos-pill dismissible>Primary Dismissible Pill</storybook-pharos-pill>
      <storybook-pharos-pill variant="secondary" dismissible
        >Secondary Dismissible Pill</storybook-pharos-pill
      >
    </div>`,
};

export const Truncated: Story = {
  render: () =>
    html`<div>
      <style>
        .truncated {
          max-width: 200px;
        }
      </style>
      <storybook-pharos-pill class="truncated">
        This is a very long pill that will truncate when it reaches the max width
      </storybook-pharos-pill>
      <br />
      <storybook-pharos-pill class="truncated" dismissible>
        This is a very long pill that will truncate when it reaches the max width
      </storybook-pharos-pill>
    </div>`,
};

export const Presets: Story = {
  render: () =>
    html`<div>
      <storybook-pharos-heading preset="2">Standard Pills</storybook-pharos-heading>
      <storybook-pharos-pill preset="1">Preset 1</storybook-pharos-pill>
      <storybook-pharos-pill preset="2">Preset 2</storybook-pharos-pill>
      <storybook-pharos-pill preset="3">Preset 3</storybook-pharos-pill>
      <storybook-pharos-pill preset="4">Preset 4</storybook-pharos-pill>
      <storybook-pharos-pill preset="5">Preset 5</storybook-pharos-pill>
      <storybook-pharos-pill preset="6">Preset 6</storybook-pharos-pill>
      <storybook-pharos-pill preset="7">Preset 7</storybook-pharos-pill>
      <storybook-pharos-pill preset="8">Preset 8</storybook-pharos-pill>
      <storybook-pharos-pill preset="9">Preset 9</storybook-pharos-pill>

      <storybook-pharos-heading preset="2">Dismissible Pills</storybook-pharos-heading>
      <storybook-pharos-pill preset="1" dismissible>Preset 1 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="2" dismissible>Preset 2 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="3" dismissible>Preset 3 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="4" dismissible>Preset 4 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="5" dismissible>Preset 5 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="6" dismissible>Preset 6 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="7" dismissible>Preset 7 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="8" dismissible>Preset 8 - Dismissible</storybook-pharos-pill>
      <storybook-pharos-pill preset="9" dismissible>Preset 9 - Dismissible</storybook-pharos-pill>

      <storybook-pharos-heading preset="2">Disabled Pills</storybook-pharos-heading>
      <storybook-pharos-pill preset="1" disabled>Preset 1</storybook-pharos-pill>
      <storybook-pharos-pill preset="2" disabled>Preset 2</storybook-pharos-pill>
      <storybook-pharos-pill preset="3" disabled>Preset 3</storybook-pharos-pill>
      <storybook-pharos-pill preset="4" disabled>Preset 4</storybook-pharos-pill>
      <storybook-pharos-pill preset="5" disabled>Preset 5</storybook-pharos-pill>
      <storybook-pharos-pill preset="6" disabled>Preset 6</storybook-pharos-pill>
      <storybook-pharos-pill preset="7" disabled>Preset 7</storybook-pharos-pill>
      <storybook-pharos-pill preset="8" disabled>Preset 8</storybook-pharos-pill>
      <storybook-pharos-pill preset="9" disabled>Preset 9</storybook-pharos-pill>
      <storybook-pharos-pill preset="1" dismissible disabled
        >Preset 1 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="2" dismissible disabled
        >Preset 2 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="3" dismissible disabled
        >Preset 3 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="4" dismissible disabled
        >Preset 4 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="5" dismissible disabled
        >Preset 5 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="6" dismissible disabled
        >Preset 6 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="7" dismissible disabled
        >Preset 7 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="8" dismissible disabled
        >Preset 8 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill preset="9" dismissible disabled
        >Preset 9 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-heading preset="1">Small Pills</storybook-pharos-heading>
      <storybook-pharos-heading preset="2">Standard Pills</storybook-pharos-heading>
      <storybook-pharos-pill size="small" preset="1">Preset 1</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="2">Preset 2</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="3">Preset 3</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="4">Preset 4</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="5">Preset 5</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="6">Preset 6</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="7">Preset 7</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="8">Preset 8</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="9">Preset 9</storybook-pharos-pill>

      <storybook-pharos-heading preset="2">Dismissible Pills</storybook-pharos-heading>
      <storybook-pharos-pill size="small" preset="1" dismissible
        >Preset 1 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="2" dismissible
        >Preset 2 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="3" dismissible
        >Preset 3 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="4" dismissible
        >Preset 4 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="5" dismissible
        >Preset 5 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="6" dismissible
        >Preset 6 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="7" dismissible
        >Preset 7 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="8" dismissible
        >Preset 8 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="9" dismissible
        >Preset 9 - Dismissible</storybook-pharos-pill
      >

      <storybook-pharos-heading preset="2">Disabled Pills</storybook-pharos-heading>
      <storybook-pharos-pill preset="1" disabled>Preset 1</storybook-pharos-pill>
      <storybook-pharos-pill preset="2" disabled size="small">Preset 2</storybook-pharos-pill>
      <storybook-pharos-pill preset="3" disabled size="small">Preset 3</storybook-pharos-pill>
      <storybook-pharos-pill preset="4" disabled size="small">Preset 4</storybook-pharos-pill>
      <storybook-pharos-pill preset="5" disabled size="small">Preset 5</storybook-pharos-pill>
      <storybook-pharos-pill preset="6" disabled size="small">Preset 6</storybook-pharos-pill>
      <storybook-pharos-pill preset="7" disabled size="small">Preset 7</storybook-pharos-pill>
      <storybook-pharos-pill preset="8" disabled size="small">Preset 8</storybook-pharos-pill>
      <storybook-pharos-pill preset="9" disabled size="small">Preset 9</storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="1" dismissible disabled
        >Preset 1 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="2" dismissible disabled
        >Preset 2 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="3" dismissible disabled
        >Preset 3 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="4" dismissible disabled
        >Preset 4 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="5" dismissible disabled
        >Preset 5 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="6" dismissible disabled
        >Preset 6 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="7" dismissible disabled
        >Preset 7 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="8" dismissible disabled
        >Preset 8 - Dismissible</storybook-pharos-pill
      >
      <storybook-pharos-pill size="small" preset="9" dismissible disabled
        >Preset 9 - Dismissible</storybook-pharos-pill
      >
    </div>`,
};

export const WithIcon: Story = {
  render: () =>
    html`<storybook-pharos-pill icon-left="info-inverse">Some content</storybook-pharos-pill
      ><storybook-pharos-pill icon-left="info-inverse" variant="secondary" color="green-base"
        >Some content</storybook-pharos-pill
      ><storybook-pharos-pill icon-left="info-inverse" size="small">small</storybook-pharos-pill>`,
};
