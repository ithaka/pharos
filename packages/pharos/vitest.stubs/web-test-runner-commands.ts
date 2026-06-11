// Stub for `@web/test-runner-commands` needed under Vitest browser mode.
//
// `@open-wc/semantic-dom-diff` (pulled in transitively by `@open-wc/testing`'s
// `expect`) statically imports `@web/test-runner-commands`, which itself imports
// a wtr-only websocket module (`__web-dev-server__web-socket.js`) that does not
// exist under Vite — breaking the whole `@open-wc/testing` import chain even
// though our tests never uses snapshot/dom-diff/command assertions.
//
// These exports mirror `@web/test-runner-commands` so the import resolves; each
// throws only if actually invoked. Aliased in `vitest.config.ts` so Vite's
// dep optimizer (which pre-bundles `@open-wc/testing`) picks it up.

const unavailable =
  (name: string) =>
  (..._args: unknown[]): never => {
    throw new Error(`@web/test-runner-commands.${name} is not available under Vitest browser mode`);
  };

export const executeServerCommand = unavailable('executeServerCommand');
export const setViewport = unavailable('setViewport');
export const emulateMedia = unavailable('emulateMedia');
export const setUserAgent = unavailable('setUserAgent');
export const sendKeys = unavailable('sendKeys');
export const selectOption = unavailable('selectOption');
export const sendMouse = unavailable('sendMouse');
export const resetMouse = unavailable('resetMouse');
export const a11ySnapshot = unavailable('a11ySnapshot');
export const writeFile = unavailable('writeFile');
export const readFile = unavailable('readFile');
export const removeFile = unavailable('removeFile');
export const findAccessibilityNode = unavailable('findAccessibilityNode');
export const getSnapshotConfig = unavailable('getSnapshotConfig');
export const getSnapshots = unavailable('getSnapshots');
export const getSnapshot = unavailable('getSnapshot');
export const saveSnapshot = unavailable('saveSnapshot');
export const removeSnapshot = unavailable('removeSnapshot');
export const compareSnapshot = unavailable('compareSnapshot');
