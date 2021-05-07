import type { FC } from 'react';

import { SearchResultsItem } from './SearchResultsItem';
import { searchResults } from '../../mocks';
import { PharosHeading } from '../../../../react-components/heading/pharos-heading';
import { PharosDropdownMenu } from '../../../../react-components/dropdown-menu/pharos-dropdown-menu';
import { PharosDropdownMenuItem } from '../../../../react-components/dropdown-menu/pharos-dropdown-menu-item';
import { PharosButton } from '../../../../react-components/button/pharos-button';
import { PharosPagination } from '../../../../react-components/pagination/pharos-pagination';

export const SearchResults: FC = () => (
  <div className="search-page__container--search-results">
    <div className="search-page__container--results-top-bar">
      <PharosHeading level={3} preset="2">
        721,120 text results
      </PharosHeading>
      <PharosButton
        variant="secondary"
        iconRight="chevron-down"
        data-dropdown-menu-id="sort-dropdown"
        style={{ marginLeft: 'auto' }}
      >
        Sort by: Relevance
      </PharosButton>
    </div>
    <PharosDropdownMenu id="sort-dropdown" showSelected fullWidth>
      <PharosDropdownMenuItem selected>Relevance</PharosDropdownMenuItem>
      <PharosDropdownMenuItem>Newest</PharosDropdownMenuItem>
      <PharosDropdownMenuItem>Oldest</PharosDropdownMenuItem>
    </PharosDropdownMenu>
    <ol className="search-page__list--results">
      {searchResults.map((result, index) => (
        <li key={index} className="search-page__list-item--results">
          {SearchResultsItem(result)}
        </li>
      ))}
    </ol>
    <div className="search-page__container--results-pagination">
      <PharosPagination
        totalResults={132}
        pageSize={4}
        currentPage={1}
        style={{ marginLeft: 'auto' }}
      ></PharosPagination>
    </div>
  </div>
);
