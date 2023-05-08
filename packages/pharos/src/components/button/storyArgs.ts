import { iconNames } from '../../utils/iconNames';

export const argTypes = {
  icon: {
    options: iconNames,
    control: { type: 'select' },
  },
  iconLeft: {
    options: iconNames,
    control: { type: 'select' },
  },
  iconRight: {
    options: iconNames,
    control: { type: 'select' },
  },
  pressed: {
    options: ['false', 'true', 'mixed', 'undefined', undefined],
    control: { type: 'inline-radio' },
  },
  type: {
    options: ['button', 'submit', 'reset'],
    control: { type: 'inline-radio' },
  },
  variant: {
    options: ['primary', 'secondary', 'subtle', 'overlay'],
    control: { type: 'inline-radio' },
  },
};

export const defaultArgs = {
  // Story
  text: 'I am a button',
  // Props
  autofocus: false,
  disabled: false,
  fullWidth: false,
  iconCondensed: false,
  large: false,
  onBackground: false,
  pressed: undefined,
  type: 'button',
  variant: 'primary',
};
