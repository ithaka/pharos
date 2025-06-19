import type { Alignment, Delay, Side, Variant } from "./pharos-coach-mark";

export interface ComponentArgs {
  hide?: boolean;
  side?: Side;
  alignment?: Alignment;
  header?: string;
  delay?: Delay;
  variant?: Variant;
  width?: string;
};

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: ComponentArgs = {
  hide: false,
  side: 'bottom',
  alignment: 'start',
  header: 'Coach Mark',
  delay: 'short',
  variant: 'dark',
  width: '30ch',
};

export const argTypes = {
  hide: {
    control: {
      type: 'boolean' as const,
    },
  },
  header: {
    control: {
      type: 'text' as const,
    },
  },
  side: {
    options: ['top', 'right', 'bottom', 'left'],
    control: {
      type: 'inline-radio' as const,
    },
  },
  alignment: {
    options: ['start', 'center', 'end'],
    control: {
      type: 'inline-radio' as const,
    },
  },
  delay: {
    options: ['none', 'short', 'long'],
    control: {
      type: 'inline-radio' as const,
    },
  },
  variant: {
    options: ['light', 'dark'],
    control: {
      type: 'inline-radio' as const,
    },
  },
  width: {
    control: {
      type: 'text' as const,
    },
  },
};
