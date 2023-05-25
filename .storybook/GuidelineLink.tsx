import type { FC } from 'react';

import { PharosLink } from '../packages/pharos/src/react-components/link/pharos-link';
import { PharosContext } from '../packages/pharos/src/utils/PharosContext';

interface GuidelineLinkProps {
  path: string;
}

export const GuidelineLink: FC<GuidelineLinkProps> = ({ path }) => (
  <PharosContext.Provider value={{ prefix: 'storybook' }}>
    <PharosLink href={`https://pharos.jstor.org/components/${path}`} target="_blank">
      See guidelines in Pharos
    </PharosLink>
  </PharosContext.Provider>
);
