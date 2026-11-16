export interface ComponentArgs {
  href?: string;
  disabled?: boolean;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  href: '#',
  disabled: false,
};

// Tile content is slotted, so these inline styles lay out the header row and match the label and
// icon presentation (the tile only provides the row itself).
export const headerIconStyle = 'flex: none; margin-top: var(--pharos-spacing-one-eighth-x);';
export const headerLabelStyle =
  'flex: none; margin-inline-start: auto; font-family: var(--pharos-font-family-sans-serif); font-size: var(--pharos-font-size-small); line-height: var(--pharos-line-height-small); color: var(--pharos-color-text-20);';
export const headerStackStyle =
  'display: flex; flex: 1; flex-direction: column; gap: var(--pharos-spacing-one-half-x); min-width: 0;';
export const headerRowStyle =
  'display: flex; align-items: center; justify-content: space-between; gap: var(--pharos-spacing-one-half-x);';

export const headerIconStyleReact = {
  flex: 'none',
  marginTop: 'var(--pharos-spacing-one-eighth-x)',
};
export const headerLabelStyleReact = {
  flex: 'none',
  marginInlineStart: 'auto',
  fontFamily: 'var(--pharos-font-family-sans-serif)',
  fontSize: 'var(--pharos-font-size-small)',
  lineHeight: 'var(--pharos-line-height-small)',
  color: 'var(--pharos-color-text-20)',
};
export const headerStackStyleReact = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column' as const,
  gap: 'var(--pharos-spacing-one-half-x)',
  minWidth: 0,
};
export const headerRowStyleReact = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--pharos-spacing-one-half-x)',
};
