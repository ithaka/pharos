import { iconNames } from '../../utils/iconNames';

export const defaultArgs = {
  name: 'checkmark',
  description: '',
  a11yTitle: 'checkmark',
  a11yHidden: 'false',
};

export const argTypes = {
  name: {
    options: iconNames,
    control: {
      type: 'select',
    },
  },
};
