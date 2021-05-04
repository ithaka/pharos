import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';

import { CollectionCarouselItem } from './collection-carousel-item';
import { collections } from '../../mocks';

import '../../../../components/heading/pharos-heading';
import '../../../../components/button/pharos-button';

export const CollectionCarousel = (): TemplateResult => html`
  <div class="item-detail-page__container--top-bar">
    <pharos-heading level="2" preset="3" no-margin>Explore our open collections</pharos-heading>
    <div class="item-detail-page__container--carousel-buttons">
      <pharos-button
        label="backward"
        variant="subtle"
        icon="chevron-left-large"
        icon-condensed
      ></pharos-button>
      <pharos-button
        label="forward"
        variant="subtle"
        icon="chevron-right-large"
        icon-condensed
      ></pharos-button>
    </div>
  </div>
  <ul class="item-detail-page__list item-detail-page__grid--collections">
    ${collections.map((collection) => html`<li>${CollectionCarouselItem(collection)}</li>`)}
  </ul>
`;
