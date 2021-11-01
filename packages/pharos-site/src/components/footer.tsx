import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import handleLinkClick from '../utils/handleLinkClick';
import {
  footer,
  note,
  list,
  container__start,
  container__center,
  container__end,
  netlifyLink,
  copyrightStatement,
  badge,
  container__link,
  logo__link,
  footer__container,
} from './footer.module.css';
import logoWhite from '../../static/images/footer/logo-white.svg';

const Footer: FC = () => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosHeading, PharosLink, PharosLayout } = Pharos;

    const content = (
      <footer className={footer__container}>
        <PharosLayout preset="1-col--sidenav-comfy" rows="auto min-content" className={footer}>
          <div className={container__start}>
            <PharosLink className={logo__link} href="https://www.jstor.org/" target="_blank" flex>
              <img src={logoWhite} alt="JSTOR Logo" width="70" height="100" />
            </PharosLink>
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
                  target="_blank"
                  data-sc="link:changelog footer"
                >
                  Changelog
                </PharosLink>
              </li>
              <li>
                <PharosLink
                  href="https://pharos.jstor.org/storybooks/wc/"
                  onBackground
                  target="_blank"
                  data-sc="link:wc storybook footer"
                >
                  Web Components Storybook
                </PharosLink>
              </li>
              <li>
                <PharosLink
                  href="https://pharos.jstor.org/storybooks/react/"
                  onBackground
                  target="_blank"
                  data-sc="link:react storybook footer"
                >
                  React Storybook
                </PharosLink>
              </li>
            </ul>
          </div>
          <div className={container__center}>
            <ul className={list}>
              <li>
                <PharosLink href="https://about.jstor.org/" onBackground target="_blank">
                  About JSTOR
                </PharosLink>
              </li>
              <li className={container__link}>
                <PharosLink
                  href="https://recruiting.ultipro.com/ITH1000ITHAK/JobBoard/5fe90ad4-9e26-490b-9c45-6c9669d4dcd0/?q=&o=postedDateDesc"
                  onBackground
                  target="_blank"
                >
                  Careers
                </PharosLink>
                <strong className={badge}>We&apos;re hiring!</strong>
              </li>
              <li>
                <PharosLink
                  href="javascript:void(0)"
                  onclick="OneTrust.ToggleInfoDisplay()"
                  onBackground
                >
                  Cookie settings
                </PharosLink>
              </li>
            </ul>
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
                target="_blank"
                data-sc="link:repo footer"
              >
                open an issue on GitHub
              </PharosLink>
              .
            </div>
          </div>
          <div className={`${note} ${copyrightStatement}`}>
            &copy;{new Date().getFullYear()} ITHAKA. All Rights Reserved. JSTOR&reg;, the JSTOR
            logo, JPASS&reg;, Artstor&reg;, Reveal Digital&trade; and ITHAKA&reg; are registered
            trademarks of ITHAKA.
          </div>
          <em className={`${note} ${netlifyLink}`}>
            This site is powered by{' '}
            <PharosLink href="https://www.netlify.com" onBackground target="_blank">
              Netlify
            </PharosLink>
          </em>
        </PharosLayout>
      </footer>
    );

    setDisplay(content);
  }, [Pharos]);

  return Display;
};

export default Footer;
