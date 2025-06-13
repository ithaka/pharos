import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosMultiselectDropdown } from './pharos-multiselect-dropdown';
import type { PharosButton } from '../button/pharos-button';
import type { PharosCheckbox } from '../checkbox/pharos-checkbox';
import createFormData from '../../utils/createFormData';
const setupComponent = async (
  options: { open?: boolean; disabled?: boolean; looseMatch?: boolean; hideSelectAll?: boolean } = {
    open: false,
  }
): Promise<PharosMultiselectDropdown> => {
  const component = (await fixture(html`
    <test-pharos-multiselect-dropdown
      ?disabled=${options.disabled}
      ?loose-match=${options.looseMatch}
      ?hide-select-all=${options.hideSelectAll}
    >
      <span slot="label">I am a label</span>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="alt_1">Alternative 1</option>
      <option value="alt_2">Alternative 2</option>
      <option value="alt_3">Alternative 3</option>
    </test-pharos-multiselect-dropdown>
  `)) as PharosMultiselectDropdown;
  if (options.open) {
    component['_open'] = true;
    await component.updateComplete;
  }
  return component;
};

describe('PharosMultiselectDropdown', () => {
  let component: PharosMultiselectDropdown;

  describe('Accessibility', () => {
    it('should be accessible when closed', async () => {
      const component = await setupComponent();
      await expect(component).to.be.accessible();
    });

    it('should be accessible when open', async () => {
      const component = await setupComponent({ open: true });
      await expect(component).to.be.accessible();
    });
    it('should be accessible when disabled', async () => {
      const component = await setupComponent({ disabled: true });
      await expect(component).to.be.accessible();
    });
  });

  describe('Dropdown open/close behavior', () => {
    it('opens when the dropdown button is clicked', async () => {
      const component = await setupComponent();
      const button = component.renderRoot.querySelector('button');
      expect(button).to.exist;

      button!.click();
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(component['_open']).to.be.true;
      expect(searchInput).to.be.visible;
    });

    it('opens when pressing Enter on the dropdown button', async () => {
      const component = await setupComponent();
      const button = component.renderRoot.querySelector('button');
      expect(button).to.exist;

      button!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(searchInput).to.be.visible;
    });

    it('opens when pressing Space on the dropdown button', async () => {
      const component = await setupComponent();
      const button = component.renderRoot.querySelector('button');
      expect(button).to.exist;

      button!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space' }));
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(searchInput).to.be.visible;
    });

    it('does not open when clicked if disabled', async () => {
      const component = await setupComponent({ disabled: true });
      const button = component.renderRoot.querySelector('button');
      expect(button).to.exist;

      button!.click();
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(component['_open']).to.be.false;
      expect(searchInput).not.to.exist;
    });

    it('does not open when pressing Enter if disabled', async () => {
      const component = await setupComponent({ disabled: true });
      const button = component.renderRoot.querySelector('button');
      expect(button).to.exist;

      button!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(component['_open']).to.be.false;
      expect(searchInput).not.to.exist;
    });

    it('does not open when pressing Space if disabled', async () => {
      const component = await setupComponent({ disabled: true });
      const button = component.renderRoot.querySelector('button');
      expect(button).to.exist;

      button!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space' }));
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(component['_open']).to.be.false;
      expect(searchInput).not.to.exist;
    });

    it('closes when clicking the dropdown button while open', async () => {
      const component = await setupComponent({ open: true });

      const button = component.renderRoot.querySelector('button');
      button!.click();
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(component['_open']).to.be.false;
      expect(searchInput).not.to.exist;
    });

    it('closes when pressing Escape in the search input', async () => {
      const component = await setupComponent({ open: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      expect(searchInput).to.exist;

      searchInput!.focus();
      searchInput!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await component.updateComplete;

      expect(component['_open']).to.be.false;
    });

    it('closes when pressing Escape on the cancel button', async () => {
      const component = await setupComponent({ open: true });

      const cancelButton = component.renderRoot.querySelector('#cancel-button') as PharosButton;
      expect(cancelButton).to.exist;

      cancelButton.focus();
      cancelButton!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await component.updateComplete;

      expect(component['_open']).to.be.false;
    });

    it('closes when pressing Escape on the apply button', async () => {
      const component = await setupComponent({ open: true });

      const cancelButton = component.renderRoot.querySelector('#apply-button') as PharosButton;
      expect(cancelButton).to.exist;

      cancelButton.focus();
      cancelButton!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await component.updateComplete;

      expect(component['_open']).to.be.false;
    });
    it('focuses the search input when opening the dropdown', async () => {
      const component = await setupComponent();
      let activeElement = null;
      const onFocusIn = (event: Event): void => {
        activeElement = event.composedPath()[0];
      };
      document.addEventListener('focusin', onFocusIn);

      component['_open'] = true;
      await component.updateComplete;

      const searchInput = component.renderRoot.querySelector('#multiselect-dropdown__search-input');
      expect(activeElement === searchInput).to.be.true;
    });

    it('focuses the dropdown button when closing the dropdown', async () => {
      const component = await setupComponent();
      let activeElement = null;
      const onFocusIn = (event: Event): void => {
        activeElement = event.composedPath()[0];
      };
      document.addEventListener('focusin', onFocusIn);

      component['_open'] = true;
      await component.updateComplete;

      component['_open'] = false;
      await component.updateComplete;

      const button = component.renderRoot.querySelector('button');
      expect(activeElement === button).to.be.true;
    });

    it('shows "None Selected" when no options are selected', async () => {
      const component = await setupComponent();
      component.displayCharacterCount = 10;
      component['_open'] = true;
      await component.updateComplete;

      await component.updateComplete;
      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;
      applyButton.click();
      await component.updateComplete;
      const button = component.renderRoot.querySelector('button');
      expect(button?.innerText.trim()).to.equal('None Selected');
    });
    it('shows a comma-separated list when selected options fit within displayCharacterCount', async () => {
      const component = await setupComponent({ open: true });

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;

      options[1].click();
      options[2].click();
      await component.updateComplete;
      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;
      applyButton.click();
      await component.updateComplete;
      const button = component.renderRoot.querySelector('button');
      expect(button?.innerText.trim()).to.equal('Option 1, Option 2');
    });

    it('shows "N Selected" when selected options exceed displayCharacterCount', async () => {
      const component = await setupComponent();
      component.displayCharacterCount = 10;
      component['_open'] = true;
      await component.updateComplete;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;

      options[1].click();
      options[2].click();
      await component.updateComplete;
      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;
      applyButton.click();
      await component.updateComplete;
      const button = component.renderRoot.querySelector('button');
      expect(button?.innerText.trim()).to.equal('2 Selected');
    });

    it('shows "All Selected" when all options are selected', async () => {
      const component = await setupComponent({ open: true });

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;

      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;

      options[0].click(); // Toggle Select all
      applyButton.click();
      await component.updateComplete;
      const button = component.renderRoot.querySelector('button');
      expect(button?.innerText.trim()).to.equal('All Selected');
    });
  });

  describe('Option search and filtering', () => {
    it('filters options based on the search input', async () => {
      const component = await setupComponent({ open: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      expect(searchInput).to.exist;

      searchInput.value = 'Alternative';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.dispatchEvent(new Event('change'));
      await component.updateComplete;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      expect(options.length).to.equal(4); // 1 "select all" + 3 matching options
      expect(options[1].innerText.trim()).to.equal('Alternative 1');
      expect(options[2].innerText.trim()).to.equal('Alternative 2');
      expect(options[3].innerText.trim()).to.equal('Alternative 3');
    });

    it('highlights matching text in options using <mark>', async () => {
      const component = await setupComponent({ open: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      expect(searchInput).to.exist;
      searchInput.value = 'o';
      searchInput.dispatchEvent(new Event('input'));
      await component.updateComplete;

      const optionLabels = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option-label'
      );
      const expectedHTML =
        '<mark class="multiselect-dropdown__mark">O</mark>pti<mark class="multiselect-dropdown__mark">o</mark>n 1';
      const optionHTML = optionLabels[1].innerHTML.replace(/<!--.*?-->/g, '').trim();
      expect(optionHTML).to.equal(expectedHTML);
    });

    it('shows "No results found" when no options match the search', async () => {
      const component = await setupComponent({ open: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      expect(searchInput).to.exist;
      searchInput.value = 'nonexistent';
      searchInput.dispatchEvent(new Event('input'));

      await component.updateComplete;
      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      expect(options.length).to.equal(0);

      const noResultMessage = component.renderRoot.querySelector(
        '.multiselect-dropdown__no-options'
      ) as HTMLLIElement;

      expect(noResultMessage.innerText.trim()).to.equal('No results found');
    });
    it('performs strict matching when looseMatch is false', async () => {
      const component = await setupComponent({ open: true, looseMatch: false });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      expect(searchInput).to.exist;
      searchInput.value = 'Ö';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.dispatchEvent(new Event('change'));
      await component.updateComplete;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      expect(options.length).to.equal(0);
    });

    it('normalizes and matches search terms when looseMatch is true', async () => {
      const component = await setupComponent({ open: true, looseMatch: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      expect(searchInput).to.exist;
      searchInput.value = 'Ö';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.dispatchEvent(new Event('change'));
      await component.updateComplete;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      expect(options.length).to.equal(4);
      expect(options[1].innerText.trim()).to.equal('Option 1');
    });
    it('highlights the first option when pressing ArrowDown in the search input', async () => {
      const component = await setupComponent({ open: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;

      const firstOption = options[0];
      expect(firstOption.hasAttribute('highlighted')).to.be.false;

      searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await component.updateComplete;

      expect(firstOption.hasAttribute('highlighted')).to.be.true;
    });

    it('highlights the last option when pressing ArrowUp in the search input', async () => {
      const component = await setupComponent({ open: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      const lastOption = options[options.length - 1];

      expect(lastOption.hasAttribute('highlighted')).to.be.false;

      searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await component.updateComplete;

      expect(lastOption.hasAttribute('highlighted')).to.be.true;
    });

    it('wraps highlight to the last option when pressing ArrowUp on the first option', async () => {
      const component = await setupComponent({ open: true });

      const searchInput = component.renderRoot.querySelector(
        '#multiselect-dropdown__search-input'
      ) as HTMLInputElement;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;

      const firstOption = options[0];
      const lastOption = options[options.length - 1];

      firstOption.setAttribute('highlighted', 'true');

      searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await component.updateComplete;

      expect(firstOption.hasAttribute('highlighted')).to.be.false;
      expect(lastOption.hasAttribute('highlighted')).to.be.true;
    });
  });

  describe('Option selection', () => {
    describe('Bulk selection', () => {
      it('shows a "select all" option when nothing is selected', async () => {
        const component = await setupComponent({ open: true });

        const selectAllOption = component.renderRoot.querySelector(
          '.multiselect-dropdown__select-all'
        ) as PharosCheckbox;

        const selectAllOptionLabel = component.renderRoot.querySelector(
          '.multiselect-dropdown__select-all .multiselect-dropdown__option-label'
        ) as HTMLElement;

        expect(selectAllOption.getAttribute('aria-selected')).to.equal('false');
        expect(selectAllOptionLabel.innerText.trim()).to.equal('Select all 6');
      });

      it('shows the correct count in the select all option label', async () => {
        const component = await setupComponent({ open: true });
        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;
        const searchInput = component.renderRoot.querySelector(
          '#multiselect-dropdown__search-input'
        ) as HTMLInputElement;

        expect(searchInput).to.exist;
        expect(options[0].innerText.trim()).to.equal('Select all 6');

        searchInput.value = 'Alternative';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.dispatchEvent(new Event('change'));
        await component.updateComplete;
        expect(options[0].innerText.trim()).to.equal('Select all 3');
      });

      it('hides the select all option when only one option matches', async () => {
        const component = await setupComponent({ open: true });

        const searchInput = component.renderRoot.querySelector(
          '#multiselect-dropdown__search-input'
        ) as HTMLInputElement;

        expect(searchInput).to.exist;
        searchInput.value = 'Alternative 1';
        searchInput.dispatchEvent(new Event('input'));

        await component.updateComplete;
        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;
        expect(options.length).to.equal(1);
        expect(options[0].innerText.trim()).to.equal('Alternative 1');
      });

      it('selects all options when clicking the select all option', async () => {
        const component = await setupComponent({ open: true });

        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;

        const selectAllOption = component.renderRoot.querySelector(
          '.multiselect-dropdown__select-all'
        ) as HTMLLIElement;
        selectAllOption.click();
        await component.updateComplete;

        const selectAllLabel = selectAllOption.querySelector('.multiselect-dropdown__option-label');
        expect(selectAllLabel?.textContent?.trim()).to.equal('Deselect 6');
        expect(selectAllOption.getAttribute('aria-selected')).to.equal('true');

        options.forEach((option, index) => {
          if (index > 0) {
            expect(option.getAttribute('aria-selected')).to.equal('true');
          }
        });
      });

      it('deselects all options when clicking the select all option when selected', async () => {
        const component = await setupComponent({ open: true });

        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;

        const selectAllOption = component.renderRoot.querySelector(
          '.multiselect-dropdown__select-all'
        ) as HTMLLIElement;
        const selectAllLabel = selectAllOption.querySelector('.multiselect-dropdown__option-label');

        selectAllOption.click();
        await component.updateComplete;

        expect(selectAllLabel?.textContent?.trim()).to.equal('Deselect 6');
        options.forEach((option, index) => {
          if (index > 0) {
            expect(option.getAttribute('aria-selected')).to.equal('true');
          }
        });

        selectAllOption.click();
        await component.updateComplete;

        expect(selectAllLabel?.textContent?.trim()).to.equal('Select all 6');
        expect(selectAllOption.getAttribute('aria-selected')).to.equal('false');

        options.forEach((option, index) => {
          if (index > 0) {
            expect(option.getAttribute('aria-selected')).to.equal('false');
          }
        });
      });

      it('selects all options when pressing Enter on the select all option when highlighted', async () => {
        const component = await setupComponent({ open: true });

        const searchInput = component.renderRoot.querySelector(
          '#multiselect-dropdown__search-input'
        ) as HTMLInputElement;

        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;

        const selectAllOption = component.renderRoot.querySelector(
          '.multiselect-dropdown__select-all'
        ) as HTMLLIElement;
        selectAllOption.setAttribute('highlighted', 'true');
        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await component.updateComplete;

        const selectAllLabel = selectAllOption.querySelector('.multiselect-dropdown__option-label');
        expect(selectAllLabel?.textContent?.trim()).to.equal('Deselect 6');
        expect(selectAllOption.getAttribute('aria-selected')).to.equal('true');

        options.forEach((option, index) => {
          if (index > 0) {
            expect(option.getAttribute('aria-selected')).to.equal('true');
          }
        });
      });
      it('does not show a select all option when hideSelectAll is true', async () => {
        const component = await setupComponent({ open: true, hideSelectAll: true });

        const selectAllOption = component.renderRoot.querySelector(
          '.multiselect-dropdown__select-all'
        ) as PharosCheckbox;

        expect(selectAllOption).not.to.exist;
      });
    });

    describe('Individual selection', () => {
      it('marks options as selected if the slotted option element has the selected attribute', async () => {
        component = await fixture(html`
          <test-pharos-multiselect-dropdown>
            <span slot="label">I am a label</span>
            <option value="1" selected>Option 1</option>
            <option value="1">Option 2</option>
          </test-pharos-multiselect-dropdown>
        `);

        component['_open'] = true;
        await component.updateComplete;
        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;
        expect(options[1].getAttribute('aria-selected')).to.equal('true');
        expect(options[2].getAttribute('aria-selected')).to.equal('false');
      });

      it('selects an option when it is clicked', async () => {
        const component = await setupComponent({ open: true });

        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;

        const firstOption = options[1]; //skip the select all option
        expect(firstOption.getAttribute('aria-selected')).to.equal('false');
        firstOption.click();
        await component.updateComplete;
        expect(firstOption.getAttribute('aria-selected')).to.equal('true');
      });

      it('deselects an option when it is clicked again', async () => {
        component = await fixture(html`
          <test-pharos-multiselect-dropdown>
            <span slot="label">I am a label</span>
            <option value="1" selected>Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </test-pharos-multiselect-dropdown>
        `);

        component['_open'] = true;
        await component.updateComplete;

        component['_open'] = true;
        await component.updateComplete;

        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;

        const firstOption = options[1]; //skip the select all option
        expect(firstOption.getAttribute('aria-selected')).to.equal('true');
        firstOption.click();
        await component.updateComplete;
        expect(firstOption.getAttribute('aria-selected')).to.equal('false');
      });

      it('selects the highlighted option when pressing Enter in the search input', async () => {
        const component = await setupComponent({ open: true });

        const searchInput = component.renderRoot.querySelector(
          '#multiselect-dropdown__search-input'
        ) as HTMLInputElement;

        const options = component.renderRoot.querySelectorAll(
          '.multiselect-dropdown__option'
        ) as NodeListOf<HTMLLIElement>;

        options[1].setAttribute('highlighted', 'true');

        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await component.updateComplete;

        expect(options[1].getAttribute('aria-selected')).to.equal('true');
      });
    });
  });

  describe('Applying and cancelling selection', () => {
    it('updates selectedOptions when clicking Apply', async () => {
      const component = await setupComponent({ open: true });

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;

      options[1].click();
      options[3].click();
      options[5].click();
      applyButton.click();
      await component.updateComplete;

      expect(component.selectedOptions.length).to.equal(3);
      expect(component.selectedOptions[0]).to.equal(component.options[0]);
      expect(component.selectedOptions[1]).to.equal(component.options[2]);
      expect(component.selectedOptions[2]).to.equal(component.options[4]);
    });

    it('updates selectedOptions when clicking Apply with multiple options', async () => {
      const component = await setupComponent({ open: true });

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;

      options[1].click();
      options[3].click();
      options[5].click();
      applyButton.click();
      await component.updateComplete;

      expect(component.selectedOptions.length).to.equal(3);
      expect(component.selectedOptions[0]).to.equal(component.options[0]);
      expect(component.selectedOptions[1]).to.equal(component.options[2]);
      expect(component.selectedOptions[2]).to.equal(component.options[4]);
    });

    it('does not update selectedOptions when clicking Cancel', async () => {
      const component = await setupComponent({ open: true });

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      const cancelButton = component.renderRoot.querySelector('#cancel-button') as PharosButton;

      options[1].click();
      options[3].click();
      options[5].click();
      cancelButton.click();
      await component.updateComplete;

      expect(component.selectedOptions.length).to.equal(0);
    });
    it('fires a change event when selection is applied', async () => {
      let eventSource = null as Element | null;
      const onChange = (event: Event): void => {
        eventSource = event.composedPath()[0] as Element;
      };
      component = await fixture(html`
        <test-pharos-multiselect-dropdown @change=${onChange}>
          <span slot="label">I am a label</span>
          <option value="1">Option 1</option>
          <option value="1">Option 2</option>
        </test-pharos-multiselect-dropdown>
      `);
      component['_open'] = true;
      await component.updateComplete;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;

      options[1].click();
      applyButton.click();
      await component.updateComplete;

      expect((eventSource as Element).isSameNode(component)).to.be.true;
    });
  });
  describe('Form integration', () => {
    it('adds each selected value to the form data', async () => {
      const parentNode = document.createElement('form');
      parentNode.setAttribute('name', 'my-form');
      component = await fixture(
        html`
          <test-pharos-multiselect-dropdown name="my-multiselect-dropdown">
            <span slot="label">I am a label</span>
            <option value="1" selected>Option 1</option>
            <option value="2" selected>Option 2</option>
            <option value="3">Option 3</option>
          </test-pharos-multiselect-dropdown>
        `,
        { parentNode }
      );

      const form = document.querySelector('form');
      const formdata = createFormData(form as HTMLFormElement);

      expect(formdata.getAll('my-multiselect-dropdown')).to.deep.equal(['1', '2']);
    });

    it('resets selectedOptions when the form is reset', async () => {
      const parentNode = document.createElement('form');
      parentNode.setAttribute('name', 'my-form');
      component = await fixture(
        html`
          <test-pharos-multiselect-dropdown name="my-multiselect-dropdown">
            <span slot="label">I am a label</span>
            <option value="1" selected>Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </test-pharos-multiselect-dropdown>
        `,
        { parentNode }
      );

      const form = document.querySelector('form');
      const formdataInitial = createFormData(form as HTMLFormElement);
      expect(formdataInitial.getAll('my-multiselect-dropdown')).to.deep.equal(['1']);

      component['_open'] = true;
      await component.updateComplete;

      const options = component.renderRoot.querySelectorAll(
        '.multiselect-dropdown__option'
      ) as NodeListOf<HTMLLIElement>;
      options[0].click(); // Toggle select all
      const applyButton = component.renderRoot.querySelector('#apply-button') as PharosButton;
      applyButton.click();
      await component.updateComplete;

      const formdataUnchecked = createFormData(form as HTMLFormElement);
      expect(formdataUnchecked.getAll('my-multiselect-dropdown')).to.deep.equal(['1', '2', '3']);

      form?.dispatchEvent(new Event('reset'));
      await component.updateComplete;

      const formdataReset = createFormData(form as HTMLFormElement);
      expect(formdataReset.getAll('my-multiselect-dropdown')).to.deep.equal(['1']);
    });
  });
});
