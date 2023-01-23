import type { Meta } from '@storybook/react';

import '../reports.scss';
import { viewports } from '../../shared/viewports';
import { Sidenav } from './Sidenav';
import { CreateReportModal } from './CreateReportModal';
import { ReportsTable } from './ReportsTable';
import { historyTable, scheduledTable } from '../mocks';

import {
  PharosHeading,
  PharosLink,
  PharosButton,
  PharosTabs,
  PharosTab,
  PharosTabPanel,
  PharosToaster,
  PharosLayout,
} from '../../../react-components';

export default {
  title: 'Pages/Reports',
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
      <div className="reports-page__container">
        <Sidenav />
        <main id="main-content">
          <PharosLayout preset="1-col--sidenav" className="reports-page__container--main-content">
            <div className="reports-page__container--top" slot="top">
              <div className="reports-page__container--nav-header">
                <img
                  src="./images/reports/jstor-horizontal.svg"
                  alt="logo"
                  width="96"
                  height="24"
                />
                <span className="reports-page__separator">/</span>
                <PharosHeading level={1} preset="4" noMargin>
                  Admin
                </PharosHeading>
              </div>
              <PharosButton
                variant="subtle"
                iconRight="chevron-down"
                className="reports-page__button--user"
              >
                Gerry Larry Burla
              </PharosButton>
            </div>
            <div className="reports-page__container--disclaimer">
              <PharosHeading level={2} preset="5--bold">
                COUNTER 5 Usage Reports
              </PharosHeading>
              <p>
                Welcome to the COUNTER 5 reporting service for participating institutions. JSTOR
                offers COUNTER 5 compliant reports for usage beginning January 2019. COUNTER 4
                reports are still available for usage from January 2017 - April 2019 from the{' '}
                <PharosLink href="#">COUNTER 4 reporting service</PharosLink>. Please visit our
                COUNTER 5 <PharosLink href="#">support page</PharosLink> for more information on
                JSTOR usage reports.
              </p>
            </div>
            <div className="reports-page__container--table">
              <PharosButton
                className="reports-page__button--create"
                data-modal-id="create-report-modal"
              >
                Create Report
              </PharosButton>
              <PharosTabs>
                <PharosTab id="tab-1" data-panel-id="panel-1">
                  Report History
                </PharosTab>
                <PharosTab id="tab-2" data-panel-id="panel-2">
                  Scheduled Reports
                </PharosTab>
                <PharosTabPanel id="panel-1" slot="panel" style={{ overflow: 'visible' }}>
                  {ReportsTable(historyTable)}
                </PharosTabPanel>
                <PharosTabPanel id="panel-2" slot="panel">
                  {ReportsTable(scheduledTable)}
                </PharosTabPanel>
              </PharosTabs>
            </div>
          </PharosLayout>
        </main>
      </div>
      <PharosToaster></PharosToaster>
      <CreateReportModal />
    </>
  ),
};
