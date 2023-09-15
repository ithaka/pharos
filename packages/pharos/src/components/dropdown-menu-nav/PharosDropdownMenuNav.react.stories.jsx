import {
  PharosDropdownMenu,
  PharosDropdownMenuItem,
  PharosDropdownMenuNav,
  PharosDropdownMenuNavLink,
  PharosDropdownMenuCategory,
} from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Dropdown Menu Nav',
  component: PharosDropdownMenuNav,
  subcomponents: {
    PharosDropdownMenuNavLink,
    PharosDropdownMenu,
    PharosDropdownMenuItem,
    PharosDropdownMenuCategory,
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
};

export const Base = {
  render: () => (
    <PharosDropdownMenuNav>
      <PharosDropdownMenuCategory
        id="category1-link"
        data-dropdown-menu-id="category1-menu"
        data-dropdown-menu-hover
        target="_blank"
      >
        <span slot="category">Category 1</span>
      </PharosDropdownMenuCategory>
      <PharosDropdownMenu id="category1-menu" data-dropdown-menu-hover>
        <PharosDropdownMenuItem>Item 1.1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 1.2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 1.3</PharosDropdownMenuItem>
      </PharosDropdownMenu>
      <PharosDropdownMenuCategory
        id="category2-link"
        data-dropdown-menu-id="category2-menu"
        data-dropdown-menu-hover
        target="_blank"
      >
        <span slot="category">Category 2</span>
      </PharosDropdownMenuCategory>
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
