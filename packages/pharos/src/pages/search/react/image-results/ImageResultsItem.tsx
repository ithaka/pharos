import type { FC } from 'react';
import type { ImageResult } from '../../types';

import { PharosLink } from '../../../../react-components/link/pharos-link';
import { PharosHeading } from '../../../../react-components/heading/pharos-heading';

export const ImageResultsItem: FC<ImageResult> = ({ title, image }) => (
  <PharosLink href="#" subtle flex>
    <div className="search-page__grid--image">
      <img src={image} alt={title} width="99%" />
      <PharosHeading preset="1--bold" level={3} noMargin>
        {title}
      </PharosHeading>
    </div>
  </PharosLink>
);
