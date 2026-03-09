import { createFocusTrap } from 'focus-trap';
import type { FocusTrap, Options } from 'focus-trap';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class FocusTrapController implements ReactiveController {
  private _trap: FocusTrap | null = null;
  private _host: ReactiveControllerHost & HTMLElement;
  private _selector: string;
  private _options: Options;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    selector: string,
    options?: Partial<Options>
  ) {
    this._host = host;
    this._selector = selector;
    this._options = {
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: true,
      fallbackFocus: () => host,
      tabbableOptions: {
        getShadowRoot: true,
      },
      ...options,
    };
    host.addController(this);
  }

  hostDisconnected(): void {
    this.deactivate();
  }

  activate(): void {
    const container = this._host?.shadowRoot?.querySelector<HTMLElement>(this._selector);
    if (!container) {
      console.warn('FocusTrapController: Container not found or trap already active.');
      return;
    }
    if (!this._trap) {
      this._trap = createFocusTrap(container, this._options);
      this._trap.activate();
    }
  }

  deactivate(): void {
    if (this._trap) {
      this._trap.deactivate();
      this._trap = null;
    }
  }
}
