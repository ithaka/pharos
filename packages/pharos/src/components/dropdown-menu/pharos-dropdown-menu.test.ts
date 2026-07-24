import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosDropdownMenu } from './pharos-dropdown-menu';
import type { PharosDropdownMenuItem } from './pharos-dropdown-menu-item';

describe('pharos-dropdown-menu', () => {
  let component: PharosDropdownMenu;

  const getSimpleDropdown = () => {
    return html`
      <test-pharos-dropdown-menu id="my-dropdown">
        <test-pharos-dropdown-menu-item>I am an item</test-pharos-dropdown-menu-item>
      </test-pharos-dropdown-menu>
    `;
  };

  const getMultipleItemDropdown = () => {
    return html`
      <test-pharos-dropdown-menu id="my-dropdown">
        <test-pharos-dropdown-menu-item>I am item 1</test-pharos-dropdown-menu-item>
        <test-pharos-dropdown-menu-item>I am item 2</test-pharos-dropdown-menu-item>
        <test-pharos-dropdown-menu-item>I am item 3</test-pharos-dropdown-menu-item>
      </test-pharos-dropdown-menu>
    `;
  };

  const getNoItemDropdown = () => {
    return html`
      <test-pharos-dropdown-menu id="my-dropdown">
        <div>Hi there!</div>
      </test-pharos-dropdown-menu>
    `;
  };

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-dropdown-menu id="my-dropdown">
        <test-pharos-dropdown-menu-item>I am item 1</test-pharos-dropdown-menu-item>
        <test-pharos-dropdown-menu-item>I am item 2</test-pharos-dropdown-menu-item>
        <test-pharos-dropdown-menu-item>I am item 3</test-pharos-dropdown-menu-item>
      </test-pharos-dropdown-menu>
    `);
  });

  afterEach(() => document.body.replaceChildren());

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when open', async () => {
    component.open = true;
    await component.updateComplete;

    await expect(component).toBeAccessible();
  });

  it('opens when the element with matching attribute data-dropdown-menu-id is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.click();
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('can support multiple triggers when open and another trigger is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    const secondTrigger = document.createElement('button');
    secondTrigger.setAttribute('id', 'trigger2');
    secondTrigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(secondTrigger);

    component = await fixture(getSimpleDropdown());

    trigger.click();
    await component.updateComplete;

    secondTrigger.click();
    await component.updateComplete;
    // Switching triggers re-opens after a 150ms debounce; wait for the settled state.
    await vi.waitFor(() => expect(component['_currentTrigger'] === secondTrigger).toBe(true));
    expect(component.open).toBe(true);
  });

  it('opens when the element with matching attribute data-dropdown-menu-id and attribute data-dropdown-menu-hover is hovered', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    // Hover open is debounced by 150ms in _handleTriggerHover.
    await vi.waitFor(() => expect(component.open).toBe(true));
  });

  it('can support multiple triggers when open and another trigger is hovered', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    const secondTrigger = document.createElement('button');
    secondTrigger.setAttribute('id', 'trigger2');
    secondTrigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    secondTrigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(secondTrigger);

    component = await fixture(getSimpleDropdown());

    trigger.click();
    await component.updateComplete;

    secondTrigger.dispatchEvent(new MouseEvent('mouseenter'));
    await component.updateComplete;
    // Hover open is debounced by 150ms in _handleTriggerHover; wait for the settled open state.
    await vi.waitFor(() => expect(component.open).toBe(true));
    expect(component['_currentTrigger'] === secondTrigger).toBe(true);
  });

  it('remains open when hover is moved from the trigger element to the menu', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    component.dispatchEvent(new MouseEvent('mouseenter'));
    // Re-hovering the menu re-triggers the 150ms open debounce; wait for it to settle open.
    await vi.waitFor(() => expect(component.open).toBe(true));
  });

  it('opens when down arrow key is pressed on the element with matching attribute data-dropdown-menu-id', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('opens when up arrow key is pressed on the element with matching attribute data-dropdown-menu-id', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('opens when enter key is pressed on the element with attribute data-dropdown-menu-hover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('opens when space key is pressed on the element with attribute data-dropdown-menu-hover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('remains open when an another non-menu-item element inside is clicked after the dropdown opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

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
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
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

  it('delegates focus to the first item when the down arrow key is pressed on the trigger element', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getMultipleItemDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const items = Array.prototype.slice.call(
      component.querySelectorAll('test-pharos-dropdown-menu-item')
    ) as PharosDropdownMenuItem[];
    const firstItem = items[0].renderRoot.querySelector('.dropdown-menu-item__button');

    // Focus is moved via a 1ms debounce in `updated()`; wait for it to land.
    await vi.waitFor(() => expect(activeElement === firstItem).toBe(true));
    document.removeEventListener('focusin', onFocusIn);
  });

  it('delegates focus to the last item when the up arrow key is pressed on the trigger element', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getMultipleItemDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Up' }));
    await component.updateComplete;

    const items = Array.prototype.slice.call(
      component.querySelectorAll('test-pharos-dropdown-menu-item')
    ) as PharosDropdownMenuItem[];
    const lastItem = items[items.length - 1].renderRoot.querySelector(
      '.dropdown-menu-item__button'
    );

    await vi.waitFor(() => expect(activeElement === lastItem).toBe(true));
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

  it('closes when the escape key is pressed in the menu', async () => {
    component.open = true;
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('closes when the escape key for IE is pressed in the menu', async () => {
    component.open = true;
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('closes when the element with matching attribute data-dropdown-menu-id is clicked after the dropdown opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.click();
    await component.updateComplete;
    trigger.click();
    await component.updateComplete;
    expect(component.open).toBe(false);
  });

  it('closes when an another outside element is clicked after the dropdown opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.click();
    await component.updateComplete;
    document.body.click();
    await component.updateComplete;
    expect(component.open).toBe(false);
  });

  it('closes when hover is moved away from the menu', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    component.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.waitFor(() => expect(component.open).toBe(false));
  });

  it('closes when the element with matching attribute data-dropdown-menu-id and attribute data-dropdown-menu-hover loses hover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.waitFor(() => expect(component.open).toBe(false));
  });

  it("has an attribute to set its width equal to the trigger's width", async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.textContent = 'Yay I am a button';
    document.body.appendChild(trigger);

    component = await fixture(html`
      <test-pharos-dropdown-menu id="my-dropdown" full-width>
        <test-pharos-dropdown-menu-item>I am an item</test-pharos-dropdown-menu-item>
      </test-pharos-dropdown-menu>
    `);

    trigger.click();
    await component.updateComplete;

    const { offsetWidth } = trigger;
    const borderLeft = parseInt(
      window.getComputedStyle(component['_menu'], null).getPropertyValue('border-left-width'),
      10
    );
    const borderRight = parseInt(
      window.getComputedStyle(component['_menu'], null).getPropertyValue('border-right-width'),
      10
    );
    // The menu width is set by a ResizeObserver callback, which fires asynchronously
    // once the trigger's size is observed; wait for the settled style value.
    await vi.waitFor(() =>
      expect(component['_menu'].style.width).toBe(`${offsetWidth - (borderLeft + borderRight)}px`)
    );
    component.open = false;
  });

  it('moves focus to the next item when the down arrow key is pressed', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getMultipleItemDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const items = Array.prototype.slice.call(
      component.querySelectorAll('test-pharos-dropdown-menu-item')
    ) as PharosDropdownMenuItem[];
    const firstItem = items[0].renderRoot.querySelector('.dropdown-menu-item__button');
    // Wait for the initial focus debounce to land on the first item before navigating.
    await vi.waitFor(() => expect(activeElement === firstItem).toBe(true));

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;

    const secondItem = items[1].renderRoot.querySelector('.dropdown-menu-item__button');

    expect(activeElement === secondItem).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('moves focus to the previous item when the up arrow key is pressed', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getMultipleItemDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const items = Array.prototype.slice.call(
      component.querySelectorAll('test-pharos-dropdown-menu-item')
    ) as PharosDropdownMenuItem[];
    const firstItem = items[0].renderRoot.querySelector('.dropdown-menu-item__button');
    // Wait for the initial focus debounce to land on the first item before navigating.
    await vi.waitFor(() => expect(activeElement === firstItem).toBe(true));

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;

    expect(activeElement === firstItem).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('moves focus to the first item when moving forward from the last one', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getMultipleItemDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const items = Array.prototype.slice.call(
      component.querySelectorAll('test-pharos-dropdown-menu-item')
    ) as PharosDropdownMenuItem[];
    const firstItem = items[0].renderRoot.querySelector('.dropdown-menu-item__button');
    // Wait for the initial focus debounce to land on the first item before navigating.
    await vi.waitFor(() => expect(activeElement === firstItem).toBe(true));

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Up' }));
    await component.updateComplete;
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    expect(activeElement === firstItem).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('moves focus to the last item when moving backward from the first one', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getMultipleItemDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const items = Array.prototype.slice.call(
      component.querySelectorAll('test-pharos-dropdown-menu-item')
    ) as PharosDropdownMenuItem[];
    const firstItem = items[0].renderRoot.querySelector('.dropdown-menu-item__button');
    // Wait for the initial focus debounce to land on the first item before navigating.
    await vi.waitFor(() => expect(activeElement === firstItem).toBe(true));

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Up' }));
    await component.updateComplete;

    const lastItem = items[items.length - 1].renderRoot.querySelector(
      '.dropdown-menu-item__button'
    );

    expect(activeElement === lastItem).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates item selected state when an item is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getMultipleItemDropdown());

    trigger.click();
    await component.updateComplete;

    const item = component.querySelector(
      'test-pharos-dropdown-menu-item'
    ) as PharosDropdownMenuItem;
    item.click();

    // Selected state is applied via a 150ms debounce in _handleItemClick.
    await vi.waitFor(() => expect(item.selected).toBe(true));
  });

  it('fires a cancelable custom event pharos-dropdown-menu-select when starting to select an item by user interaction', async () => {
    const handleSelect = (e: Event): void => {
      e.preventDefault();
    };
    component.addEventListener('pharos-dropdown-menu-select', handleSelect);
    component.open = true;
    await component.updateComplete;

    const item = component.querySelector(
      'test-pharos-dropdown-menu-item'
    ) as PharosDropdownMenuItem;
    item.click();
    await component.updateComplete;

    expect(item.selected).toBe(false);
    expect(component.open).toBe(true);
  });

  it('fires a custom event pharos-dropdown-menu-selected when an item has been selected', async () => {
    let selected: unknown = null;
    const handleSelected = (e: Event): void => {
      selected = (e as CustomEvent).detail;
    };
    component.addEventListener('pharos-dropdown-menu-selected', handleSelected);
    component.open = true;
    await component.updateComplete;

    const item = component.querySelector(
      'test-pharos-dropdown-menu-item'
    ) as PharosDropdownMenuItem;
    item.click();

    await vi.waitFor(() => expect(selected === item).toBe(true));
  });

  it('makes menu focusable when no items are present', async () => {
    component = await fixture(getNoItemDropdown());
    expect(component['_menu'].getAttribute('tabindex')).toBe('0');
  });

  it('remains open when the element with attribute data-dropdown-menu-hover is hovered and then clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    trigger.setAttribute('data-dropdown-menu-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => expect(component.open).toBe(true));
    trigger.click();
    await component.updateComplete;

    expect(component.open).toBe(true);
  });

  it('delegates focus to the list when opened and no items are present', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-dropdown-menu-id', 'my-dropdown');
    document.body.appendChild(trigger);

    component = await fixture(getNoItemDropdown());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    // Focus is moved via a 1ms debounce in `updated()`; wait for it to land.
    await vi.waitFor(() => expect(activeElement === component['_menu']).toBe(true));
    document.removeEventListener('focusin', onFocusIn);
  });

  it('does not contain a focus trap when in a menu nav', async () => {
    const parentNode = document.createElement('test-pharos-dropdown-menu-nav');

    component = await fixture(getNoItemDropdown(), {
      parentNode,
    });
    expect(component['_focusTrapController']['_trap']).toBeNull();
  });

  it('can be opened dynamically', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    await component.openWithTrigger(trigger);

    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('fires a custom event pharos-dropdown-menu-opened when opened', async () => {
    component = await fixture(getSimpleDropdown());

    let wasFired = false;
    const handleOpened = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-dropdown-menu-opened', handleOpened);
    component.open = true;
    await component.updateComplete;

    expect(wasFired).toBe(true);
  });

  it('fires a custom event pharos-dropdown-menu-closed when closed', async () => {
    component = await fixture(getSimpleDropdown());

    let wasFired = false;
    const handleClosed = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-dropdown-menu-closed', handleClosed);
    component.open = true;
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;
    expect(wasFired).toBe(true);
  });

  it('updates the last item when a new item is added dynamically', async () => {
    const item = document.createElement('test-pharos-dropdown-menu-item');
    item.textContent = 'I am a new item';
    component.appendChild(item);
    await component.updateComplete;

    const items = Array.prototype.slice.call(
      component.querySelectorAll('test-pharos-dropdown-menu-item')
    ) as PharosDropdownMenuItem[];
    const lastItem = items[items.length - 1];

    expect(lastItem['_last']).toBe(true);
  });
});
