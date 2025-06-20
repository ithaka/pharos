import { allSizes, type ModalSize } from './pharos-modal';

export interface ComponentArgs {
  size?: ModalSize;
  open?: boolean;
  footerDivider?: boolean;
  header?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs = {
  size: 'medium' as ModalSize,
  open: false,
  footerDivider: true,
  header: 'Pharos modal',
};

export const argTypes = {
  size: {
    options: allSizes,
    control: {
      type: 'inline-radio' as const,
    },
  },
};
