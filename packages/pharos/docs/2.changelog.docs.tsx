import { Markdown, Meta } from '@storybook/blocks';

import Changelog from '../CHANGELOG.md?raw';
import React, { FC } from 'react';

const PharosChangelog: FC = () => {
  return (
    <>
      <Meta title="Changelog" />
      <Markdown>{Changelog}</Markdown>
    </>
  );
};
export default PharosChangelog;
