import { PharosIcon } from '../../react-components';
import { iconNames } from '../../utils/iconNames';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, argTypes, type StoryArgs, type ComponentArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Icon',
  component: PharosIcon,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('icon') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosIcon
      name={args.name}
      a11yHidden={args.a11yHidden}
      a11yTitle={args.a11yTitle}
      className="icon-example__icon"
    ></PharosIcon>
  ),
  args: defaultArgs,
};

export const Names: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gridGap: '2rem',
        marginTop: '2rem',
        justifyContent: 'space-evenly',
      }}
    >
      {iconNames.map((name, index) => {
        return (
          <div className="icon-example__container" key={index}>
            <PharosIcon name={name} a11yTitle={name} className="icon-example__icon"></PharosIcon>
            <div className="icon-example__name">{name}</div>
          </div>
        );
      })}
    </div>
  ),
};
