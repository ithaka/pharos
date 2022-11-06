import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { useEffect } from '@storybook/client-api';

import { defaultArgs, argTypes } from './storyArgs';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Tooltip',
  component: 'pharos-tooltip',
  parameters: {
    docs: { page: configureDocsPage('tooltip') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#my-button').dispatchEvent(new Event('mouseenter'));
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <pharos-button id="my-button" data-tooltip-id="${args.id}"
          >${args.targetText}</pharos-button
        >
        <pharos-tooltip
          id="${args.id}"
          ?full-width="${args.fullWidth}"
          ?open="${args.open}"
          .placement="${ifDefined(args.placement)}"
          .fallbackPlacements="${args.fallbackPlacements}"
          >${args.tooltipText}
        </pharos-tooltip>
      </div>
    `;
  },
  args: defaultArgs,
};

export const Placement = {
  ...Base,
  args: {
    ...Base.args,
    targetText: 'Placement',
    id: 'my-placement-tooltip',
  },
};

export const DismissBehavior = {
  render: (_) =>
    html`
      <div
        style="display: grid; grid-template-columns: repeat(3, auto); grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;"
      >
        <pharos-button data-tooltip-id="my-hi-tooltip">Focus here</pharos-button>
        <pharos-tooltip id="my-hi-tooltip">Hi there!</pharos-tooltip>
        <pharos-button data-tooltip-id="my-again-tooltip">Then hover here</pharos-button>
        <pharos-tooltip id="my-again-tooltip">Hi there again!</pharos-tooltip>
        <pharos-button data-tooltip-id="my-yo-tooltip">Then focus me</pharos-button>
        <pharos-tooltip id="my-yo-tooltip">Yo!</pharos-tooltip>
      </div>
    `,
};

export const Fallbacks = {
  ...Base,
  args: {
    ...Base.args,
    id: 'my-fallback-tooltip',
    targetText: 'Fallback Placement',
    fallbackPlacements: ['top'],
  },
};

export const FullWidth = {
  ...Base,
  args: {
    ...Base.args,
    fullWidth: true,
    placement: 'auto',
    targetText:
      'Hover here to see a tooltip that is as wide as me. If you resize the window while its open, its width will continue to match mine!',
    tooltipText: `When using the fullWidth attribute, the display of the tooltip will always be the size of the button that triggers the tooltip, regardless of the length of the text.`,
    id: 'my-full-tooltip',
  },
};

export const MultipleTriggers = {
  render: (_) =>
    html`
      <div
        style="display: grid; grid-template-columns: repeat(3, auto); grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;"
      >
        <pharos-button data-tooltip-id="my-multi-tooltip">Focus here</pharos-button>
        <pharos-button data-tooltip-id="my-multi-tooltip">Then hover here</pharos-button>
        <pharos-button data-tooltip-id="my-multi-tooltip">Then focus me</pharos-button>
        <pharos-tooltip id="my-multi-tooltip" full-width>Hi there!</pharos-tooltip>
      </div>
    `,
};

export const CustomBoundary = {
  render: (_) =>
    html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <pharos-button id="my-button" data-dropdown-menu-id="my-menu" icon-right="chevron-down"
          >Click Me</pharos-button
        >
        <pharos-dropdown-menu id="my-menu">
          <pharos-dropdown-menu-item>Menu item 1</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Menu item 2</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item data-tooltip-id="my-tooltip"
            >Hover on Me</pharos-dropdown-menu-item
          >
          <pharos-tooltip id="my-tooltip" boundary="my-menu"
            >Even very long tooltips, such as this one, will stay within the boundaries of the
            Tooltip.</pharos-tooltip
          >
        </pharos-dropdown-menu>
      </div>
    `,
};
