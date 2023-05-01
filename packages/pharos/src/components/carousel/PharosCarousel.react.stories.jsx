import { PharosCarousel } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Carousel',
  component: PharosCarousel,
  parameters: {
    docs: {
      page: configureDocsPage('carousel'),
    },
  },
  argTypes,
};

const Base = {
  render: () => <PharosCarousel></PharosCarousel>,
  args: defaultArgs,
};

export const Info = {
  ...Base,
  args: {},
};
