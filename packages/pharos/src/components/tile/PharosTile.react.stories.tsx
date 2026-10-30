import { PharosTile, PharosIcon } from '../../react-components';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Tile',
  component: PharosTile,
  argTypes,
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

export const Base: Story = {
  render: (args) => (
    <PharosTile
      title={args.title}
      description={args.description}
      icon={args.icon}
      label={args.label}
      href={args.href}
      headingLevel={args.headingLevel}
      disabled={args.disabled}
    />
  ),
  args: defaultArgs,
};

export const IconWithTitle: Story = {
  render: () => (
    <PharosTile
      href="#"
      icon="gen-ai"
      title="Seeklight Management"
      description="Enable generation on project fields. Configure metadata generation output."
    />
  ),
};

export const IconAboveTitle: Story = {
  name: 'Icon above title (header slot)',
  render: () => (
    <PharosTile
      href="#"
      title="Title"
      label="Label text"
      description="1-2 lines of descriptive, yet simple text"
    >
      <PharosIcon slot="header" name="gear" a11yHidden="true" />
    </PharosTile>
  ),
};

export const CustomLabel: Story = {
  name: 'Custom label (label slot)',
  render: () => (
    <PharosTile href="#" title="Preservation" description="Enable preservation in Portico">
      <PharosIcon slot="label" name="checkmark-filled-circle" a11yTitle="Enabled" />
    </PharosTile>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <PharosTile href="#" title="Preservation" description="Enable preservation in Portico">
      <span slot="footer" style={{ color: 'var(--pharos-color-feedback-error)' }}>
        Preservation disabled
      </span>
    </PharosTile>
  ),
};

export const Disabled: Story = {
  render: () => (
    <PharosTile
      href="#"
      title="Preservation"
      description="Enable preservation in Portico"
      icon="gear"
      disabled
    />
  ),
};

export const CustomContent: Story = {
  name: 'Custom content (pricing)',
  render: () => (
    <PharosTile hideIndicator>
      <span slot="header">Regular plan</span>
      <PharosIcon slot="label" name="checkmark-filled-circle" a11yTitle="Current plan" />
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
  ),
};

export const FlexLayout: Story = {
  name: 'Layout: flexbox',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pharos-spacing-1-x)' }}>
      <PharosTile
        style={{ flex: '1 1 200px' }}
        href="#"
        title="Preservation"
        description="Enable preservation in Portico"
      />
      <PharosTile
        style={{ flex: '1 1 200px' }}
        href="#"
        icon="gen-ai"
        title="Seeklight Management"
        description="Enable generation on project fields. Configure metadata generation output."
      />
      <PharosTile
        style={{ flex: '1 1 200px' }}
        href="#"
        title="Interpretive"
        description="Derives historical framing and draw connections beyond what is literally visible in the item"
      />
    </div>
  ),
};

export const SquareTiles: Story = {
  name: 'Layout: square tiles',
  render: () => {
    const square = { flex: 'none', width: '200px', aspectRatio: '1', minWidth: 0 };
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pharos-spacing-1-x)' }}>
        <PharosTile
          style={square}
          href="#"
          title="Preservation"
          description="Enable preservation in Portico"
        />
        <PharosTile
          style={square}
          href="#"
          icon="gen-ai"
          title="Seeklight"
          description="Enable generation on project fields"
        />
        <PharosTile
          style={square}
          href="#"
          title="Interpretive"
          description="Derives historical framing"
        />
      </div>
    );
  },
};
