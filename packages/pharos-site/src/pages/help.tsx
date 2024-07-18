import { PharosButton, PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';

import { FC } from 'react';

const HelpPage: FC = () => {
  return (
    <>
      <PharosHeading level={1} preset="7--bold">
        Help
      </PharosHeading>

      <PharosHeading level={2} preset="5">
        GitHub
      </PharosHeading>

      <p>
        Code for all our components, styles, tokens, assets, documentation, and this site lives in
        our{' '}
        <PharosLink href="https://github.com/ithaka/pharos" target="_blank">
          Pharos repository
        </PharosLink>
        .
      </p>
      <p>
        <PharosButton
          variant="secondary"
          iconRight="link-external"
          href="https://github.com/ithaka/pharos"
          target="_blank"
        >
          Go to GitHub
        </PharosButton>
      </p>

      <PharosHeading level={2} preset="5">
        Report an issue
      </PharosHeading>

      <p>
        If you find an issue with this site or a Pharos component, you can bring it to the
        maintainers' attention by creating a{' '}
        <PharosLink href="https://github.com/ithaka/pharos/issues" target="_blank">
          Github issue
        </PharosLink>{' '}
        in the Pharos repository.
      </p>
    </>
  );
};
export default HelpPage;
