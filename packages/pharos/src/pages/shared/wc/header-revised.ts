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
      <storybook-pharos-link href="/" id="jstor-logo" class="header-revised__logo" flex>
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
      </storybook-pharos-link>
      <div class="header-revised__nav">
        <storybook-pharos-input-group
          name="my-input-group"
          hide-label
          class="${classMap({
            [`header-revised__input-group`]: true,
            [`header-revised__input-group--show`]: showSearch,
          })}"
        >
          <span slot="label">Search</span>
          <storybook-pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            a11y-label="search"
          ></storybook-pharos-button>
        </storybook-pharos-input-group>
        <storybook-pharos-dropdown-menu-nav label="main navigation">
          <storybook-pharos-dropdown-menu-nav-category
            id="adv-search-menu-link"
            data-dropdown-menu-id="search-menu"
            data-dropdown-menu-hover
          >
            <span slot="category">Search</span>
          </storybook-pharos-dropdown-menu-nav-category>
          <storybook-pharos-dropdown-menu id="search-menu">
            <storybook-pharos-dropdown-menu-item link="/action/showAdvancedSearch"
              >Advanced Search</storybook-pharos-dropdown-menu-item
            >
            <storybook-pharos-dropdown-menu-item link="/action/doImageSearch"
              >Image Search</storybook-pharos-dropdown-menu-item
            >
          </storybook-pharos-dropdown-menu>
          <storybook-pharos-dropdown-menu-nav-category
            id="browse-link"
            data-dropdown-menu-id="browse-menu"
            data-dropdown-menu-hover
          >
            <span slot="category">Browse</span>
          </storybook-pharos-dropdown-menu-nav-category>
          <storybook-pharos-dropdown-menu id="browse-menu">
            <storybook-pharos-dropdown-menu-item link="/subjects"
              >by Subject</storybook-pharos-dropdown-menu-item
            >
            <storybook-pharos-dropdown-menu-item link="/action/showJournals?browseType=title"
              >by Title</storybook-pharos-dropdown-menu-item
            >
            <storybook-pharos-dropdown-menu-item link="/publishers"
              >by Publisher</storybook-pharos-dropdown-menu-item
            >
          </storybook-pharos-dropdown-menu>
          <storybook-pharos-dropdown-menu-nav-category
            id="tools-link"
            data-dropdown-menu-id="tools-menu"
            data-dropdown-menu-hover
            class="hide-for-small"
          >
            <span slot="category">Tools</span>
          </storybook-pharos-dropdown-menu-nav-category>
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
      <div class="header-revised__container--account">
        <storybook-pharos-button
          variant="subtle"
          icon-left="checkmark-inverse"
          icon-right="chevron-down"
          class="header-revised__button--pds"
          >Access provided by JSTOR</storybook-pharos-button
        >
        <div class="header-revised__grid--account">
          <div class="header-revised__grid--account-links">
            <storybook-pharos-link href="//about.jstor.org" target="_blank" bold
              >About</storybook-pharos-link
            >
            <storybook-pharos-link href="//support.jstor.org" target="_blank" bold
              >Support</storybook-pharos-link
            >
          </div>
          <div class="header-revised__grid--account-buttons">
            <storybook-pharos-button variant="secondary" href="//support.jstor.org" target="_blank"
              >Register</storybook-pharos-button
            >
            <storybook-pharos-button href="//support.jstor.org" target="_blank"
              >Log in</storybook-pharos-button
            >
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
