export interface ComponentArgs {
  horizontal?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  required?: boolean;
  invalidated?: boolean;
  validated?: boolean;
  name?: string;
  message?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  horizontal: false,
  disabled: false,
  hideLabel: false,
  required: false,
  invalidated: false,
  validated: false,
  name: 'group1',
  message: '',
};
