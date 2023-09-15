import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { RadioGroupItem } from '../../types';

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
