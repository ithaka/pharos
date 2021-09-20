import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { ImageResult } from '../../types';

export const ImageResultsItem = (result: ImageResult): TemplateResult => html`
  <pharos-link href="#" subtle flex>
    <div class="search-page__grid--image">
      <img src="./images/search/${result.image}" alt="${result.title}" width="99%" />
      <pharos-heading preset="1--bold" level="3" no-margin>${result.title}</pharos-heading>
    </div>
  </pharos-link>
`;
