import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { SearchResultsItem } from './search-results-item';
import { searchResults } from '../../mocks';

export const SearchResults = (): TemplateResult => html`
  <div class="search-page__container--search-results">
    <div class="search-page__container--results-top-bar">
      <storybook-pharos-heading level="3" preset="2">721,120 text results</storybook-pharos-heading>
      <storybook-pharos-button
        variant="secondary"
        icon-right="chevron-down"
        data-dropdown-menu-id="sort-dropdown"
        style="margin-left: auto"
        >Sort by: Relevance</storybook-pharos-button
      >
    </div>
    <storybook-pharos-dropdown-menu id="sort-dropdown" show-selected full-width>
      <storybook-pharos-dropdown-menu-item selected>Relevance</storybook-pharos-dropdown-menu-item>
      <storybook-pharos-dropdown-menu-item>Newest</storybook-pharos-dropdown-menu-item>
      <storybook-pharos-dropdown-menu-item>Oldest</storybook-pharos-dropdown-menu-item>
    </storybook-pharos-dropdown-menu>
    <ol class="search-page__list--results">
      ${searchResults.map(
        (result) =>
          html`<li class="search-page__list-item--results">${SearchResultsItem(result)}</li>`
      )}
    </ol>
    <div class="search-page__container--results-pagination">
      <storybook-pharos-pagination
        total-results="132"
        page-size="4"
        current-page="1"
        style="margin-left: auto"
      ></storybook-pharos-pagination>
    </div>
  </div>
`;
