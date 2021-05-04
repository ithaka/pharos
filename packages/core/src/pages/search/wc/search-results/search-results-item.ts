import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';
import type { SearchResult } from '../../types';

import '../../../../components/heading/pharos-heading';
import '../../../../components/button/pharos-button';
import '../../../../components/link/pharos-link';
import '../../../../components/checkbox/pharos-checkbox';

export const SearchResultsItem = (result: SearchResult): TemplateResult => html`
  <div class="search-page__grid--result">
    <div style="justify-self: center">
      <pharos-checkbox name="doi" value="${result.doi}" hide-label
        ><span slot="label">${result.title}</span></pharos-checkbox
      >
    </div>
    <div>
      <span class="search-page__text--content-type">${result.type}</span>
      <pharos-link href="/stable/${result.doi}" subtle style="display: flex">
        <pharos-heading level="3" preset="3">${result.title}</pharos-heading>
      </pharos-link>
      <pharos-link href="#">${result.author}</pharos-link>
      <p class="search-page__text--metadata">${result.metadata}</p>
      <p class="search-page__text--snippet">${result.snippet}</p>
    </div>
    <div class="search-page__container--action-buttons">
      <ul class="search-page__list--action-buttons">
        <li class="search-page__list-item--action-buttons">
          <pharos-button icon-left="download" full-width>Download PDF</pharos-button>
        </li>
        <li class="search-page__list-item--action-buttons">
          <pharos-button icon-left="save" variant="secondary" full-width>Save</pharos-button>
        </li>
        <li class="search-page__list-item--action-buttons">
          <pharos-button icon-left="cite" variant="secondary" full-width>Cite</pharos-button>
        </li>
      </ul>
    </div>
  </div>
`;
