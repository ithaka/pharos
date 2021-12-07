import { LitElement } from 'lit';

export class PharosElement extends LitElement {
  override connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    this.dataset.pharosComponent = this.constructor.name;
  }
}
