import { Fragment } from 'react';

import {
  PharosSidenav,
  PharosSidenavSection,
  PharosSidenavLink,
  PharosSidenavMenu,
  PharosInputGroup,
  PharosButton,
  PharosLink,
} from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import logo from '@config/assets/images/jstor-logo-inverse.svg';

export default {
  title: 'Components/Sidenav',
  component: PharosSidenav,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  subcomponents: {
    PharosSidenavMenu,
    PharosSidenavSection,
    PharosSidenavLink,
  },
  parameters: {
    docs: { page: configureDocsPage('sidenav') },
  },
};

export const Base = {
  render: (args) => (
    <Fragment>
      <PharosButton
        data-sidenav-id="storybook-sidenav"
        icon="menu"
        a11yLabel="menu"
        onClick={(e) => {
          e.target.focus();
        }}
      ></PharosButton>
      <PharosSidenav id="storybook-sidenav" open={args.open} hasCloseButton={args.hasCloseButton}>
        <PharosLink slot="top" href="/" id="jstor-logo">
          <img src={logo} alt="Pharos Home" width="72" height="100" />
        </PharosLink>
        <PharosInputGroup
          slot="top"
          name="my-input-group"
          placeholder="Search"
          hideLabel
          isOnBackground
        >
          <span slot="label">Search</span>
          <PharosButton
            name="search-button"
            icon="search"
            variant="subtle"
            isOnBackground
            a11yLabel="search"
          ></PharosButton>
        </PharosInputGroup>
        <PharosSidenavSection showDivider>
          <PharosSidenavLink href="#">Menu item</PharosSidenavLink>
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
          </PharosSidenavMenu>
          <PharosSidenavLink href="#">Menu item</PharosSidenavLink>
          <PharosSidenavLink href="#" external>
            External link
          </PharosSidenavLink>
          <PharosSidenavLink href="#" external>
            External link
          </PharosSidenavLink>
        </PharosSidenavSection>
        <PharosSidenavSection label="Section Heading" showDivider>
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 3</PharosSidenavLink>
          </PharosSidenavMenu>
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
          </PharosSidenavMenu>
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 3</PharosSidenavLink>
          </PharosSidenavMenu>
        </PharosSidenavSection>
        <PharosSidenavSection label="Section Heading">
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 3</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 4</PharosSidenavLink>
          </PharosSidenavMenu>
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
          </PharosSidenavMenu>
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 3</PharosSidenavLink>
          </PharosSidenavMenu>
          <PharosSidenavLink href="#">Menu item</PharosSidenavLink>
        </PharosSidenavSection>
      </PharosSidenav>
    </Fragment>
  ),
  args: { open: false, hasCloseButton: true },
  parameters: {},
};
