import type { FC } from 'react';
import { Fragment } from 'react';
import type { Item } from '../../types';

import { PharosLink } from '../../../../react-components/link/pharos-link';
import { PharosHeading } from '../../../../react-components/heading/pharos-heading';

export const ItemCarouselItem: FC<Item> = (item) => (
  <Fragment>
    <PharosLink href="#" subtle flex>
      <div className="item-detail-page__grid--carousel-item">
        <img src={item.image} alt={item.title} />
        <PharosHeading preset="1--bold" level={3} noMargin>
          {item.title}
        </PharosHeading>
      </div>
    </PharosLink>
    <span className="item-detail-page__text--item-metadata">{item.metadata}</span>
  </Fragment>
);
