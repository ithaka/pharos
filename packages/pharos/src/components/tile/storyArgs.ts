import type { IconName } from '../icon/pharos-icon';
import type { TileIndicatorPosition } from './pharos-tile';

export interface ComponentArgs {
  href?: string;
  hideIndicator?: boolean; // React prop name
  'hide-indicator'?: boolean; // WC attribute name
  indicatorPosition?: TileIndicatorPosition; // React prop name
  'indicator-position'?: TileIndicatorPosition; // WC attribute name
  indicatorIcon?: IconName; // React prop name
  'indicator-icon'?: IconName; // WC attribute name
  disabled?: boolean;
}

export type StoryArgs = ComponentArgs & {};

// The manifest types of these are aliases Storybook can't resolve, so it would show an object editor
const indicatorPositionArgType = {
  control: { type: 'select' as const },
  options: ['bottom-end', 'top-end'],
  description: 'Where the indicator is placed',
};
const indicatorIconArgType = {
  control: { type: 'text' as const },
  description:
    'Icon name that replaces the indicator: the arrow on a link tile, or the selected-only icon on a selection tile',
};

export const argTypesWC = {
  'indicator-position': indicatorPositionArgType,
  'indicator-icon': indicatorIconArgType,
};

export const argTypesReact = {
  indicatorPosition: indicatorPositionArgType,
  indicatorIcon: indicatorIconArgType,
};

export const defaultArgs: StoryArgs = {
  href: '#',
  hideIndicator: false,
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
