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
  render: (_) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
        <pharos-input-group name="my-input-group">
          <span slot="label">Search</span>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
      </div>
    `,
};

export const Prominent = {
  render: (_) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
        <pharos-input-group name="my-input-group" variant="prominent">
          <span slot="label">Basic</span>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
        <pharos-input-group name="my-input-group" variant="prominent" invalidated>
          <span slot="label">invalidated</span>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
        <pharos-input-group name="prominent-prepend" variant="prominent">
          <pharos-button
            name="book-button"
            slot="prepend"
            icon="book"
            variant="subtle"
            label="book"
          ></pharos-button>
          <span slot="label">prominent Prepend</span>
        </pharos-input-group>
        <pharos-input-group name="prominent-buttons" variant="prominent">
          <pharos-button
            name="book-button"
            slot="prepend"
            icon="book"
            variant="subtle"
            label="book"
          ></pharos-button>
          <span slot="label">Multiple buttons</span>
          <pharos-button
            name="close-button"
            icon="close"
            variant="subtle"
            label="close"
          ></pharos-button>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
      </div>
    `,
};

export const Validity = {
  render: (_) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
        <pharos-input-group invalidated value="not an email" name="my-input-group">
          <span slot="label">Email</span>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
        <pharos-input-group validated value="here@there.com" name="my-input-group">
          <span slot="label">Email</span>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
      </div>
    `,
};

export const Composition = {
  render: (_) =>
    html`
      <div style="display: grid; grid-gap: 1rem; grid-template-columns: 524px;">
        <pharos-input-group name="my-input-group-icon">
          <span slot="label">With icons</span>
          <pharos-icon id="calendar" name="calendar"></pharos-icon>
        </pharos-input-group>
        <pharos-input-group name="my-input-group-buttons">
          <span slot="label">Multiple buttons</span>
          <pharos-button
            name="close-button"
            icon="close"
            variant="subtle"
            label="close"
          ></pharos-button>
          <pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
        <pharos-input-group name="my-input-group-select">
          <span slot="label">With select</span>
          <pharos-input-group-select name="my-group-select" hide-label>
            <span slot="label">Search</span>
            <option value="">Search all content</option>
            <option value="book">Search within this book</option>
          </pharos-input-group-select>
          <pharos-button
            name="search-with-select-button"
            icon="search"
            variant="subtle"
            label="search"
          ></pharos-button>
        </pharos-input-group>
        <pharos-input-group name="my-input-group-prepend">
          <pharos-button
            name="book-button"
            slot="prepend"
            icon="book"
            variant="subtle"
            label="book"
          ></pharos-button>
          <span slot="label">Prepend</span>
        </pharos-input-group>
      </div>
    `,
};
