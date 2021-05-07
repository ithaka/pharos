import type { FC } from 'react';
import type { RadioGroupItem } from '../../types';

import { PharosRadioButton } from '../../../../react-components/radio-button/pharos-radio-button';
import { PharosRadioGroup } from '../../../../react-components/radio-group/pharos-radio-group';

interface SingleSelectFacetProps {
  name: string;
  legend: string;
  items: RadioGroupItem[];
}

export const SingleSelectFacet: FC<SingleSelectFacetProps> = ({ name, legend, items }) => (
  <PharosRadioGroup name={name}>
    <span slot="legend">{legend}</span>
    {items.map((item, index) => (
      <PharosRadioButton key={index} value={item.value}>
        <span slot="label">{item.label}</span>
      </PharosRadioButton>
    ))}
  </PharosRadioGroup>
);
