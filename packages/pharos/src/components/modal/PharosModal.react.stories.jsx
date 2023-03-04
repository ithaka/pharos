import { action } from '@storybook/addon-actions';
import { Fragment } from 'react';

import {
  PharosModal,
  PharosTextInput,
  PharosAlert,
  PharosLink,
  PharosButton,
} from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Modal',
  component: PharosModal,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('modal') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => (
    <Fragment>
      <PharosButton
        onClick={(e) => {
          e.target.focus();
          const modal = document.querySelector('pharos-modal');
          modal.open = true;
        }}
      >
        Open modal
      </PharosButton>
      <PharosModal
        footerDivider={args.footerDivider}
        header={args.header}
        open={args.open}
        size={args.size}
      >
        <p>I am a modal</p>
        <PharosButton slot="footer" type="button" variant="secondary" data-modal-close>
          Cancel
        </PharosButton>
        <PharosButton slot="footer" type="button">
          Ok
        </PharosButton>
      </PharosModal>
    </Fragment>
  ),
  args: defaultArgs,
};

export const NoFooter = {
  render: () => (
    <Fragment>
      <PharosButton
        type="button"
        data-modal-id="my-event-modal"
        onClick={(e) => {
          e.target.focus();
        }}
      >
        Open modal
      </PharosButton>
      <PharosModal id="my-event-modal" header="Pharos modal" size="medium">
        <p>I am a modal</p>
      </PharosModal>
    </Fragment>
  ),
};

export const Events = {
  render: () => (
    <Fragment>
      <PharosButton
        type="button"
        data-modal-id="my-event-modal"
        onClick={(e) => {
          e.target.focus();
        }}
      >
        Open modal
      </PharosButton>
      <PharosModal
        id="my-event-modal"
        header="Event modal"
        open
        onPharos-Modal-Open={(e) => action('Open')(e.detail)}
        onPharos-Modal-Opened={(e) => action('Opened')(e.detail)}
        onPharos-Modal-Close={(e) => action('Close')(e.detail)}
        onPharos-Modal-Closed={(e) => action('Closed')(e.detail)}
      >
        <p slot="description">Description for the modal</p>
        <PharosTextInput style={{ marginBottom: '1rem' }} data-modal-focus>
          <span slot="label">Name</span>
        </PharosTextInput>
        <PharosTextInput style={{ marginBottom: '1rem' }}>
          <span slot="label">User ID</span>
        </PharosTextInput>
        <PharosTextInput style={{ marginBottom: '1rem' }}>
          <span slot="label">Favorite Color</span>
        </PharosTextInput>
        <PharosButton slot="footer" type="button" variant="secondary" data-modal-close>
          Cancel
        </PharosButton>
        <PharosButton slot="footer" type="button">
          Submit
        </PharosButton>
      </PharosModal>
    </Fragment>
  ),
  parameters: { selectedPanel: 'addon-actions' },
};

export const Composition = {
  render: () => (
    <Fragment>
      <PharosButton
        type="button"
        data-modal-id="my-alert-modal"
        onClick={(e) => {
          e.target.focus();
        }}
      >
        Open modal
      </PharosButton>
      <PharosModal id="my-alert-modal" header="Add external link" open>
        <div style={{ maxWidth: '36rem' }}>
          <PharosAlert status="error">
            We&apos;re sorry, we experienced an issue submitting your report. Please try again. If
            the issue persists, contact
            <PharosLink id="support-link" href="#">
              support@jstor.org
            </PharosLink>
            .
          </PharosAlert>
          <PharosTextInput name="link" required style={{ marginBottom: '1rem' }}>
            <span slot="label">Link</span>
          </PharosTextInput>
          <PharosTextInput name="text" required style={{ marginBottom: '1rem' }}>
            <span slot="label">Text</span>
          </PharosTextInput>
          <PharosButton
            id="cancel-button"
            slot="footer"
            type="button"
            variant="secondary"
            data-modal-close
          >
            Cancel
          </PharosButton>
          <PharosButton id="add-button" slot="footer" type="button">
            Add
          </PharosButton>
        </div>
      </PharosModal>
    </Fragment>
  ),
};
