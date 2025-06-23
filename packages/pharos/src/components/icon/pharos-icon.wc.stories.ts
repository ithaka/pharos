import { html } from 'lit';

import { iconNames } from '../../utils/iconNames';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Icon',
  component: 'pharos-icon',
  parameters: {
    docs: { page: configureDocsPage('icon') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-icon
      name=${args.name}
      a11y-title=${args.a11yTitle}
      a11y-hidden=${args.a11yHidden}
      class="icon-example__icon"
    ></storybook-pharos-icon>
  `,
  args: defaultArgs,
};

export const Names: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(4, auto); grid-gap: 2rem; margin-top: 2rem; justify-content: space-evenly;"
    >
      ${iconNames.map((name) => {
        return html` <div class="icon-example__container">
          <storybook-pharos-icon
            name="${name}"
            a11y-title="${name}"
            class="icon-example__icon"
          ></storybook-pharos-icon>
          <div class="icon-example__name">${name}</div>
        </div>`;
      })}
    </div>
  `,
};
