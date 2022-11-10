import { iconNames } from '../../utils/iconNames';

export const defaultArgs = {
  name: 'checkmark',
  description: '',
};

export const argTypes = {
  name: {
    options: iconNames,
    control: {
      type: 'select',
    },
  },
};
