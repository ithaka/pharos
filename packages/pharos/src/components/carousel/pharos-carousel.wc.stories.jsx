import { html } from 'lit';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Carousel',
  component: 'pharos-carousel',
  parameters: {
    docs: {
      page: configureDocsPage('carousel'),
    },
  },
  argTypes,
};

const Base = {
  render: ({}) =>
    html`<pharos-carousel
      heading="Carousel heading"
      description="carousel description"
      viewAllLink="/view-all"
    >
      <div slot="item">item 1</div>
      <div slot="item">item 2</div>
      <div slot="item">item 3</div>
      <div slot="item">item 4</div>
      <div slot="item">item 5</div>
    </pharos-carousel>`,
  args: defaultArgs,
};

export const Info = {
  ...Base,
  args: {},
};
