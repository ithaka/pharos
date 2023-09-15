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
      <pharos-link
        ?bold=${args.bold}
        download=${ifDefined(args.download)}
        ?flex=${args.flex}
        href=${ifDefined(args.href)}
        hreflang=${ifDefined(args.hreflang)}
        ?indicate-visited=${args.indicateVisited}
        label=${ifDefined(args.label)}
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
      </pharos-link>
    </div>`,
  args: defaultArgs,
};

export const VisitedLink = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <pharos-link href="https://www.google.com" target="_blank" indicate-visited
          >Visited link</pharos-link
        >
      </div>
    `,
};

export const VisitedLinkHeading = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <pharos-link href="https://www.google.com" target="_blank" indicate-visited>
          <pharos-heading level="1"> Visited link heading </pharos-heading>
        </pharos-link>
      </div>
    `,
};

export const Button = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <pharos-link name="primary">I am a button</pharos-link>
      </div>
      <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
        <pharos-link name="on-background" on-background>On compliant background</pharos-link>
      </div>
    `,
};

export const Variants = {
  render: () =>
    html`
      <div style="margin-bottom: 1rem">
        <pharos-link name="primary" href="#">Primary link</pharos-link>
      </div>
      <div style="margin-bottom: 1rem">
        <pharos-link name="subtle" href="#" subtle>Subtle link</pharos-link>
      </div>
      <div style="width:100px; margin-bottom: 1rem">
        <pharos-link name="multi" href="#">I have text that spans multiple lines</pharos-link>
      </div>
      <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
        <pharos-link name="on-background" href="#" on-background
          >On compliant background</pharos-link
        >
      </div>
      <div style="background-color: #000000; padding: 1rem; margin-bottom: 1rem">
        <pharos-link name="on-background-subtle" href="#" on-background subtle
          >On compliant background with subtle</pharos-link
        >
      </div>
    `,
};
