import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Forms/Input Group',
  component: 'pharos-input-group',
  subcomponents: { PharosInputGroupSelect: 'pharos-input-group-select' },
  parameters: {
    docs: { page: configureDocsPage('input-group') },
  },
};

export const Base = {
  render: () => html`
    <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
      <storybook-pharos-input-group name="my-input-group">
        <span slot="label">Search</span>
        <storybook-pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
    </div>
  `,
};

export const Prominent = {
  render: () => html`
    <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
      <storybook-pharos-input-group name="my-input-group" variant="prominent">
        <span slot="label">Basic</span>
        <storybook-pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
      <storybook-pharos-input-group name="my-input-group" variant="prominent" invalidated>
        <span slot="label">invalidated</span>
        <storybook-pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
      <storybook-pharos-input-group name="prominent-prepend" variant="prominent">
        <storybook-pharos-button
          name="book-button"
          slot="prepend"
          icon="book"
          variant="subtle"
          a11y-label="book"
        ></storybook-pharos-button>
        <span slot="label">prominent Prepend</span>
      </storybook-pharos-input-group>
      <storybook-pharos-input-group name="prominent-buttons" variant="prominent">
        <storybook-pharos-button
          name="book-button"
          slot="prepend"
          icon="book"
          variant="subtle"
          a11y-label="book"
        ></storybook-pharos-button>
        <span slot="label">Multiple buttons</span>
        <storybook-pharos-button
          name="close-button"
          icon="close"
          variant="subtle"
          a11y-label="close"
        ></storybook-pharos-button>
        <storybook-pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
    </div>
  `,
};

export const Validity = {
  render: () => html`
    <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
      <storybook-pharos-input-group invalidated value="not an email" name="my-input-group">
        <span slot="label">Email</span>
        <storybook-pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
      <storybook-pharos-input-group validated value="here@there.com" name="my-input-group">
        <span slot="label">Email</span>
        <storybook-pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
    </div>
  `,
};

export const Composition = {
  render: () => html`
    <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
      <storybook-pharos-input-group name="my-input-group-icon">
        <span slot="label">With icons</span>
        <storybook-pharos-icon
          id="calendar"
          name="calendar"
          a11y-hidden="true"
        ></storybook-pharos-icon>
      </storybook-pharos-input-group>
      <storybook-pharos-input-group name="my-input-group-buttons">
        <span slot="label">Multiple buttons</span>
        <storybook-pharos-button
          name="close-button"
          icon="close"
          variant="subtle"
          a11y-label="close"
        ></storybook-pharos-button>
        <storybook-pharos-button
          name="search-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
      <storybook-pharos-input-group name="my-input-group-select">
        <span slot="label">With select</span>
        <storybook-pharos-input-group-select name="my-group-select" hide-label>
          <span slot="label">Search</span>
          <option value="">Search all content</option>
          <option value="book">Search within this book</option>
        </storybook-pharos-input-group-select>
        <storybook-pharos-button
          name="search-with-select-button"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></storybook-pharos-button>
      </storybook-pharos-input-group>
      <storybook-pharos-input-group name="my-input-group-prepend">
        <storybook-pharos-button
          name="book-button"
          slot="prepend"
          icon="book"
          variant="subtle"
          a11y-label="book"
        ></storybook-pharos-button>
        <span slot="label">Prepend</span>
      </storybook-pharos-input-group>
    </div>
  `,
};
