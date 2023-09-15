import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { SearchResult } from '../../types';

export const SearchResultsItem = (result: SearchResult): TemplateResult => html`
  <div class="search-page__grid--result">
    <div style="justify-self: center">
      <storybook-pharos-checkbox name="doi" value="${result.doi}" hide-label
        ><span slot="label">${result.title}</span></storybook-pharos-checkbox
      >
    </div>
    <div>
      <span class="search-page__text--content-type">${result.type}</span>
      <storybook-pharos-link href="/stable/${result.doi}" subtle style="display: flex">
        <storybook-pharos-heading level="3" preset="3">${result.title}</storybook-pharos-heading>
      </storybook-pharos-link>
      <storybook-pharos-link href="#">${result.author}</storybook-pharos-link>
      <p class="search-page__text--metadata">${result.metadata}</p>
      <p class="search-page__text--snippet">${result.snippet}</p>
    </div>
    <div class="search-page__container--action-buttons">
      <ul class="search-page__list--action-buttons">
        <li class="search-page__list-item--action-buttons">
          <storybook-pharos-button icon-left="download" full-width
            >Download PDF</storybook-pharos-button
          >
        </li>
        <li class="search-page__list-item--action-buttons">
          <storybook-pharos-button icon-left="save" variant="secondary" full-width
            >Save</storybook-pharos-button
          >
        </li>
        <li class="search-page__list-item--action-buttons">
          <storybook-pharos-button icon-left="cite" variant="secondary" full-width
            >Cite</storybook-pharos-button
          >
        </li>
      </ul>
    </div>
  </div>
`;
