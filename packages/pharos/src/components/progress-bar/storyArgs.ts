export const defaultArgs = {
  title: 'Title.xls',
  value: 10,
  description: 'Processing',
};

export const argTypes = {
  value: {
    control: { type: 'range', min: 0, max: 100, step: 10 },
  },
};
