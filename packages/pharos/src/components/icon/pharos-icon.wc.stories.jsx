import { html } from 'lit';

import { iconNames } from '../../utils/iconNames';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Icon',
  component: 'pharos-icon',
  parameters: {
    docs: { page: configureDocsPage('icon') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) =>
    html` <pharos-icon name=${args.name} class="icon-example__icon"></pharos-icon> `,
  args: defaultArgs,
};

export const Names = {
  render: () =>
    html`
      <div
        style="display: grid; grid-template-columns: repeat(4, auto); grid-gap: 2rem; margin-top: 2rem; justify-content: space-evenly;"
      >
        ${iconNames.map((name) => {
          return html` <div class="icon-example__container">
            <pharos-icon name="${name}" class="icon-example__icon"></pharos-icon>
            <div class="icon-example__name">${name}</div>
          </div>`;
        })}
      </div>
    `,
};
