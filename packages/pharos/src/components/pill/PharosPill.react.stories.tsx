import { useState } from 'react';
import { PharosPill, PharosHeading, PharosButton, PharosTooltip } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Pill',
  component: PharosPill,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['base', 'small'],
      description: 'The size of the pill',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Makes the pill dismissible with a close button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the pill',
    },
    preset: {
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      description: 'Which style preset to use for the pill',
    },
    iconLeft: {
      control: { type: 'text' },
      description: 'The icon to be shown to the left of the pill content',
    },
  },
  args: {
    ...defaultArgs,
    'icon-left': undefined,
  },
  parameters: {
    docs: { page: configureDocsPage('pill') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true, exclude: ['icon-left'] },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosPill
      size={args.size}
      dismissible={args.dismissible}
      disabled={args.disabled}
      preset={args.preset}
      iconLeft={args.iconLeft as React.ComponentProps<typeof PharosPill>['iconLeft']}
    >
      Some content
    </PharosPill>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridGap: 'var(--pharos-spacing-3-x)' }}>
      <div>
        <PharosHeading level={2} preset="5">
          Default Size
        </PharosHeading>
        <PharosPill>Default Pill</PharosPill>
        <PharosPill dismissible>Default Pill</PharosPill>
        <PharosPill iconLeft="info-inverse">Default Pill</PharosPill>
        <PharosPill iconLeft="info-inverse" dismissible>
          Default Pill
        </PharosPill>
      </div>
      <div>
        <PharosHeading level={2} preset="5">
          Small Size
        </PharosHeading>
        <PharosPill size="small">Small Pill</PharosPill>
        <PharosPill size="small" dismissible>
          Small Pill
        </PharosPill>
        <PharosPill size="small" iconLeft="info-inverse">
          Small Pill
        </PharosPill>
        <PharosPill size="small" iconLeft="info-inverse" dismissible>
          Small Pill
        </PharosPill>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Presets: Story = {
  render: () => (
    <div style={{ display: 'grid', gridGap: 'var(--pharos-spacing-2-x)' }}>
      <div>
        <PharosHeading level={2} preset="5">
          Style Presets
        </PharosHeading>
        <PharosPill preset="1">Preset 1</PharosPill>
        <PharosPill preset="2">Preset 2</PharosPill>
        <PharosPill preset="3">Preset 3</PharosPill>
        <PharosPill preset="4">Preset 4</PharosPill>
        <PharosPill preset="5">Preset 5</PharosPill>
        <PharosPill preset="6">Preset 6</PharosPill>
        <PharosPill preset="7">Preset 7</PharosPill>
        <PharosPill preset="8">Preset 8</PharosPill>
        <PharosPill preset="9">Preset 9</PharosPill>
      </div>
      <div>
        <PharosPill preset="1" dismissible>
          Preset 1{' '}
        </PharosPill>
        <PharosPill preset="2" dismissible>
          Preset 2{' '}
        </PharosPill>
        <PharosPill preset="3" dismissible>
          Preset 3{' '}
        </PharosPill>
        <PharosPill preset="4" dismissible>
          Preset 4{' '}
        </PharosPill>
        <PharosPill preset="5" dismissible>
          Preset 5{' '}
        </PharosPill>
        <PharosPill preset="6" dismissible>
          Preset 6{' '}
        </PharosPill>
        <PharosPill preset="7" dismissible>
          Preset 7{' '}
        </PharosPill>
        <PharosPill preset="8" dismissible>
          Preset 8{' '}
        </PharosPill>
        <PharosPill preset="9" dismissible>
          Preset 9{' '}
        </PharosPill>
      </div>
      <div>
        <PharosPill preset="1" iconLeft="info-inverse">
          Preset 1{' '}
        </PharosPill>
        <PharosPill preset="2" iconLeft="info-inverse">
          Preset 2{' '}
        </PharosPill>
        <PharosPill preset="3" iconLeft="info-inverse">
          Preset 3{' '}
        </PharosPill>
        <PharosPill preset="4" iconLeft="info-inverse">
          Preset 4{' '}
        </PharosPill>
        <PharosPill preset="5" iconLeft="info-inverse">
          Preset 5{' '}
        </PharosPill>
        <PharosPill preset="6" iconLeft="info-inverse">
          Preset 6{' '}
        </PharosPill>
        <PharosPill preset="7" iconLeft="info-inverse">
          Preset 7{' '}
        </PharosPill>
        <PharosPill preset="8" iconLeft="info-inverse">
          Preset 8{' '}
        </PharosPill>
        <PharosPill preset="9" iconLeft="info-inverse">
          Preset 9{' '}
        </PharosPill>
      </div>
      <div>
        <PharosPill size="small" preset="1">
          Preset 1
        </PharosPill>
        <PharosPill size="small" preset="2">
          Preset 2
        </PharosPill>
        <PharosPill size="small" preset="3">
          Preset 3
        </PharosPill>
        <PharosPill size="small" preset="4">
          Preset 4
        </PharosPill>
        <PharosPill size="small" preset="5">
          Preset 5
        </PharosPill>
        <PharosPill size="small" preset="6">
          Preset 6
        </PharosPill>
        <PharosPill size="small" preset="7">
          Preset 7
        </PharosPill>
        <PharosPill size="small" preset="8">
          Preset 8
        </PharosPill>
        <PharosPill size="small" preset="9">
          Preset 9
        </PharosPill>
      </div>
      <div>
        <PharosPill size="small" preset="1" dismissible>
          Preset 1{' '}
        </PharosPill>
        <PharosPill size="small" preset="2" dismissible>
          Preset 2{' '}
        </PharosPill>
        <PharosPill size="small" preset="3" dismissible>
          Preset 3{' '}
        </PharosPill>
        <PharosPill size="small" preset="4" dismissible>
          Preset 4{' '}
        </PharosPill>
        <PharosPill size="small" preset="5" dismissible>
          Preset 5{' '}
        </PharosPill>
        <PharosPill size="small" preset="6" dismissible>
          Preset 6{' '}
        </PharosPill>
        <PharosPill size="small" preset="7" dismissible>
          Preset 7{' '}
        </PharosPill>
        <PharosPill size="small" preset="8" dismissible>
          Preset 8{' '}
        </PharosPill>
        <PharosPill size="small" preset="9" dismissible>
          Preset 9{' '}
        </PharosPill>
      </div>
      <div>
        <PharosPill size="small" preset="1" iconLeft="info-inverse">
          Preset 1{' '}
        </PharosPill>
        <PharosPill size="small" preset="2" iconLeft="info-inverse">
          Preset 2{' '}
        </PharosPill>
        <PharosPill size="small" preset="3" iconLeft="info-inverse">
          Preset 3{' '}
        </PharosPill>
        <PharosPill size="small" preset="4" iconLeft="info-inverse">
          Preset 4{' '}
        </PharosPill>
        <PharosPill size="small" preset="5" iconLeft="info-inverse">
          Preset 5{' '}
        </PharosPill>
        <PharosPill size="small" preset="6" iconLeft="info-inverse">
          Preset 6{' '}
        </PharosPill>
        <PharosPill size="small" preset="7" iconLeft="info-inverse">
          Preset 7{' '}
        </PharosPill>
        <PharosPill size="small" preset="8" iconLeft="info-inverse">
          Preset 8{' '}
        </PharosPill>
        <PharosPill size="small" preset="9" iconLeft="info-inverse">
          Preset 9{' '}
        </PharosPill>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Dismissible: Story = {
  render: () => {
    const DismissibleExample = () => {
      const [visiblePills, setVisiblePills] = useState([
        'Pill 1',
        'Pill 2',
        'Pill 3',
        'Pill 4',
        'Pill 5',
      ]);

      const handleDismiss = (pillText: string) => {
        setVisiblePills((prev) => prev.filter((pill) => pill !== pillText));
      };

      const handleReset = () => {
        setVisiblePills(['Pill 1', 'Pill 2', 'Pill 3', 'Pill 4', 'Pill 5']);
      };

      return (
        <div>
          <PharosHeading level={2} preset="5">
            Dismissible Pills
          </PharosHeading>
          <div
            style={{
              display: 'flex',
              gap: 'var(--pharos-spacing-2-x)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div>
              {visiblePills.map((pill) => (
                <PharosPill
                  key={pill}
                  dismissible
                  onPharos-Pill-Dismissed={() => handleDismiss(pill)}
                >
                  {pill}
                </PharosPill>
              ))}
              <PharosPill dismissible disabled>
                Disabled Pill
              </PharosPill>
            </div>
          </div>
          <br />
          <PharosButton onClick={handleReset}>Reset Pills</PharosButton>
        </div>
      );
    };

    return <DismissibleExample />;
  },
  parameters: {
    controls: { disable: true },
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'grid', gridGap: 'var(--pharos-spacing-3-x)' }}>
      <div>
        <PharosHeading level={2} preset="5">
          Pills with icons
        </PharosHeading>
        <PharosPill iconLeft="info-inverse">Some content</PharosPill>
        <PharosPill iconLeft="filetype-pdf">Some content</PharosPill>
        <PharosPill iconLeft="community">Some content</PharosPill>
        <PharosPill iconLeft="feedback">Some content</PharosPill>
        <PharosPill iconLeft="panorama">Some content</PharosPill>
        <PharosPill iconLeft="question-inverse">Some content</PharosPill>
        <PharosPill iconLeft="institution">Some content</PharosPill>
        <PharosPill iconLeft="sound-none">Some content</PharosPill>
        <PharosPill iconLeft="attachment">Some content</PharosPill>
      </div>
      <div>
        <PharosHeading level={2} preset="5">
          Small pills with icons
        </PharosHeading>
        <PharosPill size="small" iconLeft="info-inverse">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="filetype-pdf">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="community">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="feedback">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="panorama">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="question-inverse">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="institution">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="sound-none">
          Some content
        </PharosPill>
        <PharosPill size="small" iconLeft="attachment">
          Some content
        </PharosPill>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Truncation: Story = {
  render: () => (
    <div style={{ display: 'grid', gridGap: 'var(--pharos-spacing-3-x)' }}>
      <div>
        <PharosHeading level={2} preset="5">
          Truncating Pills (CSS)
        </PharosHeading>
        <p>
          Apply a <code>max-width</code> to the pill using CSS to set a specific width for
          truncation.
        </p>
        <style>{`
          .truncated {
            max-width: 200px;
          }
        `}</style>
        <PharosPill className="truncated">
          This is a very long pill that will truncate when it reaches the max width
        </PharosPill>
        <br />
        <PharosPill className="truncated" dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </PharosPill>
        <br />
        <PharosPill className="truncated" iconLeft="info-inverse">
          This is a very long pill that will truncate when it reaches the max width
        </PharosPill>
        <br />
        <PharosPill className="truncated" iconLeft="info-inverse" dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </PharosPill>
        <br />
      </div>

      <div
        style={{
          width: '300px',
          padding: '2rem',
          border: '1px solid var(--pharos-color-black)',
          marginTop: '2rem',
          resize: 'horizontal',
          overflow: 'auto',
        }}
      >
        <PharosHeading level={2} preset="5">
          Truncating Pills (Container)
        </PharosHeading>
        <p>Pill will also be truncated when the are longer than their container.</p>
        <PharosPill dismissible>Short pill</PharosPill>
        <PharosPill dismissible>Short pill</PharosPill>
        <PharosPill dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </PharosPill>
        <PharosPill dismissible>Short pill</PharosPill>
        <PharosPill dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </PharosPill>
        <PharosPill dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </PharosPill>
      </div>
      <div>
        <PharosHeading level={2} preset="5">
          Truncating Pills (Tooltip)
        </PharosHeading>
        <p>Tooltips can be used to show the full content of a truncated pill on hover or focus.</p>
        <PharosPill style={{ maxWidth: '20rem' }} data-tooltip-id="pill-tooltip" dismissible>
          This is a very long pill that will truncate when it reaches the max width, but has a
          tooltip to make it all readable.
        </PharosPill>
        <PharosTooltip id="pill-tooltip">
          This is a very long pill that will truncate when it reaches the max width, but has a
          tooltip to make it all readable.
        </PharosTooltip>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
