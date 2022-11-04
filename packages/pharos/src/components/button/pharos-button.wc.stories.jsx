import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Components/Button',
  component: 'pharos-button',
  parameters: {
    docs: {
      page: configureDocsPage('button'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) =>
    html`
      <pharos-button
        ?disabled=${ifDefined(args.disabled)}
        download=${ifDefined(args.download)}
        icon=${ifDefined(args.icon)}
        ?icon-condensed=${ifDefined(args.iconCondensed)}
        icon-left=${ifDefined(args.iconLeft)}
        icon-right=${ifDefined(args.iconRight)}
        ?full-width=${ifDefined(args.fullWidth)}
        href=${ifDefined(args.href)}
        hreflang=${ifDefined(args.hreflang)}
        label=${ifDefined(args.label)}
        ?large=${ifDefined(args.large)}
        ?on-background=${ifDefined(args.onBackground)}
        ping=${ifDefined(args.ping)}
        pressed=${ifDefined(args.pressed)}
        target=${ifDefined(args.target)}
        type=${ifDefined(args.type)}
        variant=${ifDefined(args.variant)}
        @click="${(e) => action('Click')(e.target)}"
      >
        ${args.text}
      </pharos-button>
    `,
  args: defaultArgs,
};

export const Variants = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="primary">Primary</pharos-button>
          <pharos-button name="secondary" variant="secondary">Secondary</pharos-button>
          <pharos-button name="subtle" variant="subtle">Subtle</pharos-button>
          <pharos-button name="overlay" variant="overlay">Overlay</pharos-button>
        </div>
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="primary-disabled" disabled>Primary</pharos-button>
          <pharos-button name="secondary-disabled" variant="secondary" disabled
            >Secondary</pharos-button
          >
          <pharos-button name="subtle-disabled" variant="subtle" disabled>Subtle</pharos-button>
          <pharos-button name="overlay-disabled" variant="overlay" disabled>Overlay</pharos-button>
        </div>
        <div style="background-color: #000000; padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="primary-on-background" on-background>Primary</pharos-button>
          <pharos-button name="secondary-on-background" variant="secondary" on-background
            >Secondary</pharos-button
          >
          <pharos-button name="subtle-on-background" variant="subtle" on-background
            >Subtle</pharos-button
          >
          <pharos-button name="overlay-on-background" variant="overlay" on-background
            >Overlay</pharos-button
          >
        </div>
      </div>
    `,
};

export const Large = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="large-primary" large>Primary</pharos-button>
          <pharos-button name="large-secondary" variant="secondary" large>Secondary</pharos-button>
          <pharos-button name="large-subtle" variant="subtle" large>Subtle</pharos-button>
          <pharos-button name="large-overlay" variant="overlay" large>Overlay</pharos-button>
        </div>
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="large-primary-disabled" large disabled>Primary</pharos-button>
          <pharos-button name="large-secondary-disabled" variant="secondary" large disabled
            >Secondary
          </pharos-button>
          <pharos-button name="large-subtle-disabled" variant="subtle" large disabled
            >Subtle
          </pharos-button>
          <pharos-button name="large-overlay" variant="overlay" large disabled
            >Overlay
          </pharos-button>
        </div>
        <div style="background-color: #000000; padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="large-primary-on-background" large on-background
            >Primary
          </pharos-button>
          <pharos-button
            name="large-secondary-on-background"
            variant="secondary"
            large
            on-background
            >Secondary
          </pharos-button>
          <pharos-button name="large-subtle-on-background" variant="subtle" large on-background
            >Subtle
          </pharos-button>
          <pharos-button name="large-overlay" variant="overlay" large on-background
            >Overlay
          </pharos-button>
        </div>
      </div>
    `,
};

export const WithIcons = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="primary-icon-left" icon-left="download">Icon left</pharos-button>
          <pharos-button name="primary-icon-right" icon-right="chevron-down"
            >Icon right
          </pharos-button>
          <pharos-button name="primary-icon-both" icon-right="chevron-down" icon-left="view-gallery"
            >Icon both
          </pharos-button>
        </div>
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="primary-icon-left-disabled" icon-left="download" disabled
            >Icon left
          </pharos-button>
          <pharos-button name="primary-icon-right-disabled" icon-right="chevron-down" disabled
            >Icon right
          </pharos-button>
          <pharos-button
            name="primary-icon-both-disabled"
            icon-right="chevron-down"
            icon-left="view-gallery"
            disabled
            >Icon both
          </pharos-button>
        </div>
        <div style="background-color: #000000; padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <pharos-button name="primary-icon-left-on-background" icon-left="download" on-background
            >Icon left
          </pharos-button>
          <pharos-button
            name="primary-icon-right-on-background"
            icon-right="chevron-down"
            on-background
            >Icon right
          </pharos-button>
          <pharos-button
            name="primary-icon-both-on-background"
            icon-right="chevron-down"
            icon-left="view-gallery"
            on-background
            >Icon both
          </pharos-button>
        </div>
      </div>
    `,
};

export const IconOnly = {
  ...Base,
  name: 'Icon only',
  args: {
    ...Base.args,
    text: undefined,
    icon: 'download',
    label: 'download',
  },
};

export const IconOnlyCondensed = {
  ...IconOnly,
  name: 'Icon only (condensed)',
  args: {
    ...IconOnly.args,
    iconCondensed: true,
  },
};

export const Link = {
  ...Base,
  args: {
    ...Base.args,
    href: 'https://google.com',
    target: '_blank',
  },
};

export const Forms = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 300px;">
        <form name="my-form" action="https://httpbin.org/post" method="POST">
          <pharos-text-input name="my-text-input" required>
            <span slot="label">Name</span>
          </pharos-text-input>
          <pharos-select name="my-select" required style="margin-top: 1.5rem">
            <span slot="label">Role</span>
            <option value="1">Student</option>
            <option value="2">Teacher</option>
            <option value="3" selected>Librarian</option>
          </pharos-select>
          <pharos-combobox name="my-combobox" value="2" required style="margin-top: 1.5rem">
            <span slot="label">State</span>
            <option value="1">New York</option>
            <option value="2">Michigan</option>
            <option value="3">New Jersey</option>
          </pharos-combobox>
          <pharos-radio-group name="my-radio-group" style="margin-top: 1.5rem">
            <span slot="legend">Degree</span>
            <pharos-radio-button value="1"
              ><span slot="label">Undergraduate</span></pharos-radio-button
            >
            <pharos-radio-button value="2"><span slot="label">Graduate</span></pharos-radio-button>
          </pharos-radio-group>
          <pharos-checkbox-group name="my-checkbox-group" style="margin-top: 1.5rem">
            <span slot="legend">Preferences</span>
            <pharos-checkbox value="1"
              ><span slot="label">Send me promotions and discounts</span></pharos-checkbox
            >
            <pharos-checkbox value="2" checked
              ><span slot="label">Send me weekly updates</span></pharos-checkbox
            >
          </pharos-checkbox-group>
          <pharos-textarea name="comments" style="margin-top: 1.5rem">
            <span slot="label">Comments</span>
          </pharos-textarea>
          <pharos-button type="reset" variant="secondary" style="margin-top: 1.5rem"
            >Reset
          </pharos-button>
          <pharos-button type="submit" style="margin-top: 1.5rem">Submit</pharos-button>
        </form>
      </div>
    `,
};
