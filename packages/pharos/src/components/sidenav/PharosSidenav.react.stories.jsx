import { Fragment } from 'react';

import {
  PharosSidenav,
  PharosSidenavSection,
  PharosSidenavLink,
  PharosSidenavMenu,
  PharosInputGroup,
  PharosButton,
  PharosSidenavButton,
  PharosLink,
} from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

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
    PharosSidenavButton,
  },
  parameters: {
    docs: { page: configureDocsPage('sidenav') },
  },
};

export const Base = {
  render: () => (
    <Fragment>
      <PharosSidenavButton />
      <PharosSidenav>
        <PharosLink slot="top" href="/" id="jstor-logo">
          <img src="./images/jstor-logo-inverse.svg" alt="Pharos Home" width="72" height="100" />
        </PharosLink>
        <PharosInputGroup
          slot="top"
          name="my-input-group"
          placeholder="Search"
          hideLabel
          onBackground
        >
          <span slot="label">Search</span>
          <PharosButton
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
            onBackground
          ></PharosButton>
        </PharosInputGroup>
        <PharosSidenavSection showDivider>
          <PharosSidenavLink href="#">Menu item</PharosSidenavLink>
          <PharosSidenavMenu label="Menu item w/accordion">
            <PharosSidenavLink href="#">Menu item 1</PharosSidenavLink>
            <PharosSidenavLink href="#">Menu item 2</PharosSidenavLink>
          </PharosSidenavMenu>
          <PharosSidenavLink href="#">Menu item</PharosSidenavLink>
          <PharosSidenavLink href="#" target="_blank" external>
            External link
          </PharosSidenavLink>
          <PharosSidenavLink href="#" target="_blank" external>
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
  parameters: { docs: { disable: true } },
};
