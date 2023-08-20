import { PharosIcon } from '../../react-components';
import { iconNames } from '../../utils/iconNames';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
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
};

export const Base = {
  render: (args) => (
    <PharosIcon
      name={args.name}
      description={args.description}
      className="icon-example__icon"
    ></PharosIcon>
  ),
  args: defaultArgs,
};

export const Names = {
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
            <PharosIcon name={name} className="icon-example__icon"></PharosIcon>
            <div className="icon-example__name">{name}</div>
          </div>
        );
      })}
    </div>
  ),
};
