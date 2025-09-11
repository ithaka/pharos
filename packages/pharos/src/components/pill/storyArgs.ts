export interface ComponentArgs {
  size: 'small' | 'base';
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  size: 'base',
};
