import { PharosSheet } from '../../react-components/sheet/pharos-sheet';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import { PharosButton } from '../../react-components';

export default {
  title: 'Components/Sheet',
  component: PharosSheet,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('sheet'),
    },
  },
};

export const Base = {
  render: () => <PharosSheet />,
  args: {},
};

export const WithClose = {
  render: () => (
    <PharosSheet id="my-sheet" label="Pharos sheet" with-close>
      <div>Lorem ipsum dolor sit amet</div>
    </PharosSheet>
  ),
};

export const LongContent = {
  render: () => (
    <PharosSheet id="my-sheet" label="Pharos sheet">
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
    </PharosSheet>
  ),
};
