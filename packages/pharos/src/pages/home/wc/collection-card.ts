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
    <storybook-pharos-heading level="2" preset="3">${card.title}</storybook-pharos-heading>
    <storybook-pharos-link href="#">${card.link}</storybook-pharos-link>
  </div>
`;
