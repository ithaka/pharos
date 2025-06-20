export interface ComponentArgs {
  totalResults?: number;
  pageSize?: number;
  currentPage?: number;
};

export type StoryArgs = ComponentArgs & {};

export const defaultArgs = {
  totalResults: 1146,
  pageSize: 25,
  currentPage: 2,
};
