import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';
import logo from '@config/assets/images/jstor-logo-inverse.svg';
import { ifDefined } from 'lit/directives/if-defined.js';

export default {
  title: 'Components/Sidenav',
  component: 'pharos-sidenav',
  subcomponents: {
    PharosSideNavMenu: 'pharos-sidenav-menu',
    PharosSidenavSection: 'pharos-sidenav-section',
    PharosSidenavLink: 'pharos-sidenav-link',
  },
  parameters: {
    docs: { page: configureDocsPage('sidenav') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) =>
    html`
      <storybook-pharos-button
        data-sidenav-id="storybook-sidenav"
        icon="menu"
      ></storybook-pharos-button>
      <storybook-pharos-sidenav
        id="storybook-sidenav"
        ?open=${ifDefined(args.open)}
        ?has-close-button=${ifDefined(args.hasCloseButton)}
      >
        <storybook-pharos-link slot="top" href="/" id="jstor-logo">
          <img src="${logo}" alt="Pharos Home" width="72" height="100" />
        </storybook-pharos-link>
        <storybook-pharos-input-group
          slot="top"
          name="my-input-group"
          placeholder="Search"
          hide-label
          is-on-background
        >
          <span slot="label">Search</span>
          <storybook-pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            a11y-label="search"
            is-on-background
          ></storybook-pharos-button>
        </storybook-pharos-input-group>
        <storybook-pharos-sidenav-section show-divider>
          <storybook-pharos-sidenav-link href="#">Menu item</storybook-pharos-sidenav-link>
          <storybook-pharos-sidenav-menu label="Menu item w/accordion">
            <storybook-pharos-sidenav-link href="#">Menu item 1</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 2</storybook-pharos-sidenav-link>
          </storybook-pharos-sidenav-menu>
          <storybook-pharos-sidenav-link href="#">Menu item</storybook-pharos-sidenav-link>
          <storybook-pharos-sidenav-link href="#" external target="_top"
            >External link</storybook-pharos-sidenav-link
          >
          <storybook-pharos-sidenav-link href="#" external
            >External link</storybook-pharos-sidenav-link
          >
        </storybook-pharos-sidenav-section>
        <storybook-pharos-sidenav-section label="Section Heading" show-divider>
          <storybook-pharos-sidenav-menu label="Menu item w/accordion">
            <storybook-pharos-sidenav-link href="#">Menu item 1</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 2</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 3</storybook-pharos-sidenav-link>
          </storybook-pharos-sidenav-menu>
          <storybook-pharos-sidenav-menu label="Menu item w/accordion">
            <storybook-pharos-sidenav-link href="#">Menu item 1</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 2</storybook-pharos-sidenav-link>
          </storybook-pharos-sidenav-menu>
          <storybook-pharos-sidenav-menu label="Menu item w/accordion">
            <storybook-pharos-sidenav-link href="#">Menu item 1</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 2</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 3</storybook-pharos-sidenav-link>
          </storybook-pharos-sidenav-menu>
        </storybook-pharos-sidenav-section>
        <storybook-pharos-sidenav-section label="Section Heading">
          <storybook-pharos-sidenav-menu label="Menu item w/accordion">
            <storybook-pharos-sidenav-link href="#">Menu item 1</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 2</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 3</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 4</storybook-pharos-sidenav-link>
          </storybook-pharos-sidenav-menu>
          <storybook-pharos-sidenav-menu label="Menu item w/accordion">
            <storybook-pharos-sidenav-link href="#">Menu item 1</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 2</storybook-pharos-sidenav-link>
          </storybook-pharos-sidenav-menu>
          <storybook-pharos-sidenav-menu label="Menu item w/accordion">
            <storybook-pharos-sidenav-link href="#">Menu item 1</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 2</storybook-pharos-sidenav-link>
            <storybook-pharos-sidenav-link href="#">Menu item 3</storybook-pharos-sidenav-link>
          </storybook-pharos-sidenav-menu>
          <storybook-pharos-sidenav-link href="#">Menu item</storybook-pharos-sidenav-link>
        </storybook-pharos-sidenav-section>
      </storybook-pharos-sidenav>
    `,
  args: { open: false, hasCloseButton: false },
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};
