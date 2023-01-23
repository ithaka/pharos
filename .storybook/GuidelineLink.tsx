import type { FC } from 'react';

import { PharosLink } from '../packages/pharos/src/react-components';

interface GuidelineLinkProps {
  path: string;
}

export const GuidelineLink: FC<GuidelineLinkProps> = ({ path }) => (
  <PharosLink href={`https://pharos.jstor.org/components/${path}`} target="_blank">
    See guidelines in Pharos
  </PharosLink>
);
