export {};

declare global {
  interface Handle {
    release(): null;
  }
}
