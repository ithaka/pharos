import { iconNames } from '../../utils/iconNames';
import type { ButtonType, IconName, LinkTarget } from './pharos-button';

export interface ComponentArgs {
  autofocus?: boolean;
  disabled?: boolean;
  download?: string;
  href?: string;
  hreflang?: string;
  ping?: string;
  a11yLabel?: string;
  a11yPressed?: AriaPressedState;
  a11yExpanded?: AriaExpandedState;
  a11yDisabled?: AriaDisabledState;
  a11yHaspopup?: AriaPopupState;
  fullWidth?: boolean;
  icon?: IconName;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconCondensed?: boolean;
  large?: boolean;
  isOnBackground?: boolean;
  pressed?: AriaPressedState;
  target?: LinkTarget;
  type?: ButtonType;
  variant?: 'primary' | 'secondary' | 'subtle' | 'overlay';
}

export type StoryArgs = ComponentArgs & {
  text?: string;
};

export const argTypes = {
  icon: {
    options: iconNames,
    control: { type: 'select' as const },
  },
  iconLeft: {
    options: iconNames,
    control: { type: 'select' as const },
  },
  iconRight: {
    options: iconNames,
    control: { type: 'select' as const },
  },
  pressed: {
    options: ['false', 'true', 'mixed', 'undefined', undefined],
    control: { type: 'inline-radio' as const },
  },
  type: {
    options: ['button', 'submit', 'reset'],
    control: { type: 'inline-radio' as const },
  },
  variant: {
    options: ['primary', 'secondary', 'subtle', 'overlay'],
    control: { type: 'inline-radio' as const },
  },
};

export const defaultArgs: StoryArgs = {
  // Story
  text: 'I am a button',
  // Props
  autofocus: false,
  disabled: false,
  fullWidth: false,
  iconCondensed: false,
  large: false,
  isOnBackground: false,
  pressed: undefined,
  type: 'button',
  variant: 'primary',
};
