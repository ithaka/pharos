import { allSizes } from './pharos-modal';

export const defaultArgs = {
  size: 'medium',
  open: false,
  footerDivider: true,
  header: 'Pharos modal',
};

export const argTypes = {
  size: {
    options: allSizes,
    control: {
      type: 'inline-radio',
    },
  },
};
