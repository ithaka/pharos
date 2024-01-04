import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { ItemCarouselItem } from './item-carousel-item';
import { items } from '../../mocks';

export const ItemCarousel = (): TemplateResult => html`
  <div class="item-detail-page__container--top-bar">
    <storybook-pharos-heading level="2" preset="3" no-margin
      >In this collection</storybook-pharos-heading
    >
    <div class="item-detail-page__container--carousel-buttons">
      <storybook-pharos-button
        a11y-label="backward"
        variant="subtle"
        icon="chevron-left-large"
        icon-condensed
      ></storybook-pharos-button>
      <storybook-pharos-button
        a11y-label="forward"
        variant="subtle"
        icon="chevron-right-large"
        icon-condensed
      ></storybook-pharos-button>
    </div>
  </div>
  <ul class="item-detail-page__list item-detail-page__grid--items">
    ${items.map((item) => html`<li>${ItemCarouselItem(item)}</li>`)}
  </ul>
`;
