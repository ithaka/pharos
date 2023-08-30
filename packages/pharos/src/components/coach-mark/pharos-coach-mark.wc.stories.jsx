import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { argTypes, defaultArgs } from './storyArgs';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/CoachMark',
  component: 'pharos-coach-mark',
  parameters: {
    docs: {
      page: configureDocsPage('coach-mark'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) =>
    html` <div
        style="border:1px solid #eae8e1;padding:20px;margin:200px auto;width:fit-content"
        data-coach-mark="example-coachmark"
      >
        Lorem Ipsum
      </div>
      <storybook-pharos-coach-mark
        id="example-coachmark"
        ?hide=${ifDefined(args.hide)}
        side=${ifDefined(args.side)}
        alignment=${ifDefined(args.alignment)}
        header=${ifDefined(args.header)}
        delay=${ifDefined(args.delay)}
      >
        This is an example Coach Mark
      </storybook-pharos-coach-mark>`,
  args: defaultArgs,
};
