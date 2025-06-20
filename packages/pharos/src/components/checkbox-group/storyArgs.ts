export interface ComponentArgs {
  disabled?: boolean;
  hideLabel?: boolean;
  horizontal?: boolean;
  invalidated?: boolean;
  message?: string;
  required?: boolean;
  validated?: boolean;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  disabled: false,
  hideLabel: false,
  horizontal: false,
  invalidated: false,
  message: '',
  required: false,
  validated: false,
};
