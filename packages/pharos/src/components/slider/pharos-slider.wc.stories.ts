import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';

import createFormData from '../../utils/createFormData';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { PharosSlider } from './pharos-slider';

const meta = {
  title: 'Forms/Slider',
  component: 'pharos-slider',
  parameters: {
    docs: { page: configureDocsPage('slider') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-slider
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      step=${ifDefined(args.step)}
      .disabled=${args.disabled}
      .hideLabel=${args.hideLabel}
      .invalidated=${args.invalidated}
      .validated=${args.validated}
      message=${ifDefined(args.message)}
    >
      <span slot="label">Search depth</span>
      <storybook-pharos-slider-option value="1">
        Quick
        <span slot="description">Fastest</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="2">
        Standard
        <span slot="description">Balanced</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="3">
        Deep
        <span slot="description">Most thorough</span>
      </storybook-pharos-slider-option>
    </storybook-pharos-slider>
  `,
  args: defaultArgs,
};

export const CustomizedRange: Story = {
  render: () => html`
    <storybook-pharos-slider name="slider2" value="2" min="12" max="20" step="2">
      <span slot="label">Text size</span>
      <storybook-pharos-slider-option value="12">
        Tiny
        <span slot="description">12px</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="14">
        Small
        <span slot="description">14px</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="16">
        Medium
        <span slot="description">16px</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="18">
        Large
        <span slot="description">18px</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="20">
        Extra large
        <span slot="description">20px</span>
      </storybook-pharos-slider-option>
    </storybook-pharos-slider>
  `,
};

export const Unlabeled: Story = {
  render: () => html`
    <storybook-pharos-slider
      name="slider5"
      step="5"
      .valueFormatter=${(value: number) => `${value} percent`}
    >
      <span slot="label">Volume</span>
    </storybook-pharos-slider>
  `,
};

export const SparseLabels: Story = {
  render: () => html`
    <storybook-pharos-slider name="slider6" min="0" max="100" step="10" value="50">
      <span slot="label">Volume</span>
      <storybook-pharos-slider-option value="0">Mute</storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="50">Medium</storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="100">Max</storybook-pharos-slider-option>
    </storybook-pharos-slider>
  `,
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
  render: () => html`
    <storybook-pharos-slider
      name="slider4"
      min="1"
      max="3"
      step="1"
      @input=${(e: Event) => action('Input')((e.target as PharosSlider).value)}
      @change=${(e: Event) => action('Change')((e.target as PharosSlider).value)}
    >
      <span slot="label">Search depth</span>
      <storybook-pharos-slider-option value="1">
        Quick
        <span slot="description">Fastest</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="2">
        Standard
        <span slot="description">Balanced</span>
      </storybook-pharos-slider-option>
      <storybook-pharos-slider-option value="3">
        Deep
        <span slot="description">Most thorough</span>
      </storybook-pharos-slider-option>
    </storybook-pharos-slider>
  `,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const FormData: Story = {
  render: () => html`
    <form name="slider-form">
      <storybook-pharos-slider
        name="depth"
        value="2"
        min="1"
        max="3"
        step="1"
        style="margin-bottom: 1rem;"
      >
        <span slot="label">Search depth</span>
        <storybook-pharos-slider-option value="1">
          Quick
          <span slot="description">Fastest</span>
        </storybook-pharos-slider-option>
        <storybook-pharos-slider-option value="2">
          Standard
          <span slot="description">Balanced</span>
        </storybook-pharos-slider-option>
        <storybook-pharos-slider-option value="3">
          Deep
          <span slot="description">Most thorough</span>
        </storybook-pharos-slider-option>
      </storybook-pharos-slider>
      <storybook-pharos-button
        type="submit"
        @click=${(e: MouseEvent) => {
          e.preventDefault();
          const form = document.querySelector('form[name="slider-form"]') as HTMLFormElement;
          action('FormData')(JSON.stringify(Object.fromEntries(createFormData(form))));
        }}
        >Submit</storybook-pharos-button
      >
      <storybook-pharos-button type="reset" variant="secondary">Reset</storybook-pharos-button>
    </form>
  `,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};
