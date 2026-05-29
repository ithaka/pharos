import { Fragment } from 'react';
import { action } from 'storybook/actions';

import { PharosRadioButton, PharosRadioGroup, PharosLink } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { PharosRadioButton as PRBType } from './pharos-radio-button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/Radio Button',
  component: PharosRadioButton,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('radio-button') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosRadioButton
      checked={args.checked}
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      invalidated={args.invalidated}
      required={args.required}
      message={args.message}
    >
      <span slot="label">{args.label}</span>
    </PharosRadioButton>
  ),
  args: defaultArgs,
};

export const States: Story = {
  render: () => (
    <Fragment>
      <div>
        <div>
          <PharosRadioButton name="base">
            <span slot="label">Normal Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="disabled" disabled>
            <span slot="label">Disabled Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="checked" checked>
            <span slot="label">Checked Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="checked-disabled" checked disabled>
            <span slot="label">Disabled & Checked Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="multi" checked>
            <div slot="label">
              <div>Checked button</div>
              <div>Multiple lines</div>
            </div>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="invalidated" invalidated>
            <span slot="label">Error Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="with-link">
            <span slot="label">
              Label with a <PharosLink href="#">link</PharosLink>
            </span>
          </PharosRadioButton>
        </div>
      </div>
    </Fragment>
  ),
};

export const Events: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosRadioButton
        value="My value"
        onChange={(e) => action('Change')((e.target as PRBType).checked)}
        onInput={(e) => action('Input')((e.target as PRBType).value)}
        onClick={(e) => action('Click')((e.target as PRBType).checked)}
      >
        <span slot="label">I fire events</span>
      </PharosRadioButton>
    </div>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Validity: Story = {
  ...Base,
  args: {
    ...Base.args,
    invalidated: true,
    required: true,
    message: 'This field is required, please make a selection',
  },
};

export const FullWidth: Story = {
  render: () => (
    <>
      <style>{`
        .full-width-styled-example [data-pharos-component='PharosRadioButton'] {
          box-sizing: border-box;
          padding: var(--pharos-spacing-one-half-x, 0.5rem);
          border: 1px solid var(--pharos-color-marble-gray-80, #c3c5c8);
          border-radius: var(--pharos-radius-base, 4px);
        }
        /* When a radio button is checked, style it like an info alert */
        .full-width-styled-example [data-pharos-component='PharosRadioButton'][checked] {
          background-color: var(--pharos-alert-color-background-info);
          border-color: var(--pharos-alert-color-border-info);
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <PharosRadioGroup
          name="full-width-example"
          style={{
            width: '480px',
            border: '1px solid var(--pharos-color-marble-gray-80, #c3c5c8)',
            padding: 'var(--pharos-spacing-one, 1rem)',
            borderRadius: 'var(--pharos-radius-base, 4px)',
          }}
        >
          <span slot="legend">Full Width</span>
          <PharosRadioButton value="first" fullWidth checked>
            <span slot="label">This is the first choice</span>
          </PharosRadioButton>
          <PharosRadioButton value="second" fullWidth>
            <span slot="label">This is the second choice</span>
          </PharosRadioButton>
          <PharosRadioButton value="third" fullWidth>
            <span slot="label">
              This is the third choice with a label that is just entirely too long and someone
              should have said something before shipping this to users
            </span>
          </PharosRadioButton>
        </PharosRadioGroup>
        <PharosRadioGroup
          name="full-width-styled-example"
          className="full-width-styled-example"
          style={{ width: '480px' }}
        >
          <span slot="legend">Full Width with styles</span>
          <PharosRadioButton value="first" fullWidth checked>
            <span slot="label">This is the first choice</span>
          </PharosRadioButton>
          <PharosRadioButton value="second" fullWidth>
            <span slot="label">This is the second choice</span>
          </PharosRadioButton>
          <PharosRadioButton value="third" fullWidth>
            <span slot="label">
              This is the third choice with a label that is just entirely too long and someone
              should have said something before shipping this to users
            </span>
          </PharosRadioButton>
        </PharosRadioGroup>
      </div>
    </>
  ),
};
