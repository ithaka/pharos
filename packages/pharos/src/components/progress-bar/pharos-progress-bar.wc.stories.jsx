import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, indeterminateArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Progress Bar',
  component: 'pharos-progress-bar',
  parameters: {
    docs: { page: configureDocsPage('progress-bar') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => html`
    <storybook-pharos-progress-bar value=${args.value}>
      <div slot="title">${args.title}</div>
      <div slot="description">${args.description}</div>
    </storybook-pharos-progress-bar>
  `,
  args: defaultArgs,
};

export const Indeterminate = {
  render: (args) => html`
    <storybook-pharos-progress-bar>
      <div slot="title">${args.title}</div>
      <div slot="description">${args.description}</div>
    </storybook-pharos-progress-bar>
  `,
  args: indeterminateArgs,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Plain = {
  ...Base,
  args: {
    value: 10,
  },
};
