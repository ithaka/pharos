import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../reports.scss';
import { viewports, breakpoints } from '../../shared/viewports';
import { Sidenav } from './sidenav';
import { CreateReportModal } from './create-report-modal';
import { ReportsTable } from './reports-table';
import { historyTable, scheduledTable } from '../mocks';

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

export const Reports = {
  render: (): TemplateResult => html`
    <div class="reports-page__container">
      ${Sidenav()}
      <main id="main-content">
        <storybook-pharos-layout preset="1-col--sidenav" class="reports-page__container--main-content">
          <div class="reports-page__container--top" slot="top">
            <div class="reports-page__container--nav-header">
              <storybook-pharos-sidenav-button></storybook-pharos-sidenav-button>
              <img src="./images/reports/jstor-horizontal.svg" alt="logo" width="96" height="24" />
              <span class="reports-page__separator">/</span>
              <storybook-pharos-heading level="1" preset="4" no-margin>Admin</storybook-pharos-heading>
            </div>
            <storybook-pharos-button
              variant="subtle"
              icon-right="chevron-down"
              class="reports-page__button--user"
              >Gerry Larry Burla
            </storybook-pharos-button>
          </div>
          <div class="reports-page__container--disclaimer">
            <storybook-pharos-heading level="2" preset="5--bold">COUNTER 5 Usage Reports</storybook-pharos-heading>
            <p>
              Welcome to the COUNTER 5 reporting service for participating institutions. JSTOR
              offers COUNTER 5 compliant reports for usage beginning January 2019. COUNTER 4 reports
              are still available for usage from January 2017 - April 2019 from the
              <storybook-pharos-link href="#">COUNTER 4 reporting service</storybook-pharos-link>. Please visit our
              COUNTER 5
              <storybook-pharos-link href="#">support page</storybook-pharos-link>
              for more information on JSTOR usage reports.
            </p>
          </div>
          <div class="reports-page__container--table">
            <storybook-pharos-button class="reports-page__button--create" data-modal-id="create-report-modal"
              >Create Report
            </storybook-pharos-button>
            <storybook-pharos-tabs>
              <storybook-pharos-tab id="tab-1" data-panel-id="panel-1">Report History</storybook-pharos-tab>
              <storybook-pharos-tab id="tab-2" data-panel-id="panel-2">Scheduled Reports</storybook-pharos-tab>
              <storybook-pharos-tab-panel id="panel-1" slot="panel" style="overflow: visible">
                ${ReportsTable(historyTable)}
              </storybook-pharos-tab-panel>
              <storybook-pharos-tab-panel id="panel-2" slot="panel">
                ${ReportsTable(scheduledTable)}
              </storybook-pharos-tab-panel>
            </storybook-pharos-tabs>
          </div>
        </storybook-pharos-layout>
      </main>
    </div>
    <storybook-pharos-toaster></storybook-pharos-toaster>
    ${CreateReportModal()}
  `,
};
