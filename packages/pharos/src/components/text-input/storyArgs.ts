import { allTypes, type TextInputType } from './pharos-text-input';

export interface ComponentArgs {
  name?: string;
  type?: TextInputType;
  label?: string;
  hideLabel?: boolean;
  validated?: boolean;
  invalidated?: boolean;
  required?: boolean;
  message?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
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
      type: 'inline-radio' as const,
    },
  },
};
