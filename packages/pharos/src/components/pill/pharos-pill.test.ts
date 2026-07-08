import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosPill } from './pharos-pill';

let component: PharosPill;
describe('PharosPill', () => {
  beforeEach(async () => {
    component = await fixture(html`<test-pharos-pill>Test Pill</test-pharos-pill>`);
  });
  describe('Basic Pill', () => {
    it('is accessible', async () => {
      await expect(component).toBeAccessible();
    });

    it('renders the text slot', async () => {
      expect(component.innerText?.trim()).toBe('Test Pill');
    });
  });

  describe('Pill Sizes', () => {
    it('defaults to the base size', async () => {
      expect(component.size).toBe('base');
    });

    it('renders a smaller pill when size is set to "small"', async () => {
      component = await fixture(
        html`<test-pharos-pill size="small">Some pill text</test-pharos-pill>`
      );
      expect(component.size).toBe('small');
      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      expect(pill?.classList.contains('pill--small')).toBe(true);
    });
  });

  describe('Dismissible Pill', () => {
    it('is not dismissible by default', async () => {
      expect(component.dismissible).toBe(false);
      const dismissButton = component.renderRoot?.querySelector('.pill__dismiss-button');
      expect(dismissButton).toBeNull();
    });

    it('renders as a button when dismissible', async () => {
      component = await fixture(
        html`<test-pharos-pill dismissible>Dismissible Pill</test-pharos-pill>`
      );
      expect(component.dismissible).toBe(true);
      const pill = component.renderRoot?.querySelector('button.pill') as HTMLDivElement;
      expect(pill).not.toBeNull();
      expect(pill?.classList.contains('pill--dismissible')).toBe(true);
    });

    it('renders a close icon in the button', async () => {
      component = await fixture(
        html`<test-pharos-pill dismissible>Base Dismissible Pill</test-pharos-pill>`
      );
      const icon = component.renderRoot?.querySelector('svg') as SVGSVGElement | null;
      expect(icon).not.toBeNull();
      const title = icon?.querySelector('title');
      expect(title).not.toBeNull();
      expect(title?.textContent).toBe('close');
    });

    it('emits pharos-pill-dismissed event when button is clicked', async () => {
      component = await fixture(
        html`<test-pharos-pill dismissible>Event Test Pill</test-pharos-pill>`
      );

      let eventFired = false;
      const handleDismissed = (): void => {
        eventFired = true;
      };
      component.addEventListener('pharos-pill-dismissed', handleDismissed);

      await component.updateComplete;

      const pill = component.renderRoot?.querySelector('button.pill') as HTMLButtonElement;
      pill.click();

      expect(eventFired).toBe(true);
    });
  });

  describe('Pill Presets', () => {
    it('should use preset 1 when no preset is provided', async () => {
      component = await fixture(html`<test-pharos-pill>Test Pill</test-pharos-pill>`);
      expect(component.preset).toBe('1');
      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      expect(pill?.classList.contains('pill--preset-1')).toBe(true);
    });

    it('should apply the correct CSS class for the preset that is passed in', async () => {
      component = await fixture(
        html`<test-pharos-pill preset="2">Test Pill with Preset 2</test-pharos-pill>`
      );
      expect(component.preset).toBe('2');
      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      expect(pill?.classList.contains('pill--preset-2')).toBe(true);
    });
  });
  describe('Text Truncation', () => {
    it('visually truncates text when content exceeds container width', async () => {
      component = await fixture(
        html`<test-pharos-pill style="width: 80px;">
          This is very long text that should definitely be truncated with ellipsis
        </test-pharos-pill>`
      );

      await component.updateComplete;

      const textContainer = component.renderRoot?.querySelector('.pill__content') as HTMLElement;
      expect(textContainer).not.toBeNull();

      // Check if text is actually being truncated by comparing scroll width vs client width
      // When text is truncated, scrollWidth (full content width) > clientWidth (visible width)
      expect(textContainer.scrollWidth).toBeGreaterThan(textContainer.clientWidth);

      // Verify ellipsis CSS property is applied
      const computedStyle = window.getComputedStyle(
        component.renderRoot?.querySelector('.pill__content') as Element
      );
      expect(computedStyle.textOverflow).toBe('ellipsis');
    });

    it('does not truncate text when content fits within container width', async () => {
      component = await fixture(html`<test-pharos-pill>Short</test-pharos-pill>`);

      await component.updateComplete;

      const textContainer = component.renderRoot?.querySelector('.pill__content') as HTMLElement;
      expect(textContainer).not.toBeNull();

      // When text fits, scrollWidth should equal or be very close to clientWidth
      // Allow small tolerance for browser differences in text measurement
      const widthDifference = textContainer.scrollWidth - textContainer.clientWidth;
      expect(widthDifference).toBeLessThan(5);
    });
  });

  describe('Icon Handling', () => {
    it('renders the appropriate svg icon when icon-left is provided', async () => {
      component = await fixture(
        html`<test-pharos-pill icon-left="info-inverse">Test Pill</test-pharos-pill>`
      );
      await component.updateComplete;

      // Wait for icon to load asynchronously (dynamic import can be slow under full-suite load)
      await vi.waitFor(
        () => {
          expect(component.renderRoot?.querySelector('svg')).not.toBeNull();
        },
        { timeout: 5000 }
      );

      const icon = component.renderRoot?.querySelector('svg') as SVGSVGElement;
      expect(icon).not.toBeNull();
      expect(icon.querySelector('title')?.textContent).toBe('info-inverse');
      expect(icon.getAttribute('height')).toBe('16');
      expect(icon.getAttribute('width')).toBe('16');
    });

    it('adjusts the size of the icon when the pill size is set to small', async () => {
      component = await fixture(
        html`<test-pharos-pill icon-left="search" size="small">Small Pill</test-pharos-pill>`
      );

      await component.updateComplete;
      // Wait for icon to load asynchronously
      await vi.waitFor(
        () => {
          expect(component.renderRoot?.querySelector('svg')).not.toBeNull();
        },
        { timeout: 5000 }
      );

      const icon = component.renderRoot?.querySelector('svg') as SVGSVGElement | null;
      expect(icon).not.toBeNull();
      expect(icon!.getAttribute('height')).toBe('12');
      expect(icon!.getAttribute('width')).toBe('12');
    });

    it('should throw an error when an invalid icon is passed in', async () => {
      // Suppress expected error logging in test output
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      // The invalid icon error is thrown from the async `updated()`, so we can't just use the errorFixture to check it
      const iconLoadError = new Promise<Error>((resolve) => {
        window.addEventListener(
          'unhandledrejection',
          (e) => {
            e.preventDefault();
            resolve(e.reason as Error);
          },
          { once: true }
        );
      });

      component.iconLeft = 'invalid-icon' as any;

      const error = await iconLoadError;
      expect(error.message).toBe('Could not get icon named "invalid-icon"');

      consoleSpy.mockRestore();
    });
  });
});
