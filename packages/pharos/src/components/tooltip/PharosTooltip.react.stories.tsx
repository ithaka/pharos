import {
  PharosDropdownMenu,
  PharosDropdownMenuItem,
  PharosTooltip,
  PharosButton,
} from '../../react-components';
import { useEffect } from 'storybook/preview-api';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Tooltip',
  component: PharosTooltip,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('tooltip') },
    options: { selectedPanel: 'addon-controls' },
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
          const button = document.querySelector('#my-button')
          if (button) { button.dispatchEvent(new Event('mouseenter')); }
        }, 700);
      });
    };
    effect();
    return (
      <div
        style={{
          display: 'grid',
          gridGap: '8rem',
          marginTop: '5rem',
          justifyContent: 'space-evenly',
        }}
      >
        <PharosButton id="my-button" data-tooltip-id={args.id}>
          {args.targetText}
        </PharosButton>
        <PharosTooltip
          id={args.id}
          fullWidth={args.fullWidth}
          open={args.open}
          placement={args.placement}
          fallbackPlacements={args.fallbackPlacements}
        >
          {args.tooltipText}
        </PharosTooltip>
      </div>
    );
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
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton data-tooltip-id="my-hi-tooltip">Focus here</PharosButton>
      <PharosTooltip id="my-hi-tooltip">Hi there!</PharosTooltip>
      <PharosButton data-tooltip-id="my-again-tooltip">Then hover here</PharosButton>
      <PharosTooltip id="my-again-tooltip">Hi there again!</PharosTooltip>
      <PharosButton data-tooltip-id="my-yo-tooltip">Then focus me</PharosButton>
      <PharosTooltip id="my-yo-tooltip">Yo!</PharosTooltip>
    </div>
  ),
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
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton data-tooltip-id="my-multi-tooltip">Focus here</PharosButton>
      <PharosButton data-tooltip-id="my-multi-tooltip">Then hover here</PharosButton>
      <PharosButton data-tooltip-id="my-multi-tooltip">Then focus me</PharosButton>
      <PharosTooltip id="my-multi-tooltip" fullWidth>
        Hi there!
      </PharosTooltip>
    </div>
  ),
};

export const CustomBoundary: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '8rem',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
      }}
    >
      <PharosButton id="my-button" data-dropdown-menu-id="my-menu" icon-right="chevron-down">
        Click Me
      </PharosButton>
      <PharosDropdownMenu id="my-menu">
        <PharosDropdownMenuItem>Menu item 1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Menu item 2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem data-tooltip-id="my-tooltip">Hover on Me</PharosDropdownMenuItem>
        <PharosTooltip id="my-tooltip" boundary="my-menu">
          this is a very long tooltip but I stay in the dropdown menu&apos;s boundary!!!
        </PharosTooltip>
      </PharosDropdownMenu>
    </div>
  ),
};
