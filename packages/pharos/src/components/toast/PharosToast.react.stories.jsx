import { useEffect } from 'react';

import { PharosToast, PharosToaster, PharosButton } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Toast',
  component: PharosToast,
  subcomponents: { PharosToaster },
  parameters: {
    docs: { page: configureDocsPage('toast') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: () => (
    <>
      <PharosButton
        id="success-toast-button"
        onClick={() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              content:
                'The item has moved to your <pharos-link href="#" on-background bold>Workspace</pharos-link>.',
            },
          });
          document.dispatchEvent(event);
        }}
      >
        Have a toast!
      </PharosButton>
      <PharosToaster></PharosToaster>
    </>
  ),
};

export const Error = {
  render: () => (
    <>
      <PharosButton
        id="error-toast-button"
        onClick={() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              status: 'error',
              content:
                'Sorry, we were unable to move the item. Please try again later. If the issue persists, <pharos-link href="#" on-background bold>contact JSTOR Support</pharos-link>.',
            },
          });
          document.dispatchEvent(event);
        }}
      >
        Have a toast!
      </PharosButton>
      <PharosToaster></PharosToaster>
    </>
  ),
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
    return (
      <>
        <PharosButton
          id="long-toast-button"
          onClick={() => {
            const event = new CustomEvent('pharos-toast-open', {
              detail: {
                content:
                  'This is a notification for longer content, which may even include a <pharos-link href="#" on-background bold>link</pharos-link>.',
              },
            });
            document.dispatchEvent(event);
          }}
        >
          Click to me see a long name
        </PharosButton>
        <PharosToaster></PharosToaster>
      </>
    );
  },
};

export const Info = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        document.querySelector('#info-toast-button').click();
      });
    };
    effect();
    return (
      <>
        <PharosButton
          id="info-toast-button"
          onClick={() => {
            const event = new CustomEvent('pharos-toast-open', {
              detail: {
                status: 'info',
                content: 'We are working on your request.',
              },
            });
            document.dispatchEvent(event);
          }}
        >
          Click me to know more
        </PharosButton>
        <PharosToaster></PharosToaster>
      </>
    );
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
    return (
      <>
        <PharosButton
          id="info-toast-button"
          onClick={() => {
            const event = new CustomEvent('pharos-toast-open', {
              detail: {
                id: 'the-toast',
                status: 'info',
                content: 'Saving 15 items to your Workspace',
                indefinite: true,
              },
            });
            document.dispatchEvent(event);
            setTimeout(() => {
              const updateEvent = new CustomEvent('pharos-toast-update', {
                detail: {
                  id: 'the-toast',
                  status: 'success',
                  content: '15 items successfully saved',
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
          }}
        >
          Save items to Workspace
        </PharosButton>
        <PharosToaster></PharosToaster>
      </>
    );
  },
};
