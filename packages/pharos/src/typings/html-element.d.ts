export {};

declare global {
  interface HTMLElement {
    connectedCallback(): void;
    disconnectedCallback(): void;
    [key: string]: unknown;
  }
}
