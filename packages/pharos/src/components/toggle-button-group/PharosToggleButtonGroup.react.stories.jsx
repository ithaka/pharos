import { action } from '@storybook/addon-actions';

import { PharosToggleButtonGroup } from '../../react-components/toggle-button-group/pharos-toggle-button-group';
import { PharosToggleButton } from '../../react-components/toggle-button-group/pharos-toggle-button';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Toggle Button Grou',
  component: PharosToggleButtonGroup,
  subcomponents: { PharosToggleButton },
  parameters: {
    docs: { page: configureDocsPage('toggle-button-group') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (_) => (
    <>
      <PharosToggleButtonGroup>
        <PharosToggleButton
          onClick={() => {
            document.querySelector('#list-view').style.display = 'block';
            document.querySelector('#gallery-view').style.display = 'none';
            document.querySelector('#presentation-view').style.display = 'none';
          }}
          id="view-list-button"
          icon-left="view-list"
        >
          List
        </PharosToggleButton>
        <PharosToggleButton
          onClick={() => {
            document.querySelector('#list-view').style.display = 'none';
            document.querySelector('#gallery-view').style.display = 'block';
            document.querySelector('#presentation-view').style.display = 'none';
          }}
          id="view-gallery-button"
          icon-left="view-gallery"
        >
          Gallery
        </PharosToggleButton>
        <PharosToggleButton
          onClick={() => {
            document.querySelector('#list-view').style.display = 'none';
            document.querySelector('#gallery-view').style.display = 'none';
            document.querySelector('#presentation-view').style.display = 'block';
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
  ),
};

export const Events = {
  render: (_) => (
    <PharosToggleButtonGroup onPharos-Toggle-Button-Selected={(e) => action('Select')(e.target.id)}>
      <PharosToggleButton id="list-mode-button" selected icon-left="view-list">
        List
      </PharosToggleButton>
      <PharosToggleButton id="gallery-mode-button" icon-left="view-gallery">
        Gallery
      </PharosToggleButton>
    </PharosToggleButtonGroup>
  ),
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const IconsOnly = {
  render: (_) => (
    <PharosToggleButtonGroup>
      <PharosToggleButton icon="view-list" id="view-list-button">
        List
      </PharosToggleButton>
      <PharosToggleButton icon="view-gallery" id="view-gallery-button">
        Gallery
      </PharosToggleButton>
      <PharosToggleButton icon="image" id="view-presentation-button">
        Presentation
      </PharosToggleButton>
    </PharosToggleButtonGroup>
  ),
};
