import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { ItemCarouselItem } from './item-carousel-item';
import { items } from '../../mocks';

import '../../../../components/heading/pharos-heading';
import '../../../../components/button/pharos-button';

export const ItemCarousel = (): TemplateResult => html`
  <div class="item-detail-page__container--top-bar">
    <pharos-heading level="2" preset="3" no-margin>In this collection</pharos-heading>
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
  <ul class="item-detail-page__list item-detail-page__grid--items">
    ${items.map((item) => html`<li>${ItemCarouselItem(item)}</li>`)}
  </ul>
`;
