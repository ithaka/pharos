import { useEffect } from '@storybook/client-api';
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
      <pharos-button
        id="success-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              content:
                'The item has moved to your <pharos-link href="#" on-background bold>Workspace</pharos-link>.',
              returnElements: [document.querySelector('#success-toast-button')],
            },
          });
          document.dispatchEvent(event);
        }}"
      >
        Have a toast!
      </pharos-button>
      <pharos-toaster></pharos-toaster>
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
      <pharos-button
        id="error-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              status: 'error',
              content:
                'Sorry, we were unable to move the item. Please try again later. If the issue persists, <pharos-link href="#" on-background bold>contact JSTOR Support</pharos-link>.',
              returnElements: [document.querySelector('#error-toast-button')],
            },
          });
          document.dispatchEvent(event);
        }}"
      >
        I have a bad feeling about this
      </pharos-button>
      <pharos-toaster></pharos-toaster>
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
      <pharos-button
        id="long-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              content:
                'This is a notification for longer content, which may even include a <pharos-link href="#" on-background bold>link</pharos-link>.',
              returnElements: [document.querySelector('#long-toast-button')],
            },
          });
          document.dispatchEvent(event);
        }}"
      >
        Click to me see a long name
      </pharos-button>
      <pharos-toaster></pharos-toaster>
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
      <pharos-button
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
      </pharos-button>
      <pharos-toaster></pharos-toaster>
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
      <pharos-button
        id="info-toast-button"
        @click="${() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
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
                status: 'success',
                content: '15 items succsessfully saved',
                returnElements: [document.querySelector('#info-toast-button')],
              },
            });
            document.dispatchEvent(updateEvent);
          }, '3000');
          setTimeout(() => {
            const updateEvent = new CustomEvent('pharos-toast-close', {});
            document.dispatchEvent(updateEvent);
          }, '6000');
        }}"
      >
        Save items to Workspace
      </pharos-button>
      <pharos-toaster></pharos-toaster>
    `;
  },
};
