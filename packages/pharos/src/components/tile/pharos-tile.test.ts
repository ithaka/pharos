import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTile } from './pharos-tile';

describe('pharos-tile', () => {
  let component: PharosTile;

  describe('link tile', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <test-pharos-tile href="/preservation">
          <span slot="header">Preservation</span>
          Enable preservation in Portico
        </test-pharos-tile>
      `);
    });

    it('is accessible', async () => {
      await expect(component).toBeAccessible();
    });

    it('wraps the header content in the only link', () => {
      const links = component.renderRoot.querySelectorAll('a');
      expect(links.length).toBe(1);
      expect(links[0].getAttribute('href')).toBe('/preservation');
      expect(links[0].querySelector('slot[name="header"]')).not.toBeNull();
    });

    it('describes the link with the body', () => {
      const link = component.renderRoot.querySelector('a') as HTMLAnchorElement;
      expect(link.getAttribute('aria-describedby')).toBe('description');
      expect(component.renderRoot.querySelector('#description')).not.toBeNull();
    });

    it('renders an arrow and no input', () => {
      expect(component.renderRoot.querySelector('.tile__arrow')).not.toBeNull();
      expect(component.renderRoot.querySelector('input')).toBeNull();
    });

    it('passes target and rel to the anchor', async () => {
      component.target = '_blank';
      component.rel = 'noopener';
      await component.updateComplete;
      const link = component.renderRoot.querySelector('a') as HTMLAnchorElement;
      expect(link.target).toBe('_blank');
      expect(link.rel).toBe('noopener');
    });

    it('removes the href and marks the link disabled when disabled', async () => {
      component.disabled = true;
      await component.updateComplete;
      const link = component.renderRoot.querySelector('a') as HTMLAnchorElement;
      expect(link.hasAttribute('href')).toBe(false);
      expect(link.getAttribute('aria-disabled')).toBe('true');
      await expect(component).toBeAccessible();
    });
  });

  describe('content', () => {
    it('renders slotted header content in the header row', async () => {
      component = await fixture(html`
        <test-pharos-tile selection="single" name="choice" value="a">
          <span slot="header">Icon</span>
          <span slot="header">Title</span>
        </test-pharos-tile>
      `);
      const slot = component.renderRoot.querySelector(
        '.tile__header slot[name="header"]'
      ) as HTMLSlotElement;
      expect(slot.assignedElements().length).toBe(2);
    });

    it('hides the arrow with hide-indicator', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a" hide-indicator
          ><span slot="header">T</span></test-pharos-tile
        >`
      );
      expect(component.renderRoot.querySelector('.tile__arrow')).toBeNull();
    });

    it('omits the header row when there is no header content', async () => {
      component = await fixture(html`<test-pharos-tile>Body</test-pharos-tile>`);
      expect(component.renderRoot.querySelector('.tile__header')).toBeNull();
    });

    it('renders slotted header, body and footer content', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a">
          <div slot="header">Regular plan</div>
          <ul>
            <li>10 PDF downloads</li>
          </ul>
          <span slot="footer">Cancel anytime</span>
        </test-pharos-tile>
      `);
      expect(component.renderRoot.querySelector('slot[name="header"]')).not.toBeNull();
      expect(component.renderRoot.querySelector('#description slot:not([name])')).not.toBeNull();
      expect(component.renderRoot.querySelector('slot[name="footer"]')).not.toBeNull();
    });

    it('renders slotted content that is added after the first render', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a" hide-indicator
          ><span slot="header">T</span></test-pharos-tile
        >`
      );
      expect(component.renderRoot.querySelector('.tile__footer-content')).toBeNull();

      const footer = document.createElement('span');
      footer.slot = 'footer';
      footer.textContent = 'Status';
      component.appendChild(footer);
      await new Promise((resolve) => setTimeout(resolve));
      expect(component.renderRoot.querySelector('.tile__footer-content')).not.toBeNull();

      footer.remove();
      await new Promise((resolve) => setTimeout(resolve));
      expect(component.renderRoot.querySelector('.tile__footer-content')).toBeNull();
    });

    it('omits the body area when there is no body content', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a"><span slot="header">Title</span></test-pharos-tile>`
      );
      expect(component.renderRoot.querySelector('#description')).toBeNull();
    });
  });

  describe('without href or group', () => {
    it('is inert', async () => {
      component = await fixture(
        html`<test-pharos-tile><span slot="header">Title</span></test-pharos-tile>`
      );
      expect(component.renderRoot.querySelector('a')).toBeNull();
      expect(component.renderRoot.querySelector('input')).toBeNull();
      expect(component.renderRoot.querySelector('.tile__arrow')).toBeNull();
    });
  });

  describe('selection tile', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <test-pharos-tile selection="single" value="new" name="choice">
          <span slot="header">Create a new project</span>
          Start from scratch
        </test-pharos-tile>
      `);
    });

    it('is accessible', async () => {
      await expect(component).toBeAccessible();
    });

    it('renders a radio input labelled by the header and described by the body', () => {
      const input = component.renderRoot.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('radio');
      expect(input.getAttribute('aria-labelledby')).toBe('header');
      expect(input.getAttribute('aria-describedby')).toBe('description');
      expect(component.renderRoot.querySelector('a')).toBeNull();
    });

    it('renders a checkbox input for multiple selection', async () => {
      component.selection = 'multiple';
      await component.updateComplete;
      const input = component.renderRoot.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('checkbox');
    });

    it('ignores href when it is a selection tile', async () => {
      component.href = '/ignored';
      await component.updateComplete;
      expect(component.renderRoot.querySelector('a')).toBeNull();
      expect(component.renderRoot.querySelector('input')).not.toBeNull();
    });

    it('selects and fires change when clicked', async () => {
      let fired = false;
      component.addEventListener('change', () => (fired = true));
      component.select();
      await component.updateComplete;
      expect(component.selected).toBe(true);
      expect(fired).toBe(true);
    });

    it('disables the input when disabled', async () => {
      component.disabled = true;
      await component.updateComplete;
      expect((component.renderRoot.querySelector('input') as HTMLInputElement).disabled).toBe(true);
    });

    it('removes the input from the tab order when not focusable', async () => {
      component.focusable = false;
      await component.updateComplete;
      expect(component.renderRoot.querySelector('input')?.getAttribute('tabindex')).toBe('-1');
    });

    it('adds its value to form data when selected', async () => {
      const form = document.createElement('form');
      document.body.appendChild(form);
      component = await fixture(
        html`<test-pharos-tile selection="single" name="choice" value="new"
          ><span slot="header">T</span></test-pharos-tile
        >`,
        { parentNode: form }
      );
      component.select();
      await component.updateComplete;
      expect(new FormData(form).get('choice')).toBe('new');
      form.remove();
    });

    it('restores the default selected state on form reset', async () => {
      const form = document.createElement('form');
      document.body.appendChild(form);
      component = await fixture(
        html`<test-pharos-tile selection="single" name="choice" value="new"
          ><span slot="header">T</span></test-pharos-tile
        >`,
        { parentNode: form }
      );
      component.select();
      await component.updateComplete;
      form.reset();
      await component.updateComplete;
      expect(component.selected).toBe(false);
      form.remove();
    });
  });
});
