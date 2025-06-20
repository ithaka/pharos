import { html } from 'lit';
import { action } from 'storybook/actions';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { ChangeEvent } from 'react';
import type { PharosSwitch } from './pharos-switch';

const meta = {
  title: 'Forms/Switch',
  component: 'pharos-switch',
  parameters: {
    docs: {
      page: configureDocsPage('switch'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: ({ disabled, checked }) =>
    html` <storybook-pharos-switch
      .disabled=${disabled}
      .checked=${checked}
      @change="${(e: ChangeEvent) => action('Change')((e.target as PharosSwitch).checked)}"
      ><span slot="label">Toggle Switch</span></storybook-pharos-switch
    >`,
  args: {
    disabled: false,
    checked: false,
  },
  parameters: {
    options: { selectedPanel: 'storybook/actions/panel' },
  },
};
