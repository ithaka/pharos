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
    html`
      <storybook-pharos-icon
        name=${args.name}
        description=${args.description}
        a11y-label=${args.a11yLabel}
        a11y-hidden=${args.a11yHidden}
        class="icon-example__icon"
      ></storybook-pharos-icon>
    `,
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
            <storybook-pharos-icon
              name="${name}"
              a11y-label="${name}"
              class="icon-example__icon"
            ></storybook-pharos-icon>
            <div class="icon-example__name">${name}</div>
          </div>`;
        })}
      </div>
    `,
};
