import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';
import type { RadioGroupItem } from '../../types';

import '../../../../components/radio-group/pharos-radio-group';
import '../../../../components/radio-button/pharos-radio-button';

export const SingleSelectFacet = (
  name: string,
  legend: string,
  items: RadioGroupItem[]
): TemplateResult => html`
  <pharos-radio-group name="${name}">
    <span slot="legend">${legend}</span>
    ${items.map(
      (item) =>
        html`<pharos-radio-button value="${item.value}"
          ><span slot="label">${item.label}</span></pharos-radio-button
        >`
    )}
  </pharos-radio-group>
`;
