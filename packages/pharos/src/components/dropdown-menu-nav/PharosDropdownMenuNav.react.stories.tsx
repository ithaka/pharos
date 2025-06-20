import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PharosDropdownMenu,
  PharosDropdownMenuItem,
  PharosDropdownMenuNav,
  PharosDropdownMenuNavLink,
  PharosDropdownMenuNavCategory,
} from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Dropdown Menu Nav',
  component: PharosDropdownMenuNav,
  subcomponents: {
    PharosDropdownMenuNavLink,
    PharosDropdownMenu,
    PharosDropdownMenuItem,
    PharosDropdownMenuNavCategory,
  },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu-nav') },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => (
    <PharosDropdownMenuNav>
      <PharosDropdownMenuNavCategory
        id="category1-link"
        data-dropdown-menu-id="category1-menu"
        data-dropdown-menu-hover
      >
        <span slot="category">Category 1</span>
      </PharosDropdownMenuNavCategory>
      <PharosDropdownMenu id="category1-menu" data-dropdown-menu-hover>
        <PharosDropdownMenuItem>Item 1.1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 1.2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 1.3</PharosDropdownMenuItem>
      </PharosDropdownMenu>
      <PharosDropdownMenuNavCategory
        id="category2-link"
        data-dropdown-menu-id="category2-menu"
        data-dropdown-menu-hover
      >
        <span slot="category">Category 2</span>
      </PharosDropdownMenuNavCategory>
      <PharosDropdownMenu id="category2-menu">
        <PharosDropdownMenuItem>Item 2.1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 2.2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 2.3</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 2.4</PharosDropdownMenuItem>
      </PharosDropdownMenu>
      <PharosDropdownMenuNavLink href="#" id="other-link" target="_blank">
        Link
      </PharosDropdownMenuNavLink>
    </PharosDropdownMenuNav>
  ),
};
