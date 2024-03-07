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
  render: () =>
    html`
      <storybook-pharos-toggle-button-group>
        <storybook-pharos-toggle-button
          @click="${() => {
            document.querySelector('#list-view').style.display = 'block';
            document.querySelector('#gallery-view').style.display = 'none';
            document.querySelector('#presentation-view').style.display = 'none';
          }}"
          icon-left="view-list"
          id="view-list-button"
        >
          List </storybook-pharos-toggle-button
        ><storybook-pharos-toggle-button
          @click="${() => {
            document.querySelector('#list-view').style.display = 'none';
            document.querySelector('#gallery-view').style.display = 'block';
            document.querySelector('#presentation-view').style.display = 'none';
          }}"
          icon-left="view-gallery"
          id="view-gallery-button"
        >
          Gallery </storybook-pharos-toggle-button
        ><storybook-pharos-toggle-button
          @click="${() => {
            document.querySelector('#list-view').style.display = 'none';
            document.querySelector('#gallery-view').style.display = 'none';
            document.querySelector('#presentation-view').style.display = 'block';
          }}"
          icon-left="image"
          id="view-presentation-button"
        >
          Presentation
        </storybook-pharos-toggle-button>
      </storybook-pharos-toggle-button-group>
      <div id="list-view">List view</div>
      <div id="gallery-view" style="display: none">Gallery view</div>
      <div id="presentation-view" style="display: none">Presentation view</div>
    `,
};

export const Events = {
  render: () =>
    html`
      <storybook-pharos-toggle-button-group
        @pharos-toggle-button-selected="${(e) => action('Selected')(e.target.id)}"
      >
        <storybook-pharos-toggle-button id="list-mode-button" icon-left="view-list">
          List </storybook-pharos-toggle-button
        ><storybook-pharos-toggle-button id="gallery-mode-button" icon-left="view-gallery">
          Gallery
        </storybook-pharos-toggle-button>
      </storybook-pharos-toggle-button-group>
    `,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const IconsOnly = {
  render: () =>
    html`
      <storybook-pharos-toggle-button-group>
        <storybook-pharos-toggle-button
          icon="view-list"
          a11y-label="view list"
          id="view-list-button"
        ></storybook-pharos-toggle-button
        ><storybook-pharos-toggle-button
          icon="view-gallery"
          a11y-label="view gallery"
          id="view-gallery-button"
        ></storybook-pharos-toggle-button
        ><storybook-pharos-toggle-button
          icon="image"
          a11y-label="view presentation"
          id="view-presentation-button"
        ></storybook-pharos-toggle-button>
      </storybook-pharos-toggle-button-group>
    `,
};
