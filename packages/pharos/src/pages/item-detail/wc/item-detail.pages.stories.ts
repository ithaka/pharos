import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../item-detail.scss';
import { viewports, breakpoints } from '../../shared/viewports';
import { HeaderRevised } from '../../shared/wc/header-revised';
import { Footer } from '../../shared/wc/footer';
import { ItemCarousel } from './item-carousel/item-carousel';
import { CollectionCarousel } from './collection-carousel/collection-carousel';
import { Metadata } from './metadata';

export default {
  title: 'Pages/Item Detail',
  parameters: {
    chromatic: { viewports: breakpoints },
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
};

export const ItemDetail = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (_: object): TemplateResult => html`
    <div class="item-detail-page__container">
      ${HeaderRevised(true)}
      <main>
        <pharos-layout
          preset="2-col"
          rows="max-content 1fr"
          class="item-detail-page__container--main-content"
        >
          <div class="item-detail-page__container--top" slot="top">
            <pharos-link href="#" class="item-detail-page__button--back" subtle flex>
              <pharos-icon
                name="arrow-left"
                style="margin-right: var(--pharos-spacing-one-quarter-x)"
              ></pharos-icon>
              Back to results
            </pharos-link>
            <pharos-button
              variant="subtle"
              icon="arrow-left"
              href="#"
              label="Back to results"
              class="item-detail-page__button--mobile-back"
            ></pharos-button>
            <div class="item-detail-page__container--action-buttons">
              <pharos-button variant="secondary" icon-left="cite">Cite</pharos-button>
              <pharos-button variant="secondary" icon-left="share">Share</pharos-button>
              <pharos-button variant="secondary" icon-left="save">Save</pharos-button>
              <pharos-button variant="secondary" icon-left="download">Download</pharos-button>
            </div>
            <div class="item-detail-page__container--mobile-buttons">
              <pharos-button variant="subtle" icon="cite" label="Cite"></pharos-button>
              <pharos-button variant="subtle" icon="share" label="Share"></pharos-button>
              <pharos-button variant="subtle" icon="save" label="Save"></pharos-button>
              <pharos-button variant="subtle" icon="download" label="Download"></pharos-button>
            </div>
          </div>
          <div class="item-detail-page__container--viewer"></div>
          <div class="item-detail-page__container--collections">
            ${ItemCarousel()} ${CollectionCarousel()}
          </div>
          ${Metadata()}
        </pharos-layout>
      </main>
      ${Footer()}
    </div>
  `,
};
