import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { toggleButtonGroupStyles } from './pharos-toggle-button-group.css';
import type { PharosToggleButton } from './pharos-toggle-button';
import { property, queryAssignedElements } from 'lit/decorators.js';

const _allToggleButtonsSelector = '[data-pharos-component="PharosToggleButton"]';

/**
 * Pharos toggle button group component.
 *
 * @tag pharos-toggle-button-group
 *
 * @slot - Contains the buttons.
 *
 */
export class PharosToggleButtonGroup extends PharosElement {
  /**
   * The label used to announce this group to assistive technologies.
   * @attr group-label
   */
  @property({ type: String, reflect: true, attribute: 'group-label' })
  public groupLabel = 'Options';

  @queryAssignedElements({ selector: _allToggleButtonsSelector })
  private _allToggleButtons!: NodeListOf<PharosToggleButton>;

  @queryAssignedElements({ selector: `${_allToggleButtonsSelector}[selected]` })
  private _selectedToggleButtons!: NodeListOf<PharosToggleButton>;

  public static override get styles(): CSSResultArray {
    return [toggleButtonGroupStyles];
  }

  protected override async firstUpdated(): Promise<void> {
    this.addEventListener('pharos-toggle-button-selected', this._handleButtonSelected);
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusout', this._handleFocusout);

    const toggleButtons: PharosToggleButton[] = Array.from(this._allToggleButtons);
    await Promise.all(toggleButtons.map((el) => el.updateComplete));
    this._selectInitialToggleButton(toggleButtons);

    const maxIdx = toggleButtons.length - 1;
    toggleButtons.forEach((button, idx) => {
      button['_first'] = idx === 0;
      button['_last'] = idx === maxIdx;
    });
  }

  private _selectInitialToggleButton(toggleButtons: PharosToggleButton[]): void {
    const selected: PharosToggleButton | null = this._selectedToggleButtons[0];
    const selectedButton: PharosToggleButton = selected ? selected : toggleButtons[0];

    selectedButton.selected = true;
    selectedButton.pressed = 'true';
  }

  private _handleButtonSelected(event: Event): void {
    const selected = event.target as PharosToggleButton;

    const previous: PharosToggleButton | null = this.querySelector(
      `${_allToggleButtonsSelector}[selected]:not([id="${selected.id}"])`
    );

    if (previous) {
      previous.selected = false;
      previous.pressed = 'false';
    }

    const toggleButtons: PharosToggleButton[] = Array.prototype.slice.call(this._allToggleButtons);
    const selectIdx = toggleButtons.findIndex((button) => button.id === selected.id);
    toggleButtons.forEach((button, index) => {
      button['_hideLeftBorder'] = index === selectIdx + 1;
      button['_hideRightBorder'] = index === selectIdx - 1;
    });
  }

  private _handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Right':
      case 'ArrowRight':
        event.preventDefault();
        this._handleArrowKeys(true);
        break;
      case 'Left':
      case 'ArrowLeft':
        event.preventDefault();
        this._handleArrowKeys(false);
        break;
      case 'Enter':
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this._handleEnterKey();
        break;
    }
  }

  private async _handleArrowKeys(moveForward: boolean): Promise<void> {
    const toggleButtons: PharosToggleButton[] = Array.prototype.slice.call(this._allToggleButtons);

    const focused = document.activeElement as PharosToggleButton;
    if (!focused.matches(_allToggleButtonsSelector)) {
      return;
    }

    const focusedButtonIndex = toggleButtons.findIndex((button) => button.id === focused.id);
    const lastButton = toggleButtons.length - 1;
    const firstButton = 0;
    let moveToIndex;
    if (moveForward) {
      moveToIndex = focusedButtonIndex === lastButton ? firstButton : focusedButtonIndex + 1;
    } else {
      moveToIndex = focusedButtonIndex === firstButton ? lastButton : focusedButtonIndex - 1;
    }

    focused['_focused'] = false;
    const moveFocusTo = toggleButtons[moveToIndex];
    moveFocusTo['_focused'] = true;

    await moveFocusTo.updateComplete;
    moveFocusTo.focus();
  }

  private _handleEnterKey(): void {
    const focused = document.activeElement as PharosToggleButton;
    focused.click();
  }

  private _handleFocusout(event: FocusEvent): void {
    if (
      event.relatedTarget &&
      (event.relatedTarget as Element).matches('[data-pharos-component="PharosToggleButton"]')
    ) {
      return;
    }
    this._allToggleButtons.forEach((button) => {
      button['_focused'] = button.hasAttribute('selected');
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="toggle-button__list" role="group" aria-label="${this.groupLabel}">
        <slot></slot>
      </div>
    `;
  }
}
