import { html, fixture, expect } from '@open-wc/testing';
import './pharos-grid';
import type { PharosGrid } from './pharos-grid';

describe('pharos-grid', () => {
  let component: PharosGrid;

  beforeEach(async () => {
    component = await fixture(
      html`
        <pharos-grid>
          <div slot="top">Top Content</div>
          <div>Body Content</div>
        </pharos-grid>
      `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('has an attribute to set the grid areas', async () => {
    component.areas = "'top' 'body'";
    await component.updateComplete;

    const grid = component.renderRoot.querySelector('.grid') as HTMLDivElement;
    expect(grid.style.gridTemplateAreas).to.equal('"top" "body"');
  });

  it('has an attribute to set the grid rows', async () => {
    component.rows = 'max-content 1fr';
    await component.updateComplete;

    const grid = component.renderRoot.querySelector('.grid') as HTMLDivElement;
    expect(grid.style.gridTemplateRows).to.equal('max-content 1fr');
  });
});
