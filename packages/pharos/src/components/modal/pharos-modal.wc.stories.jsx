import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';

import { argTypes, defaultArgs } from './storyArgs';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Modal',
  component: 'pharos-modal',
  parameters: {
    docs: { page: configureDocsPage('modal') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="my-base-modal"
      @click="${(e) => {
        e.target.focus();
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
          modal.open = false;
        }}"
      >
        Ok
      </storybook-pharos-button>
    </storybook-pharos-modal>
  `,
  args: defaultArgs,
};

export const NoFooter = {
  render: () => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="no-footer-modal"
      @click="${(e) => {
        e.target.focus();
        const modal = document.querySelector('pharos-modal');
        modal.open = true;
      }}"
    >
      Open modal
    </storybook-pharos-button>
    <storybook-pharos-modal id="no-footer-modal" header="Pharos modal" size="medium">
      <p>I am a modal</p>
    </storybook-pharos-modal>
  `,
};

export const Events = {
  render: () => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="my-event-modal"
      @click="${(e) => {
        e.target.focus();
      }}"
    >
      Open modal
    </storybook-pharos-button>
    <storybook-pharos-modal
      id="my-event-modal"
      header="Event modal"
      open
      @pharos-modal-open="${(e) => action('Open')(e.detail)}"
      @pharos-modal-opened="${(e) => action('Opened')(e.detail)}"
      @pharos-modal-close="${(e) => action('Close')(e.detail)}"
      @pharos-modal-closed="${(e) => action('Closed')(e.detail)}"
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
  parameters: { selectedPanel: 'addon-actions' },
};

export const Composition = {
  render: () => html`
    <storybook-pharos-button
      type="button"
      data-modal-id="my-alert-modal"
      @click="${(e) => {
        e.target.focus();
      }}"
    >
      Open modal
    </storybook-pharos-button>
    <storybook-pharos-modal id="my-alert-modal" header="Add external link" open>
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
