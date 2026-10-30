import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tileGroupStyles } from './pharos-tile-group.css';
import { TILE_STATE_CHANGE_EVENT } from '../tile/pharos-tile';
import type { PharosTile, TileSelection } from '../tile/pharos-tile';
export type { TileSelection };

import { FormElement } from '../base/form-element';
import { loopWrapIndex } from '../../utils/math';

const _allTilesSelector = '[data-pharos-component="PharosTile"]';

/**
 * Pharos tile group component.
 *
 * @tag pharos-tile-group
 *
 * @slot legend - Contains the fieldset legend content.
 * @slot - Contains the set of tiles (the default slot).
 * @slot message - Contains message content to show below the group.
 *
 * @fires change - Fires when the value has changed
 */
export class PharosTileGroup extends FormElement {
  /**
   * Indicates if one or multiple tiles can be selected.
   * @attr selection
   */
  @property({ type: String, reflect: true })
  public selection: TileSelection = 'single';

  /**
   * Indicates the selected tile value (single selection) or values (multiple selection).
   * @readonly
   */
  @property({ attribute: false })
  public get value(): string | string[] {
    const selected = this._tileElements.filter((tile) => tile.selected);

    return this.selection === 'multiple'
      ? selected.map((tile) => tile.value)
      : (selected[0]?.value ?? '');
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, tileGroupStyles];
  }

  private _disabledByGroup = new WeakSet<PharosTile>();

  private get _tileElements(): PharosTile[] {
    return [...this.children].filter(
      (child) => !child.slot && child.matches(_allTilesSelector)
    ) as PharosTile[];
  }

  protected override firstUpdated(): void {
    this._setTiles();
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener(TILE_STATE_CHANGE_EVENT, this._handleTileStateChange);
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('disabled') && !this.disabled) {
      // Only re-enable the tiles the group disabled, not those disabled individually
      this._tileElements.forEach((tile) => {
        if (this._disabledByGroup.delete(tile)) tile.disabled = false;
      });
    }

    if (
      changedProperties.has('name') ||
      changedProperties.has('disabled') ||
      changedProperties.has('invalidated') ||
      changedProperties.has('validated') ||
      changedProperties.has('selection')
    ) {
      this._setTiles();
    }
  }

  // Stopped on each tile so only the group's own `change` event reaches group listeners
  private _handleTileChange = (event: Event): void => {
    const target = event.target as PharosTile;
    event.stopPropagation();

    this._applySelectionRules(target);

    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  };

  // Keeps tab stops and single selection correct when a tile changes outside of user input
  private _handleTileStateChange(event: Event): void {
    const target = event.target as PharosTile;
    if (!target.matches?.(_allTilesSelector)) return;

    this._applySelectionRules(target);
  }

  private _applySelectionRules(changed?: PharosTile): void {
    if (this.selection === 'single') {
      const selected = this._tileElements.filter((tile) => tile.selected);
      const keep = changed?.selected ? changed : selected[0];
      selected.forEach((tile) => {
        if (tile !== keep) tile.selected = false;
      });
    }

    this._updateTabStops();
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (this.selection !== 'single') return;

    // Only the tile's own input should move the selection, not slotted content
    const origin = event.composedPath()[0] as HTMLElement;
    const tile = event.target as Element;
    if (origin.id !== 'tile-input' || (origin.getRootNode() as ShadowRoot).host !== tile) return;

    switch (event.key) {
      case 'Down':
      case 'Right':
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this._handleArrowKeys(event, true);
        break;
      case 'Up':
      case 'Left':
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this._handleArrowKeys(event, false);
        break;
    }
  }

  private _handleArrowKeys(event: KeyboardEvent, moveForward: boolean): void {
    const tiles = this._tileElements.filter((tile) => !tile.disabled);
    const current = (event.target as Element).closest(_allTilesSelector);
    const nextIndex = loopWrapIndex(tiles, (tile) => tile === current, moveForward);

    tiles[nextIndex]?.select();
  }

  private _setTiles(): void {
    this._tileElements.forEach((tile) => {
      tile.addEventListener('change', this._handleTileChange);
      tile.selection = this.selection;
      tile.name = this.name;
      if (this.disabled && !tile.disabled) {
        this._disabledByGroup.add(tile);
        tile.disabled = true;
      }
      tile.validated = this.validated;
      tile.invalidated = this.invalidated;
    });

    this._applySelectionRules();
  }

  // Single selection behaves like a radio group: one tab stop for the whole group
  private _updateTabStops(): void {
    const tiles = this._tileElements;

    if (this.selection === 'multiple') {
      tiles.forEach((tile) => (tile.focusable = true));
      return;
    }

    const enabled = tiles.filter((tile) => !tile.disabled);
    const stop = enabled.find((tile) => tile.selected) ?? enabled[0];
    tiles.forEach((tile) => (tile.focusable = tile === stop));
  }

  // `aria-required` is only valid on the radiogroup role used for single selection
  private get _ariaRequired(): 'true' | 'false' | undefined {
    if (this.selection !== 'single') return undefined;
    return this.required ? 'true' : 'false';
  }

  protected override render(): TemplateResult {
    return html`
      <fieldset
        class="tile-group"
        role=${ifDefined(this.selection === 'single' ? 'radiogroup' : undefined)}
        aria-required=${ifDefined(this._ariaRequired)}
        aria-invalid=${this.invalidated}
        aria-describedby=${ifDefined(this.messageId)}
      >
        <legend id="legend" class="tile-group__legend">
          <slot name="legend"></slot>
          ${this.requiredIndicator}
        </legend>
        <div class="tile-group__tiles">
          <slot @slotchange=${this._setTiles}></slot>
        </div>
        ${this.messageContent}
      </fieldset>
    `;
  }
}
