import { PharosSwitch } from '../../react-components/switch/pharos-switch';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import { action } from '@storybook/addon-actions';

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
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: ({ disabled, checked }) => (
    <PharosSwitch
      disabled={disabled}
      checked={checked}
      onChange={(e) => action('Change')(e.target.checked)}
    >
      <span slot="label">Toggle Switch</span>
    </PharosSwitch>
  ),
  args: {
    disabled: false,
    checked: false,
  },
  parameters: {
    options: { selectedPanel: 'addon-actions' },
  },
};
