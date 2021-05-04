import type { FC } from 'react';

import { ImageResultsItem } from './ImageResultsItem';
import { imageResults } from '../../mocks';
import { PharosHeading } from '../../../../react-components/heading/pharos-heading';
import { PharosButton } from '../../../../react-components/button/pharos-button';
import { PharosLink } from '../../../../react-components/link/pharos-link';

export const ImageResults: FC = () => (
  <div className="search-page__container--image-results">
    <div className="search-page__container--results-top-bar">
      <PharosHeading level={3} preset="2">
        1,429 image results
      </PharosHeading>
      <PharosButton variant="secondary" iconRight="arrow-right" style={{ marginLeft: 'auto' }}>
        View all image results
      </PharosButton>
    </div>
    <ul className="search-page__list--results search-page__grid--image-results">
      {imageResults.map((result, index) => (
        <li key={index}>{ImageResultsItem(result)}</li>
      ))}
      <li>
        <PharosLink href="#" subtle flex>
          <div className="search-page__grid--image search-page__container--all-images">
            View all images
          </div>
        </PharosLink>
      </li>
    </ul>
  </div>
);
