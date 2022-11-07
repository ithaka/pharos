import { allPlacements } from '../base/overlay-element';

export const defaultArgs = {
  fullWidth: false,
  open: false,
  targetText: 'Focus here',
  tooltipText: 'Hi there again!',
  id: 'my-tooltip',
  placement: 'top',
  fallbackPlacements: [],
};

export const argTypes = {
  placement: {
    options: allPlacements,
    control: {
      type: 'inline-radio',
    },
  },
  fallbackPlacements: {
    control: { type: 'array' },
  },
};
