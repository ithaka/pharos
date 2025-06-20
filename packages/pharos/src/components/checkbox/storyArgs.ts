export interface ComponentArgs {
  checked?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  indeterminate?: boolean;
  invalidated?: boolean;
  label?: string;
  message?: string;
  name?: string;
  isOnBackground?: boolean;
  required?: boolean;
  validated?: boolean;
  value?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  checked: false,
  disabled: false,
  hideLabel: false,
  indeterminate: false,
  invalidated: false,
  label: 'I am a label',
  message: '',
  name: '',
  isOnBackground: false,
  required: false,
  validated: false,
  value: '',
};
