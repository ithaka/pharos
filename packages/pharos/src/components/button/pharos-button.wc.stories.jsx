import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Button',
  component: 'pharos-button',
  parameters: {
    docs: {
      page: configureDocsPage('button'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) =>
    html`
      <storybook-pharos-button
        ?disabled=${ifDefined(args.disabled)}
        download=${ifDefined(args.download)}
        icon=${ifDefined(args.icon)}
        ?icon-condensed=${ifDefined(args.iconCondensed)}
        icon-left=${ifDefined(args.iconLeft)}
        icon-right=${ifDefined(args.iconRight)}
        ?full-width=${ifDefined(args.fullWidth)}
        href=${ifDefined(args.href)}
        hreflang=${ifDefined(args.hreflang)}
        a11y-label=${ifDefined(args.a11yLabel)}
        a11y-expanded=${ifDefined(args.a11yExpanded)}
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
      </storybook-pharos-button>
    `,
  args: defaultArgs,
};

export const Variants = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button name="primary">Primary</storybook-pharos-button>
          <storybook-pharos-button name="secondary" variant="secondary"
            >Secondary</storybook-pharos-button
          >
          <storybook-pharos-button name="subtle" variant="subtle">Subtle</storybook-pharos-button>
          <storybook-pharos-button name="overlay" variant="overlay"
            >Overlay</storybook-pharos-button
          >
        </div>
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button name="primary-disabled" disabled
            >Primary</storybook-pharos-button
          >
          <storybook-pharos-button name="secondary-disabled" variant="secondary" disabled
            >Secondary</storybook-pharos-button
          >
          <storybook-pharos-button name="subtle-disabled" variant="subtle" disabled
            >Subtle</storybook-pharos-button
          >
          <storybook-pharos-button name="overlay-disabled" variant="overlay" disabled
            >Overlay</storybook-pharos-button
          >
        </div>
        <div style="background-color: #000000; padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button name="primary-on-background" on-background
            >Primary</storybook-pharos-button
          >
          <storybook-pharos-button name="secondary-on-background" variant="secondary" on-background
            >Secondary</storybook-pharos-button
          >
          <storybook-pharos-button name="subtle-on-background" variant="subtle" on-background
            >Subtle</storybook-pharos-button
          >
          <storybook-pharos-button name="overlay-on-background" variant="overlay" on-background
            >Overlay</storybook-pharos-button
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
          <storybook-pharos-button name="large-primary" large>Primary</storybook-pharos-button>
          <storybook-pharos-button name="large-secondary" variant="secondary" large
            >Secondary</storybook-pharos-button
          >
          <storybook-pharos-button name="large-subtle" variant="subtle" large
            >Subtle</storybook-pharos-button
          >
          <storybook-pharos-button name="large-overlay" variant="overlay" large
            >Overlay</storybook-pharos-button
          >
        </div>
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button name="large-primary-disabled" large disabled
            >Primary</storybook-pharos-button
          >
          <storybook-pharos-button
            name="large-secondary-disabled"
            variant="secondary"
            large
            disabled
            >Secondary
          </storybook-pharos-button>
          <storybook-pharos-button name="large-subtle-disabled" variant="subtle" large disabled
            >Subtle
          </storybook-pharos-button>
          <storybook-pharos-button name="large-overlay" variant="overlay" large disabled
            >Overlay
          </storybook-pharos-button>
        </div>
        <div style="background-color: #000000; padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button name="large-primary-on-background" large on-background
            >Primary
          </storybook-pharos-button>
          <storybook-pharos-button
            name="large-secondary-on-background"
            variant="secondary"
            large
            on-background
            >Secondary
          </storybook-pharos-button>
          <storybook-pharos-button
            name="large-subtle-on-background"
            variant="subtle"
            large
            on-background
            >Subtle
          </storybook-pharos-button>
          <storybook-pharos-button name="large-overlay" variant="overlay" large on-background
            >Overlay
          </storybook-pharos-button>
        </div>
      </div>
    `,
};

export const WithIcons = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button name="primary-icon-left" icon-left="download"
            >Icon left</storybook-pharos-button
          >
          <storybook-pharos-button name="primary-icon-right" icon-right="chevron-down"
            >Icon right
          </storybook-pharos-button>
          <storybook-pharos-button
            name="primary-icon-both"
            icon-right="chevron-down"
            icon-left="view-gallery"
            >Icon both
          </storybook-pharos-button>
        </div>
        <div style="padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button name="primary-icon-left-disabled" icon-left="download" disabled
            >Icon left
          </storybook-pharos-button>
          <storybook-pharos-button
            name="primary-icon-right-disabled"
            icon-right="chevron-down"
            disabled
            >Icon right
          </storybook-pharos-button>
          <storybook-pharos-button
            name="primary-icon-both-disabled"
            icon-right="chevron-down"
            icon-left="view-gallery"
            disabled
            >Icon both
          </storybook-pharos-button>
        </div>
        <div style="background-color: #000000; padding: 1rem; display: grid; grid-gap: 1.5rem;">
          <storybook-pharos-button
            name="primary-icon-left-on-background"
            icon-left="download"
            on-background
            >Icon left
          </storybook-pharos-button>
          <storybook-pharos-button
            name="primary-icon-right-on-background"
            icon-right="chevron-down"
            on-background
            >Icon right
          </storybook-pharos-button>
          <storybook-pharos-button
            name="primary-icon-both-on-background"
            icon-right="chevron-down"
            icon-left="view-gallery"
            on-background
            >Icon both
          </storybook-pharos-button>
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
    a11yLabel: 'download',
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
          <storybook-pharos-text-input name="my-text-input" required>
            <span slot="label">Name</span>
          </storybook-pharos-text-input>
          <storybook-pharos-select name="my-select" required style="margin-top: 1.5rem">
            <span slot="label">Role</span>
            <option value="1">Student</option>
            <option value="2">Teacher</option>
            <option value="3" selected>Librarian</option>
          </storybook-pharos-select>
          <storybook-pharos-combobox
            name="my-combobox"
            value="2"
            required
            style="margin-top: 1.5rem"
          >
            <span slot="label">State</span>
            <option value="1">New York</option>
            <option value="2">Michigan</option>
            <option value="3">New Jersey</option>
          </storybook-pharos-combobox>
          <storybook-pharos-radio-group name="my-radio-group" style="margin-top: 1.5rem">
            <span slot="legend">Degree</span>
            <storybook-pharos-radio-button value="1"
              ><span slot="label">Undergraduate</span></storybook-pharos-radio-button
            >
            <storybook-pharos-radio-button value="2"
              ><span slot="label">Graduate</span></storybook-pharos-radio-button
            >
          </storybook-pharos-radio-group>
          <storybook-pharos-checkbox-group name="my-checkbox-group" style="margin-top: 1.5rem">
            <span slot="legend">Preferences</span>
            <storybook-pharos-checkbox value="1"
              ><span slot="label">Send me promotions and discounts</span></storybook-pharos-checkbox
            >
            <storybook-pharos-checkbox value="2" checked
              ><span slot="label">Send me weekly updates</span></storybook-pharos-checkbox
            >
          </storybook-pharos-checkbox-group>
          <storybook-pharos-textarea name="comments" style="margin-top: 1.5rem">
            <span slot="label">Comments</span>
          </storybook-pharos-textarea>
          <storybook-pharos-button type="reset" variant="secondary" style="margin-top: 1.5rem"
            >Reset
          </storybook-pharos-button>
          <storybook-pharos-button type="submit" style="margin-top: 1.5rem"
            >Submit</storybook-pharos-button
          >
        </form>
      </div>
    `,
};
