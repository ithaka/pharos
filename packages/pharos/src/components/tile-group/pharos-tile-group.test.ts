import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTileGroup } from './pharos-tile-group';
import type { PharosTile } from '../tile/pharos-tile';

const keydown = (tile: PharosTile, key: string): void => {
  const input = tile.renderRoot.querySelector('input') as HTMLInputElement;
  input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
};

const tileOf = (group: Element, value: string): PharosTile =>
  group.querySelector(`test-pharos-tile[value="${value}"]`) as PharosTile;

describe('pharos-tile-group', () => {
  let component: PharosTileGroup;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-tile-group name="group">
        <span slot="legend">Choose a project type</span>
        <test-pharos-tile value="1" title="One" description="First"></test-pharos-tile>
        <test-pharos-tile value="2" title="Two" description="Second"></test-pharos-tile>
        <test-pharos-tile value="3" title="Three" description="Third"></test-pharos-tile>
      </test-pharos-tile-group>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('renders a radiogroup for single selection and none for multiple', async () => {
    const fieldset = component.renderRoot.querySelector('fieldset') as HTMLElement;
    expect(fieldset.getAttribute('role')).toBe('radiogroup');
    component.selection = 'multiple';
    await component.updateComplete;
    expect(fieldset.hasAttribute('role')).toBe(false);
  });

  it('sets selection, name and state on each tile', async () => {
    component.disabled = true;
    component.invalidated = true;
    await component.updateComplete;
    ['1', '2', '3'].forEach((value) => {
      const tile = tileOf(component, value);
      expect(tile.selection).toBe('single');
      expect(tile.name).toBe('group');
      expect(tile.disabled).toBe(true);
      expect(tile.invalidated).toBe(true);
    });
  });

  it('keeps individually disabled tiles disabled', async () => {
    component = await fixture(html`
      <test-pharos-tile-group name="group">
        <test-pharos-tile value="1" title="One"></test-pharos-tile>
        <test-pharos-tile value="2" title="Two" disabled></test-pharos-tile>
      </test-pharos-tile-group>
    `);
    expect(tileOf(component, '2').disabled).toBe(true);
    expect(tileOf(component, '1').disabled).toBe(false);
  });

  it('applies tiles added after first render', async () => {
    const tile = document.createElement('test-pharos-tile') as PharosTile;
    tile.value = '4';
    component.appendChild(tile);
    await new Promise((resolve) => setTimeout(resolve));
    expect(tile.selection).toBe('single');
    expect(tile.name).toBe('group');
  });

  describe('single selection', () => {
    it('has one value and deselects the previous tile', async () => {
      tileOf(component, '1').select();
      await component.updateComplete;
      expect(component.value).toBe('1');

      tileOf(component, '2').select();
      await component.updateComplete;
      expect(component.value).toBe('2');
      expect(tileOf(component, '1').selected).toBe(false);
    });

    it('has an empty value when nothing is selected', () => {
      expect(component.value).toBe('');
    });

    it('fires a single change event from the group', async () => {
      const sources: EventTarget[] = [];
      component.addEventListener('change', (event) => sources.push(event.composedPath()[0]));
      tileOf(component, '2').select();
      await component.updateComplete;
      expect(sources.length).toBe(1);
      expect(sources[0]).toBe(component);
    });

    it('has a single tab stop: the first tile, then the selected tile', async () => {
      const focusable = (): string[] =>
        ['1', '2', '3'].filter((value) => tileOf(component, value).focusable);
      expect(focusable()).toEqual(['1']);

      tileOf(component, '3').select();
      await component.updateComplete;
      expect(focusable()).toEqual(['3']);
    });

    it('moves selection with the arrow keys and wraps', async () => {
      const first = tileOf(component, '1');
      first.select();
      await component.updateComplete;

      keydown(first, 'ArrowDown');
      await component.updateComplete;
      expect(component.value).toBe('2');

      keydown(tileOf(component, '2'), 'ArrowUp');
      keydown(tileOf(component, '1'), 'ArrowUp');
      await component.updateComplete;
      expect(component.value).toBe('3');
    });

    it('skips disabled tiles with the arrow keys', async () => {
      tileOf(component, '2').disabled = true;
      const first = tileOf(component, '1');
      first.select();
      keydown(first, 'ArrowRight');
      await component.updateComplete;
      expect(component.value).toBe('3');
    });
  });

  describe('multiple selection', () => {
    beforeEach(async () => {
      component.selection = 'multiple';
      await component.updateComplete;
    });

    it('collects values for every selected tile', async () => {
      tileOf(component, '1').select();
      tileOf(component, '3').select();
      await component.updateComplete;
      expect(component.value).toEqual(['1', '3']);
    });

    it('toggles a tile off when selected again', async () => {
      tileOf(component, '1').select();
      tileOf(component, '1').select();
      await component.updateComplete;
      expect(component.value).toEqual([]);
    });

    it('keeps every tile in the tab order', () => {
      ['1', '2', '3'].forEach((value) => expect(tileOf(component, value).focusable).toBe(true));
    });

    it('does not change selection with the arrow keys', async () => {
      const first = tileOf(component, '1');
      first.select();
      keydown(first, 'ArrowDown');
      await component.updateComplete;
      expect(component.value).toEqual(['1']);
    });
  });

  it('adds selected values to form data', async () => {
    const form = document.createElement('form');
    document.body.appendChild(form);
    component = await fixture(
      html`<test-pharos-tile-group name="plans" selection="multiple">
        <test-pharos-tile value="a" title="A"></test-pharos-tile>
        <test-pharos-tile value="b" title="B"></test-pharos-tile>
      </test-pharos-tile-group>`,
      { parentNode: form }
    );
    tileOf(component, 'a').select();
    tileOf(component, 'b').select();
    await component.updateComplete;
    expect(new FormData(form).getAll('plans')).toEqual(['a', 'b']);
    form.remove();
  });

  it('lets listeners on a tile hear its own change event', async () => {
    let fired = false;
    tileOf(component, '1').addEventListener('change', () => (fired = true));
    tileOf(component, '1').select();
    await component.updateComplete;
    expect(fired).toBe(true);
  });

  it('only re-enables tiles that the group disabled', async () => {
    component = await fixture(html`
      <test-pharos-tile-group name="group">
        <test-pharos-tile value="1" title="One"></test-pharos-tile>
        <test-pharos-tile value="2" title="Two" disabled></test-pharos-tile>
      </test-pharos-tile-group>
    `);
    component.disabled = true;
    await component.updateComplete;
    expect(tileOf(component, '1').disabled).toBe(true);

    component.disabled = false;
    await component.updateComplete;
    expect(tileOf(component, '1').disabled).toBe(false);
    expect(tileOf(component, '2').disabled).toBe(true);
  });

  it('does not hijack arrow keys from slotted tile content', async () => {
    component = await fixture(html`
      <test-pharos-tile-group name="group">
        <test-pharos-tile value="1" title="One" selected>
          <input slot="footer" id="inner" />
        </test-pharos-tile>
        <test-pharos-tile value="2" title="Two"></test-pharos-tile>
      </test-pharos-tile-group>
    `);
    const input = component.querySelector('#inner') as HTMLInputElement;
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
    await component.updateComplete;

    expect(event.defaultPrevented).toBe(false);
    expect(component.value).toBe('1');
  });

  it('moves the tab stop when a tile is selected or disabled directly', async () => {
    const focusable = (): string[] =>
      ['1', '2', '3'].filter((value) => tileOf(component, value).focusable);
    expect(focusable()).toEqual(['1']);

    tileOf(component, '2').selected = true;
    await tileOf(component, '2').updateComplete;
    expect(focusable()).toEqual(['2']);

    tileOf(component, '2').disabled = true;
    await tileOf(component, '2').updateComplete;
    expect(focusable()).toEqual(['1']);
  });

  it('keeps a single selected tile when selected is set directly', async () => {
    tileOf(component, '1').select();
    await component.updateComplete;
    tileOf(component, '3').selected = true;
    await tileOf(component, '3').updateComplete;
    expect(tileOf(component, '1').selected).toBe(false);
    expect(component.value).toBe('3');
  });

  it('keeps only one tile selected when several start selected in single mode', async () => {
    component = await fixture(html`
      <test-pharos-tile-group name="group">
        <test-pharos-tile value="1" title="One" selected></test-pharos-tile>
        <test-pharos-tile value="2" title="Two" selected></test-pharos-tile>
      </test-pharos-tile-group>
    `);
    expect(component.value).toBe('1');
  });

  it('updates the tab stop after a form reset', async () => {
    const form = document.createElement('form');
    document.body.appendChild(form);
    component = await fixture(
      html`<test-pharos-tile-group name="group">
        <test-pharos-tile value="1" title="One"></test-pharos-tile>
        <test-pharos-tile value="2" title="Two"></test-pharos-tile>
      </test-pharos-tile-group>`,
      { parentNode: form }
    );
    tileOf(component, '2').select();
    await component.updateComplete;
    expect(tileOf(component, '2').focusable).toBe(true);

    form.reset();
    await new Promise((resolve) => setTimeout(resolve));
    expect(component.value).toBe('');
    expect(tileOf(component, '1').focusable).toBe(true);
    expect(tileOf(component, '2').focusable).toBe(false);
    form.remove();
  });

  it('marks a required single-selection group with aria-required and not each tile', async () => {
    component.required = true;
    await component.updateComplete;
    const fieldset = component.renderRoot.querySelector('fieldset') as HTMLElement;
    expect(fieldset.getAttribute('aria-required')).toBe('true');
    ['1', '2', '3'].forEach((value) => expect(tileOf(component, value).required).toBe(false));
  });

  it('does not set aria-required for multiple selection', async () => {
    component.selection = 'multiple';
    component.required = true;
    await component.updateComplete;
    const fieldset = component.renderRoot.querySelector('fieldset') as HTMLElement;
    expect(fieldset.hasAttribute('aria-required')).toBe(false);
    expect(tileOf(component, '1').required).toBe(false);
  });

  it('describes the group with the message', async () => {
    component = await fixture(html`
      <test-pharos-tile-group name="group" message="Pick one" invalidated>
        <test-pharos-tile value="1" title="One"></test-pharos-tile>
      </test-pharos-tile-group>
    `);
    const fieldset = component.renderRoot.querySelector('fieldset') as HTMLElement;
    expect(fieldset.getAttribute('aria-describedby')).toBe('message');
    expect(fieldset.getAttribute('aria-invalid')).toBe('true');
  });
});
