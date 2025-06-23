export interface ComponentArgs {}

export type StoryArgs = ComponentArgs & {
  firstCrumb: string;
  secondCrumb: string;
  thirdCrumb: string;
};

export const defaultArgs: StoryArgs = {
  firstCrumb: 'Hover to see the full text of long content, which are truncated',
  secondCrumb: 'Short texts will not',
  thirdCrumb: 'Current',
};
