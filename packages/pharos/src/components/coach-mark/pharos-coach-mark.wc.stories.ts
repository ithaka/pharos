import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { argTypes, defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Coach Mark',
  component: 'pharos-coach-mark',
  parameters: {
    docs: {
      page: configureDocsPage('coach-mark'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) =>
    html` <div
        style="border:1px solid #eae8e1;padding:20px;margin:200px auto;width:fit-content"
        data-coach-mark="example-coachmark"
      >
        Lorem Ipsum
      </div>
      <storybook-pharos-coach-mark
        id="example-coachmark"
        .hide=${args.hide}
        side=${ifDefined(args.side)}
        alignment=${ifDefined(args.alignment)}
        header=${ifDefined(args.header)}
        delay=${ifDefined(args.delay)}
        variant=${ifDefined(args.variant)}
        width=${ifDefined(args.width)}
      >
        This is an example Coach Mark
      </storybook-pharos-coach-mark>`,
  args: defaultArgs,
};
