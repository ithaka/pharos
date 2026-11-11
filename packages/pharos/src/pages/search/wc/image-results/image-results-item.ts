import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { ImageResult } from '../../types';
import registerStorybookComponents from '../../../../utils/_storybook/registerStorybookComponents';
import { PharosHeading } from '../../../../components/heading/pharos-heading';
import { PharosLink } from '../../../../components/link/pharos-link';

registerStorybookComponents([PharosHeading, PharosLink]);

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
