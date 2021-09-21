import { PharosElement } from './pharos-element';
import type { CSSResultArray } from 'lit';
import { sideElementStyles } from './side-element.css';

/**
 * The base side element class to house shared properties, styles, and methods.
 */
export class SideElement extends PharosElement {
  public static override get styles(): CSSResultArray {
    return [sideElementStyles];
  }
}
