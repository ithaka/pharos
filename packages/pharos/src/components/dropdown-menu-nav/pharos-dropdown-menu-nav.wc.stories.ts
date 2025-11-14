import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Dropdown Menu Nav',
  component: 'pharos-dropdown-menu-nav',
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu-nav') },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => html`
    <storybook-pharos-dropdown-menu-nav>
      <storybook-pharos-dropdown-menu-nav-category
        id="category1-link"
        data-dropdown-menu-id="category1-menu"
        data-dropdown-menu-hover
        ><span slot="category">Category 1</span></storybook-pharos-dropdown-menu-nav-category
      >
      <storybook-pharos-dropdown-menu id="category1-menu" data-dropdown-menu-hover>
        <storybook-pharos-dropdown-menu-item>Item 1.1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 1.2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 1.3</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
      <storybook-pharos-dropdown-menu-nav-category
        id="category2-link"
        data-dropdown-menu-id="category2-menu"
        data-dropdown-menu-hover
        ><span slot="category">Category 2</span></storybook-pharos-dropdown-menu-nav-category
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
