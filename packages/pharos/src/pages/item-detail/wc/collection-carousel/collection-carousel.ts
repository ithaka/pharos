import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { CollectionCarouselItem } from './collection-carousel-item';
import { collections } from '../../mocks';

export const CollectionCarousel = (): TemplateResult => html`
  <div class="item-detail-page__container--top-bar">
    <storybook-pharos-heading level="2" preset="3" no-margin>Explore our open collections</storybook-pharos-heading>
    <div class="item-detail-page__container--carousel-buttons">
      <storybook-pharos-button
        label="backward"
        variant="subtle"
        icon="chevron-left-large"
        icon-condensed
      ></storybook-pharos-button>
      <storybook-pharos-button
        label="forward"
        variant="subtle"
        icon="chevron-right-large"
        icon-condensed
      ></storybook-pharos-button>
    </div>
  </div>
  <ul class="item-detail-page__list item-detail-page__grid--collections">
    ${collections.map((collection) => html`<li>${CollectionCarouselItem(collection)}</li>`)}
  </ul>
`;
