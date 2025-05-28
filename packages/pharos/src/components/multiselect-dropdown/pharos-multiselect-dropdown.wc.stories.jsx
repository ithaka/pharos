import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';

import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Forms/Multiselect Dropdown',
  component: 'pharos-multiselect-dropdown',
  parameters: {
    docs: { page: configureDocsPage('multiselect-dropdown') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
};

export const Base = {
  render: (args) => html`
    <storybook-pharos-multiselect-dropdown
      .value=${ifDefined(args.value)}
      .name=${ifDefined(args.name)}
      ?open=${args.open}
      ?loose-match=${args.looseMatch}
      ?disabled=${args.disabled}
      ?hide-label=${args.hideLabel}
      ?invalidated=${args.invalidated}
      ?validated=${args.validated}
      .placeholder=${ifDefined(args.placeholder)}
      message=${ifDefined(args.message)}
      ?required=${args.required}
      style="display: grid; grid-template-columns: 300px;"
    >
      <span slot="label">${args.label}</span>
      <option value="1">New Hampshire</option>
      <option value="2">Massachusetts</option>
      <option value="3">Connecticut</option>
      <option value="4">Rhode Island</option>
      <option value="5">New York</option>
      <option value="6">New Jersey</option>
      <option value="7">Pennsylvania</option>
      <option value="8">Delaware</option>
      <option value="9">Maryland</option>
      <option value="10">Virginia</option>
      <option value="11">North Carolina</option>
      <option value="12">South Carolina</option>
      <option value="13">Georgia</option>
    </storybook-pharos-multiselect-dropdown',>
  `,
  args: defaultArgs,
};
