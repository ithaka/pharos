import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Pill',
  component: 'pharos-pill',
  parameters: {
    docs: { page: configureDocsPage('pill') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => html`<storybook-pharos-pill>Some content</storybook-pharos-pill>`,
  args: defaultArgs,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
      <storybook-pharos-pill>Normal Pill</storybook-pharos-pill>
      <storybook-pharos-pill size="small">Small Pill</storybook-pharos-pill>
    </div>
  `,
};

export const Dismissible: Story = {
  render: () =>
    html`<div>
      <storybook-pharos-pill dismissible>Dismissible Pill</storybook-pharos-pill>
    </div>`,
};

export const Truncation: Story = {
  render: () =>
    html` <div>
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
        style="width:300px; padding:2rem; border:1px solid var(--pharos-color-black); margin-top:2rem;"
      >
        <storybook-pharos-heading level="2" preset="5"
          >Truncating Pills (Container)</storybook-pharos-heading
        >
        <p>Pill will also be truncated when the are longer than the container they are in</p>
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
    </div>`,
};

export const WithTooltip: Story = {
  render: () =>
    html`<div>
      <storybook-pharos-pill style="max-width:20rem;" data-tooltip-id="pill-tooltip">
        This is a very long pill that will truncate when it reaches the max width, but has a tooltip
        to make it all readable.
      </storybook-pharos-pill>
      <storybook-pharos-tooltip id="pill-tooltip">
        This is a very long pill that will truncate when it reaches the max width, but has a tooltip
        to make it all readable.
      </storybook-pharos-tooltip>
    </div>`,
};

export const Presets: Story = {
  render: () =>
    html`<div style="display: grid; grid-gap: var(--pharos-spacing-3-x);">
      <div>
        <storybook-pharos-heading level="2" preset="5"">Pill Presets</storybook-pharos-heading>
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
      <storybook-pharos-heading level="2" preset="5"
        >Pill Presets (Dismissible)</storybook-pharos-heading
      >
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
      <storybook-pharos-heading level="2" preset="5"
        >Pill Presets (Disabled)</storybook-pharos-heading
      >
      <storybook-pharos-pill preset="1" dismissible disabled>Preset 1 </storybook-pharos-pill>
      <storybook-pharos-pill preset="2" dismissible disabled>Preset 2 </storybook-pharos-pill>
      <storybook-pharos-pill preset="3" dismissible disabled>Preset 3 </storybook-pharos-pill>
      <storybook-pharos-pill preset="4" dismissible disabled>Preset 4 </storybook-pharos-pill>
      <storybook-pharos-pill preset="5" dismissible disabled>Preset 5 </storybook-pharos-pill>
      <storybook-pharos-pill preset="6" dismissible disabled>Preset 6 </storybook-pharos-pill>
      <storybook-pharos-pill preset="7" dismissible disabled>Preset 7 </storybook-pharos-pill>
      <storybook-pharos-pill preset="8" dismissible disabled>Preset 8 </storybook-pharos-pill>
      <storybook-pharos-pill preset="9" dismissible disabled>Preset 9 </storybook-pharos-pill>
      </div> 
      <div>
      <storybook-pharos-heading level="2" preset="5"">Pill Presets (Small)</storybook-pharos-heading>
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
      <storybook-pharos-heading level="2" preset="5"
        >Pill Presets (Small, Dismissible)</storybook-pharos-heading
      >
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
      <storybook-pharos-heading level="2" preset="5"
        >Pill Presets (Small, Disabled)</storybook-pharos-heading
      >
      <storybook-pharos-pill size="small" preset="1" dismissible disabled
        >Preset 1
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="2" dismissible disabled
        >Preset 2
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="3" dismissible disabled
        >Preset 3
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="4" dismissible disabled
        >Preset 4
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="5" dismissible disabled
        >Preset 5
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="6" dismissible disabled
        >Preset 6
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="7" dismissible disabled
        >Preset 7
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="8" dismissible disabled
        >Preset 8
      </storybook-pharos-pill>
      <storybook-pharos-pill size="small" preset="9" dismissible disabled
        >Preset 9
      </storybook-pharos-pill>
      </div>
    </div>`,
};

export const WithIcon: Story = {
  render: () =>
    html`<storybook-pharos-pill icon-left="info-inverse">Some content</storybook-pharos-pill>
      <storybook-pharos-pill icon-left="info-inverse" preset="5"
        >Some content</storybook-pharos-pill
      >
      <br />
      <storybook-pharos-pill icon-left="info-inverse" size="small">small</storybook-pharos-pill>`,
};
