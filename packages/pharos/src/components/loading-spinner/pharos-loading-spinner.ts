import { html, LitElement, query } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { loadingSpinnerStyles } from './pharos-loading-spinner.css';
import {
  PharosLoadingSpinnerColorStrokePrimary,
  PharosLoadingSpinnerColorStrokeSecondary,
} from '../../styles/variables';
import { customElement } from '../../utils/decorators';

/**
 * Pharos loading spinner component.
 *
 * @element pharos-loading-spinner
 *
 * @cssprop {Color} --pharos-loading-spinner-color-stroke-primary - The primary color of the spinner icon.
 * @cssprop {Color} --pharos-loading-spinner-color-stroke-secondary - The secondary color of the spinner icon.
 */
@customElement('pharos-loading-spinner')
export class PharosLoadingSpinner extends LitElement {
  @query('.loading-spinner__icon')
  private _icon!: SVGElement;

  @query('.loading-spinner__animation')
  private _spinner!: SVGCircleElement;

  public static get styles(): CSSResultArray {
    return [loadingSpinnerStyles];
  }

  protected firstUpdated(): void {
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

    const colorKeys: Keyframe[] = [
      { stroke: PharosLoadingSpinnerColorStrokePrimary, offset: 0 },
      { stroke: PharosLoadingSpinnerColorStrokeSecondary, offset: 0.4 },
      { stroke: PharosLoadingSpinnerColorStrokePrimary, offset: 0.66 },
      { stroke: PharosLoadingSpinnerColorStrokeSecondary, offset: 0.8 },
      { stroke: PharosLoadingSpinnerColorStrokeSecondary, offset: 0.9 },
      { stroke: PharosLoadingSpinnerColorStrokePrimary, offset: 1 },
    ];
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

  protected render(): TemplateResult {
    return html`
      <div
        class="loading-spinner__wrapper"
        role="alert"
        aria-live="assertive"
        aria-label="Content is loading..."
        tabindex="0"
      >
        <svg
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
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-loading-spinner': PharosLoadingSpinner;
  }
}
