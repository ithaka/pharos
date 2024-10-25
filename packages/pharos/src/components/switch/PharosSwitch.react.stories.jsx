import { PharosSwitch } from '../../react-components/switch/pharos-switch';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Forms/Switch',
  component: PharosSwitch,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('switch'),
    },
  },
};

export const Base = {
  render: (args) => (
    <PharosSwitch>
      <span slot="label">Toggle Switch</span>
    </PharosSwitch>
  ),
  args: {},
};
