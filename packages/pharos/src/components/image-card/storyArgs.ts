export interface ComponentArgs {
  error?: boolean;
  subtle?: boolean;
  indicateLinkVisited?: boolean;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs = {
  error: false,
  subtle: false,
  indicateLinkVisited: false,
};
