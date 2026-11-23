import { action } from 'storybook/actions';

import {
  PharosTileGroup,
  PharosTile,
  PharosIcon,
  PharosHeading,
  PharosButton,
} from '../../react-components';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { headerIconStyleReact, headerStackStyleReact } from '../tile/storyArgs';
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
      <PharosTile value="new">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Create a new project
        </PharosHeading>
        Create a new project from scratch with a pre-defined metadata template
      </PharosTile>
      <PharosTile value="interpretive">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Interpretive
        </PharosHeading>
        Derives historical framing and draw connections beyond what is literally visible in the item
      </PharosTile>
      <PharosTile value="seeklight">
        <PharosIcon slot="header" name="gen-ai" a11yHidden="true" style={headerIconStyleReact} />
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Seeklight Management
        </PharosHeading>
        Enable generation on project fields. Configure metadata generation output.
      </PharosTile>
      <PharosTile value="archive" disabled>
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Archive
        </PharosHeading>
        Not available right now
      </PharosTile>
    </PharosTileGroup>
  ),
  args: defaultArgs,
};

export const Pricing: Story = {
  render: () => (
    <PharosTileGroup name="plan">
      <span slot="legend">Choose a plan</span>
      <PharosTile value="regular" indicatorIcon="checkmark-inverse" indicatorPosition="top-end">
        <div slot="header" style={headerStackStyleReact}>
          <span>Plan A</span>
          <PharosHeading level={3} preset="2" noMargin>
            <strong>$X</strong> / month
          </PharosHeading>
        </div>
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
            Point A
          </li>
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            Point B
          </li>
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            Point C
          </li>
        </ul>
      </PharosTile>
      <PharosTile value="plus" indicatorIcon="checkmark-inverse" indicatorPosition="top-end">
        <div slot="header" style={headerStackStyleReact}>
          <span>Plan B</span>
          <PharosHeading level={3} preset="2" noMargin>
            <strong>$X</strong> / month
          </PharosHeading>
        </div>
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
            Point A
          </li>
          <li
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-one-quarter-x)',
              alignItems: 'center',
            }}
          >
            <PharosIcon name="checkmark-small" a11yHidden="true" />
            Point B
          </li>
        </ul>
      </PharosTile>
    </PharosTileGroup>
  ),
};

export const IndicatorTopRight: Story = {
  name: 'Indicator top right',
  render: () => (
    <PharosTileGroup name="topright">
      <span slot="legend">Indicator at the top right</span>
      <PharosTile value="one" indicatorPosition="top-end">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Create a new project
        </PharosHeading>
        Start from scratch
      </PharosTile>
      <PharosTile value="two" indicatorPosition="top-end">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Import a project
        </PharosHeading>
        Bring in an existing project
      </PharosTile>
    </PharosTileGroup>
  ),
};

export const SelectedIcon: Story = {
  name: 'Selected icon only',
  render: () => (
    <PharosTileGroup name="selectedicon">
      <span slot="legend">Only the selected tile shows an icon</span>
      <PharosTile value="one" indicatorIcon="checkmark-inverse" indicatorPosition="top-end">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Create a new project
        </PharosHeading>
        Start from scratch
      </PharosTile>
      <PharosTile value="two" indicatorIcon="checkmark-inverse" indicatorPosition="top-end">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Import a project
        </PharosHeading>
        Bring in an existing project
      </PharosTile>
    </PharosTileGroup>
  ),
};

export const Compact: Story = {
  render: () => (
    <>
      <PharosTileGroup name="compact" compact>
        <span slot="legend">Compact removes the padding below the group</span>
        <PharosTile value="one">
          <PharosHeading slot="header" level={3} preset="2" noMargin>
            Create a new project
          </PharosHeading>
          Start from scratch
        </PharosTile>
        <PharosTile value="two">
          <PharosHeading slot="header" level={3} preset="2" noMargin>
            Import a project
          </PharosHeading>
          Bring in an existing project
        </PharosTile>
      </PharosTileGroup>
      <PharosButton>Button directly below the group</PharosButton>
    </>
  ),
};
