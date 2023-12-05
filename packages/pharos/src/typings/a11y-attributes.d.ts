export {};

declare global {
  type AriaHiddenValues = 'false' | 'true' | 'undefined' | undefined;
  type AriaPressedState = 'false' | 'true' | 'mixed' | 'undefined' | undefined;
  type AriaExpandedState = 'false' | 'true' | 'undefined' | undefined;
  type AriaDisabledState = 'false' | 'true' | undefined;
  type AriaPopupState =
    | 'false'
    | 'true'
    | 'menu'
    | 'tree'
    | 'grid'
    | 'listbox'
    | 'dialog'
    | undefined;
}
