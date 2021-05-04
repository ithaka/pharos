import type { FC } from 'react';

import '../styles/header-revised.scss';

import { PharosLink } from '../../../react-components/link/pharos-link';
import { PharosDropdownMenuNav } from '../../../react-components/dropdown-menu-nav/pharos-dropdown-menu-nav';
import { PharosDropdownMenuNavLink } from '../../../react-components/dropdown-menu-nav/pharos-dropdown-menu-nav-link';
import { PharosDropdownMenu } from '../../../react-components/dropdown-menu/pharos-dropdown-menu';
import { PharosDropdownMenuItem } from '../../../react-components/dropdown-menu/pharos-dropdown-menu-item';
import { PharosButton } from '../../../react-components/button/pharos-button';
import { PharosInputGroup } from '../../../react-components/input-group/pharos-input-group';

export interface Header {
  showSearch?: boolean;
}

export const HeaderRevised: FC<Header> = ({ showSearch = false }) => (
  <div
    className={`header-revised__container ${
      showSearch ? 'header-revised__container--with-search' : ''
    }`}
  >
    <div className="header-revised__container--content">
      <PharosLink href="/" id="jstor-logo" className="header-revised__logo" flex>
        <img
          src="./images/jstor-logo.svg"
          alt="JSTOR Home"
          width="82"
          height="115"
          className="header-revised__image--logo"
        />
        <img
          src="./images/jstor-logo.svg"
          alt="JSTOR Home"
          width="64"
          height="89"
          className="header-revised__image--logo-medium"
        />
        <img
          src="./images/jstor-logo.svg"
          alt="JSTOR Home"
          width="43"
          height="60"
          className="header-revised__image--logo-small"
        />
      </PharosLink>
      <div className="header-revised__nav">
        <PharosInputGroup
          name="my-input-group"
          hideLabel
          className={`header-revised__input-group ${
            showSearch ? 'header-revised__input-group--show' : ''
          }`}
        >
          <span slot="label">Search</span>
          <PharosButton
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></PharosButton>
        </PharosInputGroup>
        <PharosDropdownMenuNav label="main navigation">
          <PharosDropdownMenuNavLink
            href="/action/showAdvancedSearch"
            id="adv-search-menu-link"
            data-dropdown-menu-id="search-menu"
            data-dropdown-menu-hover
          >
            Search
          </PharosDropdownMenuNavLink>
          <PharosDropdownMenu id="search-menu">
            <PharosDropdownMenuItem link="/action/showAdvancedSearch">
              Advanced Search
            </PharosDropdownMenuItem>
            <PharosDropdownMenuItem link="/action/doImageSearch">
              Image Search
            </PharosDropdownMenuItem>
          </PharosDropdownMenu>
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
      <div className="header-revised__container--account">
        <PharosButton
          variant="subtle"
          iconLeft="checkmark-inverse"
          iconRight="chevron-down"
          className="header-revised__button--pds"
        >
          Access provided by JSTOR
        </PharosButton>
        <div className="header-revised__grid--account">
          <div className="header-revised__grid--account-links">
            <PharosLink href="//about.jstor.org" target="_blank" bold>
              About
            </PharosLink>
            <PharosLink href="//support.jstor.org" target="_blank" bold>
              Support
            </PharosLink>
          </div>
          <div className="header-revised__grid--account-buttons">
            <PharosButton variant="secondary" href="//support.jstor.org" target="_blank">
              Register
            </PharosButton>
            <PharosButton href="//support.jstor.org" target="_blank">
              Log in
            </PharosButton>
          </div>
        </div>
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="header-revised__icon"
        >
          <path d="M0 1H20" stroke="black" strokeWidth="2" />
          <path d="M0 15H20" stroke="black" strokeWidth="2" />
          <path d="M0 8H20" stroke="black" strokeWidth="2" />
        </svg>
      </div>
    </div>
  </div>
);
