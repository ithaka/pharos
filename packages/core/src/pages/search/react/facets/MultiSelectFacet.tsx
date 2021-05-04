import type { FC } from 'react';
import type { CheckboxGroupItem } from '../../types';

import { PharosCheckbox } from '../../../../react-components/checkbox/pharos-checkbox';
import { PharosCheckboxGroup } from '../../../../react-components/checkbox-group/pharos-checkbox-group';

interface MultiSelectFacetProps {
  name: string;
  legend: string;
  items: CheckboxGroupItem[];
}

export const MultiSelectFacet: FC<MultiSelectFacetProps> = ({ name, legend, items }) => (
  <PharosCheckboxGroup name={name}>
    <span slot="legend">{legend}</span>
    {items.map((item, index) => (
      <PharosCheckbox key={index} value={item.value}>
        <span slot="label">{item.label}</span>
      </PharosCheckbox>
    ))}
  </PharosCheckboxGroup>
);
