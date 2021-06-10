import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../../../components/header/pharos-header';
import '../../../components/link/pharos-link';
import '../../../components/dropdown-menu-nav/pharos-dropdown-menu-nav';
import '../../../components/dropdown-menu-nav/pharos-dropdown-menu-nav-link';
import '../../../components/dropdown-menu/pharos-dropdown-menu';
import '../../../components/dropdown-menu/pharos-dropdown-menu-item';
import '../../../components/input-group/pharos-input-group';
import '../../../components/button/pharos-button';
import '../../../components/icon/pharos-icon';

const accountNav = (section: string) => html`
  <pharos-dropdown-menu-nav label="profile">
    <pharos-dropdown-menu-nav-link
      href="/account/profile"
      id="profile-link-${section}"
      data-dropdown-menu-id="profile-menu-${section}"
      data-dropdown-menu-hover
      ><span class="hide-for-small">human@ithaka.org</span
      ><span class="show-for-small" style="display: none"
        >Account</span
      ></pharos-dropdown-menu-nav-link
    >
    <pharos-dropdown-menu id="profile-menu-${section}">
      <pharos-dropdown-menu-item link="/account/profile">Profile</pharos-dropdown-menu-item>
      <pharos-dropdown-menu-item link="/account/workspace">Workspace</pharos-dropdown-menu-item>
      <pharos-dropdown-menu-item link="/account/read-online"
        >Free Article Views</pharos-dropdown-menu-item
      >
      <pharos-dropdown-menu-item link="/account/subscriptions"
        >JPASS Downloads</pharos-dropdown-menu-item
      >
      <pharos-dropdown-menu-item link="/account/purchases"
        >Puchase History</pharos-dropdown-menu-item
      >
      <pharos-dropdown-menu-item link="/action/doLogout">Logout</pharos-dropdown-menu-item>
    </pharos-dropdown-menu>
  </pharos-dropdown-menu-nav>
`;

export const Header = (): TemplateResult => html`
  <pharos-header>
    <div id="pds" slot="top" class="hide-for-small">
      <div
        tabindex="0"
        style="display: flex"
        data-dropdown-menu-id="pds-menu"
        data-dropdown-menu-hover
      >
        <span>Access provided by&nbsp;</span>
        <span style="font-weight: bold">JSTOR</span>
        <pharos-icon name="chevron-down" style="margin-left: 1rem"></pharos-icon>
      </div>
      <pharos-dropdown-menu id="pds-menu" placement="bottom">
        <div style="padding: 1rem">
          <p>
            Please contact
            <pharos-link href="//jstor.org">JSTOR</pharos-link> for additional help and information.
          </p>
        </div>
      </pharos-dropdown-menu>
    </div>
    <span slot="top" class="show-for-small" style="display: none; font-weight: bold">JSTOR</span>
    <pharos-link slot="start" href="/" id="jstor-logo">
      <img src="./images/jstor-logo.svg" alt="JSTOR Home" width="65" height="90" />
    </pharos-link>
    <div slot="center" style="display: grid; grid-template-rows: 1fr 1fr;">
      <pharos-input-group
        name="my-input-group"
        hide-label
        placeholder="Search JSTOR"
        class="header-example__input-group"
      >
        <span slot="label">Search JSTOR</span>
        <pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          label="search"
        ></pharos-button>
      </pharos-input-group>
      <div style="display: grid; grid-template-columns: 3fr 1fr">
        <pharos-dropdown-menu-nav label="main navigation" style="display: inline-block">
          <pharos-dropdown-menu-nav-link
            href="action/showAdvancedSearch"
            id="adv-search-menu-link"
            class="hide-for-small"
            >Advanced Search</pharos-dropdown-menu-nav-link
          >
          <pharos-dropdown-menu-nav-link
            href="/subjects"
            id="browse-link"
            data-dropdown-menu-id="browse-menu"
            data-dropdown-menu-hover
            >Browse</pharos-dropdown-menu-nav-link
          >
          <pharos-dropdown-menu id="browse-menu">
            <pharos-dropdown-menu-item link="/subjects">by Subject</pharos-dropdown-menu-item>
            <pharos-dropdown-menu-item link="/action/showJournals?browseType=title"
              >by Title</pharos-dropdown-menu-item
            >
            <pharos-dropdown-menu-item link="/site/collection-list"
              >by Collections</pharos-dropdown-menu-item
            >
            <pharos-dropdown-menu-item link="/publishers">by Publisher</pharos-dropdown-menu-item>
          </pharos-dropdown-menu>
          <pharos-dropdown-menu-nav-link
            href="/account/workspace"
            id="tools-link"
            data-dropdown-menu-id="tools-menu"
            data-dropdown-menu-hover
            class="hide-for-small"
            >Tools</pharos-dropdown-menu-nav-link
          >
          <pharos-dropdown-menu id="tools-menu">
            <pharos-dropdown-menu-item link="/account/workspace"
              >Workspace</pharos-dropdown-menu-item
            >
            <pharos-dropdown-menu-item link="/analyze">Text Analyzer</pharos-dropdown-menu-item>
            <pharos-dropdown-menu-item link="/understand"
              >The JSTOR Understanding Series</pharos-dropdown-menu-item
            >
            <pharos-dropdown-menu-item link="/dfr">Data for Research</pharos-dropdown-menu-item>
          </pharos-dropdown-menu>
        </pharos-dropdown-menu-nav>
        <div class="show-for-large" style="justify-self: end; display: none">
          ${accountNav('center')}
        </div>
      </div>
    </div>
    <div slot="end" style="display: grid; grid-template-rows: 1fr 1fr" class="hide-for-large">
      <div>${accountNav('end')}</div>
      <div
        style="display: grid; grid-template-columns: 1fr 1fr; align-items: center; justify-items: center"
      >
        <pharos-link href="//about.jstor.org" target="_blank" bold>About</pharos-link>
        <pharos-link href="//support.jstor.org" target="_blank" bold>Support</pharos-link>
      </div>
    </div>
  </pharos-header>
`;
