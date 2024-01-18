import type { FC } from 'react';

import { PharosHeader } from '../../../react-components/header/pharos-header';
import { PharosLink } from '../../../react-components/link/pharos-link';
import { PharosDropdownMenuNav } from '../../../react-components/dropdown-menu-nav/pharos-dropdown-menu-nav';
import { PharosDropdownMenuNavLink } from '../../../react-components/dropdown-menu-nav/pharos-dropdown-menu-nav-link';
import { PharosDropdownMenu } from '../../../react-components/dropdown-menu/pharos-dropdown-menu';
import { PharosDropdownMenuItem } from '../../../react-components/dropdown-menu/pharos-dropdown-menu-item';
import { PharosInputGroup } from '../../../react-components/input-group/pharos-input-group';
import { PharosButton } from '../../../react-components/button/pharos-button';
import { PharosIcon } from '../../../react-components/icon/pharos-icon';
import logo from '@config/assets/images/jstor-logo.svg';

const accountNav = (section: string) => (
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
      <PharosDropdownMenuItem link="/account/profile">Profile</PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/workspace">Workspace</PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/read-online">
        Free Article Views
      </PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/subscriptions">JPASS Downloads</PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/account/purchases">Puchase History</PharosDropdownMenuItem>
      <PharosDropdownMenuItem link="/action/doLogout">Logout</PharosDropdownMenuItem>
    </PharosDropdownMenu>
  </PharosDropdownMenuNav>
);

export const Header: FC = () => (
  <PharosHeader>
    <div id="pds" slot="top" className="hide-for-small">
      <div
        role="button"
        tabIndex={0}
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
          a11yHidden="true"
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
            Please contact <PharosLink href="//jstor.org">JSTOR</PharosLink> for additional help and
            information.
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
          a11yLabel="search"
        ></PharosButton>
      </PharosInputGroup>
    </div>
    <div slot="end-top">{accountNav('end')}</div>
    <div
      slot="end-bottom"
      style={{
        display: 'flex',
      }}
    >
      <PharosDropdownMenuNav label="main navigation">
        <PharosDropdownMenuNavLink
          href="/action/showAdvancedSearch"
          id="adv-search-menu-link"
          className="hide-for-small"
        >
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
          className="hide-for-small"
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
);
