import { action } from 'storybook/actions';
import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { PharosToggleButtonGroup } from './pharos-toggle-button-group';

const meta = {
  title: 'Components/Toggle Button Group',
  component: 'pharos-toggle-button-group',
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

    return html`
      <storybook-pharos-toggle-button-group>
        <storybook-pharos-toggle-button
          @click="${() => {
            if (listView) (listView as HTMLElement).style.display = 'block';
            if (galleryView) (galleryView as HTMLElement).style.display = 'none';
            if (presentationView) (presentationView as HTMLElement).style.display = 'none';
          }}"
          icon-left="view-list"
          id="view-list-button"
        >
          List </storybook-pharos-toggle-button
        ><storybook-pharos-toggle-button
          @click="${() => {
            if (listView) (listView as HTMLElement).style.display = 'none';
            if (galleryView) (galleryView as HTMLElement).style.display = 'block';
            if (presentationView) (presentationView as HTMLElement).style.display = 'none';
          }}"
          icon-left="view-gallery"
          id="view-gallery-button"
        >
          Gallery </storybook-pharos-toggle-button
        ><storybook-pharos-toggle-button
          @click="${() => {
            if (listView) (listView as HTMLElement).style.display = 'none';
            if (galleryView) (galleryView as HTMLElement).style.display = 'none';
            if (presentationView) (presentationView as HTMLElement).style.display = 'block';
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
    `;
  },
};

export const Events: Story = {
  render: () => html`
    <storybook-pharos-toggle-button-group
      @pharos-toggle-button-selected="${(e: CustomEvent) =>
        action('Selected')((e.target as PharosToggleButtonGroup).id)}"
    >
      <storybook-pharos-toggle-button id="list-mode-button" icon-left="view-list">
        List </storybook-pharos-toggle-button
      ><storybook-pharos-toggle-button id="gallery-mode-button" icon-left="view-gallery">
        Gallery
      </storybook-pharos-toggle-button>
    </storybook-pharos-toggle-button-group>
  `,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const IconsOnly: Story = {
  render: () => html`
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
