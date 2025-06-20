export interface ComponentArgs {
  label?: string;
  displayCharacterCount?: number;
  hideSelectAll?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  looseMatch?: boolean;
  name?: string;
  message?: string;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs = {
  label: 'Cities in Michigan',
  displayCharacterCount: 40,
  hideSelectAll: false,
  disabled: false,
  hideLabel: false,
  looseMatch: false,
  name: '',
};
