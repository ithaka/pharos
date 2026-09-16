export interface ComponentArgs {
  disabled?: boolean;
  hideLabel?: boolean;
  invalidated?: boolean;
  label?: string;
  looseMatch?: boolean;
  message?: string;
  name?: string;
  open?: boolean;
  placeholder?: string;
  required?: boolean;
  validated?: boolean;
  value?: string;
  inline?: boolean;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  disabled: false,
  hideLabel: false,
  invalidated: false,
  label: 'Combobox Label',
  looseMatch: false,
  message: '',
  name: '',
  open: false,
  placeholder: '',
  required: false,
  validated: false,
  value: '',
  inline: false,
};
