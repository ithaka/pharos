import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosModal } from './pharos-modal';
import type { PharosTextInput } from '../text-input/pharos-text-input';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-modal', () => {
  let component: PharosModal, componentNoFooter: PharosModal;

  const getSimpleModal = () => {
    return html`
      <pharos-modal id="my-modal" header="Pharos modal">
        I am a modal
        <div slot="footer">
          <button type="button" data-modal-close>Cancel</button>
          <button type="button">Ok</button>
        </div>
      </pharos-modal>
    `;
  };

  beforeEach(async () => {
    component = await fixture(html`
      <pharos-modal header="Pharos modal">
        <p>I am a modal</p>
        <div slot="footer">
          <button type="button" data-modal-close>Cancel</button>
          <button type="button">Ok</button>
        </div>
      </pharos-modal>
    `);

    componentNoFooter = await fixture(html`
      <pharos-modal header="Pharos modal">
        <p>I am a modal</p>
      </pharos-modal>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when open', async () => {
    component.open = true;
    await component.updateComplete;
    await expect(component).to.be.accessible();
  });

  it('has an attribute to open the modal', async () => {
    component.open = true;
    await component.updateComplete;
    await expect(component.open).to.be.true;
  });

  it('has an attribute to close the modal', async () => {
    component.open = true;
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;
    await expect(component.open).to.be.false;
  });

  it('delegates focus to the first focusable element (close button) when opened', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.open = true;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    const buttonElement = closeButton.renderRoot.querySelector(
      '#button-element'
    ) as HTMLButtonElement;

    expect(activeElement === buttonElement).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('delegates focus to the element with attribute data-modal-focus when opened', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <pharos-modal header="Pharos modal">
        <pharos-text-input style="margin-bottom: 1.5rem" data-modal-focus>
          <span slot="label">Name</span>
        </pharos-text-input>
        <div slot="footer">
          <button type="button" data-modal-close>Cancel</button>
          <button type="button">Ok</button>
        </div>
      </pharos-modal>
    `);
    component.open = true;
    await component.updateComplete;

    const input = component.querySelector('pharos-text-input') as PharosTextInput;

    expect(activeElement === input['_input']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('delegates focus back to the element that opened it', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    const handleClick = (): void => {
      const modal = document.querySelector('pharos-modal') as PharosModal;
      modal.open = true;
    };
    trigger.setAttribute('id', 'trigger');
    trigger.addEventListener('click', handleClick);
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

  it('closes when the close button is clicked', async () => {
    component.open = true;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    closeButton.click();
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('closes when the element with attribute data-modal-close is clicked', async () => {
    const footer = document.createElement('div');
    footer.setAttribute('slot', 'footer');
    const button = document.createElement('button');
    button.setAttribute('data-modal-close', '');
    footer.appendChild(button);
    component.appendChild(footer);
    await elementUpdated(component);

    component.open = true;
    await component.updateComplete;

    const closeButton = component.querySelector('[data-modal-close]') as HTMLButtonElement;
    closeButton.click();
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('does not close when the overlay is clicked', async () => {
    component.open = true;
    await component.updateComplete;

    const overlay = component.renderRoot.querySelector('.modal__overlay') as HTMLDivElement;
    overlay.click();
    await component.updateComplete;

    expect(component.open).to.be.true;
  });

  it('opens when the element with matching attribute data-modal-id is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-modal-id', 'my-modal');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleModal());

    trigger.click();
    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('has a slot to contain a description of the modal for accessibility', async () => {
    const description = document.createElement('p');
    description.setAttribute('slot', 'description');
    description.textContent = 'I am a description';
    component.appendChild(description);
    await elementUpdated(component);

    component.open = true;
    await component.updateComplete;

    const dialog = component.renderRoot.querySelector('.modal__dialog') as HTMLDivElement;
    expect(dialog.getAttribute('aria-describedby')).to.equal('description');
  });

  it('fires a cancelable custom event pharos-modal-close when starting to close by user interaction', async () => {
    const handleClose = (e: Event): void => {
      e.preventDefault();
    };
    component.addEventListener('pharos-modal-close', handleClose);
    component.open = true;
    await component.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('includes details of trigger when custom event pharos-modal-close is fired', async () => {
    let trigger = null;
    const handleClose = (e: Event): void => {
      trigger = (e as CustomEvent).detail;
    };
    component.addEventListener('pharos-modal-close', handleClose);
    component.open = true;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    closeButton.click();
    await component.updateComplete;
    expect(trigger === closeButton).to.be.true;
  });

  it('fires a custom event pharos-modal-closed when closed by user interaction', async () => {
    let wasFired = false;
    const handleClose = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-modal-closed', handleClose);
    component.open = true;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    closeButton.click();
    await component.updateComplete;
    expect(wasFired).to.be.true;
  });

  it('fires a custom event pharos-modal-closed when closed via props', async () => {
    let wasFired = false;
    const handleClose = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-modal-closed', handleClose);

    component.open = true;
    await component.updateComplete;
    component.open = false;
    await component.updateComplete;
    expect(wasFired).to.be.true;
  });

  it('fires a cancelable custom event pharos-modal-open when starting to open by user interaction', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-modal-id', 'my-modal');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleModal());

    const handleOpen = (e: Event): void => {
      e.preventDefault();
    };
    component.addEventListener('pharos-modal-open', handleOpen);
    trigger.click();
    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('includes details of trigger when custom event pharos-modal-open is fired', async () => {
    let clicked = null;
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-modal-id', 'my-modal');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleModal());

    const handleOpen = (e: Event): void => {
      clicked = (e as CustomEvent).detail;
    };
    component.addEventListener('pharos-modal-open', handleOpen);
    trigger.click();
    await component.updateComplete;
    expect(clicked === trigger).to.be.true;
  });

  it('fires a custom event pharos-modal-opened when opened by user interaction', async () => {
    let wasFired = false;
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-modal-id', 'my-modal');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleModal());

    const handleOpen = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-modal-opened', handleOpen);
    trigger.click();
    await component.updateComplete;
    expect(wasFired).to.be.true;
  });

  it('fires a custom event pharos-modal-opened when opened via props', async () => {
    let wasFired = false;
    const handleOpen = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-modal-opened', handleOpen);

    component.open = true;
    await component.updateComplete;
    expect(wasFired).to.be.true;
  });

  it('adds a class to prevent scrolling on the body when opened', async () => {
    component.open = true;
    await component.updateComplete;

    const body = document.querySelector('body');
    expect(body?.classList.contains('pharos-modal__body')).to.be.true;
  });

  it('removes the class that prevents scrolling on the body when closed', async () => {
    component.open = true;
    await component.updateComplete;
    component.open = false;
    await component.updateComplete;

    const body = document.querySelector('body');
    expect(body?.classList.contains('pharos-modal__body')).to.be.false;
  });

  it('throws an error for an invalid size value', async () => {
    component = await fixture(html` <pharos-modal size="fake">Hi there!</pharos-modal> `).catch(
      (e) => e
    );
    expect('fake is not a valid size. Valid sizes are: small, medium, large').to.be.thrown;
  });

  it('it shows the footer when slotted content exists', async () => {
    component.open = true;
    await component.updateComplete;
    const modalFooterWithSlottedContent = component.renderRoot.querySelector(
      '.modal__footer'
    ) as HTMLDivElement;
    expect(modalFooterWithSlottedContent).not.to.be.null;
  });

  it('it hides the footer when missing slotted content', async () => {
    component.open = true;
    await component.updateComplete;
    const modalFooterWithoutSlottedContent = componentNoFooter.renderRoot.querySelector(
      '.modal__footer--empty'
    ) as HTMLDivElement;
    expect(modalFooterWithoutSlottedContent).not.to.be.null;
  });
});
