import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { query, property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { loadingSpinnerStyles } from './pharos-loading-spinner.css';
import {
  PharosLoadingSpinnerColorStrokePrimary,
  PharosLoadingSpinnerColorStrokeSecondary,
  PharosLoadingSpinnerColorStrokeOnBackground,
} from '../../styles/variables';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const SVG_BASE = `<svg
class="loading-spinner__icon"
viewBox="25 25 50 50"
height="56"
width="56"
focusable="false"
>
<circle
  class="loading-spinner__animation"
  cx="50"
  cy="50"
  r="20"
  fill="none"
  stroke-width="3"
  stroke-miterlimit="10"
/>
</svg>`;

const SVG_SMALL = `<svg
class="loading-spinner__icon"
viewBox="25 25 50 50"
height="18"
width="18"
focusable="false"
>
<circle
  class="loading-spinner__animation"
  cx="50"
  cy="50"
  r="20"
  fill="none"
  stroke-width="3"
  stroke-miterlimit="10"
/>
</svg>`;

/**
 * Pharos loading spinner component.
 *
 * @tag pharos-loading-spinner
 *
 * @cssprop {Color} --pharos-loading-spinner-color-stroke-primary - The primary color of the spinner icon.
 * @cssprop {Color} --pharos-loading-spinner-color-stroke-secondary - The secondary color of the spinner icon.
 */
export class PharosLoadingSpinner extends PharosElement {
  /**
   * Indicates if the spinner is on background
   * @attr on-background
   */
  @property({ type: Boolean, reflect: true, attribute: 'on-background' })
  public onBackground = false;

  /**
   * Indicates if the spinner is small
   * @attr small
   */
  @property({ type: Boolean, reflect: true, attribute: 'small' })
  public small = false;

  @query('.loading-spinner__icon')
  private _icon!: SVGElement;

  @query('.loading-spinner__animation')
  private _spinner!: SVGCircleElement;

  public static override get styles(): CSSResultArray {
    return [loadingSpinnerStyles];
  }

  protected override firstUpdated(): void {
    this._setupAnimation();
  }

  private _setupAnimation(): void {
    const dashKeys: Keyframe[] = [
      { strokeDasharray: '1px, 200px', strokeDashoffset: '0px' },
      { strokeDasharray: '89px, 200px', strokeDashoffset: '-35px' },
      { strokeDasharray: '89px, 200px', strokeDashoffset: '-124px' },
    ];
    const dashTiming: KeyframeAnimationOptions = {
      easing: 'ease-in-out',
      duration: 1500,
      iterations: Infinity,
    };

    const colorKeysBase: Keyframe[] = [
      { stroke: PharosLoadingSpinnerColorStrokePrimary, offset: 0 },
      { stroke: PharosLoadingSpinnerColorStrokeSecondary, offset: 0.4 },
      { stroke: PharosLoadingSpinnerColorStrokePrimary, offset: 0.66 },
      { stroke: PharosLoadingSpinnerColorStrokeSecondary, offset: 0.8 },
      { stroke: PharosLoadingSpinnerColorStrokeSecondary, offset: 0.9 },
      { stroke: PharosLoadingSpinnerColorStrokePrimary, offset: 1 },
    ];
    const colorKeysOnBackground: Keyframe[] = [
      { stroke: PharosLoadingSpinnerColorStrokeOnBackground, offset: 0 },
      { stroke: PharosLoadingSpinnerColorStrokeOnBackground, offset: 0.4 },
      { stroke: PharosLoadingSpinnerColorStrokeOnBackground, offset: 0.66 },
      { stroke: PharosLoadingSpinnerColorStrokeOnBackground, offset: 0.8 },
      { stroke: PharosLoadingSpinnerColorStrokeOnBackground, offset: 0.9 },
      { stroke: PharosLoadingSpinnerColorStrokeOnBackground, offset: 1 },
    ];
    const colorKeys = this.onBackground ? colorKeysOnBackground : colorKeysBase;
    const colorTiming: KeyframeAnimationOptions = {
      easing: 'ease-in-out',
      duration: 6000,
      iterations: Infinity,
    };

    const rotateKeys: Keyframe[] = [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }];
    const rotateTiming: KeyframeAnimationOptions = {
      easing: 'linear',
      duration: 2000,
      iterations: Infinity,
    };

    this._spinner.animate(dashKeys, dashTiming);
    this._spinner.animate(colorKeys, colorTiming);
    this._icon.animate(rotateKeys, rotateTiming);
  }

  private _renderSVG(): TemplateResult {
    return this.small ? html`${unsafeHTML(SVG_SMALL)}` : html`${unsafeHTML(SVG_BASE)}`;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="loading-spinner__wrapper"
        role="alert"
        aria-live="assertive"
        aria-label="Content is loading..."
        tabindex="0"
      >
        ${this._renderSVG()}
      </div>
    `;
  }
}
