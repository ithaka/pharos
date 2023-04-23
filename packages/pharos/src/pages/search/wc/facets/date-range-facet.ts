import { html } from 'lit';
import type { TemplateResult } from 'lit';

export const DateRangeFacet = (): TemplateResult => html`
  <fieldset class="search-page__fieldset--date">
    <legend>
      <storybook-pharos-heading level="3" preset="legend">Date</storybook-pharos-heading>
    </legend>
    <small class="search-page__text--description">(YYYY, YYYY/MM or YYYY/MM/DD)</small>
    <div class="search-page__grid--date">
      <storybook-pharos-text-input name="from">
        <span slot="label">From</span>
      </storybook-pharos-text-input>
      <storybook-pharos-text-input name="to">
        <span slot="label">To</span>
      </storybook-pharos-text-input>
      <storybook-pharos-button disabled>Apply</storybook-pharos-button>
    </div>
  </fieldset>
`;
