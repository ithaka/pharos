import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { useEffect } from 'storybook/preview-api';

import { defaultArgs, argTypes, type StoryArgs, type ComponentArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Tooltip',
  component: 'pharos-tooltip',
  parameters: {
    docs: { page: configureDocsPage('tooltip') },
    options: { selectedPanel: 'addon-controls' },
    chromatic: { delay: 800 },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const button = document.querySelector('#my-button');
          if (button) { button.dispatchEvent(new Event('mouseenter')); }
        }, 700);
      });
    };
    effect();
    return html`
      <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
        <storybook-pharos-button id="my-button" data-tooltip-id="${args.id}"
          >${args.targetText}</storybook-pharos-button
        >
        <storybook-pharos-tooltip
          id="${args.id}"
          .fullWidth="${args.fullWidth}"
          .open="${args.open}"
          .placement="${ifDefined(args.placement)}"
          .fallbackPlacements="${args.fallbackPlacements}"
          >${args.tooltipText}
        </storybook-pharos-tooltip>
      </div>
    `;
  },
  args: defaultArgs,
};

export const Placement: Story = {
  ...Base,
  args: {
    ...Base.args,
    targetText: 'Placement',
    id: 'my-placement-tooltip',
  },
};

export const DismissBehavior: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, auto); grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;"
    >
      <storybook-pharos-button data-tooltip-id="my-hi-tooltip">Focus here</storybook-pharos-button>
      <storybook-pharos-tooltip id="my-hi-tooltip">Hi there!</storybook-pharos-tooltip>
      <storybook-pharos-button data-tooltip-id="my-again-tooltip"
        >Then hover here</storybook-pharos-button
      >
      <storybook-pharos-tooltip id="my-again-tooltip">Hi there again!</storybook-pharos-tooltip>
      <storybook-pharos-button data-tooltip-id="my-yo-tooltip"
        >Then focus me</storybook-pharos-button
      >
      <storybook-pharos-tooltip id="my-yo-tooltip">Yo!</storybook-pharos-tooltip>
    </div>
  `,
};

export const Fallbacks: Story = {
  ...Base,
  args: {
    ...Base.args,
    id: 'my-fallback-tooltip',
    targetText: 'Fallback Placement',
    fallbackPlacements: ['top'],
  },
};

export const FullWidth: Story = {
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

export const MultipleTriggers: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, auto); grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;"
    >
      <storybook-pharos-button data-tooltip-id="my-multi-tooltip"
        >Focus here</storybook-pharos-button
      >
      <storybook-pharos-button data-tooltip-id="my-multi-tooltip"
        >Then hover here</storybook-pharos-button
      >
      <storybook-pharos-button data-tooltip-id="my-multi-tooltip"
        >Then focus me</storybook-pharos-button
      >
      <storybook-pharos-tooltip id="my-multi-tooltip" fullWidth>Hi there!</storybook-pharos-tooltip>
    </div>
  `,
};

export const CustomBoundary: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 8rem; margin-top: 5rem; justify-content: space-evenly;">
      <storybook-pharos-button
        id="my-button"
        data-dropdown-menu-id="my-menu"
        icon-right="chevron-down"
        >Click Me</storybook-pharos-button
      >
      <storybook-pharos-dropdown-menu id="my-menu">
        <storybook-pharos-dropdown-menu-item>Menu item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Menu item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item data-tooltip-id="my-tooltip"
          >Hover on Me</storybook-pharos-dropdown-menu-item
        >
        <storybook-pharos-tooltip id="my-tooltip" boundary="my-menu"
          >Even very long tooltips, such as this one, will stay within the boundaries of the
          Tooltip.</storybook-pharos-tooltip
        >
      </storybook-pharos-dropdown-menu>
    </div>
  `,
};
