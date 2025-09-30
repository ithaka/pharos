export interface ComponentArgs {
  size: 'small' | 'base';
  dismissible: boolean;
  disabled: boolean;
  preset: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  iconLeft?: string; // React prop name
  'icon-left'?: string; // WC prop name
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  size: 'base',
  dismissible: false,
  disabled: false,
  preset: '1',
};
