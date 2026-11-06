import type { IconName } from '../icon/pharos-icon';
import type { HeadingLevel } from '../heading/pharos-heading';

export interface ComponentArgs {
  title?: string;
  description?: string;
  icon?: IconName;
  label?: string;
  href?: string;
  headingLevel?: HeadingLevel;
  disabled?: boolean;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  title: 'Preservation',
  description: 'Enable preservation in Portico',
  icon: 'gear' as IconName,
  label: 'Beta',
  href: '#',
  headingLevel: 3 as HeadingLevel,
  disabled: false,
};

export const argTypes = {
  headingLevel: { control: { type: 'select' as const }, options: [1, 2, 3, 4, 5, 6] },
};
