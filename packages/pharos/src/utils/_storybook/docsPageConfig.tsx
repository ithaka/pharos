import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';

import { GuidelineLink } from './GuidelineLink';

export const configureDocsPage = (componentName: string) => {
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
