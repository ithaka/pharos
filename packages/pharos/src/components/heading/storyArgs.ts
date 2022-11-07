import { allPresets, allLevels } from './pharos-heading';

export const argTypes = {
  level: {
    control: {
      type: 'range',
      min: Math.min(...allLevels),
      max: Math.max(...allLevels),
      step: 1,
    },
  },
  preset: {
    options: allPresets,
    control: { type: 'inline-radio' },
  },
};

export const defaultArgs = {
  level: 1,
  noMargin: false,
  preset: '5',
  text: 'Heading style',
};
