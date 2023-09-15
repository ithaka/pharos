import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

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
  render: (args) =>
    html`
      <pharos-progress-bar value=${args.value}>
        <div slot="title">${args.title}</div>
        <div slot="description">${args.description}</div>
      </pharos-progress-bar>
    `,
  args: defaultArgs,
};

export const Plain = {
  ...Base,
  args: {
    value: 10,
  },
};
