import { allPresets, allLevels, type HeadingLevel, type HeadingPreset } from './pharos-heading';

export interface ComponentArgs {
  level: HeadingLevel;
  noMargin?: boolean;
  preset: HeadingPreset;
}

export type StoryArgs = ComponentArgs & {
  text: string;
};

export const argTypes = {
  level: {
    control: {
      type: 'range' as const,
      min: Math.min(...allLevels),
      max: Math.max(...allLevels),
      step: 1,
    },
  },
  preset: {
    options: allPresets,
    control: { type: 'inline-radio' as const },
  },
};

export const defaultArgs: StoryArgs = {
  level: 1,
  noMargin: false,
  preset: '5',
  text: 'Heading style',
};
