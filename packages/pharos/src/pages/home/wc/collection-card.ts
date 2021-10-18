import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { Card } from '../types';

export const CollectionCard = (card: Card): TemplateResult => html`
  <div>
    <img
      src="./images/home/${card.image}"
      alt="${card.title}"
      width="99.9%"
      class="home-page__image--collection"
    />
    <pharos-heading level="2" preset="3">${card.title}</pharos-heading>
    <pharos-link href="#">${card.link}</pharos-link>
  </div>
`;
