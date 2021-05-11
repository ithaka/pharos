import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { Item } from '../../types';

import '../../../../components/link/pharos-link';
import '../../../../components/heading/pharos-heading';

export const ItemCarouselItem = (item: Item): TemplateResult => html`
  <pharos-link href="#" subtle flex>
    <div class="item-detail-page__grid--carousel-item">
      <img src="./images/storybook/item-detail/${item.image}" alt="${item.title}" />
      <pharos-heading preset="1--bold" level="3" no-margin>${item.title}</pharos-heading>
    </div>
  </pharos-link>
  <span class="item-detail-page__text--item-metadata">${item.metadata}</span>
`;
