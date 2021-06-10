import { html, LitElement } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { toggleButtonGroupStyles } from './pharos-toggle-button-group.css';
import { customElement } from '../../utils/decorators';
import type { PharosToggleButton } from './pharos-toggle-button';

/**
 * Pharos toggle button group component.
 *
 * @element pharos-toggle-button-group
 *
 * @slot - Contains the buttons.
 *
 */
@customElement('pharos-toggle-button-group')
export class PharosToggleButtonGroup extends LitElement {
  public static get styles(): CSSResultArray {
    return [toggleButtonGroupStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('pharos-toggle-button-selected', this._handleButtonSelected);
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusout', this._handleFocusout);

    const toggleButtons = this.querySelectorAll(
      `pharos-toggle-button`
    ) as NodeListOf<PharosToggleButton>;
    this._selectInitialToggleButton(toggleButtons);

    const maxIdx = toggleButtons.length - 1;
    toggleButtons.forEach((button, idx) => {
      button['_first'] = idx === 0;
      button['_last'] = idx === maxIdx;
    });
  }

  private _selectInitialToggleButton(toggleButtons: NodeListOf<PharosToggleButton>): void {
    const selected = this.querySelector(`pharos-toggle-button[selected]`) as PharosToggleButton;
    const selectedButton: PharosToggleButton = selected ? selected : toggleButtons[0];

    selectedButton.selected = true;
  }

  private _handleButtonSelected(event: Event): void {
    const selected = event.target as PharosToggleButton;

    const previous = this.querySelector(
      `pharos-toggle-button[selected]:not([id="${selected.id}"])`
    ) as PharosToggleButton;

    if (previous) {
      previous.selected = false;
    }

    const toggleButtons = Array.prototype.slice.call(
      this.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];
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
    const toggleButtons = Array.prototype.slice.call(
      this.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    const focused = document.activeElement as PharosToggleButton;
    if (!focused.matches('pharos-toggle-button')) {
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
    if (event.relatedTarget && (event.relatedTarget as Element).matches('pharos-toggle-button')) {
      return;
    }
    const toggleButtons = this.querySelectorAll(
      `pharos-toggle-button`
    ) as NodeListOf<PharosToggleButton>;
    toggleButtons.forEach((button) => {
      button['_focused'] = button.hasAttribute('selected');
    });
  }

  protected render(): TemplateResult {
    return html`
      <div class="toggle-button__list" role="group">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-toggle-button-group': PharosToggleButtonGroup;
  }
}
