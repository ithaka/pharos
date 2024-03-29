import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { CheckboxGroupItem } from '../../types';

export const MultiSelectFacet = (
  name: string,
  legend: string,
  items: CheckboxGroupItem[]
): TemplateResult => html`
  <storybook-pharos-checkbox-group name="${name}">
    <span slot="legend">${legend}</span>
    ${items.map(
      (item) =>
        html`<storybook-pharos-checkbox value="${item.value}"
          ><span slot="label">${item.label}</span></storybook-pharos-checkbox
        >`
    )}
  </storybook-pharos-checkbox-group>
`;
