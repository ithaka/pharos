import { useEffect } from '@storybook/preview-api';
import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Toast',
  component: 'pharos-toast',
  subcomponents: { PharosToaster: 'pharos-toaster' },
  parameters: {
    docs: { page: configureDocsPage('toast') },
    options: { selectedPanel: 'addon-controls' },
    chromatic: { delay: 500 },
  },
};

export const Base = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        document.querySelector('#success-toast-button').click();
      });
    };
    effect();
    return html`
      <storybook-pharos-button
        id="success-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              content:
                'The item has moved to your <storybook-pharos-link href="#" is-on-background bold>Workspace</storybook-pharos-link>.',
              returnElements: [document.querySelector('#success-toast-button')],
            },
          });
          document.dispatchEvent(event);
        }}"
      >
        Have a toast!
      </storybook-pharos-button>
      <storybook-pharos-toaster></storybook-pharos-toaster>
    `;
  },
  parameters: { chromatic: { viewports: [320, 1200] } },
};

export const Error = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        document.querySelector('#error-toast-button').click();
      });
    };
    effect();
    return html`
      <storybook-pharos-button
        id="error-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              status: 'error',
              content:
                'Sorry, we were unable to move the item. Please try again later. If the issue persists, <storybook-pharos-link href="#" is-on-background bold>contact JSTOR Support</storybook-pharos-link>.',
              returnElements: [document.querySelector('#error-toast-button')],
            },
          });
          document.dispatchEvent(event);
        }}"
      >
        I have a bad feeling about this
      </storybook-pharos-button>
      <storybook-pharos-toaster></storybook-pharos-toaster>
    `;
  },
};

export const LongContent = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          document.querySelector('#long-toast-button').click();
        }, 300);
      });
    };
    effect();
    return html`
      <storybook-pharos-button
        id="long-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              content:
                'This is a notification for longer content, which may even include a <storybook-pharos-link href="#" is-on-background bold>link</storybook-pharos-link>.',
              returnElements: [document.querySelector('#long-toast-button')],
            },
          });
          document.dispatchEvent(event);
        }}"
      >
        Click to me see a long name
      </storybook-pharos-button>
      <storybook-pharos-toaster></storybook-pharos-toaster>
    `;
  },
  parameters: { chromatic: { viewports: [320, 1200] } },
};

export const Info = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        document.querySelector('#info-toast-button').click();
      });
    };
    effect();
    return html`
      <storybook-pharos-button
        id="info-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              status: 'info',
              content: 'We are working on your request.',
              returnElements: [document.querySelector('#info-toast-button')],
            },
          });
          document.dispatchEvent(event);
        }}"
      >
        Click me to know more
      </storybook-pharos-button>
      <storybook-pharos-toaster></storybook-pharos-toaster>
    `;
  },
};

export const UpdateableToast = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        document.querySelector('#info-toast-button').click();
      });
    };
    effect();
    return html`
      <storybook-pharos-button
        id="info-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              id: 'the-toast',
              status: 'info',
              content: 'Saving 15 items to your Workspace',
              indefinite: true,
              returnElements: [document.querySelector('#info-toast-button')],
            },
          });
          document.dispatchEvent(event);
          setTimeout(() => {
            const updateEvent = new CustomEvent('pharos-toast-update', {
              detail: {
                id: 'the-toast',
                status: 'success',
                content: '15 items successfully saved',
                returnElements: [document.querySelector('#info-toast-button')],
              },
            });
            document.dispatchEvent(updateEvent);
          }, '3000');
          setTimeout(() => {
            const updateEvent = new CustomEvent('pharos-toast-close', {
              detail: {
                id: 'the-toast',
              },
            });
            document.dispatchEvent(updateEvent);
          }, '6000');
        }}"
      >
        Save items to Workspace
      </storybook-pharos-button>
      <storybook-pharos-toaster></storybook-pharos-toaster>
    `;
  },
};
