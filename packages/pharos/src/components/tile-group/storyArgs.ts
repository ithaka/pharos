export interface ComponentArgs {
  selection?: 'single' | 'multiple';
  name?: string;
  required?: boolean;
  disabled?: boolean;
  invalidated?: boolean;
  validated?: boolean;
  message?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  selection: 'single',
  name: 'group1',
  required: false,
  disabled: false,
  invalidated: false,
  validated: false,
  message: '',
};

export const argTypes = {
  selection: { control: { type: 'select' as const }, options: ['single', 'multiple'] },
};
