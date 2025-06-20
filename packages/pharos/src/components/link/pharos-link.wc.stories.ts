import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Link',
  component: 'pharos-link',
  parameters: {
    docs: { page: configureDocsPage('link') },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) =>
    html` <div style="display: grid; grid-gap: 1rem; grid-template-columns: 300px;">
      <storybook-pharos-link
        .bold=${args.bold}
        download=${ifDefined(args.download)}
        .flex=${args.flex}
        href=${ifDefined(args.href)}
        hreflang=${ifDefined(args.hreflang)}
        .indicate-visited=${args.indicateVisited}
        a11y-label=${ifDefined(args.a11yLabel)}
        .no-hover=${args.noHover}
        .is-on-background=${args.isOnBackground}
        ping=${ifDefined(args.ping)}
        rel=${ifDefined(args.rel)}
        .skip=${args.skip}
        .subtle=${args.subtle}
        target=${ifDefined(args.target)}
        type=${ifDefined(args.type)}
      >
        ${args.text}
      </storybook-pharos-link>
    </div>`,
  args: defaultArgs,
};

export const VisitedLink: Story = {
  render: () => html`
    <div style="margin-bottom: 1rem">
      <storybook-pharos-link href="https://www.google.com" target="_blank" indicate-visited
        >Visited link</storybook-pharos-link
      >
    </div>
  `,
};

export const VisitedLinkHeading: Story = {
  render: () => html`
    <div style="margin-bottom: 1rem">
      <storybook-pharos-link href="https://www.google.com" target="_blank" indicate-visited>
        <pharos-heading level="1" preset="5"> Visited link heading </storybook-pharos-heading>
      </storybook-pharos-link>
    </div>
  `,
};

export const Button: Story = {
  render: () => html`
    <div style="margin-bottom: 1rem">
      <storybook-pharos-link>I am a button</storybook-pharos-link>
    </div>
    <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
      <storybook-pharos-link is-on-background
        >On compliant background</storybook-pharos-link
      >
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="margin-bottom: 1rem">
      <storybook-pharos-link href="#">Primary link</storybook-pharos-link>
    </div>
    <div style="margin-bottom: 1rem">
      <storybook-pharos-link href="#" subtle>Subtle link</storybook-pharos-link>
    </div>
    <div style="width:100px; margin-bottom: 1rem">
      <storybook-pharos-link href="#"
        >I have text that spans multiple lines</storybook-pharos-link
      >
    </div>
    <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
      <storybook-pharos-link href="#" is-on-background
        >On compliant background</storybook-pharos-link
      >
    </div>
    <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
      <storybook-pharos-link href="#" is-on-background subtle
        >On compliant background with subtle</storybook-pharos-link
      >
    </div>
  `,
};
