import { action } from '@storybook/addon-actions';
import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Toggle Button Group',
  component: 'pharos-toggle-button-group',
  subcomponents: { PharosToggleButton: 'pharos-toggle-button' },
  parameters: {
    docs: { page: configureDocsPage('toggle-button-group') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (_) =>
    html`
      <pharos-toggle-button-group>
        <pharos-toggle-button
          @click="${() => {
            document.querySelector('#list-view').style.display = 'block';
            document.querySelector('#gallery-view').style.display = 'none';
            document.querySelector('#presentation-view').style.display = 'none';
          }}"
          icon-left="view-list"
          id="view-list-button"
        >
          List </pharos-toggle-button
        ><pharos-toggle-button
          @click="${() => {
            document.querySelector('#list-view').style.display = 'none';
            document.querySelector('#gallery-view').style.display = 'block';
            document.querySelector('#presentation-view').style.display = 'none';
          }}"
          icon-left="view-gallery"
          id="view-gallery-button"
        >
          Gallery </pharos-toggle-button
        ><pharos-toggle-button
          @click="${() => {
            document.querySelector('#list-view').style.display = 'none';
            document.querySelector('#gallery-view').style.display = 'none';
            document.querySelector('#presentation-view').style.display = 'block';
          }}"
          icon-left="image"
          id="view-presentation-button"
        >
          Presentation
        </pharos-toggle-button>
      </pharos-toggle-button-group>
      <div id="list-view">List view</div>
      <div id="gallery-view" style="display: none">Gallery view</div>
      <div id="presentation-view" style="display: none">Presentation view</div>
    `,
};

export const Events = {
  render: (_) =>
    html`
      <pharos-toggle-button-group
        @pharos-toggle-button-selected="${(e) => action('Selected')(e.target.id)}"
      >
        <pharos-toggle-button id="list-mode-button" icon-left="view-list">
          List </pharos-toggle-button
        ><pharos-toggle-button id="gallery-mode-button" icon-left="view-gallery">
          Gallery
        </pharos-toggle-button>
      </pharos-toggle-button-group>
    `,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const IconsOnly = {
  render: (_) =>
    html`
      <pharos-toggle-button-group>
        <pharos-toggle-button icon="view-list" id="view-list-button"></pharos-toggle-button
        ><pharos-toggle-button icon="view-gallery" id="view-gallery-button"></pharos-toggle-button
        ><pharos-toggle-button icon="image" id="view-presentation-button"></pharos-toggle-button>
      </pharos-toggle-button-group>
    `,
};
