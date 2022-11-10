import { allTypes } from './pharos-text-input';

export const defaultArgs = {
  name: 'story-input',
  type: 'text',
  label: 'I am a label',
  hideLabel: false,
  validated: false,
  invalidated: false,
  required: false,
  message: '',
  placeholder: 'placeholder',
  disabled: false,
  readonly: false,
  value: '',
};

export const argTypes = {
  type: {
    options: allTypes,
    control: {
      type: 'inline-radio',
    },
  },
};
