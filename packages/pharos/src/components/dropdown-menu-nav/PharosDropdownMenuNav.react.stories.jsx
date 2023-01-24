import {
  PharosDropdownMenu,
  PharosDropdownMenuItem,
  PharosDropdownMenuNav,
  PharosDropdownMenuNavLink,
} from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Dropdown Menu Nav',
  component: PharosDropdownMenuNav,
  subcomponents: {
    PharosDropdownMenuNavLink,
    PharosDropdownMenu,
    PharosDropdownMenuItem,
    DropdownMenuNavCategory,
  },
  parameters: {
    docs: { page: configureDocsPage('dropdown-menu-nav') },
  },
};

export const Base = {
  render: () => (
    <PharosDropdownMenuNav>
      <DropdownMenuNavCategory
        id="category1-link"
        data-dropdown-menu-id="category1-menu"
        data-dropdown-menu-hover
        target="_blank"
      >
        Category 1
      </DropdownMenuNavCategory>
      <PharosDropdownMenu id="category1-menu" data-dropdown-menu-hover>
        <PharosDropdownMenuItem>Item 1.1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 1.2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 1.3</PharosDropdownMenuItem>
      </PharosDropdownMenu>
      <DropdownMenuNavCategory
        id="category2-link"
        data-dropdown-menu-id="category2-menu"
        data-dropdown-menu-hover
        target="_blank"
      >
        Category 2
      </DropdownMenuNavCategory>
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
