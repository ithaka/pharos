export {};

declare global {
  interface CustomEvent {
    formData: FormData;
  }
}
