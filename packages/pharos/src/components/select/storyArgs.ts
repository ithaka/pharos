export interface ComponentArgs {
  disabled?: boolean;
  hideLabel?: boolean;
  required?: boolean;
  invalidated?: boolean;
  validated?: boolean;
  message?: string;
  value?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: ComponentArgs = {
  disabled: false,
  hideLabel: false,
  required: false,
  invalidated: false,
  validated: false,
  message: '',
  value: '3',
};
