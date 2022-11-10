export const argTypes = {
  status: {
    options: ['info', 'success', 'warning', 'error'],
    control: { type: 'inline-radio' },
  },
};

export const defaultArgs = {
  status: 'base',
  text: 'I am an alert.',
  closable: false,
};
