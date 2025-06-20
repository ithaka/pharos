const template = () => `
export interface ComponentArgs {};

export type StoryArgs = ComponentArgs & {};

export defaultArgs: StoryArgs = {};

export argTypes = {};
`;

module.exports = template;

