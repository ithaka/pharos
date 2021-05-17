import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';

import '../reports.scss';
import { viewports, breakpoints } from '../../shared/viewports';
import { Sidenav } from './sidenav';
import { CreateReportModal } from './create-report-modal';
import { ReportsTable } from './reports-table';
import { historyTable, scheduledTable } from '../mocks';

import '../../../components/heading/pharos-heading';
import '../../../components/link/pharos-link';
import '../../../components/tabs/pharos-tabs';
import '../../../components/tabs/pharos-tab';
import '../../../components/tabs/pharos-tab-panel';
import '../../../components/button/pharos-button';
import '../../../components/toast/pharos-toaster';
import '../../../components/sidenav/pharos-sidenav-button';

export default {
  title: 'Pages/Reports',
  parameters: {
    chromatic: { viewports: breakpoints },
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
};

export const Reports = (): TemplateResult => html`
  <div class="reports-page__container">
    ${Sidenav()}
    <main class="reports-page__container--main-content">
      <div class="reports-page__container--top">
        <div class="reports-page__container--nav-header">
          <pharos-sidenav-button></pharos-sidenav-button>
          <img src="./images/reports/jstor-horizontal.svg" alt="logo" width="96" height="24" />
          <span class="reports-page__separator">/</span>
          <pharos-heading level="1" preset="4" no-margin>Admin</pharos-heading>
        </div>
        <pharos-button variant="subtle" icon-right="chevron-down" class="reports-page__button--user"
          >Gerry Larry Burla</pharos-button
        >
      </div>
      <div class="reports-page__container--body">
        <div class="reports-page__container--disclaimer">
          <pharos-heading level="2" preset="5--bold">COUNTER 5 Usage Reports</pharos-heading>
          <p>
            Welcome to the COUNTER 5 reporting service for participating institutions. JSTOR offers
            COUNTER 5 compliant reports for usage beginning January 2019. COUNTER 4 reports are
            still available for usage from January 2017 - April 2019 from the
            <pharos-link href="#">COUNTER 4 reporting service</pharos-link>. Please visit our
            COUNTER 5 <pharos-link href="#">support page</pharos-link> for more information on JSTOR
            usage reports.
          </p>
        </div>
        <div class="reports-page__container--table">
          <pharos-button class="reports-page__button--create" data-modal-id="create-report-modal"
            >Create Report</pharos-button
          >
          <pharos-tabs>
            <pharos-tab id="tab-1" data-panel-id="panel-1">Report History</pharos-tab>
            <pharos-tab id="tab-2" data-panel-id="panel-2">Scheduled Reports</pharos-tab>
            <pharos-tab-panel id="panel-1" slot="panel" style="overflow: visible">
              ${ReportsTable(historyTable)}
            </pharos-tab-panel>
            <pharos-tab-panel id="panel-2" slot="panel">
              ${ReportsTable(scheduledTable)}
            </pharos-tab-panel>
          </pharos-tabs>
        </div>
      </div>
    </main>
  </div>
  <pharos-toaster></pharos-toaster>
  ${CreateReportModal()}
`;
