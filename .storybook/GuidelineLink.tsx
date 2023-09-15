import type { FC } from 'react';

import { PharosLink } from '../packages/pharos/src/react-components/link/pharos-link';

interface GuidelineLinkProps {
  path: string;
}

export const GuidelineLink: FC<GuidelineLinkProps> = ({ path }) => (
  <PharosLink href={`https://pharos.jstor.org/components/${path}`} target="_blank">
    See guidelines in Pharos
  </PharosLink>
);
