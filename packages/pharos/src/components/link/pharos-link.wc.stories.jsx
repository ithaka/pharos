import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Components/Link',
  component: 'pharos-link',
  parameters: {
    docs: { page: configureDocsPage('link') },
  },
};

export const Base = {
  render: (args) =>
    html` <div style="display: grid; grid-gap: 1rem; grid-template-columns: 300px;">
      <storybook-pharos-link
        ?bold=${args.bold}
        download=${ifDefined(args.download)}
        ?flex=${args.flex}
        href=${ifDefined(args.href)}
        hreflang=${ifDefined(args.hreflang)}
        ?indicate-visited=${args.indicateVisited}
        a11y-${ifDefined(args.label)}
        ?no-hover=${args.noHover}
        ?on-background=${args.onBackground}
        ping=${ifDefined(args.ping)}
        rel=${ifDefined(args.rel)}
        ?skip=${args.skip}
        ?subtle=${args.subtle}
        target=${ifDefined(args.target)}
        type=${ifDefined(args.type)}
      >
        ${args.text}
      </storybook-pharos-link>
    </div>`,
  args: defaultArgs,
};

export const VisitedLink = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <storybook-pharos-link href="https://www.google.com" target="_blank" indicate-visited
          >Visited link</storybook-pharos-link
        >
      </div>
    `,
};

export const VisitedLinkHeading = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <storybook-pharos-link href="https://www.google.com" target="_blank" indicate-visited>
          <storybook-pharos-heading level="1"> Visited link heading </storybook-pharos-heading>
        </storybook-pharos-link>
      </div>
    `,
};

export const Button = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <storybook-pharos-link name="primary">I am a button</storybook-pharos-link>
      </div>
      <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
        <storybook-pharos-link name="on-background" on-background
          >On compliant background</storybook-pharos-link
        >
      </div>
    `,
};

export const Variants = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <storybook-pharos-link name="primary" href="#">Primary link</storybook-pharos-link>
      </div>
      <div style="margin-bottom: 1rem">
        <storybook-pharos-link name="subtle" href="#" subtle>Subtle link</storybook-pharos-link>
      </div>
      <div style="width:100px; margin-bottom: 1rem">
        <storybook-pharos-link name="multi" href="#"
          >I have text that spans multiple lines</storybook-pharos-link
        >
      </div>
      <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
        <storybook-pharos-link name="on-background" href="#" on-background
          >On compliant background</storybook-pharos-link
        >
      </div>
      <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
        <storybook-pharos-link name="on-background-subtle" href="#" on-background subtle
          >On compliant background with subtle</storybook-pharos-link
        >
      </div>
    `,
};
