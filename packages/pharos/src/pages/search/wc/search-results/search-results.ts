import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { SearchResultsItem } from './search-results-item';
import { searchResults } from '../../mocks';

export const SearchResults = (): TemplateResult => html`
  <div class="search-page__container--search-results">
    <div class="search-page__container--results-top-bar">
      <pharos-heading level="3" preset="2">721,120 text results</pharos-heading>
      <pharos-button
        variant="secondary"
        icon-right="chevron-down"
        data-dropdown-menu-id="sort-dropdown"
        style="margin-left: auto"
        >Sort by: Relevance</pharos-button
      >
    </div>
    <pharos-dropdown-menu id="sort-dropdown" show-selected full-width>
      <pharos-dropdown-menu-item selected>Relevance</pharos-dropdown-menu-item>
      <pharos-dropdown-menu-item>Newest</pharos-dropdown-menu-item>
      <pharos-dropdown-menu-item>Oldest</pharos-dropdown-menu-item>
    </pharos-dropdown-menu>
    <ol class="search-page__list--results">
      ${searchResults.map(
        (result) =>
          html`<li class="search-page__list-item--results">${SearchResultsItem(result)}</li>`
      )}
    </ol>
    <div class="search-page__container--results-pagination">
      <pharos-pagination
        total-results="132"
        page-size="4"
        current-page="1"
        style="margin-left: auto"
      ></pharos-pagination>
    </div>
  </div>
`;
