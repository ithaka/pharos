import type { AlertStatus } from '../../components/alert/pharos-alert';

export const argTypes = {
  status: {
    options: ['info', 'success', 'warning', 'error'],
    control: { type: 'inline-radio' as const },
  },
};

export interface ComponentArgs {
  status: AlertStatus;
  closable?: boolean;
};

export type StoryArgs = ComponentArgs & {
  text: string;
};

export const defaultArgs: StoryArgs = {
  status: 'base' as AlertStatus,
  text: 'I am an alert.',
  closable: false,
};
