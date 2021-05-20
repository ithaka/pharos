import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';
import type { Card } from '../types';

import '../../../components/link/pharos-link';
import '../../../components/heading/pharos-heading';

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
