import type { FC } from 'react';

import { PharosLink } from '../../react-components/link/pharos-link';
import { PharosContext } from '../PharosContext';

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
