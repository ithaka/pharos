import { PharosHeading, PharosCheckboxGroup, PharosCheckbox } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';
import { allPresets } from './pharos-heading.js';

export default {
  title: 'Components/Heading',
  component: PharosHeading,
  parameters: {
    docs: { page: configureDocsPage('heading') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => (
    <PharosHeading level={args.level} preset={args.preset} noMargin={args.noMargin}>
      {args.text}
      <br />
      second line
    </PharosHeading>
  ),
  args: defaultArgs,
  argTypes: {
    ...argTypes,
    preset: {
      options: allPresets.filter((preset) => !preset.includes('--bold')),
      control: { type: 'inline-radio' },
    },
  },
};

export const Bold = {
  ...Base,
  args: {
    ...Base.args,
    preset: '5--bold',
  },
  argTypes: {
    ...argTypes,
    preset: {
      options: allPresets.filter((preset) => preset.includes('--bold')),
      control: { type: 'inline-radio' },
    },
  },
};

export const Legend = {
  render: (args) => (
    <PharosCheckboxGroup>
      <PharosHeading slot="legend" level={args.level} preset={args.preset}>
        {args.text}
      </PharosHeading>
      <PharosCheckbox value="1">
        <span slot="label">Checkbox 1</span>
      </PharosCheckbox>
      <PharosCheckbox value="2">
        <span slot="label">Checkbox 2</span>
      </PharosCheckbox>
    </PharosCheckboxGroup>
  ),
  args: {
    ...Base.args,
    text: 'I am legend',
    level: 2,
    preset: 'legend',
  },
};
