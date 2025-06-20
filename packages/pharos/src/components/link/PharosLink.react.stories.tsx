import { Fragment } from 'react';

import { PharosLink, PharosHeading } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
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
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
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

export const VisitedLink: Story = {
  render: () => (
    <div style={{ marginBottom: '1rem' }}>
      <PharosLink href="https://www.google.com" target="_blank" indicateVisited>
        Visited link
      </PharosLink>
    </div>
  ),
};

export const VisitedLinkHeadin: Story = {
  render: () => (
    <div style={{ marginBottom: '1rem' }}>
      <PharosLink href="https://www.google.com" target="_blank" indicateVisited>
        <PharosHeading level={1} preset="5"> Visited link heading </PharosHeading>
      </PharosLink>
    </div>
  ),
};

export const Button: Story = {
  render: () => (
    <Fragment>
      <div style={{ marginBottom: '1rem' }}>
        <PharosLink>
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
        <PharosLink isOnBackground>
          On compliant background
        </PharosLink>
      </div>
    </Fragment>
  ),
};

export const Variants: Story = {
  render: () => (
    <Fragment>
      <div style={{ marginBottom: '1rem' }}>
        <PharosLink href="#">
          Primary link
        </PharosLink>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <PharosLink href="#" subtle>
          Subtle link
        </PharosLink>
      </div>
      <div style={{ width: '100px', marginBottom: '1rem' }}>
        <PharosLink href="#">
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
        <PharosLink href="#" isOnBackground>
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
        <PharosLink href="#" isOnBackground subtle>
          On compliant background with subtle
        </PharosLink>
      </div>
    </Fragment>
  ),
};
