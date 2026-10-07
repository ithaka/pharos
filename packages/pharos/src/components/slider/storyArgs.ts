export interface ComponentArgs {
  disabled?: boolean;
  hideLabel?: boolean;
  invalidated?: boolean;
  validated?: boolean;
  name?: string;
  message?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  disabled: false,
  hideLabel: false,
  invalidated: false,
  validated: false,
  name: 'slider1',
  message: '',
  value: 2,
  min: 1,
  max: 3,
  step: 1,
};
