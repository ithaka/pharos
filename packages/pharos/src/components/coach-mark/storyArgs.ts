export const defaultArgs = {
  hide: false,
  side: 'bottom',
  alignment: 'start',
  header: 'Coach Mark',
  delay: 'short',
  variant: 'light',
  width: 250,
};

export const argTypes = {
  hide: {
    control: {
      type: 'boolean',
    },
  },
  side: {
    options: ['top', 'right', 'bottom', 'left'],
    control: {
      type: 'inline-radio',
    },
  },
  alignment: {
    options: ['start', 'center', 'end'],
    control: {
      type: 'inline-radio',
    },
  },
  delay: {
    options: ['none', 'short', 'long'],
    control: {
      type: 'inline-radio',
    },
  },
  variant: {
    options: ['light', 'dark'],
    control: {
      type: 'inline-radio',
    },
  },
  width: {
    control: {
      type: 'number',
    },
  },
};
