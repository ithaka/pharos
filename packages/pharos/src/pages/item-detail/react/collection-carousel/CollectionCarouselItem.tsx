import type { FC } from 'react';
import { Fragment } from 'react';
import type { Collection } from '../../types';

import { PharosLink } from '../../../../react-components/link/pharos-link';
import { PharosHeading } from '../../../../react-components/heading/pharos-heading';

export const CollectionCarouselItem: FC<Collection> = (collection) => (
  <Fragment>
    <PharosLink href="#" subtle flex>
      <div className="item-detail-page__grid--carousel-item item-detail-page__grid--open-collection">
        <img src={collection.image} alt={collection.title} />
        <PharosHeading preset="1--bold" level={3} noMargin>
          {collection.title}
        </PharosHeading>
      </div>
    </PharosLink>
    <span className="item-detail-page__text--collection-items">{collection.items} items</span>
  </Fragment>
);
