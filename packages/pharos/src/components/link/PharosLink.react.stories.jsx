import { Fragment } from 'react';

import { PharosLink, PharosHeading } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Link',
  component: PharosLink,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('link') },
  },
};

export const Base = {
  render: (args) => (
    <PharosLink
      bold={args.bold}
      download={args.download}
      flex={args.flex}
      href={args.href}
      hreflang={args.hreflang}
      indicateVisited={args.indicateVisited}
      a11yLabel={args.a11yLabel}
      noHover={args.noHover}
      isOnBackground={args.isOnBackground}
      ping={args.ping}
      rel={args.rel}
      skip={args.skip}
      subtle={args.subtle}
      target={args.target}
      type={args.type}
    >
      {args.text}
    </PharosLink>
  ),
  args: defaultArgs,
};

export const VisitedLink = {
  render: () => (
    <div style={{ marginBottom: '1rem' }}>
      <PharosLink href="https://www.google.com" target="_blank" indicateVisited>
        Visited link
      </PharosLink>
    </div>
  ),
};

export const VisitedLinkHeading = {
  render: () => (
    <div style={{ marginBottom: '1rem' }}>
      <PharosLink href="https://www.google.com" target="_blank" indicateVisited>
        <PharosHeading level="1"> Visited link heading </PharosHeading>
      </PharosLink>
    </div>
  ),
};

export const Button = {
  render: () => (
    <Fragment>
      <div style={{ marginBottom: '1rem' }}>
        <PharosLink name="primary" primary>
          I am a button
        </PharosLink>
      </div>
      <div
        style={{
          backgroundColor: '#000000',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <PharosLink name="is-on-background" isOnBackground>
          On compliant background
        </PharosLink>
      </div>
    </Fragment>
  ),
};

export const Variants = {
  render: () => (
    <Fragment>
      <div style={{ marginBottom: '1rem' }}>
        <PharosLink name="primary" href="#">
          Primary link
        </PharosLink>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <PharosLink name="subtle" href="#" subtle>
          Subtle link
        </PharosLink>
      </div>
      <div style={{ width: '100px', marginBottom: '1rem' }}>
        <PharosLink name="multi" href="#">
          I have text that spans multiple lines
        </PharosLink>
      </div>
      <div
        style={{
          backgroundColor: '#000000',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <PharosLink name="is-on-background" href="#" isOnBackground>
          On compliant background
        </PharosLink>
      </div>
      <div
        style={{
          backgroundColor: '#000000',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <PharosLink name="is-on-background-subtle" href="#" isOnBackground subtle>
          On compliant background with subtle
        </PharosLink>
      </div>
    </Fragment>
  ),
};
