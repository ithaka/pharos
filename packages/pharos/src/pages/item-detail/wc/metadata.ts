import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { item, metadata } from '../mocks';
import logo from '../../../utils/_storybook/assets/images/item-detail/portal-logo.png';

export const Metadata = (): TemplateResult => html`
  <div class="item-detail-page__container--metadata">
    <img src="${logo}" alt="portal logo" class="item-detail-page__image--collection" />
    <div class="item-detail-page__label--type">${item.type}</div>
    <storybook-pharos-heading level="1" preset="3" class="item-detail-page__heading--metadata"
      >${item.title}</storybook-pharos-heading
    >
    <div class="item-detail-page__grid--metadata">
      ${metadata.map(
        (field) => html`
          <div>
            <div class="item-detail-page__label--content">${field.label}</div>
            <span class="item-detail-page__text--metadata">${field.value}</span>
          </div>
        `
      )}
    </div>
  </div>
`;
