import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { Item } from '../../types';
import registerStorybookComponents from '../../../../utils/_storybook/registerStorybookComponents';
import { PharosHeading } from '../../../../components/heading/pharos-heading';
import { PharosLink } from '../../../../components/link/pharos-link';

registerStorybookComponents([PharosHeading, PharosLink]);

export const ItemCarouselItem = (item: Item): TemplateResult => html`
  <storybook-pharos-link href="#" subtle flex>
    <div class="item-detail-page__grid--carousel-item">
      <img src="${item.image}" alt="" />
      <storybook-pharos-heading preset="1--bold" level="3" no-margin
        >${item.title}</storybook-pharos-heading
      >
    </div>
  </storybook-pharos-link>
  <span class="item-detail-page__text--item-metadata">${item.metadata}</span>
`;
