import { Fragment } from 'react';
import { viewports } from '../../pages/shared/viewports';

import { PharosLayout, PharosSidenav, PharosLink } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import logo from '../../utils/_storybook/assets/images/jstor-logo-inverse.svg';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Layout',
  component: PharosLayout,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('layout') },
    viewport: {
      viewports,
    },
    layout: 'fullscreen',
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

interface _LayoutSpec {
  span: number;
  cols: number;
}

const _gridItems = (rows: number[]) => {
  const arr: _LayoutSpec[] = [];
  rows.forEach((items) => {
    for (let i = 0; i < items; i++) {
      arr.push({ span: 12 / items, cols: items });
    }
  });
  return arr.map((item, index) => (
    <div key={index} className="layout-example__item" style={{ gridColumn: `span ${item.span}` }}>
      {item.cols}
    </div>
  ));
};

const _comboItems = (rows: number[]) => {
  const arr: _LayoutSpec[] = [];
  rows.forEach((item) => {
    arr.push({ span: item, cols: item });
    arr.push({ span: 12 - item, cols: 12 - item });
  });
  return arr.map((item, index) => (
    <div key={index} className="layout-example__item" style={{ gridColumn: `span ${item.span}` }}>
      Span {item.cols}
    </div>
  ));
};

const _gridColumns = () => {
  const arr = [];
  for (let i = 1; i <= 12; i++) {
    arr.push(<div className="layout-example__column">{i}</div>);
  }
  return arr;
};

export const OneColumn: Story = {
  name: 'One column',
  render: () => <PharosLayout>{_gridColumns()}</PharosLayout>,
};

export const OneColumnWithSidenav = {
  name: 'One column with sidenav',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: "'sidenav main'",
        gridTemplateColumns: 'max-content 1fr',
      }}
    >
      <PharosSidenav open={true} style={{ gridArea: 'sidenav' }}>
        <PharosLink slot="top" href="/" id="jstor-logo">
          <img src={logo} alt="Pharos Home" width="72" height="100" />
        </PharosLink>
      </PharosSidenav>
      <main style={{ gridArea: 'main' }}>
        <PharosLayout preset="1-col--sidenav">{_gridColumns()}</PharosLayout>
      </main>
    </div>
  ),
  parameters: { docs: { disable: true } },
};

export const OneColumnWithSidenavAndComfySpacing: Story = {
  name: 'One column with sidenav and comfy spacing',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: "'sidenav main'",
        gridTemplateColumns: 'max-content 1fr',
      }}
    >
      <PharosSidenav open={true} style={{ gridArea: 'sidenav' }}>
        <PharosLink slot="top" href="/" id="jstor-logo">
          <img src={logo} alt="Pharos Home" width="72" height="100" />
        </PharosLink>
      </PharosSidenav>
      <main style={{ gridArea: 'main' }}>
        <PharosLayout preset="1-col--sidenav-comfy">{_gridColumns()}</PharosLayout>
      </main>
    </div>
  ),
  parameters: { docs: { disable: true } },
};

export const TwoColumn: Story = {
  name: 'Two column',
  render: () => (
    <Fragment>
      <PharosLayout preset="2-col">
        <div className="layout-example__container--first"></div>
        <div className="layout-example__container--second"></div>
        <div className="layout-example__container--third"></div>
      </PharosLayout>
      <PharosLayout preset="2-col" style={{ position: 'absolute', top: 0, width: '100%' }}>
        {_gridColumns()}
      </PharosLayout>
    </Fragment>
  ),
};

export const ColumnLayouts: Story = {
  name: 'Column layouts',
  render: () => (
    <PharosLayout style={{ margin: '1rem 0' }}>
      {_gridItems([1, 2, 3, 4, 6])}
      {_comboItems([7, 8, 9, 10])}
    </PharosLayout>
  ),
};
