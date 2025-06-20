import React from 'react';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';

import { GuidelineLink } from '@config/GuidelineLink';

export const configureDocsPage = (componentName) => {
  return () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      {componentName && <GuidelineLink path={componentName} />}
      <Primary />
      <Controls />
      <Stories />
    </>
  );
};
