import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { Collection } from '../../types';

export const CollectionCarouselItem = (collection: Collection): TemplateResult => html`
  <pharos-link href="#" subtle flex>
    <div class="item-detail-page__grid--carousel-item item-detail-page__grid--open-collection">
      <img src="./images/item-detail/${collection.image}" alt="${collection.title}" />
      <pharos-heading preset="1--bold" level="3" no-margin>${collection.title}</pharos-heading>
    </div>
  </pharos-link>
  <span class="item-detail-page__text--collection-items">${collection.items} items</span>
`;
