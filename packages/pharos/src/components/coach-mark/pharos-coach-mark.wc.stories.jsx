import { html } from 'lit';

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
        ?hide=${false}
        side="bottom"
        alignment="start"
        header="Example Coach Mark"
      >
        This is an example Coach Mark
      </storybook-pharos-coach-mark>`,
  args: {},
};

export const Positioned = {
  render: (args) =>
    html` <div
        style="border:1px solid #eae8e1;padding:20px;margin:200px auto;width:fit-content"
        data-coach-mark="example-coachmark-1"
      >
        Lorem Ipsum
      </div>
      <storybook-pharos-coach-mark
        id="example-coachmark-1"
        ?hide=${false}
        side="right"
        alignment="center"
      ></storybook-pharos-coach-mark>`,
  args: {},
};

export const Aligned = {
  render: (args) =>
    html` <div
        style="border:1px solid #eae8e1;padding:20px;margin:200px auto;width:fit-content"
        data-coach-mark="example-coachmark-2"
      >
        Lorem Ipsum
      </div>
      <storybook-pharos-coach-mark
        id="example-coachmark-2"
        ?hide=${false}
        side="bottom"
        alignment="start"
      ></storybook-pharos-coach-mark>`,
  args: {},
};

export const Hidden = {
  render: (args) =>
    html` <div
        style="border:1px solid #eae8e1;padding:20px;margin:200px auto;width:fit-content"
        data-coach-mark="example-coachmark-3"
      >
        Lorem Ipsum
      </div>
      <storybook-pharos-coach-mark
        id="example-coachmark-3"
        ?hide=${true}
        side="bottom"
        alignment="center"
      ></storybook-pharos-coach-mark>`,
  args: {},
};
