import { html } from 'lit';

import { viewports, breakpoints } from '../../pages/shared/viewports';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Layout',
  component: 'pharos-layout',
  parameters: {
    docs: { page: configureDocsPage('layout') },
    chromatic: { viewports: breakpoints },
    viewport: {
      viewports,
    },
    layout: 'fullscreen',
  },
};

const _gridItems = (rows) => {
  const arr = [];
  rows.forEach((items) => {
    for (let i = 0; i < items; i++) {
      arr.push({ span: 12 / items, cols: items });
    }
  });
  return arr.map(
    (item) => html`<div class="layout-example__item" style="grid-column: span ${item.span}">
      ${item.cols}
    </div>`
  );
};

const _comboItems = (rows) => {
  const arr = [];
  rows.forEach((item) => {
    arr.push({ span: item, cols: item });
    arr.push({ span: 12 - item, cols: 12 - item });
  });
  return arr.map(
    (item) => html`<div class="layout-example__item" style="grid-column: span ${item.span}">
      Span ${item.cols}
    </div>`
  );
};

const _gridColumns = () => {
  const arr = [];
  for (let i = 1; i <= 12; i++) {
    arr.push(html`<div class="layout-example__column">${i}</div>`);
  }
  return arr;
};

export const OneColumn = {
  name: 'One column',
  render: () => html` <storybook-pharos-layout>${_gridColumns()}</storybook-pharos-layout> `,
};

export const OneColumnWithSidenav = {
  name: 'One column with sidenav',
  render: () =>
    html`
      <div
        style="display: grid; grid-template-areas: 'sidenav main'; grid-template-columns: max-content 1fr"
      >
        <storybook-pharos-sidenav style="grid-area: sidenav">
          <storybook-pharos-link slot="top" href="/" id="jstor-logo">
            <img src="./images/jstor-logo-inverse.svg" alt="Pharos Home" width="72" height="100" />
          </storybook-pharos-link>
        </storybook-pharos-sidenav>
        <main style="grid-area: main">
          <storybook-pharos-layout preset="1-col--sidenav"
            >${_gridColumns()}</storybook-pharos-layout
          >
        </main>
      </div>
    `,
};

export const OneColumnWithSidenavAndComfySpacing = {
  name: 'One column with sidenav and comfy spacing',
  render: () =>
    html`
      <div
        style="display: grid; grid-template-areas: 'sidenav main'; grid-template-columns: max-content 1fr"
      >
        <storybook-pharos-sidenav style="grid-area: sidenav">
          <storybook-pharos-link slot="top" href="/" id="jstor-logo">
            <img src="./images/jstor-logo-inverse.svg" alt="Pharos Home" width="72" height="100" />
          </storybook-pharos-link>
        </storybook-pharos-sidenav>
        <main style="grid-area: main">
          <storybook-pharos-layout preset="1-col--sidenav-comfy"
            >${_gridColumns()}</storybook-pharos-layout
          >
        </main>
      </div>
    `,
};

export const TwoColumn = {
  name: 'Two column',
  render: () =>
    html`
      <storybook-pharos-layout preset="2-col">
        <div class="layout-example__container--first"></div>
        <div class="layout-example__container--second"></div>
        <div class="layout-example__container--third"></div>
      </storybook-pharos-layout>
      <storybook-pharos-layout preset="2-col" style="position: absolute; top: 0; width: 100%"
        >${_gridColumns()}</storybook-pharos-layout
      >
    `,
};

export const ColumnLayouts = {
  name: 'Column layouts',
  render: () =>
    html`
      <storybook-pharos-layout style="margin: 1rem 0">
        ${_gridItems([1, 2, 3, 4, 6])} ${_comboItems([7, 8, 9, 10])}
      </storybook-pharos-layout>
    `,
};
