import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import type { FC } from 'react';
import { toSlug } from '../utils/textConvert';

interface ComponentExampleProps {
  children: React.ReactNode;
  storyBookType: string;
  componentTitle: string;
}

const ComponentExample: FC<ComponentExampleProps> = ({
  children,
  storyBookType,
  componentTitle,
}) => {
  const style = {
    margin: 'var(--pharos-spacing-2-x) 0',
  };
  const url =
    'https://pharos.jstor.org/storybook/?path=/story/web-components_' +
    storyBookType +
    '-' +
    toSlug(componentTitle) +
    '--docs';

  return (
    <>
      <PharosHeading level={2} preset="6">
        Example
      </PharosHeading>
      <div style={style}>{children}</div>
      <br />
      <div>
        <PharosLink href={url} target="_blank">
          See live code examples in Storybook
        </PharosLink>
      </div>
    </>
  );
};

export default ComponentExample;
