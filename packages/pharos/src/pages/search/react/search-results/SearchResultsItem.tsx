import type { FC } from 'react';
import type { SearchResult } from '../../types';

import { PharosHeading } from '../../../../react-components/heading/pharos-heading';
import { PharosCheckbox } from '../../../../react-components/checkbox/pharos-checkbox';
import { PharosButton } from '../../../../react-components/button/pharos-button';
import { PharosLink } from '../../../../react-components/link/pharos-link';

export const SearchResultsItem: FC<SearchResult> = ({
  doi,
  title,
  type,
  author,
  metadata,
  snippet,
}) => (
  <div className="search-page__grid--result">
    <div style={{ justifySelf: 'center' }}>
      <PharosCheckbox name="doi" value={doi} hideLabel>
        <span slot="label">{title}</span>
      </PharosCheckbox>
    </div>
    <div>
      <span className="search-page__text--content-type">{type}</span>
      <PharosLink href={`/stable/${doi}`} subtle style={{ display: 'flex' }}>
        <PharosHeading level={3} preset="3">
          {title}
        </PharosHeading>
      </PharosLink>
      <PharosLink href="#">{author}</PharosLink>
      <p className="search-page__text--metadata">{metadata}</p>
      <p className="search-page__text--snippet">{snippet}</p>
    </div>
    <div className="search-page__container--action-buttons">
      <ul className="search-page__list--action-buttons">
        <li className="search-page__list-item--action-buttons">
          <PharosButton iconLeft="download" fullWidth>
            Download PDF
          </PharosButton>
        </li>
        <li className="search-page__list-item--action-buttons">
          <PharosButton iconLeft="save" variant="secondary" fullWidth>
            Save
          </PharosButton>
        </li>
        <li className="search-page__list-item--action-buttons">
          <PharosButton iconLeft="cite" variant="secondary" fullWidth>
            Cite
          </PharosButton>
        </li>
      </ul>
    </div>
  </div>
);
