import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTile } from './pharos-tile';

describe('pharos-tile', () => {
  let component: PharosTile;

  describe('link tile', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <test-pharos-tile
          href="/preservation"
          title="Preservation"
          description="Enable preservation in Portico"
        ></test-pharos-tile>
      `);
    });

    it('is accessible', async () => {
      await expect(component).toBeAccessible();
    });

    it('renders the title as the only link', () => {
      const links = component.renderRoot.querySelectorAll('a');
      expect(links.length).toBe(1);
      expect(links[0].getAttribute('href')).toBe('/preservation');
      expect(links[0].textContent?.trim()).toBe('Preservation');
    });

    it('describes the link with the description', () => {
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

    it('uses the heading level and preset 2', async () => {
      component.headingLevel = 4;
      await component.updateComplete;
      const heading = component.renderRoot.querySelector('pharos-heading, test-pharos-heading');
      expect(heading?.getAttribute('level')).toBe('4');
      expect(heading?.getAttribute('preset')).toBe('2');
    });
  });

  describe('content', () => {
    it('renders the label as plain text inline with the title', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a" title="Title" label="Beta"></test-pharos-tile>
      `);
      const label = component.renderRoot.querySelector('.tile__title-row .tile__label');
      expect(label?.textContent).toBe('Beta');
      expect(component.renderRoot.querySelector('.tile__header')).toBeNull();
      expect(component.renderRoot.querySelector('pharos-pill, test-pharos-pill')).toBeNull();
    });

    it('puts the label in the header row, next to the slotted header content', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a" title="T" label="Beta">
          <span slot="header">Icon</span>
        </test-pharos-tile>
      `);
      expect(component.renderRoot.querySelector('.tile__header .tile__label')).not.toBeNull();
      expect(component.renderRoot.querySelector('.tile__title-row')).toBeNull();
    });

    it('renders slotted label content in place of the label prop', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a" title="T">
          <span slot="label">Custom</span>
        </test-pharos-tile>
      `);
      expect(
        component.renderRoot.querySelector('.tile__title-row .tile__label slot[name="label"]')
      ).not.toBeNull();
    });

    it('puts slotted label content in the header row when there is a header slot', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a" title="T">
          <span slot="header">Regular plan</span>
          <span slot="label">Custom</span>
        </test-pharos-tile>
      `);
      expect(
        component.renderRoot.querySelector('.tile__header .tile__label slot[name="label"]')
      ).not.toBeNull();
    });

    it('always places the icon inline with the title', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a" title="T" icon="gen-ai" label="Beta"></test-pharos-tile>`
      );
      expect(component.renderRoot.querySelector('.tile__title-row .tile__icon')).not.toBeNull();
      expect(component.renderRoot.querySelector('.tile__header')).toBeNull();
    });

    it('renders slotted header content in its own row above the title', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a" title="T">
          <div slot="header">Custom header</div>
        </test-pharos-tile>
      `);
      const slot = component.renderRoot.querySelector('slot[name="header"]') as HTMLSlotElement;
      expect(slot.assignedElements().length).toBe(1);
      expect(component.renderRoot.querySelector('.tile__header')).not.toBeNull();
    });

    it('hides the arrow with hide-indicator', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a" title="T" hide-indicator></test-pharos-tile>`
      );
      expect(component.renderRoot.querySelector('.tile__arrow')).toBeNull();
    });

    it('omits the header and title row when there is no icon, label or header content', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a" title="Title"></test-pharos-tile>`
      );
      expect(component.renderRoot.querySelector('.tile__header')).toBeNull();
    });

    it('renders slotted header, title, body and footer content', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a">
          <div slot="header">Regular plan</div>
          <span slot="title">$19 / month</span>
          <ul>
            <li>10 PDF downloads</li>
          </ul>
          <span slot="footer">Cancel anytime</span>
        </test-pharos-tile>
      `);
      expect(component.renderRoot.querySelector('slot[name="header"]')).not.toBeNull();
      expect(component.renderRoot.querySelector('slot[name="title"]')).not.toBeNull();
      expect(component.renderRoot.querySelector('#description')).not.toBeNull();
      expect(component.renderRoot.querySelector('slot[name="footer"]')).not.toBeNull();
    });

    it('renders the description prop alongside other slotted content', async () => {
      component = await fixture(html`
        <test-pharos-tile href="/a" title="T" description="Described">
          <span slot="footer">Status</span>
        </test-pharos-tile>
      `);
      expect(component.renderRoot.querySelector('#description')?.textContent?.trim()).toBe(
        'Described'
      );
    });

    it('renders slotted content that is added after the first render', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a" title="T" hide-indicator></test-pharos-tile>`
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

    it('omits the description area when there is no description', async () => {
      component = await fixture(
        html`<test-pharos-tile href="/a" title="Title"></test-pharos-tile>`
      );
      expect(component.renderRoot.querySelector('#description')).toBeNull();
    });
  });

  describe('without href or group', () => {
    it('is inert', async () => {
      component = await fixture(html`<test-pharos-tile title="Title"></test-pharos-tile>`);
      expect(component.renderRoot.querySelector('a')).toBeNull();
      expect(component.renderRoot.querySelector('input')).toBeNull();
      expect(component.renderRoot.querySelector('.tile__arrow')).toBeNull();
    });
  });

  describe('selection tile', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <test-pharos-tile
          selection="single"
          value="new"
          name="choice"
          title="Create a new project"
          description="Start from scratch"
        ></test-pharos-tile>
      `);
    });

    it('is accessible', async () => {
      await expect(component).toBeAccessible();
    });

    it('renders a radio input labelled by the title and described by the description', () => {
      const input = component.renderRoot.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('radio');
      expect(input.getAttribute('aria-labelledby')).toBe('title');
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
        html`<test-pharos-tile
          selection="single"
          name="choice"
          value="new"
          title="T"
        ></test-pharos-tile>`,
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
        html`<test-pharos-tile
          selection="single"
          name="choice"
          value="new"
          title="T"
        ></test-pharos-tile>`,
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
