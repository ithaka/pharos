export {};

declare global {
  interface Window {
    FormDataEvent: FormData | undefined;
    ResizeObserver: typeof ResizeObserver;
  }
}
