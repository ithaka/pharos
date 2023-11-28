import { iconNames } from '../../utils/iconNames';

export const defaultArgs = {
  name: 'checkmark',
  description: '',
  a11yTitle: 'This is the icon title',
  a11yHidden: false,
};

export const argTypes = {
  name: {
    options: iconNames,
    control: {
      type: 'select',
    },
  },
};
