import { LitElement } from 'lit';
import type { CSSResultArray } from 'lit';
import { sideElementStyles } from './side-element.css';

/**
 * The base side element class to house shared properties, styles, and methods.
 */
export class SideElement extends LitElement {
  public static get styles(): CSSResultArray {
    return [sideElementStyles];
  }
}
