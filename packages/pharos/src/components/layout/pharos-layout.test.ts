import { html, fixture, expect } from '@open-wc/testing';
import './pharos-layout';
import type { PharosLayout } from './pharos-layout';

describe('pharos-layout', () => {
  let component: PharosLayout;

  beforeEach(async () => {
    component = await fixture(
      html`
        <pharos-layout>
          <div slot="top">Top Content</div>
          <div>Body Content</div>
        </pharos-layout>
      `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('has an attribute to set the inner grid areas', async () => {
    component.areas = "'top' 'body'";
    await component.updateComplete;

    expect(component['_layout'].style.gridTemplateAreas).to.equal('"top" "body"');
  });

  it('has an attribute to set the inner grid rows', async () => {
    component.rows = 'max-content 1fr';
    await component.updateComplete;

    expect(component['_layout'].style.gridTemplateRows).to.equal('max-content 1fr');
  });

  it('has an attribute to set the inner grid row gap', async () => {
    component.rowGap = '1rem';
    await component.updateComplete;

    expect(component['_layout'].style.rowGap).to.equal('1rem');
  });

  it('has an attribute to set the HTML tag of the inner grid', async () => {
    component.tag = 'ol';
    await component.updateComplete;

    expect(component['_layout'].tagName).to.equal('OL');
  });

  it('throws an error for an invalid preset value', async () => {
    component = await fixture(html` <pharos-layout preset="fake-col"></pharos-layout> `).catch(
      (e) => e
    );
    expect('fake-col is not a valid preset. Valid presets are: 1-col, 1-col--sidenav, 2-col').to.be
      .thrown;
  });
});
