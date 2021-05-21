import { html, LitElement } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { toggleButtonGroupStyles } from './pharos-toggle-button-group.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import type { PharosToggleButton } from './pharos-toggle-button';

const matchesFunc = 'matches' in Element.prototype ? 'matches' : 'msMatchesSelector';

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
    return [designTokens, toggleButtonGroupStyles];
  }

  protected firstUpdated(): void {
    window.addEventListener('blur', () => {
      this._setBorders();
    });
    this.addEventListener('pharos-toggle-button-selected', this._handleButtonSelected);
    this.addEventListener('pharos-toggle-button-border-check', this._setBorders);
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusout', this._handleFocusout);

    const toggleButtons = this.querySelectorAll(
      `pharos-toggle-button`
    ) as NodeListOf<PharosToggleButton>;
    this._selectInitialToggleButton(toggleButtons);

    const maxIdx = toggleButtons.length - 1;
    toggleButtons.forEach((button, idx) => {
      button['_first'] = idx == 0;
      button['_last'] = idx == maxIdx;
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

    this._setBorders();
  }

  private _setBorders(): void {
    const toggleButtons = this.querySelectorAll(
      `pharos-toggle-button`
    ) as NodeListOf<PharosToggleButton>;

    toggleButtons.forEach((b) => {
      b['_hideRightBorder'] = false;
      b['_hideLeftBorder'] = false;
    });
    toggleButtons.forEach((button, idx) => {
      const selfFocused = this._needsOutline(button);
      if (button.selected || selfFocused) {
        if (idx > 0) {
          const leftSibling = toggleButtons[idx - 1];
          button['_hideLeftBorder'] = selfFocused || this._needsOutline(leftSibling);
          leftSibling['_hideRightBorder'] = true;
        }
        if (idx < toggleButtons.length - 1) {
          const rightSibling = toggleButtons[idx + 1];
          button['_hideRightBorder'] = selfFocused || this._needsOutline(rightSibling);
          rightSibling['_hideLeftBorder'] = true;
        }
      }
    });
  }

  private _needsOutline(button: PharosToggleButton): boolean {
    const focusElem = document.activeElement;
    return (button == focusElem && document.hasFocus()) || button['_hovered'];
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
    const ids = toggleButtons.map((toggleButton) => toggleButton.id);

    const focused = document.activeElement as PharosToggleButton;
    if (!focused[matchesFunc]('pharos-toggle-button')) {
      return;
    }

    let index = ids.findIndex((v) => v === focused.id);

    if (moveForward) {
      index = index === ids.length - 1 ? 0 : index + 1;
    } else {
      index = index === 0 ? ids.length - 1 : index - 1;
    }

    focused['_focused'] = false;
    const moveFocusTo = toggleButtons[index];
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
      (event.relatedTarget as Element)[matchesFunc]('pharos-toggle-button')
    ) {
      return;
    }
    const toggleButtons = this.querySelectorAll(
      `pharos-toggle-button`
    ) as NodeListOf<PharosToggleButton>;
    toggleButtons.forEach((button) => {
      if (button.hasAttribute('selected')) {
        button['_focused'] = true;
      } else {
        button['_focused'] = false;
      }
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
