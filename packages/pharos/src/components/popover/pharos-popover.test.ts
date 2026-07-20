import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosPopover } from './pharos-popover';

describe('pharos-popover', () => {
  let component: PharosPopover, logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-popover id="my-popover" a11y-label="Test label for dialog">
        <div>I am popover contents</div>
      </test-pharos-popover>
    `);
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  beforeAll(() => {
    logSpy = vi.spyOn(console, 'error');
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  const getSimplePopover = () => {
    return html`
      <test-pharos-popover id="my-popover" a11y-label="Test label for dialog">
        <div>I am popover contents</div>
      </test-pharos-popover>
    `;
  };

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when open', async () => {
    component.open = true;
    await component.updateComplete;

    await expect(component).toBeAccessible();
  });

  it('sets aria attributes on the trigger element', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(component.getAttribute('id'));
  });

  it('opens when the element with matching attribute data-popover-id is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('can support multiple triggers when open and another trigger is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    const secondTrigger = document.createElement('button');
    secondTrigger.setAttribute('id', 'trigger2');
    secondTrigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(secondTrigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;

    secondTrigger.click();
    await component.updateComplete;
    await vi.waitFor(() => expect(component.open).toBe(true));
    expect(component['_currentTrigger'] === secondTrigger).toBe(true);
  });

  it('opens when the element with matching attribute data-popover-id and attribute data-popover-hover is hovered', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));
  });

  it('opens when the element with matching attribute data-popover-id and attribute data-popover-hover is hovered', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));
  });

  it('can support multiple triggers when open and another trigger is hovered', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    const secondTrigger = document.createElement('button');
    secondTrigger.setAttribute('id', 'trigger2');
    secondTrigger.setAttribute('data-popover-id', 'my-popover');
    secondTrigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(secondTrigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;

    secondTrigger.dispatchEvent(new MouseEvent('mouseenter'));
    await component.updateComplete;
    await vi.waitFor(() => expect(component.open).toBe(true));
    expect(component['_currentTrigger'] === secondTrigger).toBe(true);
  });

  it('remains open when hover is moved from the trigger element to the popover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    component.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));
  });

  it('opens when enter key is pressed on the element with attribute data-popover-hover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('opens when space key is pressed on the element with attribute data-popover-hover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('remains open when an element inside is clicked after the popover opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    const button = document.createElement('button');
    component.appendChild(button);
    await component.updateComplete;

    trigger.click();
    await component.updateComplete;
    button.click();
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('delegates focus back to the element that opened it', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    const button = document.querySelector('#trigger') as HTMLButtonElement;
    button.click();
    button.focus();
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;

    expect(activeElement === button).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('closes when the escape key is pressed', async () => {
    component.open = true;
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('closes when the escape key for IE is pressed', async () => {
    component.open = true;
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('closes when the escape key is pressed in the popover', async () => {
    component.open = true;
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('closes when the escape key for IE is pressed in the popover', async () => {
    component.open = true;
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('closes when the element with matching attribute data-popover-id is clicked after the popover opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    trigger.click();
    await component.updateComplete;
    expect(component.open).toBe(false);
  });

  it('closes when an another outside element is clicked after the popover opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    document.body.click();
    await component.updateComplete;
    expect(component.open).toBe(false);
  });

  it('closes when hover is moved away from the popover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    component.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    component.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.waitFor(() => expect(component.open).toBe(false));
  });

  it('closes when the element with matching attribute data-popover-id and attribute data-popover-hover loses hover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.waitFor(() => expect(component.open).toBe(false));
  });

  it('remains open when the element with attribute data-popover-hover is hovered and then clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));
    trigger.click();
    await component.updateComplete;

    expect(component.open).toBe(true);
  });

  it('can be opened dynamically', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    await component.openWithTrigger(trigger);

    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('fires a custom event pharos-popover-opened when opened', async () => {
    component = await fixture(getSimplePopover());

    let wasFired = false;
    const handleOpened = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-popover-opened', handleOpened);
    component.open = true;
    await component.updateComplete;

    expect(wasFired).toBe(true);
  });

  it('fires a custom event pharos-popover-closed when closed', async () => {
    component = await fixture(getSimplePopover());

    let wasFired = false;
    const handleClosed = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-popover-closed', handleClosed);
    component.open = true;
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;
    expect(wasFired).toBe(true);
  });
});
