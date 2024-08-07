import { useState, useEffect } from 'react';
import type { FC, ReactElement, ReactNode } from 'react';
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
  children?: ReactNode;
  Dont?: boolean;
}

const DosAndDonts: FC<DosAndDontsProps> = ({ children, Dont = false }) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosHeading, PharosIcon } = Pharos;

    const content = (
      <div className={container}>
        <hr className={Dont ? line_dont : line_do} />
        <span className={title}>
          <div className={text_container}>
            {Dont ? (
              <>
                <PharosIcon
                  name="close"
                  a11yTitle="X"
                  style={{ fill: 'var(--pharos-color-feedback-error)' }}
                ></PharosIcon>
                <PharosHeading level="4" preset="4--bold" noMargin>
                  <span className={text_dont}>Don&apos;ts</span>
                </PharosHeading>
              </>
            ) : (
              <>
                <PharosIcon
                  name="checkmark"
                  a11yTitle="Checkmark"
                  style={{ fill: 'var(--pharos-color-feedback-success)' }}
                ></PharosIcon>
                <PharosHeading level="4" preset="4--bold" noMargin>
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
  }, [Pharos, Dont, children]);
  return Display;
};

export default DosAndDonts;
