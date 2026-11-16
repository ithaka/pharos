import { PharosTile, PharosIcon, PharosHeading } from '../../react-components';
import {
  defaultArgs,
  headerIconStyleReact,
  headerLabelStyleReact,
  headerRowStyleReact,
  headerStackStyleReact,
  type ComponentArgs,
  type StoryArgs,
} from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Tile',
  component: PharosTile,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('tile') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  paddingTop: 'var(--pharos-spacing-one-half-x)',
  borderTop: '1px solid var(--pharos-color-marble-gray-80)',
  display: 'grid',
  gap: 'var(--pharos-spacing-one-quarter-x)',
};
const listItemStyle = {
  display: 'flex',
  gap: 'var(--pharos-spacing-one-quarter-x)',
  alignItems: 'center',
};

export const Base: Story = {
  render: (args) => (
    <PharosTile href={args.href} disabled={args.disabled}>
      <PharosIcon slot="header" name="gear" a11yHidden="true" style={headerIconStyleReact} />
      <PharosHeading slot="header" level={3} preset="2" noMargin>
        Preservation
      </PharosHeading>
      <span slot="header" style={headerLabelStyleReact}>
        Beta
      </span>
      Enable preservation in Portico
    </PharosTile>
  ),
  args: defaultArgs,
};

export const IconWithTitle: Story = {
  render: () => (
    <PharosTile href="#">
      <PharosIcon slot="header" name="gen-ai" a11yHidden="true" style={headerIconStyleReact} />
      <PharosHeading slot="header" level={3} preset="2" noMargin>
        Seeklight Management
      </PharosHeading>
      Enable generation on project fields. Configure metadata generation output.
    </PharosTile>
  ),
};

export const IconAboveTitle: Story = {
  name: 'Icon above title',
  render: () => (
    <PharosTile href="#">
      <div slot="header" style={headerStackStyleReact}>
        <div style={headerRowStyleReact}>
          <PharosIcon name="gear" a11yHidden="true" />
          <span style={headerLabelStyleReact}>Label text</span>
        </div>
        <PharosHeading level={3} preset="2" noMargin>
          Title
        </PharosHeading>
      </div>
      1-2 lines of descriptive, yet simple text
    </PharosTile>
  ),
};

export const CustomLabel: Story = {
  name: 'Custom label',
  render: () => (
    <PharosTile href="#">
      <PharosHeading slot="header" level={3} preset="2" noMargin>
        Preservation
      </PharosHeading>
      <PharosIcon
        slot="header"
        name="checkmark-filled-circle"
        a11yTitle="Enabled"
        style={headerLabelStyleReact}
      />
      Enable preservation in Portico
    </PharosTile>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <PharosTile href="#">
      <PharosHeading slot="header" level={3} preset="2" noMargin>
        Preservation
      </PharosHeading>
      Enable preservation in Portico
      <span slot="footer" style={{ color: 'var(--pharos-color-feedback-error)' }}>
        Preservation disabled
      </span>
    </PharosTile>
  ),
};

export const Disabled: Story = {
  render: () => (
    <PharosTile href="#" disabled>
      <PharosIcon slot="header" name="gear" a11yHidden="true" style={headerIconStyleReact} />
      <PharosHeading slot="header" level={3} preset="2" noMargin>
        Preservation
      </PharosHeading>
      Enable preservation in Portico
    </PharosTile>
  ),
};

export const CustomContent: Story = {
  name: 'Custom content (pricing)',
  render: () => (
    <PharosTile hideIndicator>
      <div slot="header" style={headerStackStyleReact}>
        <div style={headerRowStyleReact}>
          <span>Regular plan</span>
          <PharosIcon
            name="checkmark-filled-circle"
            a11yTitle="Current plan"
            style={{ color: 'var(--pharos-color-text-20)' }}
          />
        </div>
        <PharosHeading level={3} preset="2" noMargin>
          <strong>$19</strong> / month
        </PharosHeading>
      </div>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <PharosIcon name="checkmark-small" a11yHidden="true" />
          10 PDF downloads / month
        </li>
        <li style={listItemStyle}>
          <PharosIcon name="checkmark-small" a11yHidden="true" />
          Unlimited reading and saving online
        </li>
        <li style={listItemStyle}>
          <PharosIcon name="checkmark-small" a11yHidden="true" />
          Cancel anytime
        </li>
      </ul>
    </PharosTile>
  ),
};

export const FlexLayout: Story = {
  name: 'Layout: flexbox',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pharos-spacing-1-x)' }}>
      <PharosTile style={{ flex: '1 1 200px' }} href="#">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Preservation
        </PharosHeading>
        Enable preservation in Portico
      </PharosTile>
      <PharosTile style={{ flex: '1 1 200px' }} href="#">
        <PharosIcon slot="header" name="gen-ai" a11yHidden="true" style={headerIconStyleReact} />
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Seeklight Management
        </PharosHeading>
        Enable generation on project fields. Configure metadata generation output.
      </PharosTile>
      <PharosTile style={{ flex: '1 1 200px' }} href="#">
        <PharosHeading slot="header" level={3} preset="2" noMargin>
          Interpretive
        </PharosHeading>
        Derives historical framing and draw connections beyond what is literally visible in the item
      </PharosTile>
    </div>
  ),
};

export const SquareTiles: Story = {
  name: 'Layout: square tiles',
  render: () => {
    const square = { flex: 'none', width: '200px', aspectRatio: '1', minWidth: 0 };
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pharos-spacing-1-x)' }}>
        <PharosTile style={square} href="#">
          <PharosHeading slot="header" level={3} preset="2" noMargin>
            Preservation
          </PharosHeading>
          Enable preservation in Portico
        </PharosTile>
        <PharosTile style={square} href="#">
          <PharosIcon slot="header" name="gen-ai" a11yHidden="true" style={headerIconStyleReact} />
          <PharosHeading slot="header" level={3} preset="2" noMargin>
            Seeklight
          </PharosHeading>
          Enable generation on project fields
        </PharosTile>
        <PharosTile style={square} href="#">
          <PharosHeading slot="header" level={3} preset="2" noMargin>
            Interpretive
          </PharosHeading>
          Derives historical framing
        </PharosTile>
      </div>
    );
  },
};
