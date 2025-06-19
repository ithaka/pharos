export interface ComponentArgs {
  open?: boolean;
  showSelected?: boolean;
  fullWidth?: boolean;
  isOnBackground?: boolean;
};

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  open: false,
  showSelected: false,
  fullWidth: false,
  isOnBackground: false,
};
