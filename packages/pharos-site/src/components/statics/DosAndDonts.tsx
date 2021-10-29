import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import {
  container,
  line_dont,
  line_do,
  title,
  text_container,
  text_dont,
  text_do,
} from './DosAndDonts.module.css';

interface DosAndDontsProps {
  Dont?: boolean;
}

const DosAndDonts: FC<DosAndDontsProps> = ({ children, Dont }) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);

  useEffect(() => {
    (async () => {
      const { PharosIcon } = await import('@ithaka/pharos/lib/react-components/icon/pharos-icon');
      const { PharosHeading } = await import(
        '@ithaka/pharos/lib/react-components/heading/pharos-heading'
      );

      const content = (
        <div className={container}>
          <hr className={Dont ? line_dont : line_do} />
          <span className={title}>
            <div className={text_container}>
              {Dont ? (
                <>
                  <PharosIcon
                    name="close"
                    description="X"
                    style={{ fill: 'var(--pharos-color-feedback-error)' }}
                  ></PharosIcon>
                  <PharosHeading level={4} preset="4--bold" noMargin>
                    <span className={text_dont}>Don&apos;ts</span>
                  </PharosHeading>
                </>
              ) : (
                <>
                  <PharosIcon
                    name="checkmark"
                    description="Checkmark"
                    style={{ fill: 'var(--pharos-color-feedback-success)' }}
                  ></PharosIcon>
                  <PharosHeading level={4} preset="4--bold" noMargin>
                    <span className={text_do}>Dos</span>
                  </PharosHeading>
                </>
              )}
            </div>
          </span>
          {children}
        </div>
      );
      setDisplay(content);
    })();
  }, [Dont, children]);
  return Display;
};

DosAndDonts.defaultProps = {
  Dont: false,
};

export default DosAndDonts;
