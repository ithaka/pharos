import type { FC } from 'react';
import type { Card } from '../types';

import { PharosLink } from '../../../react-components/link/pharos-link';
import { PharosHeading } from '../../../react-components/heading/pharos-heading';

export const CollectionCard: FC<Card> = ({ title, link, image }) => (
  <div>
    <img src={image} alt={title} width="99.9%" className="home-page__image--collection" />
    <PharosHeading level={2} preset="3">
      {title}
    </PharosHeading>
    <PharosLink href="#">{link}</PharosLink>
  </div>
);
