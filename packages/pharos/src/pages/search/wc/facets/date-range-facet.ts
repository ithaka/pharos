import { html } from 'lit';
import type { TemplateResult } from 'lit';

export const DateRangeFacet = (): TemplateResult => html`
  <fieldset class="search-page__fieldset--date">
    <legend>
      <pharos-heading level="3" preset="legend">Date</pharos-heading>
    </legend>
    <small class="search-page__text--description">(YYYY, YYYY/MM or YYYY/MM/DD)</small>
    <div class="search-page__grid--date">
      <pharos-text-input name="from">
        <span slot="label">From</span>
      </pharos-text-input>
      <pharos-text-input name="to">
        <span slot="label">To</span>
      </pharos-text-input>
      <pharos-button disabled>Apply</pharos-button>
    </div>
  </fieldset>
`;
