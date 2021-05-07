export {};

declare global {
  interface HTMLFormControlsCollection {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}
