import type { FC } from 'react';
import { Fragment } from 'react';

import { CollectionCarouselItem } from './CollectionCarouselItem';
import { collections } from '../../mocks';

import { PharosButton } from '../../../../react-components/button/pharos-button';
import { PharosHeading } from '../../../../react-components/heading/pharos-heading';

export const CollectionCarousel: FC = () => (
  <Fragment>
    <div className="item-detail-page__container--top-bar">
      <PharosHeading level={2} preset="3" noMargin>
        Explore our open collections
      </PharosHeading>
      <div className="item-detail-page__container--carousel-buttons">
        <PharosButton
          a11yLabel="backward"
          variant="subtle"
          icon="chevron-left-large"
          iconCondensed
        ></PharosButton>
        <PharosButton
          a11yLabel="forward"
          variant="subtle"
          icon="chevron-right-large"
          iconCondensed
        ></PharosButton>
      </div>
    </div>
    <ul className="item-detail-page__list item-detail-page__grid--collections">
      {collections.map((collection, index) => (
        <li key={index}>{CollectionCarouselItem(collection)}</li>
      ))}
    </ul>
  </Fragment>
);
