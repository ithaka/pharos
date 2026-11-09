import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { RadioGroupItem } from '../../types';
import registerStorybookComponents from '../../../../utils/_storybook/registerStorybookComponents';
import { PharosRadioButton } from '../../../../components/radio-button/pharos-radio-button';
import { PharosRadioGroup } from '../../../../components/radio-group/pharos-radio-group';

registerStorybookComponents([PharosRadioButton, PharosRadioGroup]);

export const SingleSelectFacet = (
  name: string,
  legend: string,
  items: RadioGroupItem[]
): TemplateResult => html`
  <storybook-pharos-radio-group name="${name}">
    <span slot="legend">${legend}</span>
    ${items.map(
      (item) =>
        html`<storybook-pharos-radio-button value="${item.value}"
          ><span slot="label">${item.label}</span></storybook-pharos-radio-button
        >`
    )}
  </storybook-pharos-radio-group>
`;
