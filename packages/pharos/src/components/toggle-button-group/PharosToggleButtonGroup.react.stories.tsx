import { action } from 'storybook/actions';

import { PharosToggleButtonGroup, PharosToggleButton } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { PharosToggleButtonGroup as PTBGType } from './pharos-toggle-button-group';

const meta = {
  title: 'Components/Toggle Button Group',
  component: PharosToggleButtonGroup,
  subcomponents: { PharosToggleButton },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('toggle-button-group') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => {
    const listView = document.querySelector('#list-view');
    const galleryView = document.querySelector('#gallery-view');
    const presentationView = document.querySelector('#presentation-view');

    return (
      <>
        <PharosToggleButtonGroup>
          <PharosToggleButton
            onClick={() => {
              if (listView) (listView as HTMLElement).style.display = 'block';
              if (galleryView) (galleryView as HTMLElement).style.display = 'none';
              if (presentationView) (presentationView as HTMLElement).style.display = 'none';
            }}
            id="view-list-button"
            icon-left="view-list"
          >
            List
          </PharosToggleButton>
          <PharosToggleButton
            onClick={() => {
              if (listView) (listView as HTMLElement).style.display = 'none';
              if (galleryView) (galleryView as HTMLElement).style.display = 'block';
              if (presentationView) (presentationView as HTMLElement).style.display = 'none';
            }}
            id="view-gallery-button"
            icon-left="view-gallery"
          >
            Gallery
          </PharosToggleButton>
          <PharosToggleButton
            onClick={() => {
              if (listView) (listView as HTMLElement).style.display = 'none';
              if (galleryView) (galleryView as HTMLElement).style.display = 'none';
              if (presentationView) (presentationView as HTMLElement).style.display = 'block';
            }}
            id="view-presentation-button"
            icon-left="image"
          >
            Presentation
          </PharosToggleButton>
        </PharosToggleButtonGroup>
        <div id="list-view">List view</div>
        <div id="gallery-view" style={{ display: 'none' }}>
          Gallery view
        </div>
        <div id="presentation-view" style={{ display: 'none' }}>
          Presentation view
        </div>
      </>
    );
  },
};

export const Events: Story = {
  render: () => (
    <PharosToggleButtonGroup
      onPharos-Toggle-Button-Selected={(e: CustomEvent) =>
        action('Select')((e.target as PTBGType).id)
      }
    >
      <PharosToggleButton id="list-mode-button" selected icon-left="view-list">
        List
      </PharosToggleButton>
      <PharosToggleButton id="gallery-mode-button" icon-left="view-gallery">
        Gallery
      </PharosToggleButton>
    </PharosToggleButtonGroup>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const IconsOnly: Story = {
  render: () => (
    <PharosToggleButtonGroup>
      <PharosToggleButton icon="view-list" a11yLabel="view list" id="view-list-button">
        List
      </PharosToggleButton>
      <PharosToggleButton icon="view-gallery" a11yLabel="view gallery" id="view-gallery-button">
        Gallery
      </PharosToggleButton>
      <PharosToggleButton icon="image" a11yLabel="view presentation" id="view-presentation-button">
        Presentation
      </PharosToggleButton>
    </PharosToggleButtonGroup>
  ),
};
