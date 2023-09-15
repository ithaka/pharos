import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Dropdown Menu Nav',
  component: 'pharos-dropdown-menu-nav',
  subcomponents: {
    PharosDropdownMenuNavLink: 'pharos-dropdown-menu-nav-link',
    PharosDropdownMenu: 'pharos-dropdown-menu',
    PharosDropdownMenuItem: 'pharos-dropdown-menu-item',
    PharosDropdownMenuNavCategory: 'pharos-dropdown-menu-nav-category',
  },
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu-nav') },
  },
};

export const Base = {
  render: () =>
    html`
      <pharos-dropdown-menu-nav>
        <pharos-dropdown-menu-nav-category
          id="category1-link"
          data-dropdown-menu-id="category1-menu"
          data-dropdown-menu-hover
          target="_blank"
          ><span slot="category">Category 1<span></pharos-dropdown-menu-nav-category
        >
        <pharos-dropdown-menu id="category1-menu" data-dropdown-menu-hover>
          <pharos-dropdown-menu-item>Item 1.1</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 1.2</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 1.3</pharos-dropdown-menu-item>
        </pharos-dropdown-menu>
        <pharos-dropdown-menu-nav-category
          id="category2-link"
          data-dropdown-menu-id="category2-menu"
          data-dropdown-menu-hover
          target="_blank"
          ><span slot="category">Category 2<span></pharos-dropdown-menu-nav-category
        >
        <storybook-pharos-dropdown-menu id="category2-menu">
          <storybook-pharos-dropdown-menu-item>Item 2.1</storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item>Item 2.2</storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item>Item 2.3</storybook-pharos-dropdown-menu-item>
          <storybook-pharos-dropdown-menu-item>Item 2.4</storybook-pharos-dropdown-menu-item>
        </storybook-pharos-dropdown-menu>
        <storybook-pharos-dropdown-menu-nav-link href="#" id="other-link" target="_blank"
          >Link</storybook-pharos-dropdown-menu-nav-link
        >
      </storybook-pharos-dropdown-menu-nav>
    `,
  parameters: { chromatic: { viewports: [320, 1200] } },
};
