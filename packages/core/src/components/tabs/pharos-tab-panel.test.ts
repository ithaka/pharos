import { html, fixture, expect } from '@open-wc/testing';
import './pharos-tab-panel';

describe('pharos-tab-panel', () => {
  it('has a tabindex when it contains no focusable elements', async () => {
    const component = await fixture(
      html`<pharos-tab-panel selected id="panel-1" slot="panel">Panel 1</pharos-tab-panel>`
    );
    await expect(component.getAttribute('tabindex')).to.equal('0');
  });

  it('does not have a tabindex when it contains focusable elements', async () => {
    const component = await fixture(
      html`<pharos-tab-panel selected id="panel-1" slot="panel"
        ><button>test</button></pharos-tab-panel
      >`
    );
    await expect(component.hasAttribute('tabindex')).to.be.false;
  });
});
