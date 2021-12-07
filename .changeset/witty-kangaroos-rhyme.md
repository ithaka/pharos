---
'@ithaka/pharos': minor
'@ithaka/pharos-cli': minor
'@ithaka/pharos-site': minor
---

Add register utility:

- Update `PharosElement` to set `[data-pharos-component]` with `constructor.name`
- Update `PharosComponentMixin` to set `[data-pharos-component]` with base class name
- Add register utility to simplify component registration and ensure trivial classes are used for custom elements:
    ```javascript
    import { PharosAlert, PharosButton, PharosIcon } from '@ithaka/pharos';
    import registerComponents from '@ithaka/pharos/lib/utils/registerComponents';

    registerComponents('{prefix}', [PharosAlert, PharosButton, PharosIcon]);
    ```
- Add a React Pharos context provider for consumers to indicate prefix used for registration:
    ```jsx
    import { PharosContext } from '@ithaka/pharos/lib/utils/PharosContext';

    const context = { prefix: 'homepage' };

    <PharosContext.Provider value={context}>...app code</PharosContext.Provider>
    ```
