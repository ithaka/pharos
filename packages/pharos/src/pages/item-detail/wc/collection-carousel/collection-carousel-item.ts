import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { Collection } from '../../types';
import registerStorybookComponents from '../../../../utils/_storybook/registerStorybookComponents';
import { PharosHeading } from '../../../../components/heading/pharos-heading';
import { PharosLink } from '../../../../components/link/pharos-link';

registerStorybookComponents([PharosHeading, PharosLink]);

export const CollectionCarouselItem = (collection: Collection): TemplateResult => html`
  <storybook-pharos-link href="#" subtle flex>
    <div class="item-detail-page__grid--carousel-item item-detail-page__grid--open-collection">
      <img src="${collection.image}" alt="" />
      <storybook-pharos-heading preset="1--bold" level="3" no-margin
        >${collection.title}</storybook-pharos-heading
      >
    </div>
  </storybook-pharos-link>
  <span class="item-detail-page__text--collection-items">${collection.items} items</span>
`;
