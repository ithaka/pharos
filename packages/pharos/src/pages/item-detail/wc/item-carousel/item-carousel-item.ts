import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { Item } from '../../types';

export const ItemCarouselItem = (item: Item): TemplateResult => html`
  <storybook-pharos-link href="#" subtle flex>
    <div class="item-detail-page__grid--carousel-item">
      <img src="./images/item-detail/${item.image}" alt="${item.title}" />
      <storybook-pharos-heading preset="1--bold" level="3" no-margin
        >${item.title}</storybook-pharos-heading
      >
    </div>
  </storybook-pharos-link>
  <span class="item-detail-page__text--item-metadata">${item.metadata}</span>
`;
