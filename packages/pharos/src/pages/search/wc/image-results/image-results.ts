import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { ImageResultsItem } from './image-results-item';
import '../../../../components/heading/pharos-heading';
import '../../../../components/button/pharos-button';
import '../../../../components/link/pharos-link';
import { imageResults } from '../../mocks';

export const ImageResults = (): TemplateResult => html`
  <div class="search-page__container--image-results">
    <div class="search-page__container--results-top-bar">
      <pharos-heading level="3" preset="2">1,429 image results</pharos-heading>
      <pharos-button variant="secondary" icon-right="arrow-right" style="margin-left: auto"
        >View all image results</pharos-button
      >
    </div>
    <ul class="search-page__list--results search-page__grid--image-results">
      ${imageResults.map((result) => html`<li>${ImageResultsItem(result)}</li>`)}
      <li>
        <pharos-link href="#" subtle flex>
          <div class="search-page__grid--image search-page__container--all-images">
            View all images
          </div>
        </pharos-link>
      </li>
    </ul>
  </div>
`;
