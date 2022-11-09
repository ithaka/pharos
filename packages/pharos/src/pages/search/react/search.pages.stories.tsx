import type { Meta } from '@storybook/react';

import '../search.scss';
import { Footer } from '../../shared/react/Footer';
import { Header } from '../../shared/react/Header';
import { FacetFilters } from './facets/FacetFilters';
import { SearchResults } from './search-results/SearchResults';
import { ImageResults } from './image-results/ImageResults';

import { PharosHeading, PharosLink } from '../../../react-components';

export default {
  title: 'Pages/Search',
  parameters: { layout: 'fullscreen' },
} as Meta;

export const Search = {
  render: () => (
    <div className="search-page__container">
      <Header />
      <main className="search-page__container--main-content">
        <div className="search-page__container--results-content">
          <PharosHeading level={2} preset="5--bold">
            722,549 search results
          </PharosHeading>
          <PharosLink href="/help" style={{ marginLeft: 'auto' }}>
            Search help
          </PharosLink>
        </div>
        <ImageResults />
        <SearchResults />
      </main>
      <FacetFilters />
      <Footer />
    </div>
  ),
};
