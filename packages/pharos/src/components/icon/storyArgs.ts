import { iconNames } from '../../utils/iconNames';
import type { IconName } from './pharos-icon';

export interface ComponentArgs {
  name?: IconName;
  a11yTitle?: string;
  a11yHidden?: AriaHiddenState;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  name: 'checkmark' as IconName,
  a11yTitle: 'checkmark',
  a11yHidden: 'false' as AriaHiddenState,
};

export const argTypes = {
  name: {
    options: iconNames,
    control: {
      type: 'select' as const,
    },
  },
};
