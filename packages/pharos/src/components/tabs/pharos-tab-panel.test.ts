import { describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';

describe('pharos-tab-panel', () => {
  it('has a tabindex when it contains no focusable elements', async () => {
    const component = await fixture(
      html`<test-pharos-tab-panel selected id="panel-1" slot="panel"
        >Panel 1</test-pharos-tab-panel
      >`
    );
    expect(component.getAttribute('tabindex')).toBe('0');
  });

  it('does not have a tabindex when it contains focusable elements', async () => {
    const component = await fixture(
      html`<test-pharos-tab-panel selected id="panel-1" slot="panel"
        ><button>test</button></test-pharos-tab-panel
      >`
    );
    expect(component.hasAttribute('tabindex')).toBe(false);
  });
});
