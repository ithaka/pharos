import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

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
  },
};

export const Base = {
  render: () =>
    html`
      <pharos-sidenav-button></pharos-sidenav-button>
      <pharos-sidenav>
        <pharos-link slot="top" href="/" id="jstor-logo">
          <img src="./images/jstor-logo-inverse.svg" alt="Pharos Home" width="72" height="100" />
        </pharos-link>
        <pharos-input-group
          slot="top"
          name="my-input-group"
          placeholder="Search"
          hide-label
          on-background
        >
          <span slot="label">Search</span>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
            on-background
          ></pharos-button>
        </pharos-input-group>
        <pharos-sidenav-section show-divider>
          <pharos-sidenav-link href="#">Menu item</pharos-sidenav-link>
          <pharos-sidenav-menu label="Menu item w/accordion">
            <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
          </pharos-sidenav-menu>
          <pharos-sidenav-link href="#">Menu item</pharos-sidenav-link>
          <pharos-sidenav-link href="#" target="_blank" external>External link</pharos-sidenav-link>
          <pharos-sidenav-link href="#" target="_blank" external>External link</pharos-sidenav-link>
        </pharos-sidenav-section>
        <pharos-sidenav-section label="Section Heading" show-divider>
          <pharos-sidenav-menu label="Menu item w/accordion">
            <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
          </pharos-sidenav-menu>
          <pharos-sidenav-menu label="Menu item w/accordion">
            <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
          </pharos-sidenav-menu>
          <pharos-sidenav-menu label="Menu item w/accordion">
            <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
          </pharos-sidenav-menu>
        </pharos-sidenav-section>
        <pharos-sidenav-section label="Section Heading">
          <pharos-sidenav-menu label="Menu item w/accordion">
            <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 4</pharos-sidenav-link>
          </pharos-sidenav-menu>
          <pharos-sidenav-menu label="Menu item w/accordion">
            <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
          </pharos-sidenav-menu>
          <pharos-sidenav-menu label="Menu item w/accordion">
            <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
            <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
          </pharos-sidenav-menu>
          <pharos-sidenav-link href="#">Menu item</pharos-sidenav-link>
        </pharos-sidenav-section>
      </pharos-sidenav>
    `,
  parameters: {
    chromatic: { viewports: [320, 1200] },
    docs: { disable: true },
  },
};
