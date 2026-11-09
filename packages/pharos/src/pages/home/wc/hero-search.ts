import { html } from 'lit';
import type { TemplateResult } from 'lit';
import registerStorybookComponents from '../../../utils/_storybook/registerStorybookComponents';
import { PharosIcon } from '../../../components/icon/pharos-icon';

registerStorybookComponents([PharosIcon]);

export const HeroSearch = (): TemplateResult => html`
  <div class="home-page__container--input">
    <storybook-pharos-icon
      name="search"
      class="home-page__icon--search"
      a11y-hidden="true"
    ></storybook-pharos-icon>
    <input class="home-page__input" placeholder="Search JSTOR..." />
  </div>
`;
