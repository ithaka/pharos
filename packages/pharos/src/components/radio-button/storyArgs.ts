export interface ComponentArgs {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  invalidated?: boolean;
  required?: boolean;
  message?: string;
};

export type StoryArgs = ComponentArgs & {};

export const defaultArgs = {
  label: 'Default Radio Button',
  checked: false,
  disabled: false,
  hideLabel: false,
  invalidated: false,
  required: false,
  message: '',
};
