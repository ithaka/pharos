import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosCombobox } from './pharos-combobox';
import type { PharosTooltip } from '../tooltip/pharos-tooltip';
import type { PharosButton } from '../button/pharos-button';
import { PharosIcon } from '../icon/pharos-icon';
import createFormData from '../../utils/createFormData';

describe('pharos-combobox', () => {
  let component: PharosCombobox;

  afterEach(() => {
    document.body.replaceChildren();
  });

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when focused', async () => {
    component['_input'].dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('is accessible when disabled', async () => {
    component = await fixture(
      html`<test-pharos-combobox disabled
        ><span slot="label">test combobox</span></test-pharos-combobox
      >`
    );
    await expect(component).toBeAccessible();
  });

  it('is accessible when it has disabled options', async () => {
    component = await fixture(html`
      <test-pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);
    await expect(component).toBeAccessible();
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-combobox @change=${onChange}>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
      </test-pharos-combobox>
    `);

    component['_input'].value = 'test';
    component['_input'].dispatchEvent(new Event('input'));
    component['_input'].dispatchEvent(new Event('change'));

    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('updates the value, closes the dropdown list, and blurs the input when an option is clicked', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;

    options.forEach((option) => {
      if (option.innerText === 'Option 2') {
        option.dispatchEvent(new Event('click'));
      }
    });
    await component.updateComplete;

    expect(component.open).toBe(false);
    expect(component.value).toBe('2');
    expect(activeElement === component['_input']).toBe(false);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('leaves the dropdown list open when a disabled option is clicked', async () => {
    component = await fixture(html`
      <test-pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);

    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;

    options.forEach((option) => {
      if (option.innerText === 'Option 2') {
        option.dispatchEvent(new Event('click'));
      }
    });
    await component.updateComplete;

    expect(component.open).toBe(true);
  });

  it('does not update the value when a disabled option is clicked', async () => {
    component = await fixture(html`
      <test-pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);

    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;

    options.forEach((option) => {
      if (option.innerText === 'Option 2') {
        option.dispatchEvent(new Event('click'));
      }
    });
    await component.updateComplete;

    expect(component.value).toBe('');
  });

  it('renders disabled options with aria-disabled set to true', async () => {
    component = await fixture(html`
      <test-pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);
    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const disabledOption = component.renderRoot.querySelector(
      '.combobox__option[aria-disabled="true"]'
    ) as HTMLLIElement;
    expect(disabledOption).not.toBeNull();
    expect(disabledOption.innerText).toBe('Option 2');
  });

  it('skips disabled items when navigating with the arrow keys', async () => {
    component = await fixture(html`
      <test-pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2" disabled>Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);
    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;

    const expectedOption = Array.from(options)[2];

    expect(expectedOption.hasAttribute('highlighted')).toBe(true);
    expect(expectedOption.getAttribute('aria-selected')).toBe('true');
  });

  it('renders the clear button with tooltip when an option is selected', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    const clearButton = component.renderRoot.querySelector(
      '.combobox__clear-button'
    ) as PharosButton;
    const clearTooltip = component.renderRoot.querySelector(
      '[data-pharos-component="PharosTooltip"]'
    ) as PharosTooltip;

    expect(clearButton).not.toBeNull();
    expect(clearTooltip).not.toBeNull();
  });

  it('renders a checkmark on an option that has been selected', async () => {
    component['_input'].value = 'Option 2';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const matchingOption = component.renderRoot.querySelector('.combobox__option') as HTMLLIElement;

    matchingOption.click();

    component['_input'].dispatchEvent(new MouseEvent('click'));

    await vi.waitFor(() => {
      const selectedOption = component.renderRoot.querySelector(
        '.combobox__option--selected'
      ) as HTMLLIElement;
      expect(selectedOption).not.toBeNull();
    });

    const selectedOption = component.renderRoot.querySelector(
      '.combobox__option--selected'
    ) as HTMLLIElement;

    const checkmark = selectedOption.querySelector('.combobox__option__icon');
    expect(selectedOption).not.toBeNull();
    expect(checkmark instanceof PharosIcon).toBe(true);
  });

  it('reverts to the selected option on blur', async () => {
    component['_input'].dispatchEvent(new FocusEvent('focus'));
    await component.updateComplete;

    component['_input'].value = 'Option 2';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const matchingOption = component.renderRoot.querySelector('.combobox__option') as HTMLLIElement;
    matchingOption.click();

    component['_input'].value = 'Gobbledegook';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    component['_input'].dispatchEvent(new FocusEvent('blur'));

    await vi.waitFor(() => {
      expect(component.open).toBe(false);
    });

    expect(component.value).toBe('2');
    expect(component['_input'].value).toBe('Option 2');
  });

  it('does not revert when no option is selected', async () => {
    component['_input'].dispatchEvent(new FocusEvent('focus'));
    await component.updateComplete;

    component['_input'].value = 'Gobbledegook';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    component['_input'].dispatchEvent(new FocusEvent('blur'));

    await vi.waitFor(() => {
      expect(component.open).toBe(false);
    });

    expect(component.value).toBe('');
    expect(component['_input'].value).toBe('Gobbledegook');
  });

  it('query matches text when loose-match is enabled and query contains accent', async () => {
    component = await fixture(html`
      <test-pharos-combobox loose-match>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Oṕtion 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);
    component['_input'].value = 'Oṕtion';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const firstOption = options[0];
    const expectedHTML = '<mark class="combobox__mark">Option</mark> 1';
    const optionHTML = firstOption.innerHTML.replace(/<!--.*?-->/g, '').trim();

    expect(optionHTML).toBe(expectedHTML);
    expect(options.length).toBe(3);
  });

  it('highlights text in the option that match the query', async () => {
    component['_input'].value = 'o';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const firstOption = options[0];
    const expectedHTML =
      '<mark class="combobox__mark">O</mark>pti<mark class="combobox__mark">o</mark>n 1';
    const optionHTML = firstOption.innerHTML.replace(/<!--.*?-->/g, '').trim();

    expect(optionHTML).toBe(expectedHTML);
  });

  it('opens the list and highlights the first option when the down arrow key is pressed', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const firstOption = options[0];

    expect(component.open).toBe(true);
    expect(firstOption.hasAttribute('highlighted')).toBe(true);
    expect(firstOption.getAttribute('aria-selected')).toBe('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).toBe(firstOption.id);
  });

  it('opens the list and highlights the last option when the up arrow key is pressed', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const lastOption = options[options.length - 1];

    expect(component.open).toBe(true);
    expect(lastOption.hasAttribute('highlighted')).toBe(true);
    expect(lastOption.getAttribute('aria-selected')).toBe('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).toBe(lastOption.id);
  });

  it('highlights previous option when up arrow key is pressed', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const secondOption = options[1];

    expect(component.open).toBe(true);
    expect(secondOption.hasAttribute('highlighted')).toBe(true);
    expect(secondOption.getAttribute('aria-selected')).toBe('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).toBe(secondOption.id);
  });

  it('highlights the first option when moving forward from the last one', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const firstOption = options[0];

    expect(component.open).toBe(true);
    expect(firstOption.hasAttribute('highlighted')).toBe(true);
    expect(firstOption.getAttribute('aria-selected')).toBe('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).toBe(firstOption.id);
  });

  it('highlights the last option when moving backward from the first one', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const lastOption = options[options.length - 1];

    expect(component.open).toBe(true);
    expect(lastOption.hasAttribute('highlighted')).toBe(true);
    expect(lastOption.getAttribute('aria-selected')).toBe('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).toBe(lastOption.id);
  });

  it('selects an item in the list, updates the input value, and closes the list the input when the enter key is pressed', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
    expect(component['_input'].getAttribute('aria-activedescendant')).toBe('');
    expect(component.value).toBe('1');
  });

  it('clears the input and closes the list when the escape key is pressed', async () => {
    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
    expect(component.value).toBe('');
  });

  it('clears the input, closes the list, and returns focus to the input when the clear button is clicked', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const clearButton = component.renderRoot.querySelector(
      '.combobox__clear-button'
    ) as PharosButton;
    clearButton.click();
    await component.updateComplete;

    expect(component.open).toBe(false);
    expect(component.value).toBe('');
    expect(activeElement === component['_input']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('displays a "No results found" option when the entered text does not match any option', async () => {
    component['_input'].value = 'yay';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = Array.prototype.slice.call(
      component.renderRoot.querySelectorAll('.combobox__option')
    ) as HTMLLIElement[];

    expect(component.open).toBe(true);
    expect(component['_noResults']).toBe(true);
    expect(options.length).toBe(1);
    expect(options[0].innerText).toBe('No results found');
  });

  it('does not highlight "No results found" option when the down arrow key is pressed', async () => {
    component['_input'].value = 'yay';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const highlightedOption = component.renderRoot.querySelector(
      '.combobox__option[highlighted]'
    ) as HTMLLIElement;

    expect(component.open).toBe(true);
    expect(component['_noResults']).toBe(true);
    expect(highlightedOption).toBeNull();
  });

  it('opens the dropdown list on focus of the dropdown button', async () => {
    component['_button'].dispatchEvent(new MouseEvent('click'));
    await component.updateComplete;

    expect(component.open).toBe(true);
  });

  it('toggles the dropdown list on click of the input', async () => {
    component['_input'].dispatchEvent(new MouseEvent('click'));
    await component.updateComplete;
    expect(component.open).toBe(true);

    component['_input'].dispatchEvent(new MouseEvent('click'));
    await component.updateComplete;
    expect(component.open).toBe(false);
  });

  it('closes the dropdown list on blur of the dropdown button', async () => {
    component['_button'].dispatchEvent(new FocusEvent('focus'));
    await component.updateComplete;
    component['_button'].dispatchEvent(new FocusEvent('blur'));

    await vi.waitFor(() => {
      expect(component.open).toBe(false);
    });
  });

  it('closes the dropdown list on blur of the input', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Up' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new FocusEvent('blur'));

    await vi.waitFor(() => {
      expect(component.open).toBe(false);
    });
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-combobox name="my-combobox" value="1">
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </test-pharos-combobox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-combobox')).toBe('1');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-combobox name="my-combo" value="1" disabled>
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </test-pharos-combobox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-combobox')).toBeNull();
  });

  it('updates the displayed selection for asynchronously added options', async () => {
    component = await fixture(html`
      <test-pharos-combobox name="my-combobox" value="3">
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </test-pharos-combobox>
    `);

    const option = document.createElement('option');
    option.value = '3';
    option.text = 'Option 3';
    component.appendChild(option);

    await vi.waitFor(() => {
      expect(component['_input'].value).toBe('Option 3');
    });
  });

  it('does not update the displayed value when no matching options exist', async () => {
    component = await fixture(html`
      <test-pharos-combobox name="my-combobox" value="3">
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </test-pharos-combobox>
    `);
    expect(component['_input'].value).toBe('');
  });

  it('updates the displayed value when the value attribute changes', async () => {
    component = await fixture(html`
      <test-pharos-combobox name="my-combobox" value="2">
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </test-pharos-combobox>
    `);
    component.value = '1';

    await vi.waitFor(() => {
      expect(component['_input'].value).toBe('Option 1');
    });
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_input']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('resets its value when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-combobox name="my-combobox" value="1">
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </test-pharos-combobox>
      `,
      { parentNode }
    );

    component.value = '2';
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-combobox')).toBe('1');
  });

  it('sets the value on input in search mode', async () => {
    component = await fixture(html`
      <test-pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);

    component['_input'].value = 'this is not an option in the list, but it is valid';
    component['_input'].dispatchEvent(new Event('input'));

    expect(component.value).toBe('this is not an option in the list, but it is valid');
  });

  it('it does not highlight matching text in search mode', async () => {
    component = await fixture(html`
      <test-pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);

    component['_input'].value = 'o';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const firstOption = options[0];
    const expectedHTML = 'Option 1';
    const optionHTML = firstOption.innerHTML.replace(/<!--.*?-->/g, '').trim();

    expect(optionHTML).toBe(expectedHTML);
  });

  it('does not render a checkmark on selected options in search mode', async () => {
    component = await fixture(html`
      <test-pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);
    component['_input'].value = 'Option 2';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const matchingOption = component.renderRoot.querySelector('.combobox__option') as HTMLLIElement;

    matchingOption.click();

    const searchButton = component.renderRoot.querySelector('.search__button') as HTMLLIElement;

    searchButton.focus();
    await component.updateComplete;

    const selectedOption = component.renderRoot.querySelector(
      '.combobox__option--selected'
    ) as HTMLLIElement;

    expect(selectedOption).toBeNull();
  });

  it('does not filter search results in search mode', async () => {
    component = await fixture(html`
      <test-pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </test-pharos-combobox>
    `);
    component['_input'].value = 'yay';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = Array.prototype.slice.call(
      component.renderRoot.querySelectorAll('.combobox__option')
    ) as HTMLLIElement[];

    expect(component.open).toBe(true);
    expect(component['_noResults']).toBe(false);
    expect(options.length).toBe(3);
  });

  it('fires a change event when selecting a highlighted option in search mode', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };

    component = await fixture(html`
      <test-pharos-combobox search-mode @change=${onChange}>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
      </test-pharos-combobox>
    `);

    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('does not show a no results message when there are no matching options in search mode', async () => {
    component = await fixture(html`
      <test-pharos-combobox search-mode>
        <span slot="label">I am a label</span>
      </test-pharos-combobox>
    `);
    component['_input'].value = 'yay';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = Array.prototype.slice.call(
      component.renderRoot.querySelectorAll('.combobox__option')
    ) as HTMLLIElement[];

    expect(options.length).toBe(0);
  });

  it('will close the dropdown on enter when there is no option selected', async () => {
    component = await fixture(html`
      <test-pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
      </test-pharos-combobox>
    `);

    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    expect(component.open).toBe(false);
  });

  it('clears the displayed value when the value is cleared programmatically', async () => {
    component.value = '1';

    await vi.waitFor(() => {
      expect(component['_input'].value).toBe('Option 1');
    });

    component.value = '';

    await vi.waitFor(() => {
      expect(component['_input'].value).toBe('');
    });
  });
});
