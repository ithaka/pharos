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
  netlifyLink,
  badge,
  container__link,
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
            <div className={note}>Copyright © {new Date().getFullYear()} JSTOR</div>
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
                <PharosLink
                  href="https://pharos.jstor.org/storybooks/wc/"
                  onBackground
                  data-sc="link:wc storybook footer"
                >
                  Web Components Storybook
                </PharosLink>
              </li>
              <li>
                <PharosLink
                  href="https://pharos.jstor.org/storybooks/react/"
                  onBackground
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
                <PharosLink href="https://about.jstor.org/" onBackground>
                  About JSTOR
                </PharosLink>
              </li>
              <li className={container__link}>
                <PharosLink
                  href="https://recruiting.ultipro.com/ITH1000ITHAK/JobBoard/5fe90ad4-9e26-490b-9c45-6c9669d4dcd0/?q=&o=postedDateDesc"
                  onBackground
                >
                  Careers
                </PharosLink>
                <strong className={badge}>We&apos;re hiring!</strong>
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
                data-sc="link:repo footer"
              >
                open an issue on GitHub
              </PharosLink>
              .
            </div>
            <em className={`${note} ${netlifyLink}`}>
              This site is powered by{' '}
              <PharosLink href="https://www.netlify.com" onBackground>
                Netlify
              </PharosLink>
            </em>
          </div>
        </div>
      </div>
    );

    setDisplay(content);
  }, [Pharos]);

  return Display;
};

export default Footer;
