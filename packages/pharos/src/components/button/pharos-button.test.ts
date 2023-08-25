import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosButton } from './pharos-button';
import type { PharosTextInput } from '../text-input/pharos-text-input';
import createFormData from '../../utils/createFormData';
import { PharosColorBlack } from '../../styles/variables';

describe('pharos-button', () => {
  let component: PharosButton;

  beforeEach(async () => {
    component = await fixture(html` <test-pharos-button>I am a button</test-pharos-button> `);
  });

  describe('Accessibility', () => {
    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('is accessible as a button link', async () => {
      component.href = 'https://google.com';
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible as an icon button', async () => {
      component.icon = 'download';
      component.a11yLabel = 'download';
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible when disabled', async () => {
      component.disabled = true;
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible as the secondary variant', async () => {
      component.variant = 'secondary';
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible as the subtle variant', async () => {
      component.variant = 'subtle';
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible as the overlay variant', async () => {
      component.variant = 'overlay';
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible on a AA compliant background', async () => {
      const parentNode = document.createElement('div');
      parentNode.style.backgroundColor = PharosColorBlack;

      component = await fixture(
        html`<test-pharos-button on-background>I am a button</test-pharos-button>`,
        {
          parentNode,
        }
      );
      await expect(component).to.be.accessible();
    });

    it('is accessible on a AA compliant background as the secondary variant', async () => {
      const parentNode = document.createElement('div');
      parentNode.style.backgroundColor = PharosColorBlack;

      component = await fixture(
        html`<test-pharos-button variant="secondary" on-background
          >I am a button</test-pharos-button
        >`,
        {
          parentNode,
        }
      );
      await expect(component).to.be.accessible();
    });

    it('is accessible on a AA compliant background as the subtle variant', async () => {
      const parentNode = document.createElement('div');
      parentNode.style.backgroundColor = PharosColorBlack;

      component = await fixture(
        html`<test-pharos-button variant="subtle" on-background>I am a button</test-pharos-button>`,
        {
          parentNode,
        }
      );
      await expect(component).to.be.accessible();
    });

    it('is accessible on a AA compliant background as the overlay variant', async () => {
      const parentNode = document.createElement('div');
      parentNode.style.backgroundColor = PharosColorBlack;

      component = await fixture(
        html`<test-pharos-button variant="overlay" on-background
          >I am a button</test-pharos-button
        >`,
        {
          parentNode,
        }
      );
      await expect(component).to.be.accessible();
    });

    it('is accessible when pressed', async () => {
      component = await fixture(
        html`<test-pharos-button pressed="true">I am a pressed button</test-pharos-button>`
      );
      await expect(component).to.be.accessible();
    });
  });

  describe('API', () => {
    it('is able to delegate focus', async () => {
      let activeElement = null;
      const onFocusIn = (event: Event): void => {
        activeElement = event.composedPath()[0];
      };
      document.addEventListener('focusin', onFocusIn);

      component.focus();
      const button = component.renderRoot.querySelector('#button-element');

      expect(activeElement === button).to.be.true;
      document.removeEventListener('focusin', onFocusIn);
    });

    it('throws an error for an invalid type value', async () => {
      component = await fixture(html`
        <test-pharos-button type="fake">I am a button</test-pharos-button>
      `).catch((e) => e);
      expect('fake is not a valid type. Valid types are: button, submit, reset').to.be.thrown;
    });

    it('throws an error for an invalid variant value', async () => {
      component = await fixture(html`
        <test-pharos-button variant="fake">I am a button</test-pharos-button>
      `).catch((e) => e);
      expect('fake is not a valid variant. Valid variants are: primary, secondary, subtle').to.be
        .thrown;
    });

    it('allows for an icon to be shown as the content of the button', async () => {
      component.icon = 'download';
      await component.updateComplete;

      const icon = component.renderRoot.querySelector(
        `[data-pharos-component="PharosIcon"][name='download']`
      );
      expect(icon).not.to.be.null;
    });

    it('allows for an icon to be shown on the left', async () => {
      component.iconLeft = 'view-gallery';
      await component.updateComplete;

      const icon = component.renderRoot.querySelector(
        `[data-pharos-component="PharosIcon"][name='view-gallery']`
      );
      expect(icon).not.to.be.null;
    });

    it('allows for an icon to be shown on the right', async () => {
      component.iconRight = 'chevron-down';
      await component.updateComplete;

      const icon = component.renderRoot.querySelector(
        `[data-pharos-component="PharosIcon"][name='chevron-down']`
      );
      expect(icon).not.to.be.null;
    });

    it('allows for an icon to be shown on the left and right', async () => {
      component.iconLeft = 'view-gallery';
      component.iconRight = 'chevron-down';
      await component.updateComplete;

      const leftIcon = component.renderRoot.querySelector(
        `[data-pharos-component="PharosIcon"][name='view-gallery']`
      );
      const rightIcon = component.renderRoot.querySelector(
        `[data-pharos-component="PharosIcon"][name='chevron-down']`
      );
      expect(leftIcon).not.to.be.null;
      expect(rightIcon).not.to.be.null;
    });
  });

  describe('User interaction', () => {
    it('clicks the button link when the space key is pressed', async () => {
      let count = 0;
      const onClick = (): void => {
        count++;
      };
      component = await fixture(html`
        <test-pharos-button href="#" @click=${onClick}>I am a button link</test-pharos-button>
      `);

      component['_button'].dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
      await component.updateComplete;

      expect(count).to.equal(1);
    });

    it('submits a form when type is set to "submit"', async () => {
      const parentNode = document.createElement('form');
      let formdata = new FormData();
      parentNode.setAttribute('name', 'my-form');

      const submitButton = document.createElement('test-pharos-button') as PharosButton;
      submitButton.type = 'submit';
      submitButton.appendChild(document.createTextNode('I am a button'));
      parentNode.appendChild(submitButton);

      component = await fixture(
        html`
          <test-pharos-text-input name="my-input" value="test">
            <span slot="label">I am a label</span>
          </test-pharos-text-input>
        `,
        { parentNode }
      );

      const form = document.querySelector('form');
      form?.addEventListener('submit', (event) => {
        event.preventDefault();
        formdata = createFormData(parentNode as HTMLFormElement);
      });

      submitButton?.click();
      await component.updateComplete;

      expect(formdata.get('my-input')).to.equal('test');
    });

    it('resets a form when type is set to "reset"', async () => {
      const parentNode = document.createElement('form');
      let formdata = new FormData();
      parentNode.setAttribute('name', 'my-form');

      const resetButton = document.createElement('test-pharos-button') as PharosButton;
      resetButton.type = 'reset';
      resetButton.appendChild(document.createTextNode('I am a button'));
      parentNode.appendChild(resetButton);

      component = await fixture(
        html`
          <test-pharos-text-input name="my-input" value="test">
            <span slot="label">I am a label</span>
          </test-pharos-text-input>
        `,
        { parentNode }
      );

      const input = document.querySelector('test-pharos-text-input') as PharosTextInput;
      if (input) {
        input.value = 'otherValue';
      }
      await component.updateComplete;

      const form = document.querySelector('form');
      form?.addEventListener('reset', (event) => {
        event.preventDefault();
        formdata = createFormData(parentNode as HTMLFormElement);
      });

      resetButton?.click();
      await component.updateComplete;

      expect(formdata.get('my-input')).to.equal('test');
    });

    it('prevents leaking click events in a form', async () => {
      const parentNode = document.createElement('form');
      let leak = false;
      parentNode.setAttribute('name', 'my-form');

      const submitButton = document.createElement('test-pharos-button') as PharosButton;
      submitButton.type = 'submit';
      submitButton.appendChild(document.createTextNode('I am a button'));
      parentNode.appendChild(submitButton);

      component = await fixture(
        html`
          <test-pharos-text-input name="my-input" value="test">
            <span slot="label">I am a label</span>
          </test-pharos-text-input>
        `,
        { parentNode }
      );

      const form = document.querySelector('form');
      form?.addEventListener('click', (event) => {
        if (event.target instanceof HTMLButtonElement) {
          leak = true;
        }
      });
      form?.addEventListener('submit', (event) => {
        event.preventDefault();
      });

      submitButton?.click();
      await component.updateComplete;

      expect(leak).to.be.false;
    });

    it('allows clicks to be canceled when in a form and type is set to "submit"', async () => {
      const parentNode = document.createElement('form');
      let formdata = new FormData();
      parentNode.setAttribute('name', 'my-form');

      const submitButton = document.createElement('test-pharos-button') as PharosButton;
      submitButton.type = 'submit';
      submitButton.appendChild(document.createTextNode('I am a button'));
      submitButton.addEventListener('click', (event) => {
        event.preventDefault();
      });
      parentNode.appendChild(submitButton);

      component = await fixture(
        html`
          <test-pharos-text-input name="my-input" value="test">
            <span slot="label">I am a label</span>
          </test-pharos-text-input>
        `,
        { parentNode }
      );

      const form = document.querySelector('form');
      form?.addEventListener('submit', (event) => {
        event.preventDefault();
        formdata = createFormData(parentNode as HTMLFormElement);
      });

      submitButton?.click();
      await component.updateComplete;

      expect(formdata.get('my-input')).to.be.null;
    });
  });
});
