import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Pagination',
  component: 'pharos-pagination',
  parameters: {
    docs: { page: configureDocsPage('pagination') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-pagination
      total-results=${ifDefined(args.totalResults)}
      page-size=${ifDefined(args.pageSize)}
      current-page=${ifDefined(args.currentPage)}
      variant=${ifDefined(args.variant)}
      @first-page="${(e: CustomEvent) => action('First Page')(JSON.stringify(e))}"
      @prev-page="${(e: CustomEvent) => action('Prev Page')(JSON.stringify(e))}"
      @next-page="${(e: CustomEvent) => action('Next Page')(JSON.stringify(e))}"
      @last-page="${(e: CustomEvent) => action('Last Page')(JSON.stringify(e))}"
    ></storybook-pharos-pagination>
  `,
  args: defaultArgs,
};

export const Events: Story = {
  ...Base,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Input: Story = {
  render: (args) => html`
    <storybook-pharos-pagination
      total-results=${ifDefined(args.totalResults)}
      page-size=${ifDefined(args.pageSize)}
      current-page=${ifDefined(args.currentPage)}
      variant=${ifDefined(args.variant)}
      @first-page="${(e: CustomEvent) => action('First Page')(JSON.stringify(e))}"
      @prev-page="${(e: CustomEvent) => action('Prev Page')(JSON.stringify(e))}"
      @next-page="${(e: CustomEvent) => action('Next Page')(JSON.stringify(e))}"
      @last-page="${(e: CustomEvent) => action('Last Page')(JSON.stringify(e))}"
      @page-input="${(e: CustomEvent) => action('Page Input')(JSON.stringify(e.detail))}"
    ></storybook-pharos-pagination>
  `,
  args: { ...defaultArgs, variant: 'input' },
};
