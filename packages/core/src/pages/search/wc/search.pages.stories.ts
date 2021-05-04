import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';

import '../search.scss';
import { Header } from '../../shared/wc/header';
import { Footer } from '../../shared/wc/footer';
import { FacetFilters } from './facets/facet-filters';
import { SearchResults } from './search-results/search-results';
import { ImageResults } from './image-results/image-results';

import '../../../components/heading/pharos-heading';
import '../../../components/link/pharos-link';

export default {
  title: 'Pages/Search',
  parameters: {
    chromatic: { viewports: [1440] },
    layout: 'fullscreen',
  },
};

export const Search = (): TemplateResult => html`
  <div class="search-page__container">
    ${Header()}
    <main class="search-page__container--main-content">
      <div class="search-page__container--results-content">
        <pharos-heading level="2" preset="5--bold">722,549 search results</pharos-heading>
        <pharos-link href="/help" style="margin-left: auto">Search help</pharos-link>
      </div>
      ${ImageResults()} ${SearchResults()}
    </main>
    ${FacetFilters()} ${Footer()}
  </div>
`;
