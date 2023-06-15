import {
  PharosHeader,
  PharosLink,
  PharosDropdownMenuNav,
  PharosDropdownMenuNavLink,
  PharosDropdownMenu,
  PharosDropdownMenuItem,
  PharosInputGroup,
  PharosButton,
  PharosIcon,
} from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import logo from '@config/assets/images/jstor-logo.svg';

export default {
  title: 'Organisms/Header',
  component: PharosHeader,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('haeder') },
    layout: 'fullscreen',
  },
};

export const Base = {
  render: () => (
    <PharosHeader>
      <div id="pds" slot="top" className="hide-for-small">
        <div
          tabIndex="0"
          style={{
            display: 'flex',
          }}
          data-dropdown-menu-id="pds-menu"
          data-dropdown-menu-hover
        >
          <span>Access provided by&nbsp;</span>
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            JSTOR
          </span>
          <PharosIcon
            name="chevron-down"
            style={{
              marginLeft: '1rem',
            }}
          ></PharosIcon>
        </div>
        <span slot="top" className="show-for-small" style={{ display: 'none', fontWeight: 'bold' }}>
          JSTOR
        </span>
        <PharosDropdownMenu id="pds-menu" placement="bottom">
          <div
            style={{
              padding: '1rem',
            }}
          >
            <p>
              Please contact <PharosLink href="//jstor.org">JSTOR</PharosLink> for additional help
              and information.
            </p>
          </div>
        </PharosDropdownMenu>
      </div>
      <PharosLink slot="start" href="/" id="jstor-logo">
        <img src={logo} alt="JSTOR Home" width="65" height="90" />
      </PharosLink>
      <div slot="center">
        <PharosInputGroup
          name="my-input-group"
          hideLabel
          placeholder="Search JSTOR"
          className="header-example__input-group"
        >
          <span slot="label">Search JSTOR</span>
          <PharosButton
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></PharosButton>
        </PharosInputGroup>
      </div>
      <div slot="end-top">
        <div>{_accountNav('end')}</div>
      </div>
      <div
        slot="end-bottom"
        style={{
          display: 'flex',
        }}
      >
        <PharosDropdownMenuNav label="main navigation">
          <PharosDropdownMenuNavLink href="action/showAdvancedSearch" id="adv-search-link">
            Advanced Search
          </PharosDropdownMenuNavLink>
          <PharosDropdownMenuNavLink
            href="/subjects"
            id="browse-link"
            data-dropdown-menu-id="browse-menu"
            data-dropdown-menu-hover
          >
            Browse
          </PharosDropdownMenuNavLink>
          <PharosDropdownMenu id="browse-menu">
            <PharosDropdownMenuItem link="/subjects">by Subject</PharosDropdownMenuItem>
            <PharosDropdownMenuItem link="/action/showJournals?browseType=title">
              by Title
            </PharosDropdownMenuItem>
            <PharosDropdownMenuItem link="/site/collection-list">
              by Collections
            </PharosDropdownMenuItem>
            <PharosDropdownMenuItem link="/publishers">by Publisher</PharosDropdownMenuItem>
          </PharosDropdownMenu>
          <PharosDropdownMenuNavLink
            href="/account/workspace"
            id="tools-link"
            data-dropdown-menu-id="tools-menu"
            data-dropdown-menu-hover
          >
            Tools
          </PharosDropdownMenuNavLink>
          <PharosDropdownMenu id="tools-menu">
            <PharosDropdownMenuItem link="/account/workspace">Workspace</PharosDropdownMenuItem>
            <PharosDropdownMenuItem link="/analyze">Text Analyzer</PharosDropdownMenuItem>
            <PharosDropdownMenuItem link="/understand">
              The JSTOR Understanding Series
            </PharosDropdownMenuItem>
            <PharosDropdownMenuItem link="/dfr">Data for Research</PharosDropdownMenuItem>
          </PharosDropdownMenu>
        </PharosDropdownMenuNav>
      </div>
    </PharosHeader>
  ),
};

const _accountNav = (section) => (
  <PharosDropdownMenuNav label="profile">
    <PharosDropdownMenuNavLink
      href="/account/profile"
      id={`profile-link-${section}`}
      data-dropdown-menu-id={`profile-menu-${section}`}
      data-dropdown-menu-hover
    >
      <span className="hide-for-small">human@ithaka.org</span>
      <span className="show-for-small" style={{ display: 'none' }}>
        Account
      </span>
    </PharosDropdownMenuNavLink>
    <PharosDropdownMenu id={`profile-menu-${section}`}>
      <PharosDropdownMenuItem link="/account/profile" id={`profile-link-${section}`}>
        Profile
      </PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/workspace" id={`workspace-link-${section}`}>
        Workspace
      </PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/read-online" id={`article-link-${section}`}>
        Free Article Views
      </PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/subscriptions" id={`jpass-link-${section}`}>
        JPASS Downloads
      </PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/purchases" id={`purchase-link-${section}`}>
        Purchase History
      </PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/action/doLogout" id={`logout-link-${section}`}>
        Logout
      </PharosDropdownMenuItem>
    </PharosDropdownMenu>
  </PharosDropdownMenuNav>
);
