import { html, render } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
  title: 'Components/Pill',
  component: 'pharos-pill',
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
    'icon-left': {
      control: { type: 'text' },
      description: 'The icon to be shown to the left of the pill content',
    },
  },
  args: {
    ...defaultArgs,
    iconLeft: undefined,
  },
  parameters: {
    docs: { page: configureDocsPage('pill') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true, exclude: ['elementDefinitions', 'iconLeft', '_icon'] },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-pill
      size=${args.size}
      .dismissible=${args.dismissible}
      .disabled=${args.disabled}
      preset=${args.preset}
      icon-left=${ifDefined(args['icon-left'])}
    >
      Some content
    </storybook-pharos-pill>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: var(--pharos-spacing-3-x);">
      <div>
        <storybook-pharos-heading level="2" preset="5">Default Size</storybook-pharos-heading>
        <storybook-pharos-pill>Default Pill</storybook-pharos-pill>
        <storybook-pharos-pill dismissible>Default Pill</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="info-inverse">Default Pill</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="info-inverse" dismissible
          >Default Pill</storybook-pharos-pill
        >
      </div>
      <div>
        <storybook-pharos-heading level="2" preset="5">Small Size</storybook-pharos-heading>
        <storybook-pharos-pill size="small">Small Pill</storybook-pharos-pill>
        <storybook-pharos-pill size="small" dismissible>Small Pill</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="info-inverse"
          >Small Pill</storybook-pharos-pill
        >
        <storybook-pharos-pill size="small" icon-left="info-inverse" dismissible
          >Small Pill</storybook-pharos-pill
        >
      </div>
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};

export const Presets: Story = {
  render: () =>
    html`<div style="display: grid; grid-gap: var(--pharos-spacing-2-x);">
  <div>
  <storybook-pharos-heading level="2" preset="5"">Style Presets</storybook-pharos-heading>
        <storybook-pharos-pill preset="1">Preset 1</storybook-pharos-pill>
        <storybook-pharos-pill preset="2">Preset 2</storybook-pharos-pill>
        <storybook-pharos-pill preset="3">Preset 3</storybook-pharos-pill>
        <storybook-pharos-pill preset="4">Preset 4</storybook-pharos-pill>
        <storybook-pharos-pill preset="5">Preset 5</storybook-pharos-pill>
        <storybook-pharos-pill preset="6">Preset 6</storybook-pharos-pill>
        <storybook-pharos-pill preset="7">Preset 7</storybook-pharos-pill>
        <storybook-pharos-pill preset="8">Preset 8</storybook-pharos-pill>
        <storybook-pharos-pill preset="9">Preset 9</storybook-pharos-pill>
        </div>
        <div>
        <storybook-pharos-pill preset="1" dismissible>Preset 1 </storybook-pharos-pill>
        <storybook-pharos-pill preset="2" dismissible>Preset 2 </storybook-pharos-pill>
        <storybook-pharos-pill preset="3" dismissible>Preset 3 </storybook-pharos-pill>
        <storybook-pharos-pill preset="4" dismissible>Preset 4 </storybook-pharos-pill>
        <storybook-pharos-pill preset="5" dismissible>Preset 5 </storybook-pharos-pill>
        <storybook-pharos-pill preset="6" dismissible>Preset 6 </storybook-pharos-pill>
        <storybook-pharos-pill preset="7" dismissible>Preset 7 </storybook-pharos-pill>
        <storybook-pharos-pill preset="8" dismissible>Preset 8 </storybook-pharos-pill>
        <storybook-pharos-pill preset="9" dismissible>Preset 9 </storybook-pharos-pill>
        </div>
        <div>
        <storybook-pharos-pill preset="1" icon-left="info-inverse">Preset 1 </storybook-pharos-pill>
        <storybook-pharos-pill preset="2" icon-left="info-inverse">Preset 2 </storybook-pharos-pill>
        <storybook-pharos-pill preset="3" icon-left="info-inverse">Preset 3 </storybook-pharos-pill>
        <storybook-pharos-pill preset="4" icon-left="info-inverse">Preset 4 </storybook-pharos-pill>
        <storybook-pharos-pill preset="5" icon-left="info-inverse">Preset 5 </storybook-pharos-pill>
        <storybook-pharos-pill preset="6" icon-left="info-inverse">Preset 6 </storybook-pharos-pill>
        <storybook-pharos-pill preset="7" icon-left="info-inverse">Preset 7 </storybook-pharos-pill>
        <storybook-pharos-pill preset="8" icon-left="info-inverse">Preset 8 </storybook-pharos-pill>
        <storybook-pharos-pill preset="9" icon-left="info-inverse">Preset 9 </storybook-pharos-pill>
        </div>
        <div>
        <storybook-pharos-pill size="small" preset="1">Preset 1</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="2">Preset 2</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="3">Preset 3</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="4">Preset 4</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="5">Preset 5</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="6">Preset 6</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="7">Preset 7</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="8">Preset 8</storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="9">Preset 9</storybook-pharos-pill>
        </div>
        <div>
        <storybook-pharos-pill size="small" preset="1" dismissible>Preset 1 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="2" dismissible>Preset 2 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="3" dismissible>Preset 3 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="4" dismissible>Preset 4 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="5" dismissible>Preset 5 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="6" dismissible>Preset 6 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="7" dismissible>Preset 7 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="8" dismissible>Preset 8 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="9" dismissible>Preset 9 </storybook-pharos-pill>
        </div>
        <div>
        <storybook-pharos-pill size="small" preset="1" icon-left="info-inverse">Preset 1 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="2" icon-left="info-inverse">Preset 2 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="3" icon-left="info-inverse">Preset 3 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="4" icon-left="info-inverse">Preset 4 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="5" icon-left="info-inverse">Preset 5 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="6" icon-left="info-inverse">Preset 6 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="7" icon-left="info-inverse">Preset 7 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="8" icon-left="info-inverse">Preset 8 </storybook-pharos-pill>
        <storybook-pharos-pill size="small" preset="9" icon-left="info-inverse">Preset 9 </storybook-pharos-pill>
      </div>
    </div>`,
  parameters: {
    controls: { disable: true },
  },
};

export const Dismissible: Story = {
  render: () => {
    let visiblePills = ['Pill 1', 'Pill 2', 'Pill 3', 'Pill 4', 'Pill 5'];
    let container: HTMLElement;

    const handleDismiss = (pillText: string) => {
      const index = visiblePills.indexOf(pillText);
      if (index > -1) {
        visiblePills.splice(index, 1);
        render(template(), container);
      }
    };

    const handleReset = () => {
      visiblePills = ['Pill 1', 'Pill 2', 'Pill 3', 'Pill 4', 'Pill 5'];
      render(template(), container);
    };

    const template = () => html`
      <div>
        <storybook-pharos-heading level="2" preset="5">Dismissible Pills</storybook-pharos-heading>
        <div
          style="display: flex; gap: var(--pharos-spacing-2-x); flex-wrap: wrap; align-items: center;"
        >
          <div>
            ${visiblePills.map(
              (pill) => html`
                <storybook-pharos-pill
                  dismissible
                  @pharos-pill-dismissed=${() => handleDismiss(pill)}
                >
                  ${pill}
                </storybook-pharos-pill>
              `
            )}
            <storybook-pharos-pill
              dismissible
              disabled
              @pharos-pill-dismissed=${() => handleDismiss('Disabled Pill')}
            >
              Disabled Pill
            </storybook-pharos-pill>
          </div>
        </div>
        <br />
        <storybook-pharos-button @click=${handleReset}>Reset Pills</storybook-pharos-button>
      </div>
    `;

    container = document.createElement('div');
    render(template(), container);
    return container;
  },
  parameters: {
    controls: { disable: true },
  },
};

export const WithIcon: Story = {
  render: () =>
    html`
      <div style="display: grid; grid-gap: var(--pharos-spacing-3-x);">
      <div>
        <storybook-pharos-heading level="2" preset="5">Pills with icons</storybook-pharos-heading>
        <storybook-pharos-pill icon-left="info-inverse">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="filetype-pdf">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="community">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="feedback">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="panorama">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="question-inverse">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="institution">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="sound-none">Some content</storybook-pharos-pill>
        <storybook-pharos-pill icon-left="attachment">Some content</storybook-pharos-pill>
      </div>
      <div>
        <storybook-pharos-heading level="2" preset="5"">Small pills with icons</storybook-pharos-heading>
        <storybook-pharos-pill size="small" icon-left="info-inverse">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="filetype-pdf">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="community">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="feedback">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="panorama">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="question-inverse">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="institution">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="sound-none">Some content</storybook-pharos-pill>
        <storybook-pharos-pill size="small" icon-left="attachment">Some content</storybook-pharos-pill>
      </div>
      </div>`,
  parameters: {
    controls: { disable: true },
  },
};

export const Truncation: Story = {
  render: () =>
    html` <div style="display: grid; grid-gap: var(--pharos-spacing-3-x);">
      <div>
        <storybook-pharos-heading level="2" preset="5"
          >Truncating Pills (CSS)</storybook-pharos-heading
        >
        <p>
          Apply a <code>max-width</code> to the pill using CSS to set a specific width for
          truncation.
        </p>
        <style>
          .truncated {
            max-width: 200px;
          }
        </style>
        <storybook-pharos-pill class="truncated">
          This is a very long pill that will truncate when it reaches the max width
        </storybook-pharos-pill>
        <br />
        <storybook-pharos-pill class="truncated" dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </storybook-pharos-pill>
        <br />
        <storybook-pharos-pill class="truncated" icon-left="info-inverse">
          This is a very long pill that will truncate when it reaches the max width
        </storybook-pharos-pill>
        <br />
        <storybook-pharos-pill class="truncated" icon-left="info-inverse" dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </storybook-pharos-pill>
        <br />
      </div>

      <div
        style="width:300px; padding:2rem; border:1px solid var(--pharos-color-black); margin-top:2rem; resize:horizontal; overflow:auto;"
      >
        <storybook-pharos-heading level="2" preset="5"
          >Truncating Pills (Container)</storybook-pharos-heading
        >
        <p>Pill will also be truncated when the are longer than their container.</p>
        <storybook-pharos-pill dismissible> Short pill </storybook-pharos-pill
        ><storybook-pharos-pill dismissible> Short pill </storybook-pharos-pill
        ><storybook-pharos-pill dismissible>
          This is a very long pill that will truncate when it reaches the max width </storybook-pharos-pill
        ><storybook-pharos-pill dismissible> Short pill </storybook-pharos-pill
        ><storybook-pharos-pill dismissible>
          This is a very long pill that will truncate when it reaches the max width </storybook-pharos-pill
        ><storybook-pharos-pill dismissible>
          This is a very long pill that will truncate when it reaches the max width
        </storybook-pharos-pill>
      </div>
      <div>
        <storybook-pharos-heading level="2" preset="5"
          >Truncating Pills (Tooltip)</storybook-pharos-heading
        >
        <p>Tooltips can be used to show the full content of a truncated pill on hover or focus.</p>
        <storybook-pharos-pill style="max-width:20rem;" data-tooltip-id="pill-tooltip" dismissible>
          This is a very long pill that will truncate when it reaches the max width, but has a
          tooltip to make it all readable.
        </storybook-pharos-pill>
        <storybook-pharos-tooltip id="pill-tooltip">
          This is a very long pill that will truncate when it reaches the max width, but has a
          tooltip to make it all readable.
        </storybook-pharos-tooltip>
      </div>
    </div>`,
  parameters: {
    controls: { disable: true },
  },
};
