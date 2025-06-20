import type { TextAreaResize } from './pharos-textarea';

export interface ComponentArgs {
  name?: string;
  label?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  invalidated?: boolean;
  validated?: boolean;
  message?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  resize?: TextAreaResize;
  value?: string;
  rows?: number;
  columns?: number;
}

export type StoryArgs = ComponentArgs & {};

export const defaultArgs: StoryArgs = {
  name: 'story-input',
  label: 'I am a label',
  disabled: false,
  hideLabel: false,
  invalidated: false,
  validated: false,
  message: '',
  placeholder: 'Enter some text',
  readonly: false,
  required: false,
  value: 'Some text',
  rows: 2,
  columns: 20,
};
