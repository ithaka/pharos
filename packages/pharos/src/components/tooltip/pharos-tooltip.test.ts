import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { Placement } from '../base/overlay-element';
import type { PharosTooltip } from './pharos-tooltip';

describe('pharos-tooltip', () => {
  let component: PharosTooltip,
    secondComponent: PharosTooltip,
    trigger: HTMLButtonElement,
    secondTrigger: HTMLButtonElement;

  const addTrigger = (id = 'trigger', tooltipId = 'my-tooltip'): HTMLButtonElement => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', id);
    trigger.setAttribute('data-tooltip-id', tooltipId);
    trigger.textContent = 'I am a button';
    document.body.appendChild(trigger);
    return trigger;
  };

  beforeEach(async () => {
    trigger = addTrigger();
    component = await fixture(html`
      <test-pharos-tooltip id="my-tooltip">Hi there!</test-pharos-tooltip>
    `);

    secondTrigger = addTrigger('my-second-trigger', 'my-second-tooltip');
    secondComponent = await fixture(html`
      <test-pharos-tooltip id="my-second-tooltip">Hi there again!</test-pharos-tooltip>
    `);
  });

  afterEach(async () => {
    trigger.remove();
    secondTrigger.remove();
    component.parentElement?.remove();
    secondComponent.parentElement?.remove();
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when opened', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('sets its default attributes', async () => {
    expect(component).toEqualDom(
      `<test-pharos-tooltip id="my-tooltip" placement="top" strategy="absolute" boundary="clippingAncestors" data-pharos-component="PharosTooltip">Hi there!</test-pharos-tooltip>`
    );
  });

  it('renders a static shadowDom', async () => {
    expect(component).toEqualShadowDom(
      `
      <div
        aria-hidden="true"
        class="tooltip__body"
        role="tooltip"
      >
        <span class="tooltip__bubble">
          <slot></slot>
        </span>
        <div
          class="tooltip__caret"
        >
        </div>
      </div>
    `,
      { ignoreAttributes: ['style'] }
    );
  });

  it('closes when the escape key is pressed', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('closes when the escape key for IE is pressed', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('opens on mouseenter of trigger and closes on mouseleave', async () => {
    trigger.dispatchEvent(new Event('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    trigger.dispatchEvent(new Event('mouseleave'));
    await vi.waitFor(() => expect(component.open).toBe(false));
  });

  it('opens on focusin of trigger and closes on focusout', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    expect(component.open).toBe(true);

    trigger.dispatchEvent(new Event('focusout'));
    await component.updateComplete;
    expect(component.open).toBe(false);
  });

  it('throws an error for an invalid placement value', async () => {
    const error = await errorFixture(html`
      <test-pharos-tooltip placement="side">Hi there!</test-pharos-tooltip>
    `);

    expect(error.message).toContain(
      'side is not a valid placement. Valid placements are: top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end'
    );
  });

  it('stays open on mouseenter of content and closes on mouseleave', async () => {
    trigger.dispatchEvent(new Event('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    component.dispatchEvent(new Event('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    component.dispatchEvent(new Event('mouseleave'));
    await vi.waitFor(() => expect(component.open).toBe(false));
  });

  it('opens the first one on focus and then closes it upon hovering the second', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await secondComponent.updateComplete;
    expect(component.open).toBe(true);
    expect(secondComponent.open).toBe(false);

    secondTrigger.dispatchEvent(new Event('mouseenter'));
    await vi.waitFor(
      () => {
        expect(component.open).toBe(false);
        expect(secondComponent.open).toBe(true);
      },
      { timeout: 5000 }
    );
  });

  it('opens the first one on hover and then closes it upon focusing the second', async () => {
    trigger.dispatchEvent(new Event('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));
    expect(secondComponent.open).toBe(false);

    secondTrigger.dispatchEvent(new Event('focusin'));
    await vi.waitFor(
      () => {
        expect(component.open).toBe(false);
        expect(secondComponent.open).toBe(true);
      },
      { timeout: 5000 }
    );
  });

  it('throws an error for invalid fallback values', async () => {
    const error = await errorFixture(html`
      <test-pharos-tooltip .fallbackPlacements=${['corner', 'right', 'fake'] as Placement[]}
        >Hi there!</test-pharos-tooltip
      >
    `);

    expect(error.message).toContain('corner, fake are not valid fallbacks');
  });

  it('throws an error for invalid strategy values', async () => {
    const error = await errorFixture(html`
      <test-pharos-tooltip strategy="relative">Hi there!</test-pharos-tooltip>
    `);

    expect(error.message).toContain(
      'relative is not a valid positioning strategy. Valid strategies are: absolute, fixed'
    );
  });

  it('applies text wrap class when tooltip content is longer than 30 characters', async () => {
    component = await fixture(html`
      <test-pharos-tooltip
        >Hi there! I am a tooltip with more than 30 characters.</test-pharos-tooltip
      >
    `);

    expect(component['_bubble'].classList.contains('tooltip__bubble--text-wrap')).toBe(true);
  });

  it('sets aria attributes on the trigger element', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    expect(trigger.getAttribute('aria-describedby')).toBe('my-tooltip');
  });

  it('opens programmatically if only a single trigger exists', async () => {
    component.open = true;
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('supports multiple triggers when open and another trigger is focused', async () => {
    const thirdTrigger = addTrigger('my-third-trigger', 'my-tooltip');
    component = await fixture(html`
      <test-pharos-tooltip id="my-tooltip">Hi there!</test-pharos-tooltip>
    `);

    trigger.dispatchEvent(new Event('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    thirdTrigger.dispatchEvent(new Event('focusin'));

    // Wait for the other trigger, then confirm the tooltip stayed open
    await vi.waitFor(() => expect(component['_currentTrigger']).toBe(thirdTrigger));
    await vi.waitFor(() => expect(component.open).toBe(true));
  });

  it('supports multiple triggers when open and another trigger is hovered', async () => {
    const thirdTrigger = addTrigger('my-third-trigger', 'my-tooltip');
    component = await fixture(html`
      <test-pharos-tooltip id="my-tooltip">Hi there!</test-pharos-tooltip>
    `);

    trigger.dispatchEvent(new Event('focusin'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    thirdTrigger.dispatchEvent(new Event('mouseenter'));

    await vi.waitFor(() => expect(component.open).toBe(true));
  });

  it('has an attribute to set tooltip width to be within the boundary for short tooltip', async () => {
    const boundary = await fixture(html` <div id="custom-boundary" style="width: 100px"></div> `);
    document.body.appendChild(boundary);
    component.boundary = 'custom-boundary';
    await component.updateComplete;

    await vi.waitFor(() => expect(component['_bubble'].style.width).toBe('52px'));
  });

  it('has an attribute to set tooltip width to be within the boundary for long tooltip', async () => {
    const boundary = await fixture(html` <div id="custom-boundary" style="width: 100px"></div> `);
    document.body.appendChild(boundary);
    component = await fixture(html`
      <test-pharos-tooltip id="my-second-tooltip"
        >This one has content that is longer than 30 characters!</test-pharos-tooltip
      >
    `);
    component.boundary = 'custom-boundary';
    await component.updateComplete;

    await vi.waitFor(() => expect(component['_bubble'].style.width).toBe('36px'));
  });
});
