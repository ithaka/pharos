export {};

declare global {
  interface Element {
    msMatchesSelector(selectors: string): boolean;
  }
}
