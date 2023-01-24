import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Dropdown Menu Nav',
  component: 'pharos-dropdown-menu-nav',
  subcomponents: {
    PharosDropdownMenuNavLink: 'pharos-dropdown-menu-nav-link',
    PharosDropdownMenu: 'pharos-dropdown-menu',
    PharosDropdownMenuItem: 'pharos-dropdown-menu-item',
    PharosDropdownMenuNavHeading: 'pharos-dropdown-menu-nav-heading',
  },
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu-nav') },
  },
};

export const Base = {
  render: () =>
    html`
      <pharos-dropdown-menu-nav>
        <pharos-dropdown-menu-nav-heading
          id="category1-link"
          data-dropdown-menu-id="category1-menu"
          data-dropdown-menu-hover
          target="_blank"
          >Category 1</pharos-dropdown-menu-nav-heading
        >
        <pharos-dropdown-menu id="category1-menu" data-dropdown-menu-hover>
          <pharos-dropdown-menu-item>Item 1.1</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 1.2</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 1.3</pharos-dropdown-menu-item>
        </pharos-dropdown-menu>
        <pharos-dropdown-menu-nav-heading
          id="category2-link"
          data-dropdown-menu-id="category2-menu"
          data-dropdown-menu-hover
          target="_blank"
          >Category 2</pharos-dropdown-menu-nav-heading
        >
        <pharos-dropdown-menu id="category2-menu">
          <pharos-dropdown-menu-item>Item 2.1</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 2.2</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 2.3</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 2.4</pharos-dropdown-menu-item>
        </pharos-dropdown-menu>
        <pharos-dropdown-menu-nav-link href="#" id="other-link" target="_blank"
          >Link</pharos-dropdown-menu-nav-link
        >
      </pharos-dropdown-menu-nav>
    `,
  parameters: { chromatic: { viewports: [320, 1200] } },
};
