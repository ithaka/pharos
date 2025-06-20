import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';

import { argTypes, defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { PharosModal } from './pharos-modal';
import type { PharosButton } from '../button/pharos-button';

const meta = {
  title: 'Components/Modal',
  component: 'pharos-modal',
  parameters: {
    docs: { page: configureDocsPage('modal') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="my-base-modal"
      @click="${(e: MouseEvent) => {
        (e.target as PharosButton).focus();
      }}"
    >
      Open modal
    </storybook-pharos-button>
    <storybook-pharos-modal
      id="my-base-modal"
      .footer-divider=${ifDefined(args.footerDivider)}
      header=${ifDefined(args.header)}
      .open=${ifDefined(args.open)}
      size=${ifDefined(args.size)}
    >
      <p>I am a modal</p>
      <storybook-pharos-button slot="footer" type="button" variant="secondary" data-modal-close>
        Cancel
      </storybook-pharos-button>
      <storybook-pharos-button
        slot="footer"
        type="button"
        @click="${() => {
          const modal = document.querySelector('pharos-modal');
          if (modal) { (modal as PharosModal).open = false; }
        }}"
      >
        Ok
      </storybook-pharos-button>
    </storybook-pharos-modal>
  `,
  args: defaultArgs,
};

export const NoFooter: Story = {
  render: () => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="no-footer-modal"
      @click="${(e: MouseEvent) => {
        (e.target as PharosButton).focus();
        const modal = document.querySelector('pharos-modal');
        if (modal) { (modal as PharosModal).open = true; }
      }}"
    >
      Open modal
    </storybook-pharos-button>
    <storybook-pharos-modal id="no-footer-modal" header="Pharos modal" size="medium">
      <p>I am a modal</p>
    </storybook-pharos-modal>
  `,
};

export const Events: Story = {
  render: () => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="my-event-modal"
      @click="${(e: MouseEvent) => {
        (e.target as PharosButton).focus();
      }}"
    >
      Open modal
    </storybook-pharos-button>
    <storybook-pharos-modal
      id="my-event-modal"
      header="Event modal"
      @pharos-modal-open="${(e: CustomEvent) => action('Open')(e.detail)}"
      @pharos-modal-opened="${(e: CustomEvent) => action('Opened')(e.detail)}"
      @pharos-modal-close="${(e: CustomEvent) => action('Close')(e.detail)}"
      @pharos-modal-closed="${(e: CustomEvent) => action('Closed')(e.detail)}"
    >
      <p slot="description">Description for the modal</p>
      <storybook-pharos-text-input style="margin-bottom: 1rem" data-modal-focus>
        <span slot="label">Name</span>
      </storybook-pharos-text-input>
      <storybook-pharos-text-input style="margin-bottom: 1rem">
        <span slot="label">User ID</span>
      </storybook-pharos-text-input>
      <storybook-pharos-text-input style="margin-bottom: 1rem">
        <span slot="label">Favorite Color</span>
      </storybook-pharos-text-input>
      <storybook-pharos-button slot="footer" type="button" variant="secondary" data-modal-close>
        Cancel
      </storybook-pharos-button>
      <storybook-pharos-button slot="footer" type="button">Submit</storybook-pharos-button>
    </storybook-pharos-modal>
  `,
  parameters: { selectedPanel: 'storybook/actions/panel' },
};

export const Composition: Story = {
  render: () => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="my-alert-modal"
      @click="${(e: MouseEvent) => {
        (e.target as PharosButton).focus();
      }}"
    >
      Open modal
    </storybook-pharos-button>
    <storybook-pharos-modal id="my-alert-modal" header="Add external link">
      <div>
        <storybook-pharos-alert style="margin-bottom: 1rem" status="error"
          >We're sorry, we experienced an issue submitting your report. Please try again. If the
          issue persists, contact
          <storybook-pharos-link id="support-link" href="#">support@jstor.org</storybook-pharos-link
          >.
        </storybook-pharos-alert>
        <storybook-pharos-text-input name="link" required style="margin-bottom: 1rem">
          <span slot="label">Link</span>
        </storybook-pharos-text-input>
        <storybook-pharos-text-input name="text" required style="margin-bottom: 1rem">
          <span slot="label">Text</span>
        </storybook-pharos-text-input>
      </div>
      <storybook-pharos-button
        id="cancel-button"
        slot="footer"
        type="button"
        variant="secondary"
        data-modal-close
      >
        Cancel
      </storybook-pharos-button>
      <storybook-pharos-button id="add-button" slot="footer" type="button"
        >Add</storybook-pharos-button
      >
    </storybook-pharos-modal>
  `,
  parameters: { chromatic: { viewports: [320, 1200] } },
};
