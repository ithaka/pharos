import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Forms/Switch',
  component: 'pharos-switch',
  parameters: {
    docs: {
      page: configureDocsPage('switch'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: ({ disabled, checked }) =>
    html` <storybook-pharos-switch
      ?disabled=${disabled}
      ?checked=${checked}
      @change="${(e) => action('Change')(e.target.checked)}"
      ><span slot="label">Toggle Switch</span></storybook-pharos-switch
    >`,
  args: {
    disabled: false,
    checked: false,
  },
  parameters: {
    options: { selectedPanel: 'addon-actions' },
  },
};
