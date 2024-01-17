import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';
import logo from '@config/assets/images/jstor-logo.svg';

export default {
  title: 'Organisms/Header',
  component: 'pharos-header',
  parameters: {
    docs: { page: configureDocsPage('header') },
    layout: 'fullscreen',
  },
};

export const Base = {
  render: () => {
    const accountNav = (section) => html`
      <storybook-pharos-dropdown-menu-nav label="profile">
        <storybook-pharos-dropdown-menu-nav-link
          href="/account/profile"
          id="profile-link-${section}"
          data-dropdown-menu-id="profile-menu-${section}"
          data-dropdown-menu-hover
          ><span class="hide-for-small">human@ithaka.org</span
          ><span class="show-for-small" style="display: none"
            >Account</span
          ></storybook-pharos-dropdown-menu-nav-link
        >
        <storybook-pharos-dropdown-menu id="profile-menu-${section}">
          <storybook-pharos-dropdown-menu-item link="/account/profile" id="profile-link-${section}"
            >Profile</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item
            link="/account/workspace"
            id="workspace-link-${section}"
            >Workspace</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item
            link="/account/read-online"
            id="article-link-${section}"
            >Free Article Views</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item
            link="/account/subscriptions"
            id="jpass-link-${section}"
            >JPASS Downloads</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item
            link="/account/purchases"
            id="purchase-link-${section}"
            >Purchase History</storybook-pharos-dropdown-menu-item
          >
          <storybook-pharos-dropdown-menu-item link="/action/doLogout" id="logout-link-${section}"
            >Logout</storybook-pharos-dropdown-menu-item
          >
        </storybook-pharos-dropdown-menu>
      </storybook-pharos-dropdown-menu-nav>
    `;
    return html`
      <storybook-pharos-header>
        <div id="pds" slot="top" class="hide-for-small">
          <div
            tabindex="0"
            style="display: flex"
            data-dropdown-menu-id="pds-menu"
            data-dropdown-menu-hover
          >
            <span>Access provided by&nbsp;</span>
            <span style="font-weight: bold">JSTOR</span>
            <storybook-pharos-icon name="chevron-down" style="margin-left: 1rem"  a11y-hidden="true"></storybook-pharos-icon>
          </div>
          <storybook-pharos-dropdown-menu id="pds-menu" placement="bottom">
            <div style="padding: 1rem">
              <p>
                Please contact
                <storybook-pharos-link href="//jstor.org">JSTOR</storybook-pharos-link> for additional help and
                information.
              </p>
            </div>
          </storybook-pharos-dropdown-menu>
        </div>
        <span slot="top" class="show-for-small" style="display: none; font-weight: bold"
          >JSTOR</span
        >
        <storybook-pharos-link slot="start" href="/" id="jstor-logo">
          <img src="${logo}" alt="JSTOR Home" width="65" height="90" />
        </storybook-pharos-link>
        <div slot="center">
          <storybook-pharos-input-group
            name="my-input-group"
            hide-label
            placeholder="Search JSTOR"
            class="header-example__input-group"
          >
            <span slot="label">Search JSTOR</span>
            <storybook-pharos-button
              name="search-button"
              icon="search"
              variant="subtle"
              label="search"
            ></storybook-pharos-button>
          </storybook-pharos-input-group>
        </div>
        <div slot="end-top"">
          <div>${accountNav('end')}</div>
        </div>
        <div slot="end-bottom" style="display: flex;">
          <storybook-pharos-dropdown-menu-nav label="main navigation" style="display: inline-block">
            <storybook-pharos-dropdown-menu-nav-link
              href="action/showAdvancedSearch"
              id="adv-search-link"
              >Advanced Search</storybook-pharos-dropdown-menu-nav-link
            >
            <storybook-pharos-dropdown-menu-nav-link
              href="/subjects"
              id="browse-link"
              data-dropdown-menu-id="browse-menu"
              data-dropdown-menu-hover
              >Browse</storybook-pharos-dropdown-menu-nav-link
            >
            <storybook-pharos-dropdown-menu id="browse-menu">
              <storybook-pharos-dropdown-menu-item link="/subjects">by Subject</storybook-pharos-dropdown-menu-item>
              <storybook-pharos-dropdown-menu-item link="/action/showJournals?browseType=title"
                >by Title</storybook-pharos-dropdown-menu-item
              >
              <storybook-pharos-dropdown-menu-item link="/site/collection-list"
                >by Collections</storybook-pharos-dropdown-menu-item
              >
              <storybook-pharos-dropdown-menu-item link="/publishers"
                >by Publisher</storybook-pharos-dropdown-menu-item
              >
            </storybook-pharos-dropdown-menu>
            <storybook-pharos-dropdown-menu-nav-link
              href="/account/workspace"
              id="tools-link"
              data-dropdown-menu-id="tools-menu"
              data-dropdown-menu-hover
              >Tools</storybook-pharos-dropdown-menu-nav-link
            >
            <storybook-pharos-dropdown-menu id="tools-menu">
              <storybook-pharos-dropdown-menu-item link="/account/workspace"
                >Workspace</storybook-pharos-dropdown-menu-item
              >
              <storybook-pharos-dropdown-menu-item link="/analyze"
                >Text Analyzer</storybook-pharos-dropdown-menu-item
              >
              <storybook-pharos-dropdown-menu-item link="/understand"
                >The JSTOR Understanding Series</storybook-pharos-dropdown-menu-item
              >
              <storybook-pharos-dropdown-menu-item link="/dfr"
                >Data for Research</storybook-pharos-dropdown-menu-item
              >
            </storybook-pharos-dropdown-menu>
          </storybook-pharos-dropdown-menu-nav>
        </div>
      </storybook-pharos-header>
    `;
  },
  parameters: { chromatic: { viewports: [320, 1200] } },
};
