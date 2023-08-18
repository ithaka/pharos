import { fixture, expect, aTimeout, elementUpdated } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import type { PharosPopover } from './pharos-popover';

describe('pharos-popover', () => {
  let component: PharosPopover, logSpy: SinonSpy;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-popover id="my-popover">
        <div>I am popover contents</div>
      </test-pharos-popover>
    `);
  });

  before(() => {
    logSpy = sinon.spy(console, 'error');
  });

  after(() => {
    logSpy.restore();
  });

  const getSimplePopover = () => {
    return html`
      <test-pharos-popover id="my-popover">
        <div>I am popover contents</div>
      </test-pharos-popover>
    `;
  };

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when open', async () => {
    component.open = true;
    await component.updateComplete;

    await expect(component).to.be.accessible();
  });

  it('sets aria attributes on the trigger element', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    expect(trigger.getAttribute('aria-expanded')).to.equal('true');
    expect(trigger.getAttribute('aria-haspopup')).to.equal('true');
    expect(trigger.getAttribute('aria-controls')).to.equal(component.getAttribute('id'));
  });

  it('opens when the element with matching attribute data-popover-id is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    expect(component.open).to.be.true;
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
    await aTimeout(150);
    expect(component.open).to.be.true;
    expect(component['_currentTrigger'] === secondTrigger).to.be.true;
  });

  it('opens when the element with matching attribute data-popover-id and attribute data-popover-hover is hovered', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('opens when the element with matching attribute data-popover-id and attribute data-popover-hover is hovered', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;
    expect(component.open).to.be.true;
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
    await aTimeout(150);
    expect(component.open).to.be.true;
    expect(component['_currentTrigger'] === secondTrigger).to.be.true;
  });

  it('remains open when hover is moved from the trigger element to the popover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;

    component.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('opens when down arrow key is pressed on the element with matching attribute data-popover-id', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('opens when up arrow key is pressed on the element with matching attribute data-popover-id', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;
    expect(component.open).to.be.true;
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
    expect(component.open).to.be.true;
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
    expect(component.open).to.be.true;
  });

  it('remains open when an another non-menu-item element inside is clicked after the dropdown opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    const button = document.createElement('button');
    component.appendChild(button);
    await elementUpdated(component);

    trigger.click();
    await component.updateComplete;
    button.click();
    await component.updateComplete;
    expect(component.open).to.be.true;
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

    expect(activeElement === button).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('closes when the escape key is pressed', async () => {
    component.open = true;
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('closes when the escape key for IE is pressed', async () => {
    component.open = true;
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('closes when the escape key is pressed in the menu', async () => {
    component.open = true;
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('closes when the escape key for IE is pressed in the menu', async () => {
    component.open = true;
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('closes when the element with matching attribute data-popover-id is clicked after the dropdown opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    trigger.click();
    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('closes when an another outside element is clicked after the dropdown opens', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.click();
    await component.updateComplete;
    document.body.click();
    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('closes when hover is moved away from the menu', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;

    component.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;

    component.dispatchEvent(new MouseEvent('mouseleave'));
    await aTimeout(150);
    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('closes when the element with matching attribute data-popover-id and attribute data-popover-hover loses hover', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    await aTimeout(150);
    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('remains open when the element with attribute data-popover-hover is hovered and then clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-popover-id', 'my-popover');
    trigger.setAttribute('data-popover-hover', '');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(150);
    await component.updateComplete;
    trigger.click();
    await component.updateComplete;

    expect(component.open).to.be.true;
  });

  it('can be opened dynamically', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    component = await fixture(getSimplePopover());

    await component.openWithTrigger(trigger);

    await component.updateComplete;
    expect(component.open).to.be.true;
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

    expect(wasFired).to.be.true;
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
    expect(wasFired).to.be.true;
  });
});
