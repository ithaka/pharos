import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { ImageResult } from '../../types';

export const ImageResultsItem = (result: ImageResult): TemplateResult => html`
  <storybook-pharos-link href="#" subtle flex>
    <div class="search-page__grid--image">
      <img src="${result.image}" alt="" width="99%" />
      <storybook-pharos-heading preset="1--bold" level="3" no-margin
        >${result.title}</storybook-pharos-heading
      >
    </div>
  </storybook-pharos-link>
`;
