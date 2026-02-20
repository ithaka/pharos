import { createFocusTrap } from 'focus-trap';
import type { FocusTrap, Options } from 'focus-trap';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class FocusTrapController implements ReactiveController {
  private _trap: FocusTrap | null = null;
  private _getContainer: () => HTMLElement | null;
  private _options: Options;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    getContainer: () => HTMLElement | null,
    options?: Partial<Options>
  ) {
    this._getContainer = getContainer;
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
    const container = this._getContainer();
    if (!container || this._trap) return;
    this._trap = createFocusTrap(container, this._options);
    this._trap.activate();
  }

  deactivate(): void {
    if (this._trap) {
      this._trap.deactivate();
      this._trap = null;
    }
  }
}
