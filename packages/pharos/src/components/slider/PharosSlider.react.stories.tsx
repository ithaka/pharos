import { action } from 'storybook/actions';

import { PharosSlider, PharosSliderOption, PharosButton } from '../../react-components';
import createFormData from '../../utils/createFormData';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PharosSlider as PSType } from './pharos-slider';

const meta = {
  title: 'Forms/Slider',
  component: PharosSlider,
  subcomponents: { PharosSliderOption },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('slider') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosSlider
      name={args.name}
      value={args.value}
      min={args.min}
      max={args.max}
      step={args.step}
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      invalidated={args.invalidated}
      validated={args.validated}
      message={args.message}
    >
      <span slot="label">Search depth</span>
      <PharosSliderOption value={1}>
        Quick
        <span slot="description">Fastest</span>
      </PharosSliderOption>
      <PharosSliderOption value={2}>
        Standard
        <span slot="description">Balanced</span>
      </PharosSliderOption>
      <PharosSliderOption value={3}>
        Deep
        <span slot="description">Most thorough</span>
      </PharosSliderOption>
    </PharosSlider>
  ),
  args: defaultArgs,
};

export const CustomizedRange: Story = {
  render: () => (
    <PharosSlider name="slider2" value={2} min={12} max={20} step={2}>
      <span slot="label">Text size</span>
      <PharosSliderOption value={12}>
        Tiny
        <span slot="description">12px</span>
      </PharosSliderOption>
      <PharosSliderOption value={14}>
        Small
        <span slot="description">14px</span>
      </PharosSliderOption>
      <PharosSliderOption value={16}>
        Medium
        <span slot="description">16px</span>
      </PharosSliderOption>
      <PharosSliderOption value={18}>
        Large
        <span slot="description">18px</span>
      </PharosSliderOption>
      <PharosSliderOption value={20}>
        Extra large
        <span slot="description">20px</span>
      </PharosSliderOption>
    </PharosSlider>
  ),
};

export const Unlabeled: Story = {
  render: () => (
    <PharosSlider name="slider5" step={5} valueFormatter={(value) => `${value} percent`}>
      <span slot="label">Volume</span>
    </PharosSlider>
  ),
};

export const SparseLabels: Story = {
  render: () => (
    <PharosSlider name="slider6" min={0} max={100} step={10} value={50}>
      <span slot="label">Volume</span>
      <PharosSliderOption value={0}>Mute</PharosSliderOption>
      <PharosSliderOption value={50}>Medium</PharosSliderOption>
      <PharosSliderOption value={100}>Max</PharosSliderOption>
    </PharosSlider>
  ),
};

export const Disabled: Story = {
  ...Base,
  args: {
    ...Base.args,
    disabled: true,
  },
};

export const Validity: Story = {
  ...Base,
  args: {
    ...Base.args,
    invalidated: true,
    message: 'Deep search is unavailable for this collection',
  },
};

export const Events: Story = {
  render: () => (
    <PharosSlider
      name="slider4"
      min={1}
      max={3}
      step={1}
      onInput={(e) => action('Input')((e.target as PSType).value)}
      onChange={(e) => action('Change')((e.target as PSType).value)}
    >
      <span slot="label">Search depth</span>
      <PharosSliderOption value={1}>
        Quick
        <span slot="description">Fastest</span>
      </PharosSliderOption>
      <PharosSliderOption value={2}>
        Standard
        <span slot="description">Balanced</span>
      </PharosSliderOption>
      <PharosSliderOption value={3}>
        Deep
        <span slot="description">Most thorough</span>
      </PharosSliderOption>
    </PharosSlider>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const FormData: Story = {
  render: () => (
    <form name="slider-form">
      <PharosSlider
        name="depth"
        value={2}
        min={1}
        max={3}
        step={1}
        style={{ marginBottom: '1rem' }}
      >
        <span slot="label">Search depth</span>
        <PharosSliderOption value={1}>
          Quick
          <span slot="description">Fastest</span>
        </PharosSliderOption>
        <PharosSliderOption value={2}>
          Standard
          <span slot="description">Balanced</span>
        </PharosSliderOption>
        <PharosSliderOption value={3}>
          Deep
          <span slot="description">Most thorough</span>
        </PharosSliderOption>
      </PharosSlider>
      <PharosButton
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          const form = document.querySelector('form[name="slider-form"]') as HTMLFormElement;
          action('FormData')(JSON.stringify(Object.fromEntries(createFormData(form))));
        }}
      >
        Submit
      </PharosButton>
      <PharosButton type="reset" variant="secondary">
        Reset
      </PharosButton>
    </form>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};
