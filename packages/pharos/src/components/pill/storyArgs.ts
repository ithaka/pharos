import type { IconName, PillPreset } from './pharos-pill';

export interface ComponentArgs {
  size?: 'small' | 'base';
  dismissible?: boolean;
  disabled?: boolean;
  preset?: PillPreset;
  iconLeft?: IconName; // React prop name
  'icon-left'?: IconName; // WC prop name
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  size: 'base',
  dismissible: false,
  disabled: false,
  preset: '1',
};
