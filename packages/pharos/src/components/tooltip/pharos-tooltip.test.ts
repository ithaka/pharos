import { fixture, expect, aTimeout, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

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
    component = await fixture(html` <pharos-tooltip id="my-tooltip">Hi there!</pharos-tooltip> `);

    secondTrigger = addTrigger('my-second-trigger', 'my-second-tooltip');
    secondComponent = await fixture(html`
      <pharos-tooltip id="my-second-tooltip">Hi there again!</pharos-tooltip>
    `);
  });

  afterEach(async () => {
    trigger.remove();
    secondTrigger.remove();
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when opened', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).to.be.accessible();
  });

  it('sets its default attributes', async () => {
    expect(component).dom.to.equal(
      `<pharos-tooltip id="my-tooltip" placement="top" strategy="absolute" boundary="clippingAncestors" data-pharos-component="PharosTooltip">Hi there!</pharos-tooltip>`
    );
  });

  it('renders a static shadowDom', async () => {
    expect(component).shadowDom.to.equal(
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

    expect(component.open).to.equal(false);
  });

  it('closes when the escape key for IE is pressed', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
    await component.updateComplete;

    expect(component.open).to.equal(false);
  });

  it('opens on mouseenter of trigger and closes on mouseleave', async () => {
    trigger.dispatchEvent(new Event('mouseenter'));
    await component.updateComplete;
    await aTimeout(100);
    expect(component.open).to.equal(true);

    trigger.dispatchEvent(new Event('mouseleave'));
    await component.updateComplete;
    await aTimeout(100);
    expect(component.open).to.equal(false);
  });

  it('opens on focusin of trigger and closes on focusout', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    expect(component.open).to.equal(true);

    trigger.dispatchEvent(new Event('focusout'));
    await component.updateComplete;
    expect(component.open).to.equal(false);
  });

  it('throws an error for an invalid placement value', async () => {
    component = await fixture(html`
      <pharos-tooltip placement="side">Hi there!</pharos-tooltip>
    `).catch((e) => e);
    expect(
      'side is not a valid placement. Valid placements are: top, top-start, top-end, bottom, bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end, auto, auto-start, auto-end'
    ).to.be.thrown;
  });

  it('stays open on mouseenter of content and closes on mouseleave', async () => {
    trigger.dispatchEvent(new Event('mouseenter'));
    await aTimeout(100);
    await component.updateComplete;

    component.dispatchEvent(new Event('mouseenter'));
    await aTimeout(100);
    await component.updateComplete;
    expect(component.open).to.equal(true);

    component.dispatchEvent(new Event('mouseleave'));
    await aTimeout(100);
    await component.updateComplete;
    expect(component.open).to.equal(false);
  });

  it('opens the first one on focus and then closes it upon hovering the second', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await secondComponent.updateComplete;
    expect(component.open).to.equal(true);
    expect(secondComponent.open).to.equal(false);

    secondTrigger.dispatchEvent(new Event('mouseenter'));
    await component.updateComplete;
    await secondComponent.updateComplete;
    await aTimeout(100);
    expect(component.open).to.equal(false);
    expect(secondComponent.open).to.equal(true);
  });

  it('opens the first one on hover and then closes it upon focusing the second', async () => {
    trigger.dispatchEvent(new Event('mouseenter'));
    await component.updateComplete;
    await aTimeout(100);
    expect(component.open).to.equal(true);
    expect(secondComponent.open).to.equal(false);

    secondTrigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await secondComponent.updateComplete;
    await aTimeout(100);
    expect(component.open).to.equal(false);
    expect(secondComponent.open).to.equal(true);
  });

  it('throws an error for invalid fallback values', async () => {
    component = await fixture(html`
      <pharos-tooltip .fallbackPlacements="${['corner', 'right', 'fake'] as Placement[]}"
        >Hi there!</pharos-tooltip
      >
    `).catch((e) => e);
    expect(
      'corner, fake are not valid fallbacks. Valid fallbacks are: top, top-start, top-end, bottom, bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end, auto, auto-start, auto-end'
    ).to.be.thrown;
  });

  it('throws an error for invalid strategy values', async () => {
    component = await fixture(html`
      <pharos-tooltip strategy="relative">Hi there!</pharos-tooltip>
    `).catch((e) => e);
    expect('relative is not a valid positioning strategy. Valid strategies are: absolute, fixed').to
      .be.thrown;
  });

  it('applies text wrap class when tooltip content is longer than 30 characters', async () => {
    component = await fixture(html`
      <pharos-tooltip>Hi there! I am a tooltip with more than 30 characters.</pharos-tooltip>
    `);

    expect(component['_bubble'].classList.contains('tooltip__bubble--text-wrap')).to.be.true;
  });

  it('sets aria attributes on the trigger element', async () => {
    trigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    expect(trigger.getAttribute('aria-describedby')).to.equal('my-tooltip');
  });

  it('opens programmatically if only a single trigger exists', async () => {
    component.open = true;
    await component.updateComplete;
    expect(component.open).to.equal(true);
  });

  it('supports multiple triggers when open and another trigger is focused', async () => {
    const thirdTrigger = addTrigger('my-third-trigger', 'my-tooltip');
    component = await fixture(html` <pharos-tooltip id="my-tooltip">Hi there!</pharos-tooltip> `);

    trigger.dispatchEvent(new Event('mouseenter'));
    await component.updateComplete;
    await aTimeout(100);

    thirdTrigger.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await aTimeout(100);

    await nextFrame();
    expect(component.open).to.be.true;
  });

  it('supports multiple triggers when open and another trigger is hovered', async () => {
    const thirdTrigger = addTrigger('my-third-trigger', 'my-tooltip');
    component = await fixture(html` <pharos-tooltip id="my-tooltip">Hi there!</pharos-tooltip> `);

    trigger.dispatchEvent(new Event('focusin'));
    await aTimeout(100);
    await component.updateComplete;

    thirdTrigger.dispatchEvent(new Event('mouseenter'));
    await component.updateComplete;
    await aTimeout(100);

    await nextFrame();
    expect(component.open).to.be.true;
  });

  it('has an attribute to set tooltip width to be within the boundary for short tooltip', async () => {
    const boundary = await fixture(html` <div id="custom-boundary" style="width: 100px"></div> `);
    document.body.appendChild(boundary);
    component.boundary = 'custom-boundary';
    await component.updateComplete;
    await aTimeout(100);

    expect(component['_bubble'].style.width).to.equal('52px');
  });

  it('has an attribute to set tooltip width to be within the boundary for long tooltip', async () => {
    const boundary = await fixture(html` <div id="custom-boundary" style="width: 100px"></div> `);
    document.body.appendChild(boundary);
    component = await fixture(html`
      <pharos-tooltip id="my-second-tooltip"
        >This one has content that is longer than 30 characters!</pharos-tooltip
      >
    `);
    component.boundary = 'custom-boundary';
    await component.updateComplete;
    await aTimeout(100);

    expect(component['_bubble'].style.width).to.equal('36px');
  });
});
