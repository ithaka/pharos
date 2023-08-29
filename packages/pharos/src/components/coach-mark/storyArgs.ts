export const defaultArgs = {
  hide: false,
  side: 'bottom',
  alignment: 'start',
  header: 'Coach Mark',
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
};
