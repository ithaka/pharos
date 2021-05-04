import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';
import type { ImageResult } from '../../types';

import '../../../../components/link/pharos-link';
import '../../../../components/heading/pharos-heading';

export const ImageResultsItem = (result: ImageResult): TemplateResult => html`
  <pharos-link href="#" subtle flex>
    <div class="search-page__grid--image">
      <img src="./images/storybook/search/${result.image}" alt="${result.title}" width="99%" />
      <pharos-heading preset="1--bold" level="3" no-margin>${result.title}</pharos-heading>
    </div>
  </pharos-link>
`;
