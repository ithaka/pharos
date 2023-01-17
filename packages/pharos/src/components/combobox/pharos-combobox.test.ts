import { fixture, expect, aTimeout, elementUpdated } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosCombobox } from './pharos-combobox';
import type { PharosTooltip } from '../tooltip/pharos-tooltip';
import type { PharosButton } from '../button/pharos-button';
import { PharosIcon } from '../icon/pharos-icon';
import createFormData from '../../utils/createFormData';

describe('pharos-combobox', () => {
  let component: PharosCombobox;

  beforeEach(async () => {
    component = await fixture(
      html`
        <pharos-combobox>
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </pharos-combobox>
      `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when focused', async () => {
    component['_input'].dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).to.be.accessible();
  });

  it('is accessible when disabled', async () => {
    component = await fixture(
      html`<pharos-combobox disabled><span slot="label">test combobox</span></pharos-combobox>`
    );
    await expect(component).to.be.accessible();
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <pharos-combobox @change=${onChange}>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
      </pharos-combobox>
    `);

    component['_input'].value = 'test';
    component['_input'].dispatchEvent(new Event('input'));
    component['_input'].dispatchEvent(new Event('change'));

    expect((eventSource as Element).isSameNode(component)).to.be.true;
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

    expect(component.open).to.be.false;
    expect(component.value).to.equal('2');
    expect(activeElement === component['_input']).to.be.false;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('renders the clear button with tooltip when an option is selected', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    const clearButton = component.renderRoot.querySelector(
      '.combobox__clear-button'
    ) as PharosButton;
    const clearTooltip = component.renderRoot.querySelector('pharos-tooltip') as PharosTooltip;

    expect(clearButton).to.not.be.null;
    expect(clearTooltip).to.not.be.null;
  });

  it('renders a checkmark on an option that has been selected', async () => {
    component['_input'].value = 'Option 2';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const matchingOption = component.renderRoot.querySelector('.combobox__option') as HTMLLIElement;

    matchingOption.click();

    component['_input'].dispatchEvent(new MouseEvent('click'));
    await aTimeout(100);
    await component.updateComplete;

    const selectedOption = component.renderRoot.querySelector(
      '.combobox__option--selected'
    ) as HTMLLIElement;

    const checkmark = selectedOption.querySelector('.combobox__option__icon');
    expect(selectedOption).to.not.be.null;
    expect(checkmark instanceof PharosIcon).to.be.true;
  });

  it('reverts to the selected option on blur', async () => {
    component['_input'].dispatchEvent(new FocusEvent('focus'));
    await aTimeout(100);
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
    await aTimeout(100);
    await component.updateComplete;

    expect(component.value).to.equal('2');
    expect(component['_input'].value).to.equal('Option 2');
  });

  it('does not revert when no option is selected', async () => {
    component['_input'].dispatchEvent(new FocusEvent('focus'));
    await aTimeout(100);
    await component.updateComplete;

    component['_input'].value = 'Gobbledegook';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    component['_input'].dispatchEvent(new FocusEvent('blur'));
    await aTimeout(100);
    await component.updateComplete;

    expect(component.value).to.equal('');
    expect(component['_input'].value).to.equal('Gobbledegook');
  });

  it('query matches text when loose-match is enabled and query contains accent', async () => {
    component = await fixture(html`
      <pharos-combobox loose-match>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Oṕtion 2</option>
        <option value="3">Option 3</option>
      </pharos-combobox>
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

    expect(optionHTML).to.equal(expectedHTML);
    expect(options.length).to.equal(3);
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

    expect(optionHTML).to.equal(expectedHTML);
  });

  it('opens the list and highlights the first option when the down arrow key is pressed', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const firstOption = options[0];

    expect(component.open).to.be.true;
    expect(firstOption.hasAttribute('highlighted')).to.be.true;
    expect(firstOption.getAttribute('aria-selected')).to.equal('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).to.equal(firstOption.id);
  });

  it('opens the list and highlights the last option when the up arrow key is pressed', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;

    const options = component.renderRoot.querySelectorAll(
      '.combobox__option'
    ) as NodeListOf<HTMLLIElement>;
    const lastOption = options[options.length - 1];

    expect(component.open).to.be.true;
    expect(lastOption.hasAttribute('highlighted')).to.be.true;
    expect(lastOption.getAttribute('aria-selected')).to.equal('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).to.equal(lastOption.id);
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

    expect(component.open).to.be.true;
    expect(secondOption.hasAttribute('highlighted')).to.be.true;
    expect(secondOption.getAttribute('aria-selected')).to.equal('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).to.equal(secondOption.id);
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

    expect(component.open).to.be.true;
    expect(firstOption.hasAttribute('highlighted')).to.be.true;
    expect(firstOption.getAttribute('aria-selected')).to.equal('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).to.equal(firstOption.id);
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

    expect(component.open).to.be.true;
    expect(lastOption.hasAttribute('highlighted')).to.be.true;
    expect(lastOption.getAttribute('aria-selected')).to.equal('true');
    expect(component['_input'].getAttribute('aria-activedescendant')).to.equal(lastOption.id);
  });

  it('selects an item in the list, updates the input value, and closes the list the input when the enter key is pressed', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    expect(component.open).to.be.false;
    expect(component['_input'].getAttribute('aria-activedescendant')).to.equal('');
    expect(component.value).to.equal('1');
  });

  it('clears the input and closes the list when the escape key is pressed', async () => {
    component['_input'].value = 'Opt';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.open).to.be.false;
    expect(component.value).to.equal('');
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

    expect(component.open).to.be.false;
    expect(component.value).to.equal('');
    expect(activeElement === component['_input']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('displays a "No results found" option when the entered text does not match any option', async () => {
    component['_input'].value = 'yay';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = Array.prototype.slice.call(
      component.renderRoot.querySelectorAll('.combobox__option')
    ) as HTMLLIElement[];

    expect(component.open).to.be.true;
    expect(component['_noResults']).to.be.true;
    expect(options.length).to.equal(1);
    expect(options[0].innerText).to.equal('No results found');
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

    expect(component.open).to.be.true;
    expect(component['_noResults']).to.be.true;
    expect(highlightedOption).to.be.null;
  });

  it('opens the dropdown list on focus of the dropdown button', async () => {
    component['_button'].dispatchEvent(new MouseEvent('click'));
    await aTimeout(100);
    await component.updateComplete;

    expect(component.open).to.be.true;
  });

  it('toggles the dropdown list on click of the input', async () => {
    component['_input'].dispatchEvent(new MouseEvent('click'));
    await component.updateComplete;
    expect(component.open).to.be.true;

    component['_input'].dispatchEvent(new MouseEvent('click'));
    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('closes the dropdown list on blur of the dropdown button', async () => {
    component['_button'].dispatchEvent(new FocusEvent('focus'));
    await aTimeout(100);
    await component.updateComplete;
    component['_button'].dispatchEvent(new FocusEvent('blur'));
    await aTimeout(100);
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('closes the dropdown list on blur of the input', async () => {
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Up' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new FocusEvent('blur'));
    await aTimeout(100);
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-combobox name="my-combobox" value="1">
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </pharos-combobox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-combobox')).to.equal('1');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-combobox name="my-combo" value="1" disabled>
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </pharos-combobox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-combobox')).to.be.null;
  });

  it('updates the displayed selection for asynchronously added options', async () => {
    component = await fixture(
      html`
        <pharos-combobox name="my-combobox" value="3">
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </pharos-combobox>
      `
    );

    const option = document.createElement('option');
    option.value = '3';
    option.text = 'Option 3';
    component.appendChild(option);
    await elementUpdated(component);

    expect(component['_input'].value).to.equal('Option 3');
  });

  it('does not update the displayed value when no matching options exist', async () => {
    component = await fixture(
      html`
        <pharos-combobox name="my-combobox" value="3">
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </pharos-combobox>
      `
    );
    expect(component['_input'].value).to.equal('');
  });

  it('updates the displayed value when the value attribute changes', async () => {
    component = await fixture(
      html`
        <pharos-combobox name="my-combobox" value="2">
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </pharos-combobox>
      `
    );
    component.value = '1';
    await elementUpdated(component);

    expect(component['_input'].value).to.equal('Option 1');
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_input']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('resets its value when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-combobox name="my-combobox" value="1">
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </pharos-combobox>
      `,
      { parentNode }
    );

    component.value = '2';
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-combobox')).to.equal('1');
  });

  it('sets the value on input in search mode', async () => {
    component = await fixture(html`
      <pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pharos-combobox>
    `);

    component['_input'].value = 'this is not an option in the list, but it is valid';
    component['_input'].dispatchEvent(new Event('input'));

    expect(component.value).to.equal('this is not an option in the list, but it is valid');
  });

  it('it does not highlight matching text in search mode', async () => {
    component = await fixture(html`
      <pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pharos-combobox>
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

    expect(optionHTML).to.equal(expectedHTML);
  });

  it('does not render a checkmark on selected options in search mode', async () => {
    component = await fixture(html`
      <pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pharos-combobox>
    `);
    component['_input'].value = 'Option 2';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const matchingOption = component.renderRoot.querySelector('.combobox__option') as HTMLLIElement;

    matchingOption.click();

    const searchButton = component.renderRoot.querySelector('.search__button') as HTMLLIElement;

    searchButton.focus();
    await aTimeout(100);
    await component.updateComplete;

    const selectedOption = component.renderRoot.querySelector(
      '.combobox__option--selected'
    ) as HTMLLIElement;

    expect(selectedOption).to.be.null;
  });

  it('does not filter search results in search mode', async () => {
    component = await fixture(html`
      <pharos-combobox search-mode>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pharos-combobox>
    `);
    component['_input'].value = 'yay';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = Array.prototype.slice.call(
      component.renderRoot.querySelectorAll('.combobox__option')
    ) as HTMLLIElement[];

    expect(component.open).to.be.true;
    expect(component['_noResults']).to.be.false;
    expect(options.length).to.equal(3);
  });

  it('fires a change event when selecting a highlighted option in search mode', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };

    component = await fixture(html`
      <pharos-combobox search-mode @change=${onChange}>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
      </pharos-combobox>
    `);

    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;
    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).to.be.true;
  });

  it('does not show a no results message when there are no matching options in search mode', async () => {
    component = await fixture(html`
      <pharos-combobox search-mode>
        <span slot="label">I am a label</span>
      </pharos-combobox>
    `);
    component['_input'].value = 'yay';
    component['_input'].dispatchEvent(new Event('input'));
    await component.updateComplete;

    const options = Array.prototype.slice.call(
      component.renderRoot.querySelectorAll('.combobox__option')
    ) as HTMLLIElement[];

    expect(options.length).to.equal(0);
  });

  it('will close the dropdown on enter when there is no option selected', async () => {
    component = await fixture(html`
      <pharos-combobox>
        <span slot="label">I am a label</span>
        <option value="1">Option 1</option>
      </pharos-combobox>
    `);

    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('clears the displayed value when the value is cleared programmatically', async () => {
    component.value = '1';
    await elementUpdated(component);

    component.value = '';
    await elementUpdated(component);

    expect(component['_input'].value).to.equal('');
  });
});
