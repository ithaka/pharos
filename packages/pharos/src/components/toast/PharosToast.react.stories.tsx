import { useEffect } from 'react';

import { PharosToast, PharosToaster, PharosButton } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { PharosButton as PBType } from '../button/pharos-button';

const meta = {
  title: 'Components/Toast',
  component: PharosToast,
  subcomponents: { PharosToaster },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('toast') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => (
    <>
      <PharosButton
        id="success-toast-button"
        onClick={() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              content:
                'The item has moved to your <storybook-pharos-link href="#" is-on-background bold>Workspace</storybook-pharos-link>.',
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

export const Error: Story = {
  render: () => (
    <>
      <PharosButton
        id="error-toast-button"
        onClick={() => {
          const event = new CustomEvent('pharos-toast-open', {
            detail: {
              status: 'error',
              content:
                'Sorry, we were unable to move the item. Please try again later. If the issue persists, <storybook-pharos-link href="#" is-on-background bold>contact JSTOR Support</storybook-pharos-link>.',
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

export const LongContent: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        setTimeout(() => {
          const button = document.querySelector('#long-toast-button');
          if (button) {
            (button as PBType).click();
          }
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
                  'This is a notification for longer content, which may even include a <storybook-pharos-link href="#" is-on-background bold>link</storybook-pharos-link>.',
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

export const Info: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        const button = document.querySelector('#info-toast-button');
        if (button) {
          (button as PBType).click();
        }
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

export const UpdateableToast: Story = {
  render: () => {
    const effect = () => {
      useEffect(() => {
        const button = document.querySelector('#updateable-toast-button');
        if (button) {
          (button as PBType).click();
        }
      });
    };
    effect();
    return (
      <>
        <PharosButton
          id="updateable-toast-button"
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
            }, 3000);
            setTimeout(() => {
              const updateEvent = new CustomEvent('pharos-toast-close', {
                detail: {
                  id: 'the-toast',
                },
              });
              document.dispatchEvent(updateEvent);
            }, 6000);
          }}
        >
          Save items to Workspace
        </PharosButton>
        <PharosToaster></PharosToaster>
      </>
    );
  },
};
