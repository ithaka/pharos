import { fixture, expect, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import type { PharosToaster } from './pharos-toaster';
import type { PharosToast } from './pharos-toast';

describe('pharos-toaster', () => {
  let component: PharosToaster;

  const fireOpenEvent = () => {
    const event = new CustomEvent('pharos-toast-open', {
      detail: {
        content: 'I am a toast',
      },
    });
    document.dispatchEvent(event);
  };

  const fireOpenUpdateableToastEvent = () => {
    const event = new CustomEvent('pharos-toast-open', {
      detail: {
        content: 'I am imortal toast',
        indefinite: true,
        id: 'my-updateable-toast',
      },
    });
    document.dispatchEvent(event);
  };

  const fireCloseToastEvent = () => {
    const event = new CustomEvent('pharos-toast-close', {
      detail: {
        bubbles: true,
        composed: true,
        id: 'my-updateable-toast',
      },
    });
    document.dispatchEvent(event);
  };

  const fireUpdateToastEvent = () => {
    const event = new CustomEvent('pharos-toast-update', {
      detail: {
        status: 'success',
        id: 'my-updateable-toast',
        content: 'Toast has been updated',
      },
    });
    document.dispatchEvent(event);
  };

  const fireErrorOpenEvent = () => {
    const event = new CustomEvent('pharos-toast-open', {
      detail: {
        status: 'error',
        content: 'I am a toast',
      },
    });
    document.dispatchEvent(event);
  };

  beforeEach(async () => {
    component = await fixture(html` <test-pharos-toaster></test-pharos-toaster> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('opens a new success toast when custom event pharos-toast-open is fired', async () => {
    const trigger = document.createElement('button');
    trigger.addEventListener('click', fireOpenEvent);
    document.body.appendChild(trigger);

    trigger.click();
    await component.updateComplete;

    const toast = component.renderRoot.querySelector('pharos-toast');
    expect(toast).to.not.be.null;
  });

  it('can contain multiple open toasts', async () => {
    const trigger = document.createElement('button');
    trigger.addEventListener('click', fireOpenEvent);
    document.body.appendChild(trigger);

    trigger.click();
    await component.updateComplete;
    trigger.click();
    await component.updateComplete;
    await nextFrame();

    const toast = component.renderRoot.querySelectorAll('pharos-toast');
    expect(toast.length).to.equal(2);
  });

  it('delegates focus to a newly opened toast', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.addEventListener('click', fireOpenEvent);
    document.body.appendChild(trigger);

    trigger.click();
    await component.updateComplete;

    const toast = (
      component.renderRoot.querySelector('pharos-toast') as PharosToast
    )?.renderRoot.querySelector('.toast');
    expect(activeElement === toast).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('opens a new error toast when custom event pharos-toast-open is fired with a status', async () => {
    const trigger = document.createElement('button');
    trigger.addEventListener('click', fireErrorOpenEvent);
    document.body.appendChild(trigger);

    trigger.click();
    await component.updateComplete;

    const toast = component.renderRoot.querySelector('pharos-toast');
    expect(toast).to.not.be.null;
  });

  it('removes a toast when custom event pharos-toast-close is fired', async () => {
    const trigger = document.createElement('button');
    trigger.addEventListener('click', fireOpenEvent);
    document.body.appendChild(trigger);

    trigger.click();
    await component.updateComplete;

    const openToast = component.renderRoot.querySelector('pharos-toast');
    const details = {
      bubbles: true,
      composed: true,
      detail: openToast,
    };
    component.dispatchEvent(new CustomEvent('pharos-toast-close', details));
    await component.updateComplete;

    const toast = component.querySelector('pharos-toast');
    expect(toast).to.be.null;
  });

  it('can update an existing toast', async () => {
    const trigger = document.createElement('button');
    trigger.addEventListener('click', fireOpenUpdateableToastEvent);
    document.body.appendChild(trigger);
    trigger.click();
    await component.updateComplete;
    await nextFrame();

    const triggerUpdate = document.createElement('button');
    triggerUpdate.addEventListener('click', fireUpdateToastEvent);
    document.body.appendChild(triggerUpdate);
    triggerUpdate.click();
    await component.updateComplete;

    expect(component).shadowDom.to.equal(`
      <div class="toaster__container">
        <pharos-toast data-pharos-component="PharosToast" id="my-updateable-toast" indefinite="" open="" status="success">
          <div>
            Toast has been updated
          </div>
        </pharos-toast>
      </div>
    `);
  });

  it('can close an updateable toast', async () => {
    const trigger = document.createElement('button');
    trigger.addEventListener('click', fireOpenUpdateableToastEvent);
    document.body.appendChild(trigger);
    trigger.click();
    await component.updateComplete;
    await nextFrame();

    const triggerUpdate = document.createElement('button');
    triggerUpdate.addEventListener('click', fireUpdateToastEvent);
    document.body.appendChild(triggerUpdate);
    triggerUpdate.click();
    await component.updateComplete;

    const triggerClose = document.createElement('button');
    triggerClose.addEventListener('click', fireCloseToastEvent);
    document.body.appendChild(triggerClose);
    triggerClose.click();
    await component.updateComplete;
    await nextFrame();

    expect(component).shadowDom.to.equal(`
      <div class="toaster__container">
      </div>
    `);
  });

  it('can return focus to a specific element', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.addEventListener('click', () => {
      const event = new CustomEvent('pharos-toast-open', {
        detail: {
          content: 'I am a toast',
          returnElements: [trigger],
        },
      });
      document.dispatchEvent(event);
    });
    document.body.appendChild(trigger);
    trigger.click();
    await component.updateComplete;

    const openToast = component.querySelector('pharos-toast');
    const details = {
      bubbles: true,
      composed: true,
      detail: openToast,
    };
    component.dispatchEvent(new CustomEvent('pharos-toast-close', details));
    await component.updateComplete;

    expect(activeElement === trigger).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('can return focus to a fallback element', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.addEventListener('click', () => {
      const event = new CustomEvent('pharos-toast-open', {
        detail: {
          content: 'I am a toast',
          returnElements: [document.querySelector('#something-does-not-exist'), trigger],
        },
      });
      document.dispatchEvent(event);
    });
    document.body.appendChild(trigger);
    trigger.click();
    await component.updateComplete;

    const openToast = component.querySelector('pharos-toast');
    const details = {
      bubbles: true,
      composed: true,
      detail: openToast,
    };
    component.dispatchEvent(new CustomEvent('pharos-toast-close', details));
    await component.updateComplete;

    expect(activeElement === trigger).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });
});
