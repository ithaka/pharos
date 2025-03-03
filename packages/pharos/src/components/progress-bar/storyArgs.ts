export const defaultArgs = {
  title: 'Title.xls',
  value: 10,
  description: 'Processing',
};

export const indeterminateArgs = {
  title: 'Indeterminate',
  variant: 'indeterminate',
  value: 10,
  description: 'Still working...',
};

export const argTypes = {
  value: {
    control: { type: 'range', min: 0, max: 100, step: 10 },
  },
};
