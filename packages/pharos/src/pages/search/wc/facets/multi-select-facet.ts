import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';
import type { CheckboxGroupItem } from '../../types';

import '../../../../components/checkbox-group/pharos-checkbox-group';
import '../../../../components/checkbox/pharos-checkbox';

export const MultiSelectFacet = (
  name: string,
  legend: string,
  items: CheckboxGroupItem[]
): TemplateResult => html`
  <pharos-checkbox-group name="${name}">
    <span slot="legend">${legend}</span>
    ${items.map(
      (item) =>
        html`<pharos-checkbox value="${item.value}"
          ><span slot="label">${item.label}</span></pharos-checkbox
        >`
    )}
  </pharos-checkbox-group>
`;
