const template = () => `
export interface ComponentArgs {};

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {};

export argTypes = {};
`;

module.exports = template;
