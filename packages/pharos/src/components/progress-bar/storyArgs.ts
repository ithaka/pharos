export interface ComponentArgs {
  title?: string;
  value?: number;
  description?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  title: 'Title.xls',
  value: 10,
  description: 'Processing',
};

export const indeterminateArgs: StoryArgs = {
  title: 'Indeterminate',
  value: 10,
  description: 'Still working...',
};

export const argTypes = {
  value: {
    control: { type: 'range' as const, min: 0, max: 100, step: 10 },
  },
};
