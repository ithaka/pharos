import { Fragment } from 'react';
import type { Meta } from '@storybook/react';
import type { FC } from 'react';

import '../reports.scss';
import { viewports } from '../../shared/viewports';
import { Sidenav } from './Sidenav';
import { CreateReportModal } from './CreateReportModal';
import { ReportsTable } from './ReportsTable';
import { historyTable, scheduledTable } from '../mocks';

import '../../../components/toast/pharos-toaster';

import { PharosHeading } from '../../../react-components/heading/pharos-heading';
import { PharosLink } from '../../../react-components/link/pharos-link';
import { PharosButton } from '../../../react-components/button/pharos-button';
import { PharosTabs } from '../../../react-components/tabs/pharos-tabs';
import { PharosTab } from '../../../react-components/tabs/pharos-tab';
import { PharosTabPanel } from '../../../react-components/tabs/pharos-tab-panel';
import { PharosToaster } from '../../../react-components/toast/pharos-toaster';
import { PharosSidenavButton } from '../../../react-components/sidenav/pharos-sidenav-button';

export default {
  title: 'Pages/Reports',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
} as Meta;

export const Reports: FC = () => (
  <Fragment>
    <div className="reports-page__container">
      <Sidenav />
      <main className="reports-page__container--main-content">
        <div className="reports-page__container--top">
          <div className="reports-page__container--nav-header">
            <PharosSidenavButton />
            <img src="./images/reports/jstor-horizontal.svg" alt="logo" width="96" height="24" />
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
        <div className="reports-page__container--body">
          <div className="reports-page__container--disclaimer">
            <PharosHeading level={2} preset="5--bold">
              COUNTER 5 Usage Reports
            </PharosHeading>
            <p>
              Welcome to the COUNTER 5 reporting service for participating institutions. JSTOR
              offers COUNTER 5 compliant reports for usage beginning January 2019. COUNTER 4 reports
              are still available for usage from January 2017 - April 2019 from the{' '}
              <PharosLink href="#">COUNTER 4 reporting service</PharosLink>. Please visit our
              COUNTER 5 <PharosLink href="#">support page</PharosLink> for more information on JSTOR
              usage reports.
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
        </div>
      </main>
    </div>
    <PharosToaster></PharosToaster>
    <CreateReportModal />
  </Fragment>
);
