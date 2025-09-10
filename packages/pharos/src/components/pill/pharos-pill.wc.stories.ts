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
  render: () => html` <storybook-pharos-pill>Some content</storybook-pharos-pill> `,
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
  render: () => html`<storybook-pharos-pill dismissible>Dismissible Pill</storybook-pharos-pill> `,
};

export const Colors: Story = {
  render: () =>
    html`<div>
      <div
        style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px); padding: 1rem;"
      >
        ${sampleColors.map(
          (color) =>
            html`<storybook-pharos-pill color="${color}">${color} pill</storybook-pharos-pill>`
        )}
      </div>
      <div
        style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);background: var(--pharos-color-black); padding: 1rem;"
      >
        ${sampleLightColors.map(
          (color) =>
            html`<storybook-pharos-pill color="${color}" text-color="black"
              >${color} pill</storybook-pharos-pill
            >`
        )}
      </div>
    </div>`,
};
