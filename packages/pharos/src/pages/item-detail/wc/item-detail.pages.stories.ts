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
  render: (): TemplateResult => html`
    <div class="item-detail-page__container">
      ${HeaderRevised(true)}
      <main>
        <storybook-pharos-layout
          preset="2-col"
          rows="max-content 1fr"
          class="item-detail-page__container--main-content"
        >
          <div class="item-detail-page__container--top" slot="top">
            <storybook-pharos-link href="#" class="item-detail-page__button--back" subtle flex>
              <storybook-pharos-icon
                name="arrow-left"
                style="margin-right: var(--pharos-spacing-one-quarter-x)"
              ></storybook-pharos-icon>
              Back to results
            </storybook-pharos-link>
            <storybook-pharos-button
              variant="subtle"
              icon="arrow-left"
              href="#"
              a11y-label="Back to results"
              class="item-detail-page__button--mobile-back"
            ></storybook-pharos-button>
            <div class="item-detail-page__container--action-buttons">
              <storybook-pharos-button variant="secondary" icon-left="cite"
                >Cite</storybook-pharos-button
              >
              <storybook-pharos-button variant="secondary" icon-left="share"
                >Share</storybook-pharos-button
              >
              <storybook-pharos-button variant="secondary" icon-left="save"
                >Save</storybook-pharos-button
              >
              <storybook-pharos-button variant="secondary" icon-left="download"
                >Download</storybook-pharos-button
              >
            </div>
            <div class="item-detail-page__container--mobile-buttons">
              <storybook-pharos-button
                variant="subtle"
                icon="cite"
                a11y-label="Cite"
              ></storybook-pharos-button>
              <storybook-pharos-button
                variant="subtle"
                icon="share"
                a11y-label="Share"
              ></storybook-pharos-button>
              <storybook-pharos-button
                variant="subtle"
                icon="save"
                a11y-label="Save"
              ></storybook-pharos-button>
              <storybook-pharos-button
                variant="subtle"
                icon="download"
                a11y-label="Download"
              ></storybook-pharos-button>
            </div>
          </div>
          <div class="item-detail-page__container--viewer"></div>
          <div class="item-detail-page__container--collections">
            ${ItemCarousel()} ${CollectionCarousel()}
          </div>
          ${Metadata()}
        </storybook-pharos-layout>
      </main>
      ${Footer()}
    </div>
  `,
};
