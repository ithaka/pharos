import { allPlacements, type Placement } from '../base/overlay-element';

export interface ComponentArgs {
  fullWidth?: boolean;
  open?: boolean;
  targetText?: string;
  id?: string;
  placement?: Placement | 'auto';
  fallbackPlacements?: (Placement | "auto")[];
};

export type StoryArgs = ComponentArgs & {
  tooltipText?: string;
};

export const defaultArgs: StoryArgs = {
  fullWidth: false,
  open: false,
  targetText: 'Focus here',
  tooltipText: 'Hi there again!',
  id: 'my-tooltip',
  placement: 'top' as Placement,
  fallbackPlacements: [],
};

export const argTypes = {
  placement: {
    options: allPlacements,
    control: {
      type: 'inline-radio' as const,
    },
  },
  fallbackPlacements: {
    control: { type: 'object' as const },
  },
};
