import type { Meta } from '@storybook/react';

import '../reports.scss';
import { viewports } from '../../shared/viewports';
import { PharosContext } from '../../../utils/PharosContext';
import { ReportExample } from './ReportExample';

export default {
  title: 'Pages/Reports',
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
} as Meta;

export const Reports = {
  render: () => (
    <>
      <ReportExample />
    </>
  ),
};
