import { html } from 'lit';
import type { TemplateResult } from 'lit';

export const HeroSearch = (): TemplateResult => html`
  <div class="home-page__container--input">
    <storybook-pharos-icon name="search" class="home-page__icon--search"></storybook-pharos-icon>
    <input class="home-page__input" placeholder="Search JSTOR..." />
  </div>
`;
