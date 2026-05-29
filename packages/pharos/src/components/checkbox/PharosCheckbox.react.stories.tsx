import { action } from 'storybook/actions';

import { PharosCheckbox, PharosCheckboxGroup, PharosLink } from '../../react-components';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/Checkbox',
  component: PharosCheckbox,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('checkbox') },
    options: {
      selectedPanel: 'addon-controls',
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosCheckbox
      checked={args.checked}
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      required={args.required}
      indeterminate={args.indeterminate}
      invalidated={args.invalidated}
      message={args.message}
    >
      <span slot="label">{args.label}</span>
    </PharosCheckbox>
  ),
  args: defaultArgs,
};

export const States: Story = {
  render: () => (
    <div>
      <div>
        <PharosCheckbox name="one">
          <span slot="label">Normal checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="two" disabled>
          <span slot="label">Disabled checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="three" checked>
          <span slot="label">Checked checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="four" checked disabled>
          <span slot="label">Disabled & Checked checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="five" checked>
          <div slot="label">
            <div>Checked checkbox</div>
            <div>Multiple lines</div>
          </div>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="six" invalidated>
          <span slot="label">Error checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="seven">
          <span slot="label">
            Label with a <PharosLink href="#">link</PharosLink>
          </span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="eight" indeterminate>
          <span slot="label">Indeterminate checkbox</span>
        </PharosCheckbox>
      </div>
    </div>
  ),
};

export const Events: Story = {
  render: () => (
    <PharosCheckbox
      value="My value"
      onChange={(e) => action('Change')((e.target as HTMLInputElement).checked)}
      onInput={(e) => action('Input')((e.target as HTMLInputElement).value)}
      onClick={(e) => action('Click')((e.target as HTMLInputElement).checked)}
    >
      <span slot="label">I fire events</span>
    </PharosCheckbox>
  ),
  parameters: {
    options: { selectedPanel: 'storybook/actions/panel' },
  },
};

export const Validity: Story = {
  ...Base,
  args: {
    ...Base.args,
    required: true,
    invalidated: true,
    message: 'This field is required, please make a selection',
  },
};

export const FullWidth: Story = {
  render: () => (
    <>
      <style>{`
        .full-width-styled-example [data-pharos-component='PharosCheckbox'] {
          box-sizing: border-box;
          padding: var(--pharos-spacing-one-half-x, 0.5rem);
          border: 1px solid var(--pharos-color-marble-gray-80, #c3c5c8);
          border-radius: var(--pharos-radius-base, 4px);
        }
        /* When a checkbox is checked, style it like an info alert */
        .full-width-styled-example [data-pharos-component='PharosCheckbox'][checked] {
          background-color: var(--pharos-alert-color-background-info);
          border-color: var(--pharos-alert-color-border-info);
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <PharosCheckboxGroup
          style={{
            width: '480px',
            border: '1px solid var(--pharos-color-marble-gray-80, #c3c5c8)',
            padding: 'var(--pharos-spacing-one, 1rem)',
            borderRadius: 'var(--pharos-radius-base, 4px)',
          }}
        >
          <span slot="legend">Full Width</span>
          <PharosCheckbox value="email" fullWidth checked>
            <span slot="label">This is the first choice</span>
          </PharosCheckbox>
          <PharosCheckbox value="product" fullWidth>
            <span slot="label">This is the second choice</span>
          </PharosCheckbox>
          <PharosCheckbox value="research" fullWidth>
            <span slot="label">
              This is the third choice with a label that is just entirely too long and someone
              should have said something before shipping this to users
            </span>
          </PharosCheckbox>
        </PharosCheckboxGroup>
        <PharosCheckboxGroup className="full-width-styled-example" style={{ width: '480px' }}>
          <span slot="legend">Full Width with styles</span>
          <PharosCheckbox value="email" fullWidth checked>
            <span slot="label">This is the first choice</span>
          </PharosCheckbox>
          <PharosCheckbox value="product" fullWidth>
            <span slot="label">This is the second choice</span>
          </PharosCheckbox>
          <PharosCheckbox value="research" fullWidth>
            <span slot="label">
              This is the third choice with a label that is just entirely too long and someone
              should have said something before shipping this to users
            </span>
          </PharosCheckbox>
        </PharosCheckboxGroup>
      </div>
    </>
  ),
};

export const IsOnBackground: Story = {
  name: 'On background',
  render: () => (
    <div style={{ backgroundColor: '#000000', padding: '1rem' }}>
      <div className="checkbox-example__container--is-on-background">
        <PharosCheckbox name="is-on-background" isOnBackground>
          <span slot="label">Unchecked</span>
        </PharosCheckbox>
      </div>
      <div className="checkbox-example__container--is-on-background">
        <PharosCheckbox name="is-on-background" isOnBackground checked>
          <span slot="label">Checked</span>
        </PharosCheckbox>
      </div>
      <div className="checkbox-example__container--is-on-background">
        <PharosCheckbox name="indeterminate" isOnBackground indeterminate>
          <span slot="label">Indeterminate</span>
        </PharosCheckbox>
      </div>
    </div>
  ),
};
