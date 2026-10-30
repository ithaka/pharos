import { action } from 'storybook/actions';

import { PharosTileGroup, PharosTile, PharosIcon } from '../../react-components';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PharosTileGroup as PTGType } from './pharos-tile-group';

const meta = {
  title: 'Components/Tile Group',
  component: PharosTileGroup,
  subcomponents: { PharosTile },
  argTypes,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('tile-group') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosTileGroup
      selection={args.selection}
      name={args.name}
      required={args.required}
      disabled={args.disabled}
      invalidated={args.invalidated}
      validated={args.validated}
      message={args.message}
      onChange={(e) => action('Change')((e.target as PTGType).value)}
    >
      <span slot="legend">How do you want to start?</span>
      <PharosTile
        value="new"
        title="Create a new project"
        description="Create a new project from scratch with a pre-defined metadata template"
      />
      <PharosTile
        value="interpretive"
        title="Interpretive"
        description="Derives historical framing and draw connections beyond what is literally visible in the item"
      />
      <PharosTile
        value="seeklight"
        title="Seeklight Management"
        description="Enable generation on project fields. Configure metadata generation output."
        icon="gen-ai"
      />
      <PharosTile value="archive" title="Archive" description="Not available right now" disabled />
    </PharosTileGroup>
  ),
  args: defaultArgs,
};

export const Pricing: Story = {
  render: () => (
    <PharosTileGroup name="plan">
      <span slot="legend">Choose a plan</span>
      <PharosTile value="regular" hideIndicator>
        <span slot="header">Regular plan</span>
        <span slot="title">
          <strong>$19</strong> / month
        </span>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            paddingTop: 'var(--pharos-spacing-one-half-x)',
            borderTop: '1px solid var(--pharos-color-marble-gray-80)',
            display: 'grid',
            gap: 'var(--pharos-spacing-one-quarter-x)',
          }}
        >
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            10 PDF downloads / month
          </li>
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            Unlimited reading and saving online
          </li>
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            Cancel anytime
          </li>
        </ul>
      </PharosTile>
      <PharosTile value="plus" hideIndicator>
        <span slot="header">Plus plan</span>
        <span slot="title">
          <strong>$29</strong> / month
        </span>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            paddingTop: 'var(--pharos-spacing-one-half-x)',
            borderTop: '1px solid var(--pharos-color-marble-gray-80)',
            display: 'grid',
            gap: 'var(--pharos-spacing-one-quarter-x)',
          }}
        >
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            Unlimited PDF downloads
          </li>
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            Cancel anytime
          </li>
        </ul>
      </PharosTile>
    </PharosTileGroup>
  ),
};
