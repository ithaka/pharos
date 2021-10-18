import { html } from 'lit';
import type { TemplateResult } from 'lit';

export const HeroSearch = (): TemplateResult => html`
  <div class="home-page__container--input">
    <pharos-icon name="search" class="home-page__icon--search"></pharos-icon>
    <input class="home-page__input" placeholder="Search JSTOR..." />
  </div>
`;
