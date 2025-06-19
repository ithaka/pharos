export interface ComponentArgs {
  disabled?: boolean;
  hideLabel?: boolean;
  horizontal?: boolean;
  invalidated?: boolean;
  message?: string;
  required?: boolean;
  validated?: boolean;
};

export type StoryArgs = ComponentArgs & {
};

export const defaultArgs = {
  disabled: false,
  hideLabel: false,
  horizontal: false,
  invalidated: false,
  message: '',
  required: false,
  validated: false,
};
