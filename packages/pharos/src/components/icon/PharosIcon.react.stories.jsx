import { PharosIcon } from '../../react-components/icon/pharos-icon';
import { iconNames } from '../../utils/iconNames';
import { configureDocsPage } from '../../../../../.storybook/docsPageConfig.jsx';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Icon',
  component: PharosIcon,
  parameters: {
    docs: { page: configureDocsPage('icon') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => <PharosIcon name={args.name} className="icon-example__icon"></PharosIcon>,
  args: defaultArgs,
};

export const Names = {
  render: (_) => (
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
