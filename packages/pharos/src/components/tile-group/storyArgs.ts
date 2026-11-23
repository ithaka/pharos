export interface ComponentArgs {
  selection?: 'single' | 'multiple';
  compact?: boolean;
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
  compact: false,
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
