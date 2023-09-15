import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import '../styles/header-revised.scss';
import logo from '@config/assets/images/jstor-logo.svg';

export const HeaderRevised = (showSearch = false): TemplateResult => html`
  <div
    class="${classMap({
      [`header-revised__container`]: true,
      [`header-revised__container--with-search`]: showSearch,
    })}"
  >
    <div class="header-revised__container--content">
      <pharos-link href="/" id="jstor-logo" class="header-revised__logo" flex>
        <img
          src="${logo}"
          alt="JSTOR Home"
          width="82"
          height="115"
          class="header-revised__image--logo"
        />
        <img
          src="${logo}"
          alt="JSTOR Home"
          width="64"
          height="89"
          class="header-revised__image--logo-medium"
        />
        <img
          src="${logo}"
          alt="JSTOR Home"
          width="43"
          height="60"
          class="header-revised__image--logo-small"
        />
      </pharos-link>
      <div class="header-revised__nav">
        <pharos-input-group
          name="my-input-group"
          hide-label
          class="${classMap({
            [`header-revised__input-group`]: true,
            [`header-revised__input-group--show`]: showSearch,
          })}"
        >
          <span slot="label">Search</span>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
        <pharos-dropdown-menu-nav label="main navigation">
          <pharos-dropdown-menu-nav-category
            id="adv-search-menu-link"
            data-dropdown-menu-id="search-menu"
            data-dropdown-menu-hover
            >Search</pharos-dropdown-menu-nav-category
          >
          <pharos-dropdown-menu id="search-menu">
            <pharos-dropdown-menu-item link="/action/showAdvancedSearch"
              >Advanced Search</pharos-dropdown-menu-item
            >
            <pharos-dropdown-menu-item link="/action/doImageSearch"
              >Image Search</pharos-dropdown-menu-item
            >
          </pharos-dropdown-menu>
          <pharos-dropdown-menu-nav-category
            id="browse-link"
            data-dropdown-menu-id="browse-menu"
            data-dropdown-menu-hover
            >Browse</pharos-dropdown-menu-nav-category
          >
          <pharos-dropdown-menu id="browse-menu">
            <pharos-dropdown-menu-item link="/subjects">by Subject</pharos-dropdown-menu-item>
            <pharos-dropdown-menu-item link="/action/showJournals?browseType=title"
              >by Title</pharos-dropdown-menu-item
            >
            <pharos-dropdown-menu-item link="/publishers">by Publisher</pharos-dropdown-menu-item>
          </pharos-dropdown-menu>
          <pharos-dropdown-menu-nav-category
            id="tools-link"
            data-dropdown-menu-id="tools-menu"
            data-dropdown-menu-hover
            class="hide-for-small"
            >Tools</pharos-dropdown-menu-nav-category
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
      </div>
      <div class="header-revised__container--account">
        <pharos-button
          variant="subtle"
          icon-left="checkmark-inverse"
          icon-right="chevron-down"
          class="header-revised__button--pds"
          >Access provided by JSTOR</pharos-button
        >
        <div class="header-revised__grid--account">
          <div class="header-revised__grid--account-links">
            <pharos-link href="//about.jstor.org" target="_blank" bold>About</pharos-link>
            <pharos-link href="//support.jstor.org" target="_blank" bold>Support</pharos-link>
          </div>
          <div class="header-revised__grid--account-buttons">
            <pharos-button variant="secondary" href="//support.jstor.org" target="_blank"
              >Register</pharos-button
            >
            <pharos-button href="//support.jstor.org" target="_blank">Log in</pharos-button>
          </div>
        </div>
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="header-revised__icon"
        >
          <path d="M0 1H20" stroke="black" stroke-width="2" />
          <path d="M0 15H20" stroke="black" stroke-width="2" />
          <path d="M0 8H20" stroke="black" stroke-width="2" />
        </svg>
      </div>
    </div>
  </div>
`;
