import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';

import handleLinkClick from '../utils/handleLinkClick';
import {
  hero,
  card,
  card__image,
  thumbnail,
  description,
  icon,
  list,
  hero__heading,
  icon__arrow,
  heading__status,
  link__status,
  button__card,
  badge,
  container__heading,
} from './index.module.css';

import brandGuideline from '../../static/images/homepage/home-brand-guidelines.png';
import components from '../../static/images/homepage/home-components.svg';
import getStarted from '../../static/images/homepage/home-get-started.svg';

import '@ithaka/pharos/lib/styles/fonts.css';

import pkg from '@ithaka/pharos/package.json';

const IndexPage: FC = () => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosHeading, PharosLink, PharosIcon, PharosButton, PharosLayout } = Pharos;

    const content = (
      <>
        <PharosLayout slot="top" preset="1-col--sidenav-comfy" rowGap="0" className={hero}>
          <h1 className={hero__heading}>
            Pharos, JSTOR&apos;s design system, guides us to create <i>cohesive, </i>
            <i>supportive, </i> and <i>beautiful</i> experiences for the{' '}
            <i>intellectually curious</i>.
          </h1>
        </PharosLayout>

        <div className={card__image}>
          <div className={thumbnail}>
            <img src={brandGuideline} alt="Brand Guideline" width="100%" />
          </div>
          <PharosHeading level="2" preset="4">
            Brand guidelines
          </PharosHeading>
          <p className={description}>
            Learn more about JSTOR&apos;s visual language and brand expressions that create
            consistency and clarity across our experiences.
          </p>
          <PharosButton
            className={button__card}
            variant="secondary"
            href="/brand-expressions/color"
            data-sc="link:logos"
            onClick={handleLinkClick}
          >
            Start with color
          </PharosButton>
        </div>
        <div className={card__image}>
          <div className={thumbnail}>
            <img src={components} alt="Components" width="100%" />
          </div>
          <PharosHeading level="2" preset="4">
            Components
          </PharosHeading>
          <p className={description}>
            Utilize our collection of reusable components, styles and their guidelines to build your
            products and sites.
          </p>
          <PharosButton
            className={button__card}
            variant="secondary"
            href="https://pharos.jstor.org/storybooks/wc/"
            data-sc="link:storybook components"
            onClick={handleLinkClick}
          >
            View components
          </PharosButton>
        </div>
        <div className={card__image}>
          <div className={thumbnail}>
            <img src={getStarted} alt="Get Started" width="100%" />
          </div>
          <PharosHeading level="2" preset="4">
            Get started
          </PharosHeading>
          <p className={description}>
            Pharos streamlines the development and design process. Check out our resources to use
            Pharos for your project.
          </p>
          <PharosButton
            className={button__card}
            variant="secondary"
            href="/getting-started"
            data-sc="link:getting started"
            onClick={handleLinkClick}
          >
            Get started
          </PharosButton>
        </div>

        <hr />

        <div className={card}>
          <div className={icon}>
            <PharosIcon name="new" a11yHidden="true"></PharosIcon>
          </div>
          <PharosHeading level="2" preset="4">
            What&apos;s new: Pharos {pkg.version}
          </PharosHeading>
          <p className={description}>
            Upgrade to the latest version of Pharos today to explore new possibilities for your apps
            and projects, and help maintain consistency on JSTOR.
          </p>
          <ul className={list}>
            <li>
              <PharosLink
                href="https://github.com/ithaka/pharos/blob/main/packages/pharos/CHANGELOG.md"
                target="_blank"
                data-sc="link:changelog"
              >
                Changelog
              </PharosLink>
            </li>
            <li>
              <PharosLink
                href="https://pharos.jstor.org/storybooks/wc/"
                target="_blank"
                data-sc="link:wc storybook"
              >
                Web Components Storybook
              </PharosLink>
            </li>
            <li>
              <PharosLink
                href="https://pharos.jstor.org/storybooks/react/"
                target="_blank"
                data-sc="link:react storybook"
              >
                React Components Storybook
              </PharosLink>
            </li>
          </ul>
        </div>
        <div className={card}>
          <div className={icon}>
            <PharosIcon name="question-inverse" a11yHidden="true"></PharosIcon>
          </div>
          <PharosHeading level="2" preset="4">
            Support
          </PharosHeading>
          <p className={description}>
            Experiencing a Pharos-related issue or just need some help? Report an issue in GitHub or
            get in touch via Slack.
          </p>
          <ul className={list}>
            <li>
              <PharosLink href="/help" data-sc="link:help" onClick={handleLinkClick}>
                Help
              </PharosLink>
            </li>
            <li>
              <PharosLink href="mailto:opensource@ithaka.org">Contact us</PharosLink>
            </li>
            <li>
              <PharosLink href="https://github.com/ithaka/pharos/issues" target="_blank">
                Report an issue
              </PharosLink>
            </li>
          </ul>
        </div>

        <div className={card}>
          <div className={icon}>
            <PharosIcon name="add" a11yHidden="true"></PharosIcon>
          </div>
          <PharosHeading level="2" preset="4">
            Contribute to Pharos
          </PharosHeading>
          <p className={description}>
            Interested in contributing to the design system? Pharos is the result of collective
            contributions of code, design, and guidance, we&apos;d love to hear your input and
            ideas!
          </p>
          <ul className={list}>
            <li>
              <PharosLink
                href="https://github.com/ithaka/pharos"
                target="_blank"
                data-sc="link:repo"
              >
                Help build Pharos
              </PharosLink>
            </li>
            <li>
              <PharosLink
                href="https://github.com/ithaka/pharos/blob/main/docs/README.md"
                target="_blank"
                data-sc="link:contribution guidelines"
              >
                See the contribution guidelines
              </PharosLink>
            </li>
          </ul>
        </div>
        <div className={card}>
          <div className={icon}>
            <PharosIcon name="workspace" a11yHidden="true"></PharosIcon>
          </div>
          <div className={container__heading}>
            <PharosHeading level="2" preset="4" noMargin>
              Work with us at ITHAKA
            </PharosHeading>
            <strong className={badge}>We&apos;re hiring!</strong>
          </div>
          <p className={description}>
            JSTOR is part of ITHAKA, a not-for-profit dedicated to expanding access to knowledge and
            education worldwide. Our staff makes us who we are. We&apos;re hiring — join us!
          </p>
          <ul className={list}>
            <li>
              <PharosLink href="https://www.ithaka.org/careers/" target="_blank">
                See career opportunities
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.ithaka.org/" target="_blank">
                Learn more about ITHAKA
              </PharosLink>
            </li>
          </ul>
        </div>
      </>
    );
    setDisplay(content);
  }, [Pharos]);

  return Display;
};

export default IndexPage;
