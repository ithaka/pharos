import { Markdown, Meta } from '@storybook/blocks';

import Intro from '../README.md?raw';
import PHAROS_TITLE from '@config/pharosTitle';
import React, { FC } from 'react';
import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';

const PharosIntro: FC = () => {
  return (
    <>
      <Meta title="Intro" />
      <PharosHeading level={1} preset="7--bold">
        {`${PHAROS_TITLE} Web Components`}
      </PharosHeading>

      <Markdown>{Intro}</Markdown>

      <PharosHeading level={2} preset="6">
        Work with us at ITHAKA
      </PharosHeading>

      <p>
        JSTOR is part of ITHAKA, a not-for-profit dedicated to expanding access to knowledge and
        education worldwide. Our staff makes us who we are. We're hiring — join us!
      </p>

      <ul>
        <li>
          <PharosLink href="https://www.ithaka.org/careers/">See career opportunities</PharosLink>
        </li>
        <li>
          <PharosLink href="https://www.ithaka.org/">Learn more about ITHAKA</PharosLink>
        </li>
      </ul>
    </>
  );
};
export default PharosIntro;
