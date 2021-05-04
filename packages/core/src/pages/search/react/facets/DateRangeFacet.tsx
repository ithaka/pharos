import type { FC } from 'react';

import { PharosHeading } from '../../../../react-components/heading/pharos-heading';
import { PharosButton } from '../../../../react-components/button/pharos-button';
import { PharosTextInput } from '../../../../react-components/text-input/pharos-text-input';

export const DateRangeFacet: FC = () => (
  <fieldset className="search-page__fieldset--date">
    <legend>
      <PharosHeading level={3} preset="legend">
        Date
      </PharosHeading>
    </legend>
    <small className="search-page__text--description">(YYYY, YYYY/MM or YYYY/MM/DD)</small>
    <div className="search-page__grid--date">
      <PharosTextInput name="from">
        <span slot="label">From</span>
      </PharosTextInput>
      <PharosTextInput name="to">
        <span slot="label">To</span>
      </PharosTextInput>
      <PharosButton disabled>Apply</PharosButton>
    </div>
  </fieldset>
);
