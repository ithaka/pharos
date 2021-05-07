import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import handleLinkClick from '../utils/handleLinkClick';
import {
  footer,
  main,
  note,
  list,
  container__start,
  container__center,
  container__end,
} from './footer.module.css';
import logoWhite from '../../static/images/footer/logo-white.svg';

const Footer: FC = () => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosHeading, PharosLink } = Pharos;

    const content = (
      <div className={footer}>
        <div className={main}>
          <div className={container__start}>
            <img src={logoWhite} alt="JSTOR Logo" width="70" height="100" />
            <div className={note}>Pharos is JSTOR&apos;s design system</div>
          </div>
          <div className={container__center}>
            <ul className={list}>
              <li>
                <PharosLink
                  href="components/component-status"
                  onBackground
                  data-sc="link:component status footer"
                  onClick={handleLinkClick}
                >
                  Component status page
                </PharosLink>
              </li>
              <li>
                <PharosLink
                  href="https://github.com/ithaka/pharos/blob/main/packages/pharos/CHANGELOG.md"
                  onBackground
                  data-sc="link:changelog footer"
                >
                  Changelog
                </PharosLink>
              </li>
              <li>
                <PharosLink href="#" onBackground data-sc="link:wc storybook footer">
                  Web Components Storybook
                </PharosLink>
              </li>
              <li>
                <PharosLink href="#" onBackground data-sc="link:react storybook footer">
                  React Storybook
                </PharosLink>
              </li>
            </ul>
            <div className={note}>Copyright © {new Date().getFullYear()} JSTOR</div>
          </div>
          <div className={container__end}>
            <PharosHeading level="2" preset="1--bold">
              Have questions?
            </PharosHeading>
            <div>
              <PharosLink
                href="mailto:opensource@ithaka.org"
                onBackground
                data-sc="link:email footer"
              >
                Email us
              </PharosLink>{' '}
              or{' '}
              <PharosLink
                href="https://github.com/ithaka/pharos"
                onBackground
                data-sc="link:repo footer"
              >
                open an issue on GitHub
              </PharosLink>
              .
            </div>
          </div>
        </div>
      </div>
    );

    setDisplay(content);
  }, [Pharos]);

  return Display;
};

export default Footer;
